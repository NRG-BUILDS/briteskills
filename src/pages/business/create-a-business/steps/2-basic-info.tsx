import { Input } from "@/components/ui/input";
import { Address, BusinessCreateForm } from "../listing-form";
import { Categories } from "@/hooks/useCategories";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import useRequest from "@/hooks/use-request";
import { toast } from "sonner";

type Props = {
  form: BusinessCreateForm;
  setForm: (form: BusinessCreateForm) => void;
  addresses: Address[];
  setAddresses: (addr: any[]) => void;
  categories: Categories[];
};

export const BasicInfoStep = ({
  form,
  categories,
  addresses,
  setAddresses,
  setForm,
}: Props) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { makeRequest, loading } = useRequest("business/address");
  const [newAddressForm, setNewAddressForm] = useState({
    street: "",
    street2: "",
    city: "",
    state: "",
    zipcode: null,
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const handleCreateNewAddress = () => {
    makeRequest(newAddressForm, "POST")
      .then((res) => {
        setAddresses((prev) => [...prev, res]);
        setForm({ ...form, address: res.id });
        setShowAddressModal(false);
        setShowNewAddressForm(false);
        setNewAddressForm({
          street: "",
          street2: "",
          city: "",
          state: "",
          zipcode: null,
        });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleAddressInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewAddressForm({ ...newAddressForm, [name]: value });
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLocaleLowerCase().includes(form.category.toLowerCase()),
  );

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
            Let's know some basic info about your business
          </h1>
          <p className="text-muted-foreground">
            Provide the essential details about your business to get started.
          </p>
        </div>
      </div>

      <div className="grid divide-y overflow-clip rounded-xl border">
        <div className="bg-muted p-3 text-sm font-medium text-muted-foreground">
          Basic Information
        </div>
        <div className="grid divide-x divide-y *:border-0 md:grid-cols-2 md:divide-y-0">
          <div className="*:border-0">
            <Label className="p-0 pl-3 text-xs font-normal text-muted-foreground">
              Business name
            </Label>
            <Input
              name="name"
              type="text"
              value={form.name}
              onChange={handleInput}
              className="!py-0 focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>
          <div className="*:border-0">
            <Label className="p-0 pl-3 text-xs font-normal text-muted-foreground">
              Business category
            </Label>
            <Input
              name="category"
              value={
                categories.find((cat) => cat.id === form.category)?.name ||
                "Choose a category"
              }
              onClick={() => setShowCategoryModal(true)}
              onFocus={() => setShowCategoryModal(true)}
              contentEditable={false}
              className="!py-0 focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-pointer"
            />
          </div>
          <div className="!border-t *:border-0 md:col-span-full">
            <Label className="p-0 pl-3 text-xs font-normal text-muted-foreground">
              Description
            </Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleInput}
              className="!py-0 focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>
        </div>
      </div>
      <div className="grid divide-y overflow-clip rounded-xl border">
        <div className="bg-muted p-3 text-sm font-medium text-muted-foreground">
          Contact Information
        </div>
        <div className="grid divide-x divide-y *:border-0 md:grid-cols-2 md:divide-y-0">
          <div className="*:border-0">
            <Label className="p-0 pl-3 text-xs font-normal text-muted-foreground">
              Business Address
            </Label>
            <Input
              name="address"
              value={
                addresses.find((addr) => addr.id === form.address)?.street ||
                "Choose an address"
              }
              onClick={() => setShowAddressModal(true)}
              onFocus={() => setShowAddressModal(true)}
              contentEditable={false}
              className="!py-0 focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-pointer"
            />
          </div>

          <div className="*:border-0">
            <Label className="p-0 pl-3 text-xs font-normal text-muted-foreground">
              Business email
            </Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleInput}
              className="!py-0 focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>
          <div className="*:border-0">
            <Label className="p-0 pl-3 text-xs font-normal text-muted-foreground">
              Phone Number
            </Label>
            <Input
              name="phone_number"
              type="number"
              value={form.phone_number}
              onChange={handleInput}
              onBlur={() =>
                setForm({ ...form, phone_number: `+234${form.phone_number}` })
              }
              className="!py-0 focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>
        </div>
      </div>

      <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
        <DialogContent>
          <DialogHeader>What is your business?</DialogHeader>
          <DialogDescription>
            Type a business category or choose from the list of categories below
          </DialogDescription>
          <div className="space-y-5 py-2">
            <div className="flex gap-2">
              <Input
                className="w-full"
                name="category"
                placeholder="Enter a business category"
                value={categories.find((cat) => cat.id === form.category)?.name}
                onChange={handleInput}
              />
              <DialogClose asChild>
                <Button>Confirm</Button>
              </DialogClose>
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredCategories.map((cat) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setForm({ ...form, category: cat.id })}
                  className={`${cat.id === form.category ? "bg-primary text-white hover:bg-primary" : ""}`}
                >
                  {cat.name} {cat.id === form.category ? <Check /> : null}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showAddressModal} onOpenChange={setShowAddressModal}>
        <DialogContent>
          <DialogHeader>Add Business Address</DialogHeader>
          <DialogDescription>
            Select from one of your saved addresses or create a new one
          </DialogDescription>
          <div className="space-y-5 py-2">
            <div className="divide-y overflow-clip rounded-lg border">
              {addresses.map((addr) => (
                <div
                  onClick={() => {
                    setShowAddressModal(false);
                    setForm({ ...form, address: addr.id });
                  }}
                  className={`flex items-center justify-between px-2 py-4 ${
                    addr.id === form.address ? "cursor-pointer bg-muted" : ""
                  }`}
                >
                  <div>
                    <h2 className="font-semibold">{addr.street}</h2>
                    <p className="text-sm text-muted-foreground">
                      {addr.street}, {addr.city}, {addr.state}
                    </p>
                  </div>
                  {addr.id === form.address ? <Check /> : null}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="h-[1px] w-full bg-border"></div>
              <div className="whitespace-nowrap">or add a new address</div>
              <div className="h-[1px] w-full bg-border"></div>
            </div>

            {!showNewAddressForm ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowNewAddressForm(true)}
              >
                Add New Address
              </Button>
            ) : (
              <div className="space-y-3">
                <Input
                  className="w-full"
                  name="street"
                  placeholder="Street Address"
                  value={newAddressForm.street || ""}
                  onChange={handleAddressInput}
                />
                <Input
                  className="w-full"
                  name="street2"
                  placeholder="Street Address 2 (Optional)"
                  value={newAddressForm.street2 || ""}
                  onChange={handleAddressInput}
                />
                <div className="flex gap-2">
                  <Input
                    className="flex-1"
                    name="city"
                    placeholder="City"
                    value={newAddressForm.city || ""}
                    onChange={handleAddressInput}
                  />
                  <Input
                    className="w-20"
                    name="state"
                    placeholder="State"
                    value={newAddressForm.state || ""}
                    onChange={handleAddressInput}
                  />
                  <Input
                    className="w-24"
                    name="zipcode"
                    placeholder="Zipcode"
                    type="number"
                    value={newAddressForm.zipcode || ""}
                    onChange={handleAddressInput}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    disabled={loading}
                    onClick={() => setShowNewAddressForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={loading}
                    onClick={handleCreateNewAddress}
                    className="flex-1"
                  >
                    "Save Address"
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
