import { Input } from "@/components/ui/input";
import {
  Mail as MailIcon,
  Lock as LockIcon,
  UserIcon,
  LucideUsers,
  EyeOff,
  Eye,
  Mail,
} from "lucide-react";
import { useState } from "react";

interface AuthFormFieldsProps {
  type: "login" | "signup";
  confirmPassword?: string;
  user: "customer" | "business";
  form: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
    // username: string;
    // state: string;
    // country: string;
    // phone: string;
    // city: string;
    // street: string;
    // is_staff?: boolean;
    // is_landlord?: boolean;
    // is_agent?: boolean;
  };
  setForm: (form: any) => void;
}

export function AuthFormFields({
  type,
  form,
  user,
  setForm,
}: AuthFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswords = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="space-y-4">
      {type === "signup" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="First name"
                value={form.first_name || ""}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                required
              />
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Last name"
                value={form.last_name || ""}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
                required
              />
            </div>
          </div>
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Username"
                value={form.username || ""}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="State"
                value={form.state || ""}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
            </div>
          </div> */}
        </>
      )}
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            name="email"
            minLength={8}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="pr-10"
            required
          />
        </div>
      </div>
      {type === "signup" && (
        <>
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Country"
                value={form.country || ""}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                required
              />
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Phone"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div className="relative">
              <Input
                type="state"
                placeholder="Street"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                required
              />
            </div>
          </div> */}
        </>
      )}

      <div className="space-y-2">
        <div className="relative">
          <button
            onClick={togglePasswords}
            type="button"
            className="absolute right-3 top-3 text-muted-foreground *:h-4 *:w-4"
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            minLength={8}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="pr-10"
            required
          />
        </div>
        {type === "signup" && (
          <div className="relative">
            <button
              onClick={togglePasswords}
              type="button"
              className="absolute right-3 top-3 text-muted-foreground *:h-4 *:w-4"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
            <Input
              type={showPassword ? "text" : "password"}
              name="password2"
              minLength={8}
              placeholder="Confirm Password"
              value={form.password2}
              onChange={(e) => setForm({ ...form, password2: e.target.value })}
              className="pr-10"
              required
            />
          </div>
        )}
      </div>
    </div>
  );
}
