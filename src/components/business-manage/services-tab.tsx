import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  Clock,
  Edit3,
  MoreVertical,
  Plus,
  Trash2,
  Users2,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

type Props = {};

interface Service {
  id: string;
  price: string;
  duration: number;
  no_of_staffs: number;
  business: string;
  service: string;
}
export const ServicesTab = ({}: Props) => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "3fa85f64-5717-462-b3fc-2c963f66afa6",
      price: "48476.28",
      duration: 21000,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Million braid",
    },
    {
      id: "3fa85f64-5717-562-b3fc-2c963f66afa6",
      price: "48476.28",
      duration: 21000,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Hair washing",
    },
    {
      id: "3fa85f64-5717-4562-b3f-2c963f66afa6",
      price: "48476.28",
      duration: 21000,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Manicure",
    },
    {
      id: "3fa85f64-57174562-b3fc-2c963f66afa6",
      price: "48476.28",
      duration: 21000,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Hair relaxing",
    },
    {
      id: "3fa85f64-57-4562-b3fc-2c963f66afa6",
      price: "48476.28",
      duration: 21000,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Haircut (Male)",
    },
  ]);
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);
  const handleMakeChangesClick = (service) => {
    setOpen(true);
    setSelectedService(() => service);
  };
  const handleSave = (data: Service) => {
    console.log("Saved data:", data);
    if (selectedService) {
      setServices(
        services.map((service) => (service.id === data.id ? data : service)),
      );
      toast.success("Service updated successfully!");
    } else {
      setServices([...services, data]);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between lg:flex-row">
          <CardTitle>Services</CardTitle>
          <Button variant="ghost" onClick={() => setOpen(true)}>
            <Plus />
            Add Service
          </Button>
        </CardHeader>
        <CardContent>
          <div className="lg:grid-cols3 grid gap-4 md:grid-cols-2">
            {services.map((service, i) => (
              <div className="rounded-lg border py-3 transition-all hover:shadow-elevate-03">
                <div className="-ml-0.5 divide-y border-l-4 border-primary font-medium *:p-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                      <h4 className="text-xs text-muted-foreground">Service</h4>
                      <div className="flex items-start gap-2 text-lg">
                        <BriefcaseBusiness size={20} className="mt-1" />
                        <div>
                          <p>{service.service}</p>
                          <p className="text-accent">
                            <small>₦</small>
                            {Number(service.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger>
                        <MoreVertical className="size-4 text-muted-foreground" />
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="w-fit divide-y overflow-clip rounded-lg border bg-white p-0 text-sm *:flex *:items-center *:gap-2 *:p-3 hover:*:bg-neutral-100"
                      >
                        <button onClick={() => handleMakeChangesClick(service)}>
                          <Edit3 className="size-5" />
                          <span>Make changes</span>
                        </button>
                        <Link
                          to={"#"}
                          className="text-destructive hover:!bg-destructive/10"
                        >
                          <Trash2 className="size-5" />
                          <span>Delete</span>
                        </Link>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="space-y-1 text-sm">
                      <p>{service.business}</p>

                      <div className="flex gap-1">
                        <div className="flex w-fit items-center justify-center gap-1 truncate rounded-full border border-accent/50 bg-accent/5 p-1.5 text-xs leading-none text-accent">
                          <Clock size={12} />
                          <span>{service.duration / 1000}mins per session</span>
                        </div>
                        <div className="flex w-fit items-center justify-center gap-1 truncate rounded-full border border-accent/50 bg-accent/5 p-1.5 text-xs leading-none text-accent">
                          <Clock size={12} />
                          <span>12 timeslots per day</span>
                        </div>
                      </div>
                      <div className="flex w-fit items-center justify-center gap-1 truncate rounded-full border border-secondary/50 bg-secondary/5 p-1.5 text-xs leading-none text-secondary">
                        <Users2 size={12} />
                        <span>{service.no_of_staffs} staff required</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <ServiceModal
        open={open}
        mode="edit"
        initialData={selectedService}
        onClose={() => {
          setSelectedService(null);
          setOpen(false);
        }}
        onSave={handleSave}
      />
    </>
  );
};

interface ServiceModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialData?: Service;
  onClose: () => void;
  onSave: (data: Service) => void;
}

interface ServiceData {
  id?: string;
  price: string;
  duration: number;
  no_of_staffs: number;
  business: string;
  service: string;
}

export function ServiceModal({
  open,
  mode,
  initialData,
  onClose,
  onSave,
}: ServiceModalProps) {
  const [form, setForm] = useState<ServiceData>({
    price: "",
    duration: 0,
    no_of_staffs: 1,
    business: "",
    service: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm(initialData);
    } else {
      setForm({
        price: "",
        duration: 0,
        no_of_staffs: 1,
        business: "",
        service: "",
      });
    }
  }, [mode, initialData, open]);

  const handleChange = (key: keyof Service, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      id: form.id ?? crypto.randomUUID(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Service" : "Edit Service"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new service to your business offerings."
              : "Update the details of this service."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4 py-4">
            <div>
              <Label>Business</Label>
              <Input
                value={form.business}
                onChange={(e) => handleChange("business", e.target.value)}
                placeholder="Business name"
              />
            </div>
            <div>
              <Label>Service</Label>
              <Input
                value={form.service}
                onChange={(e) => handleChange("service", e.target.value)}
                placeholder="Service name"
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="Price"
              />
            </div>
            <div>
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={form.duration}
                onChange={(e) =>
                  handleChange("duration", Number(e.target.value))
                }
                placeholder="Duration in minutes"
              />
            </div>
            <div>
              <Label>Number of Staffs</Label>
              <Input
                type="number"
                value={form.no_of_staffs}
                onChange={(e) =>
                  handleChange("no_of_staffs", Number(e.target.value))
                }
                placeholder="Staff count"
              />
            </div>
          </div>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-2 rounded-md border border-accent bg-accent/5 p-2 text-accent">
              <Clock className="mt-1 text-accent" />
              <div>
                <p className="text-sm font-medium">
                  Your business opening hours are between{" "}
                  <span className="font-medium">9:00AM - 5:00PM</span>
                </p>
                <p className="font- text-sm">
                  Adjust the timeslots below to match your convenience
                </p>
              </div>
            </div>
            <div className="space- w-full bg-muted">
              {Array.from({ length: 8 }).map((_, i) => (
                <TimeslotCard i={i} />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "create" ? "Create" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type TimeslotCardProps = {
  i: number;
};
export const TimeslotCard = ({ i }: TimeslotCardProps) => {
  const [showBreakInput, setShowBreakInput] = useState(false);
  const breakOptions = [10, 20, 30, 45, 60, 90, 120, 180];
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  const formatMins = (min: number) => {
    if (!Number(min)) {
      return null;
    }
    return min < 60 ? (
      <span>{min} minutes</span>
    ) : (
      <span>
        {Math.floor(min / 60)} hour{min >= 120 && "s"}
        {min % 60 ? <span> {min % 60} minutes</span> : null}
      </span>
    );
  };
  const handleTrash = () => {
    setShowBreakInput(false);
    setSelectedPeriod("");
  };
  return (
    <div>
      <div className="group relative">
        <button
          key={i}
          disabled={i % 3 === 0}
          className="m-0.5 w-full rounded border-2 bg-white p-2 shadow"
        >
          <span>9:00AM - 9:30AM</span>
        </button>
        {i !== 7 && (
          <div>
            {!showBreakInput ? (
              <div className="flex h-0 items-stretch justify-center overflow-hidden rounded-lg transition-all group-hover:h-8">
                <Button
                  onClick={() => setShowBreakInput(true)}
                  variant="ghost"
                  className="h-full"
                >
                  <Plus />
                  Insert break period
                </Button>
              </div>
            ) : (
              <div className="mx-auto flex w-fit items-center gap-2">
                <Select onValueChange={(val) => setSelectedPeriod(val)}>
                  <SelectTrigger className="border-0 bg-transparent focus:ring-0">
                    {formatMins(Number(selectedPeriod)) ||
                      "Select break period"}
                  </SelectTrigger>
                  <SelectContent>
                    {breakOptions.map((opt) => (
                      <SelectItem value={opt.toString()}>
                        {formatMins(Number(opt))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button className="text-destructive">
                  <Trash2 onClick={handleTrash} className="size-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
