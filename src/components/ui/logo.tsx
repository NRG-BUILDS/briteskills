import { cn } from "@/lib/utils";
import logo from "@/assets/brand/groomica-icon.png";
import logoSecondary from "@/assets/brand/groomica-icon-secondary.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "secondary" | "primary";
  icon?: boolean;
}

export function Logo({
  className,
  variant = "primary",
  size = "md",
  icon = false,
}: LogoProps) {
  const textSizeClasses = {
    sm: "text-xl",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
  };
  const iconSizeClasses = {
    sm: "size-5",
    md: "size-16",
    lg: "size-24",
    xl: "size-8",
  };

  return (
    <div className="flex w-fit items-center justify-center gap-2">
      <div className={cn("", textSizeClasses[size], className)}>
        <span>
          Brite<span className="text-primary">Skills</span>
        </span>
      </div>
    </div>
  );
}
