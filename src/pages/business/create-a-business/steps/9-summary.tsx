import { BusinessCreateForm } from "../listing-form";
import { motion } from "framer-motion";
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import {
  Building2,
  Mail,
  Phone,
  Clock,
  Calendar,
  FileText,
  Tag,
  CheckCircle,
  Edit,
} from "lucide-react";

type Props = {
  form: BusinessCreateForm;
  onEdit?: (step: string) => void;
  onSubmit?: () => void;
};

export const BusinessSummaryStep = ({ form, onEdit, onSubmit }: Props) => {
  const triggerConfetti = () => {
    // Side bursts only
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 150 * (timeLeft / duration);

      // Left side burst
      confetti({
        particleCount,
        startVelocity: 50,
        spread: 1000,
        origin: { x: 0, y: 0.6 },
      });

      // Right side burst
      confetti({
        particleCount,
        startVelocity: 50,
        spread: 1000,
        origin: { x: 1, y: 0.6 },
      });
    }, 150);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
      triggerConfetti();
    }
  };
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "Not provided";
    return phone.startsWith("+234") ? phone : `+234${phone}`;
  };

  const formatBusinessHours = () => {
    if (form.always_open) {
      return "24/7 - Always Open";
    }

    if (!form.days_open && !form.open_time && !form.close_time) {
      return "Not specified";
    }

    const days = form.days_open || "Not specified";
    const hours =
      form.open_time && form.close_time
        ? `${form.open_time} - ${form.close_time}`
        : "Hours not specified";

    return `${days} • ${hours}`;
  };

  const isFormComplete = () => {
    const requiredFields = ["name", "email", "category"];
    return requiredFields.every(
      (field) => form[field as keyof BusinessCreateForm],
    );
  };

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
            Review your business information
          </h1>
          <p className="text-muted-foreground">
            Double-check all details before submitting your business listing.
          </p>
        </div>
      </div>

      {/* Basic Information Summary */}
      <div className="grid divide-y overflow-clip rounded-xl border">
        <div className="flex items-center justify-between bg-muted p-3 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Basic Information
          </div>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit("basic")}
              className="h-auto p-1 text-xs"
            >
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
          )}
        </div>

        <div className="grid divide-y">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="text-xs font-normal text-muted-foreground">
                  Business Name
                </Label>
                <p className="text-sm font-medium">
                  {form.name || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="text-xs font-normal text-muted-foreground">
                  Category
                </Label>
                <p className="text-sm font-medium">
                  {form.category || "Not selected"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between p-4">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="text-xs font-normal text-muted-foreground">
                  Description
                </Label>
                <p className="max-w-md text-sm font-medium">
                  {form.description || "No description provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Summary */}
      <div className="grid divide-y overflow-clip rounded-xl border">
        <div className="flex items-center justify-between bg-muted p-3 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact Information
          </div>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit("basic")}
              className="h-auto p-1 text-xs"
            >
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
          )}
        </div>

        <div className="grid divide-y">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="text-xs font-normal text-muted-foreground">
                  Email
                </Label>
                <p className="text-sm font-medium">
                  {form.email || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="text-xs font-normal text-muted-foreground">
                  Phone Number
                </Label>
                <p className="text-sm font-medium">
                  {formatPhoneNumber(form.phone_number)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours Summary */}
      <div className="grid divide-y overflow-clip rounded-xl border">
        <div className="flex items-center justify-between bg-muted p-3 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Business Hours
          </div>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit("hours")}
              className="h-auto p-1 text-xs"
            >
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <Label className="text-xs font-normal text-muted-foreground">
                Operating Hours
              </Label>
              <p className="text-sm font-medium">{formatBusinessHours()}</p>
              {form.always_open && (
                <div className="mt-1 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600">Open 24/7</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      <div
        className={`rounded-lg border p-4 ${
          isFormComplete()
            ? "border-green-200 bg-green-50"
            : "border-orange-200 bg-orange-50"
        }`}
      >
        <div className="flex items-center gap-2">
          {isFormComplete() ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <Clock className="h-5 w-5 text-orange-600" />
          )}
          <p
            className={`text-sm font-medium ${
              isFormComplete() ? "text-green-800" : "text-orange-800"
            }`}
          >
            {isFormComplete()
              ? "Your business listing is ready to submit"
              : "Please complete required fields"}
          </p>
        </div>
        {!isFormComplete() && (
          <p className="mt-1 text-xs text-orange-600">
            Required: Business name, email, and category
          </p>
        )}
      </div>

      {/* Submit Button */}
      {onSubmit && (
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!isFormComplete()}
            className="min-w-32"
          >
            {isFormComplete() ? "Submit Listing" : "Complete Required Fields"}
          </Button>
        </div>
      )}
    </motion.div>
  );
};
