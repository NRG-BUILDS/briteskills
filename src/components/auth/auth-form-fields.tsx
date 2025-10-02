import { Input } from "@/components/ui/input";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

interface AuthFormFieldsProps {
  type: "login" | "signup";
  confirmPassword?: string;
  user: "client" | "artisan" | "";
  form: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
    street_address?: string;
    state?: string;
    town?: string;
    years_of_experience?: string;
    spoken_languages?: string;
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

  const isArtisan = user === "artisan";
  const isClient = user === "" || user === "client";

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

      {type === "signup" && isArtisan && (
        <>
          <div className="relative">
            <Input
              type="text"
              placeholder="Street Address"
              value={form.street_address || ""}
              onChange={(e) =>
                setForm({ ...form, street_address: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <select
                value={form.state || ""}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select State</option>
                {NIGERIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Town"
                value={form.town || ""}
                onChange={(e) => setForm({ ...form, town: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="number"
                placeholder="Years of Experience"
                value={form.years_of_experience || ""}
                onChange={(e) =>
                  setForm({ ...form, years_of_experience: e.target.value })
                }
                min="0"
                required
              />
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Spoken Languages"
                value={form.spoken_languages || ""}
                onChange={(e) =>
                  setForm({ ...form, spoken_languages: e.target.value })
                }
                required
              />
            </div>
          </div>
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
