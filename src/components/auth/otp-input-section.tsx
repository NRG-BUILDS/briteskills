import React, { useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useOTPTimer } from "@/hooks/use-otp-timer";

interface OTPInputSectionProps {
  otp: string;
  setOtp: (value: string) => void;
}

export function OTPInputSection({ otp, setOtp }: OTPInputSectionProps) {
  const { expiryTime, resetTimers, formatTime } = useOTPTimer();

  // Restart the timer when component mounts
  useEffect(() => {
    resetTimers();
    // Empty dependency array to ensure this only runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <InputOTP
        maxLength={4}
        value={otp}
        onChange={(value) => setOtp(value)}
        containerClassName="justify-center gap-2 md:gap-3"
        className="w-full"
      >
        <InputOTPGroup>
          <InputOTPSlot
            index={0}
            className="h-12 w-11 sm:w-12 border-primary/50 dark:text-white"
          />
          <InputOTPSlot
            index={1}
            className="h-12 w-11 sm:w-12 border-primary/50 dark:text-white"
          />
          <InputOTPSlot
            index={2}
            className="h-12 w-11 sm:w-12 border-primary/50 dark:text-white"
          />
          <InputOTPSlot
            index={3}
            className="h-12 w-11 sm:w-12 border-primary/50 dark:text-white"
          />
        </InputOTPGroup>
      </InputOTP>

      <div className="flex items-center justify-center text-sm text-muted-foreground">
        <p>
          {expiryTime > 0 ? (
            <>
              Code expires in{" "}
              <span className="font-medium text-primary">
                {formatTime(expiryTime)}
              </span>
            </>
          ) : (
            <>
              Code expired.{" "}
              <button
                onClick={resetTimers}
                className="font-medium text-primary hover:underline"
              >
                Resend code
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
