import { ContactTab } from "@/components/business-manage/contact-tab";
import { ServicesTab } from "@/components/business-manage/services-tab";
import { StaffTab } from "@/components/business-manage/staff-tab";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@/components/ui/image";

import { BriefcaseBusiness, Phone, User2 } from "lucide-react";
import { useState } from "react";

const BusinessManage = () => {
  const [tab, setTab] = useState("contact");
  const [data, setData] = useState({
    name: "Bella's Beauty Salon",
    ratings_count: 128,
    ratings_average: 4.6,
    description:
      "A modern beauty salon offering hair styling, skincare, and spa treatments in a relaxing environment.",
    email: "contact@bellabeauty.africa",
    phone_number: "+2348012345678",
    owner: "a2b5e4f1-89c2-45d6-b7f8-1fbb13de98f0",
    address: ["7, Jehovah Witness Rd, Ota, Ogun State"],
    open_time: "09:00:00.000Z",
    days_open: "Monday-Saturday",
    close_time: "19:00:00.000Z",
    always_open: false,
    category: "Beauty & Makeup",
  });
  const handleAddressUpdate = (form) => {
    setData({
      ...data,
      address: [...data.address, `${form.street}, ${form.city} ${form.state}`],
    });
  };
  return (
    <div className="bg-muted/20 p-4">
      <div className="grid gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="mx-auto size-24 overflow-clip rounded-full bg-gray-200">
              <Image src="" />
            </div>
            <div className="flex flex-col items-center py-4 text-center">
              <h1 className="text-xl font-bold">{data.name}</h1>
              <span className="text-muted-foreground">{data.category}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center *:flex *:flex-col *:items-center *:justify-center *:gap-4 *:rounded-sm *:border-2 *:p-4">
              <button onClick={() => setTab("contact")}>
                <Phone className="mx-auto text-primary" />
                <p className="text-xs font-medium text-muted-foreground">
                  Contact Info
                </p>
              </button>
              <button onClick={() => setTab("services")}>
                <BriefcaseBusiness className="mx-auto text-primary" />
                <p className="text-xs font-medium text-muted-foreground">
                  Services
                </p>
              </button>
              <button onClick={() => setTab("staff")}>
                <User2 className="mx-auto text-primary" />
                <p className="text-xs font-medium text-muted-foreground">
                  Staff
                </p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* ====BUSINESS INFO===== */}
        {tab === "contact" && (
          <ContactTab data={data} handleAddressUpdate={handleAddressUpdate} />
        )}
        {tab === "services" && <ServicesTab />}
        {tab === "staff" && <StaffTab />}
      </div>
    </div>
  );
};

export default BusinessManage;
