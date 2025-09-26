import { Clock, Info, Mail, MapPin, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { to12Hour } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  data: {
    name: string;
    ratings_count: number;
    ratings_average: number;
    description: string;
    email: string;
    phone_number: string;
    owner: string;
    address: string[];
    open_time: string;
    days_open: string;
    close_time: string;
    always_open: boolean;
    category: string;
  };
  handleAddressUpdate: (form: any) => void;
};

const states = [
  "abia",
  "abuja",
  "adamawa",
  "akwa-ibom",
  "anambra",
  "bauchi",
  "bayelsa",
  "benue",
  "borno",
  "cross-river",
  "delta",
  "ebonyi",
  "edo",
  "ekiti",
  "enugu",
  "gombe",
  "imo",
  "jigawa",
  "kaduna",
  "kano",
  "katsina",
  "kebbi",
  "kogi",
  "kwara",
  "lagos",
  "nasarawa",
  "niger",
  "ogun",
  "ondo",
  "osun",
  "oyo",
  "plateau",
  "rivers",
  "sokoto",
  "taraba",
  "yobe",
  "zamfara",
];
export const ContactTab = ({ data, handleAddressUpdate }: Props) => {
  const [showAddressModal, setShowAddressModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Business Info</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="*:bg-gray- gap-4 divide-y *:flex *:items-start *:gap-2 *:rounded-sm *:py-3">
            <div>
              <div className="text-muted-foreground">
                <Mail className="mx-auto mt-1 size-4" />
              </div>
              <p className="">{data.email}</p>
            </div>
            <div>
              <div className="text-muted-foreground">
                <MapPin className="mx-auto mt-1 size-4" />
              </div>
              <div>
                {data.address.map((addr) => (
                  <p className="">{addr}</p>
                ))}
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="flex items-center gap-1 py-2 text-sm text-primary"
                >
                  <span>Add address</span>

                  <Plus size={18} />
                </button>
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">
                <Info className="mx-auto mt-1 size-4" />
              </div>
              <p className="">{data.description}</p>
            </div>
            <div>
              <div className="text-muted-foreground">
                <Clock className="mx-auto mt-1 size-4" />
              </div>
              <p className="">
                {data.always_open ? (
                  <span className="text-primary">Always Open</span>
                ) : (
                  <>
                    <span className="text-primary">
                      {to12Hour(data.open_time)}
                    </span>{" "}
                    to{" "}
                    <span className="text-primary">
                      {to12Hour(data.close_time)}
                    </span>{" "}
                    - {data.days_open}
                  </>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="">
          <div className="flex items-center justify-between py-4">
            <h1 className="font-bold">Photos</h1>
            <button className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Add photos</span>

              <Plus size={18} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center *:aspect-square *:rounded-sm *:border-2 *:bg-gray-100 *:p-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </CardContent>
      </Card>
      <AddAddressModal
        open={showAddressModal}
        onOpenChange={setShowAddressModal}
        handleAddressUpdate={handleAddressUpdate}
      />
    </>
  );
};

const AddAddressModal = ({ open, onOpenChange, handleAddressUpdate }) => {
  const [form, setForm] = useState({
    city: "",
    state: "",
    street: "",
    street2: "",
    zipcode: "",
  });
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Business Address</DialogTitle>
          <DialogDescription>
            You can add multiple addresses to your business. Address will be
            displayed to users
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="city">City</Label>
              <Input
                className="w-full"
                name="city"
                placeholder=""
                value={form.city}
                onChange={handleInput}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="city">State</Label>
              <Select
                name="city"
                value={form.state}
                onValueChange={(val) => setForm({ ...form, state: val })}
              >
                <SelectTrigger>{form.state || "State"}</SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem value={state}>{state.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="city">Street 1</Label>
              <Input
                className="w-full"
                name="street"
                placeholder="Enter street address 1"
                value={form.street}
                onChange={handleInput}
              />
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="city">Street 2 (optional)</Label>
              <Input
                className="w-full"
                name="street2"
                placeholder="Enter street address 2"
                value={form.street2}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button asChild variant="outline">
            <DialogClose>Cancel</DialogClose>
          </Button>
          <Button
            onClick={() => {
              handleAddressUpdate(form);
              onOpenChange(false);
            }}
          >
            Save Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
