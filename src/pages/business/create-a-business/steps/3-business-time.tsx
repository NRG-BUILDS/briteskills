import { Input } from "@/components/ui/input";
import { BusinessCreateForm } from "../listing-form";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Calendar } from "lucide-react";

type Props = {
  form: BusinessCreateForm;
  setForm: (form: BusinessCreateForm) => void;
};

export const BusinessHoursStep = ({ form, setForm }: Props) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDayToggle = (day: string) => {
    const currentDays = form.days_open ? form.days_open.split(", ") : [];
    const dayIndex = currentDays.indexOf(day);

    let updatedDays;
    if (dayIndex > -1) {
      // Remove day if it exists
      updatedDays = currentDays.filter((d) => d !== day);
    } else {
      // Add day if it doesn't exist
      updatedDays = [...currentDays, day];
    }

    setForm({ ...form, days_open: updatedDays.join(", ") });
  };

  const handleAlwaysOpenChange = (checked: boolean) => {
    setForm({
      ...form,
      always_open: checked,
      open_time: checked ? "" : form.open_time,
      close_time: checked ? "" : form.close_time,
      days_open: checked ? "" : form.days_open,
    });
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const selectedDays = form.days_open ? form.days_open.split(", ") : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <div className="mb-8 font-semibold">
          <h1 className="text-3xl font-extrabold">
            When is your business open?
          </h1>
          <p className="text-muted-foreground">
            Let customers know when they can visit or contact you.
          </p>
        </div>
      </div>

      <div className="grid divide-y overflow-clip rounded-xl border">
        <div className="flex items-center gap-2 bg-muted p-3 text-sm font-medium text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Operating Hours
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="always_open"
              checked={form.always_open}
              onCheckedChange={handleAlwaysOpenChange}
            />
            <Label
              htmlFor="always_open"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              We're always open (24/7)
            </Label>
          </div>

          {!form.always_open && (
            <>
              <div className="grid divide-y overflow-clip rounded-xl border">
                <div className="*:border-0">
                  <Label className="p-0 pl-3 text-xs font-normal text-muted-foreground">
                    Days open
                  </Label>
                  <div className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {days.map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={
                            selectedDays.includes(day) ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handleDayToggle(day)}
                          className="h-10 w-10 rounded-full p-0 text-xs font-medium"
                        >
                          {day.slice(0, 3)}
                        </Button>
                      ))}
                    </div>
                    {form.days_open && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Selected: {form.days_open}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid divide-y overflow-clip rounded-xl border">
                <div className="flex items-center gap-2 bg-muted p-3 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Business Hours
                </div>
                <div className="grid divide-x divide-y *:border-0 md:grid-cols-2 md:divide-y-0">
                  <div className="*:border-0">
                    <Label className="p-0 pl-3 text-xs font-normal text-muted-foreground">
                      Opening time
                    </Label>
                    <Input
                      name="open_time"
                      type="time"
                      value={form.open_time}
                      onChange={handleInput}
                      className="!py-0 focus-visible:ring-0 focus-visible:ring-transparent"
                    />
                  </div>
                  <div className="*:border-0">
                    <Label className="p-0 pl-3 text-xs font-normal text-muted-foreground">
                      Closing time
                    </Label>
                    <Input
                      name="close_time"
                      type="time"
                      value={form.close_time}
                      onChange={handleInput}
                      className="!py-0 focus-visible:ring-0 focus-visible:ring-transparent"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {form.always_open && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <p className="text-sm font-medium text-green-800">
              Your business is marked as always open
            </p>
          </div>
          <p className="mt-1 text-xs text-green-600">
            Customers will see that your business operates 24 hours a day, 7
            days a week.
          </p>
        </div>
      )}
    </motion.div>
  );
};
