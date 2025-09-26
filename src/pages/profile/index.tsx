import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  MapPin,
  Phone,
  Calendar,
  Edit3,
  Building2,
  Save,
  X,
  Clock,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  // Sample data based on the provided structure
  const [profileData, setProfileData] = useState({
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dob: "2025-08-08",
    phone_number: "555-0123",
    address: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      street: "123 Main Street",
      street2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipcode: 10001,
    },
  });

  const [editData, setEditData] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAddress = (address) => {
    const parts = [
      address.street,
      address.street2,
      `${address.city}, ${address.state} ${address.zipcode}`,
    ].filter(Boolean);
    return parts.join(", ");
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <Edit3 className="h-7 w-7" />
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={editData.phone_number}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          phone_number: e.target.value,
                        })
                      }
                      className="mt-1 focus:border-primary focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="dob"
                      className="text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={editData.dob}
                      onChange={(e) =>
                        setEditData({ ...editData, dob: e.target.value })
                      }
                      className="mt-1 focus:border-primary focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="street"
                      className="text-sm font-medium text-gray-700"
                    >
                      Street Address
                    </Label>
                    <Input
                      id="street"
                      value={editData.address.street}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          address: {
                            ...editData.address,
                            street: e.target.value,
                          },
                        })
                      }
                      className="mt-1 focus:border-primary focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="street2"
                      className="text-sm font-medium text-gray-700"
                    >
                      Apartment/Suite
                    </Label>
                    <Input
                      id="street2"
                      value={editData.address.street2}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          address: {
                            ...editData.address,
                            street2: e.target.value,
                          },
                        })
                      }
                      className="mt-1 focus:border-primary focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-700"
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    value={editData.address.city}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        address: { ...editData.address, city: e.target.value },
                      })
                    }
                    className="mt-1 focus:border-primary focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="state"
                    className="text-sm font-medium text-gray-700"
                  >
                    State
                  </Label>
                  <Input
                    id="state"
                    value={editData.address.state}
                    maxLength={2}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        address: {
                          ...editData.address,
                          state: e.target.value.toUpperCase(),
                        },
                      })
                    }
                    className="mt-1 focus:border-primary focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="zipcode"
                    className="text-sm font-medium text-gray-700"
                  >
                    ZIP Code
                  </Label>
                  <Input
                    id="zipcode"
                    type="number"
                    value={editData.address.zipcode}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        address: {
                          ...editData.address,
                          zipcode: parseInt(e.target.value),
                        },
                      })
                    }
                    className="mt-1 focus:border-primary focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex gap-3 border-t pt-6">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-primary py-2.5 font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 py-2.5 font-medium transition-all duration-200"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-2">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-3 text-3xl font-bold">
              <div className="rounded-full bg-primary-foreground/20 p-3">
                <User className="h-8 w-8" />
              </div>
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="rounded-xl border bg-gray-100 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <User className="h-5 w-5 text-primary" />
                    Personal Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium text-gray-800">
                          {profileData.phone_number}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium text-gray-800">
                          {formatDate(profileData.dob)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-6">
                <div className="rounded-xl border bg-gray-100 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <MapPin className="h-5 w-5 text-primary" />
                    Address
                  </h3>

                  <div className="space-y-2">
                    <p className="font-medium text-gray-800">
                      {profileData.address.street}
                    </p>
                    {profileData.address.street2 && (
                      <p className="text-gray-600">
                        {profileData.address.street2}
                      </p>
                    )}
                    <p className="text-gray-600">
                      {profileData.address.city}, {profileData.address.state}{" "}
                      {profileData.address.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row">
              <Button
                onClick={handleEdit}
                className="flex-1 bg-primary py-3 text-lg font-medium text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90"
              >
                <Edit3 className="mr-2 h-5 w-5" />
                Edit Profile
              </Button>

              <Button
                onClick={() => console.log("Navigate to business management")}
                className="flex-1 bg-secondary py-3 text-lg font-medium text-secondary-foreground shadow-lg transition-all duration-200 hover:bg-secondary/90"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Manage Business
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:grid-cols3 grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <AppointmentCard i={i} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;

type Props = {
  i: number;
  fromMe?: boolean;
};
export const AppointmentCard = ({ i, fromMe = true }: Props) => {
  return (
    <div className="shadow-eleate-03 rounded-lg border py-3">
      <div
        className={`-ml-0.5 divide-y border-l-4 font-medium *:p-3 ${fromMe ? "border-primary" : "border-secondary"}`}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <h4 className="text-xs text-muted-foreground">
              {fromMe
                ? "You've set an appointment"
                : "Someone booked an appointment"}
            </h4>
            <div className="flex items-center gap-1 text-sm">
              <Clock size={14} />
              <p>Wed Aug 10 • 8:00 - 8:30AM</p>
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
              <Link to={"/service/0/book"}>
                <Edit3 className="size-5" />
                <span>Make changes</span>
              </Link>
              <Link
                to={"#"}
                className="text-destructive hover:!bg-destructive/10"
              >
                <Trash2 className="size-5" />
                <span>Cancel</span>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-10 overflow-clip rounded-full">
            <Image src="" />
          </div>
          <div className="grid text-sm">
            <p>Bon Iver Auto Repair Shop</p>
            <span className="text-muted-foreground">
              {i % 3 ? "First available staff" : "Chude Uzokafor"}
            </span>
          </div>
        </div>
        <div
          className={`m-2 mb-0 rounded-lg border !border-b ${fromMe ? "bg-muted text-muted-foreground" : "border-secondary bg-secondary/5 text-secondary *:*:border-secondary/40"}`}
        >
          <h4 className="text-lg font-medium">Details</h4>
          {fromMe ? (
            <>
              <div className="divide-y px-1 text-sm *:py-3">
                <div>
                  <h5>Address</h5>
                  <p className="">Siegfriedstrasse 30 12051, Berlin, DE</p>
                </div>
                <div>
                  <h5>Phone</h5>
                  <a href="tel:+2340979711780" className="">
                    +2340979711780
                  </a>
                </div>
                <div>
                  <h5>Email</h5>
                  <a href="mailto:ajanlekok@salon.de" className="">
                    ajanlekok@salon.de
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="divide-y px-1 text-sm *:py-3">
              <div>
                <h5>Name</h5>
                <p className="">Emmanuel Ozimar</p>
              </div>
              <div>
                <h5>Phone</h5>
                <a href="tel:+2340979711780" className="">
                  +2340973331780
                </a>
              </div>
              <div>
                <h5>Service</h5>
                <a href="mailto:ajanlekok@salon.de" className="">
                  Manicure (12:00PM - 12:55PM)
                </a>
              </div>
              <div>
                <h5>Address</h5>
                <a href="mailto:ajanlekok@salon.de" className="">
                  Address 1 (Siegfriedstrasse 30 12051, Berlin, DE)
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
