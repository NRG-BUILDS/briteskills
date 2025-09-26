import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck2, ChevronRight, Dot, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "@/hooks/scroll-to-top";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  onGoToAppointments: () => void;
}

function SuccessModal({
  open,
  onClose,
  onGoToAppointments,
}: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center sm:max-w-md">
        <DialogHeader>
          <CheckCircle2 className="mx-auto mb-2 size-12 text-green-500" />
          <DialogTitle className="text-xl font-semibold">
            Appointment Created Successfully 🎉
          </DialogTitle>
          <DialogDescription>
            Your appointment has been scheduled. You can view the details in
            your profile dashboard.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center lg:justify-start">
          <Button onClick={onGoToAppointments}>See My Appointments</Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const SetAppointment = () => {
  const [form, setForm] = useState({
    timeslot: "",
    customer: "",
    date: new Date(),
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // ...submit logic
    setShowSuccess(true);
  };

  const steps = [
    {
      label: "Choose a date",
      value: formatDate(form.date, "EEEE do MMMM yyyy"),
      component: (
        <DateSelector
          date={form.date}
          setForm={setForm}
          form={form}
          setActiveStep={setActiveStep}
        />
      ),
    },
    {
      label: "Select time",
      value: form.timeslot,
      component: (
        <TimeslotSelector
          setForm={setForm}
          form={form}
          setActiveStep={setActiveStep}
        />
      ),
    },
    {
      label: "Select attendant",
      value: form.customer,
      component: (
        <CustomerSelector
          setForm={setForm}
          form={form}
          setActiveStep={setActiveStep}
        />
      ),
    },
  ];
  ScrollToTop();

  return (
    <section className="relative min-h-full p-4 pb-0">
      <div className="space-y mx-auto mb-8 max-w-2xl text-center">
        <h1 className="text-2xl font-semibold">Set your appointment</h1>
        <p className="hidden text-muted-foreground lg:block">
          Schedule an appointment in just a few steps. Fill in the details, pick
          a date and time, and confirm to keep everything organized for you and
          your clients.
        </p>
        <p className="text-muted-foreground lg:hidden">
          Add details, set the time, and you’re good to go.
        </p>
      </div>
      <div className="mx-auto grid max-w-screen-lg gap-4 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="lg:hidden">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-2"
              value={steps[activeStep].label} // controlled by state
              onValueChange={(val) => {
                const idx = steps.findIndex((s) => s.label === val);
                if (idx !== -1) setActiveStep(idx);
              }}
            >
              {steps.map((step, index) => (
                <AccordionItem
                  key={step.label}
                  value={step.label}
                  className="border-0"
                >
                  <AccordionTrigger
                    showChevron={false}
                    className={`block rounded-lg border-2 px-2 text-center active:scale-95 ${activeStep === index ? "bg-primary *:!text-black" : ""}`}
                  >
                    {step.value ? (
                      <>
                        <span className="text-primary">{step.value}</span>
                        <span className="block text-sm text-muted-foreground">
                          {step.label}
                        </span>
                      </>
                    ) : (
                      step.label
                    )}
                  </AccordionTrigger>
                  <AccordionContent className="my-2">
                    {step.component}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="hidden space-y-2 *:flex *:w-full *:items-center *:justify-between *:py-4 lg:block">
            {steps.map((step, index) => (
              <button
                onClick={() => setActiveStep(index)}
                className={`${activeStep === index ? "bg-primary font-semibold *:*:!text-black" : ""} rounded-lg border-2 px-2 text-left transition-all active:scale-95`}
              >
                <div>
                  {step.value ? (
                    <>
                      <span className="text-primary">{step.value}</span>
                      <span className="block text-sm text-muted-foreground">
                        {step.label}
                      </span>
                    </>
                  ) : (
                    step.label
                  )}
                </div>
                <ChevronRight />
              </button>
            ))}
          </div>

          <div className="sticky bottom-0 left-0 mt-12 grid w-full border-t bg-card p-4 pt-6 text-center md:relative md:block md:border-0 md:p-0 md:text-left">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!form.date || !form.timeslot}
            >
              <CalendarCheck2 />
              Create Appointment
            </Button>
          </div>
        </div>
        <div className="hidden items-center justify-center lg:col-span-6 lg:flex">
          <div className="w-full rounded-xl border-2 p-4">
            <motion.div>{steps[activeStep].component}</motion.div>
          </div>
        </div>
      </div>
      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onGoToAppointments={() => {
          // navigate to appointments page
          navigate("/profile");
        }}
      />
      ;
    </section>
  );
};

export default SetAppointment;

const DateSelector = ({ date, form, setForm, setActiveStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(val) => {
            setForm({ ...form, date: val });
            setActiveStep((prev) => prev + 1); // 👈 go to next step
          }}
          className="mx-auto flex w-fit justify-center rounded-md"
          captionLayout="dropdown"
        />
      </Card>
    </motion.div>
  );
};

const TimeslotSelector = ({ form, setForm, setActiveStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-2 *:flex *:w-full *:items-center *:justify-between *:border *:px-2 *:py-2"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <button
          key={i}
          disabled={i % 3 === 0}
          className={i % 3 === 0 ? "" : "hover:bg-accent/5"}
          onClick={() => {
            setForm({ ...form, timeslot: "9:00PM" });
            setActiveStep((prev) => prev + 1); // 👈 next step
          }}
        >
          <span>9:00PM</span>
          <Badge className={`${i % 3 === 0 ? "bg-border text-gray-400" : ""}`}>
            {i % 3 === 0 ? "Occupied" : "Available"}
          </Badge>
        </button>
      ))}
    </motion.div>
  );
};

const CustomerSelector = ({ form, setForm, setActiveStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-2 *:flex *:w-full *:items-center *:gap-2 *:border *:px-2 *:py-2"
    >
      <button
        className={"hover:bg-accent/5"}
        onClick={() => {
          setForm({ ...form, customer: "First available staff" });
        }}
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-black">
          <History className="size-5" />
        </div>
        Frist staff available
      </button>
      {Array.from({ length: 8 }).map((_, i) => (
        <button
          disabled={i % 3 === 0}
          className={i % 3 === 0 ? "" : "hover:bg-accent/5"}
          onClick={() => setForm({ ...form, customer: "Folake Seun" })}
        >
          {" "}
          <div className="size-8 overflow-clip rounded-full">
            {" "}
            <Image src="" />{" "}
          </div>{" "}
          <div className="grid text-left">
            {" "}
            <div className="gap- flex items-center">
              {" "}
              <p className="text-medium">Folake Seun</p> <Dot />{" "}
              <Badge
                className={`p-0 px-1 text-[10px] ${i % 4 === 0 ? "bg-border text-gray-400" : ""}`}
              >
                {" "}
                {i % 4 === 0 ? "Busy" : "Available"}{" "}
              </Badge>{" "}
            </div>{" "}
            <span className="text-muted-foreground">Hair specialist</span>{" "}
          </div>{" "}
        </button>
      ))}
    </motion.div>
  );
};
