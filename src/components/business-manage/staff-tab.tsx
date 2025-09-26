import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BriefcaseBusiness,
  CheckCircle,
  Clock,
  Edit3,
  MoreVertical,
  Plus,
  Trash2,
  Users2,
  XCircle,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {};
export const StaffTab = ({}: Props) => {
  const [services, setServices] = useState([
    {
      name: "Damilola Ayomide",
      id: "3fa85f64-5717-462-b3fc-2c963f66afa6",
      price: "48476.28",
      is_available: true,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Million braid",
    },
    {
      name: "Hauwa Sani",
      id: "3fa85f64-5717-562-b3fc-2c963f66afa6",
      price: "48476.28",
      is_available: true,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Hair washing",
    },
    {
      name: "Ebuka Okafor",
      id: "3fa85f64-5717-4562-b3f-2c963f66afa6",
      price: "48476.28",
      is_available: false,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Manicure",
    },
    {
      name: "Ayomide Tosin",
      id: "3fa85f64-57174562-b3fc-2c963f66afa6",
      price: "48476.28",
      is_available: true,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Hair relaxing",
    },
    {
      name: "Musa Samson",
      id: "3fa85f64-57-4562-b3fc-2c963f66afa6",
      price: "48476.28",
      is_available: false,
      no_of_staffs: 7,
      business: "Bella's Beauty Salon",
      service: "Haircut (Male)",
    },
  ]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="lg:grid-cols3 grid gap-4 md:grid-cols-2">
            {services.map((service, i) => (
              <div className="rounded-lg border py-3 transition-all hover:shadow-elevate-03">
                <div className="divide-y font-medium *:p-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-lg">
                        <div className="size-12 overflow-clip rounded-full">
                          <Image src="" />
                        </div>
                        <div>
                          <p>{service.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {service.service}
                          </p>
                        </div>
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
                        <button onClick={() => handleMakeChangesClick(service)}>
                          <Edit3 className="size-5" />
                          <span>Make changes</span>
                        </button>
                        <Link
                          to={"#"}
                          className="text-destructive hover:!bg-destructive/10"
                        >
                          <Trash2 className="size-5" />
                          <span>Delete</span>
                        </Link>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="space-y-1 text-sm">
                      <div className="flex gap-1">
                        <div
                          className={`flex w-fit items-center justify-center gap-1 truncate rounded-full border p-1.5 text-xs leading-none ${service.is_available ? "border-accent/50 bg-accent/5 text-accent" : "border-secondary/50 bg-secondary/5 text-secondary"}`}
                        >
                          {service.is_available ? (
                            <CheckCircle size={12} />
                          ) : (
                            <XCircle size={12} />
                          )}
                          <span>
                            {service.is_available ? "Available" : "Occupied"}
                          </span>
                        </div>

                        <div className="flex w-fit items-center justify-center gap-1 truncate rounded-full border border-accent/50 bg-accent/5 p-1.5 text-xs leading-none text-accent">
                          <Users2 size={12} />
                          <span>{service.no_of_staffs} services assigned</span>
                        </div>
                      </div>

                      <div className="grid w-full grid-cols-2 gap-4 gap-y-3 py-2 text-muted-foreground">
                        <p className="font-medium">
                          Last gig:{" "}
                          <span className="font-normal">09:22AM Today </span>
                        </p>
                        <p className="font-medium">
                          Created:{" "}
                          <span className="font-normal">22 Aug, 2025</span>
                        </p>
                        <p className="font-medium">
                          Services:{" "}
                          <span className="font-normal">
                            Bowling, Barbing, Manicure, Makecup
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
