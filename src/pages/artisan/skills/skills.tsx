import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function SkillsDashboard() {
  const [activeFilter, setActiveFilter] = useState("active-0");

  const services = [
    {
      id: 1,
      category: "AC Repair",
      categoryColor: "text-primary",
      description:
        "We provide air conditioning repair, installation and spare part selling.",
      images: [
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=200&h=200&fit=crop",
      ],
    },
    {
      id: 2,
      category: "Panel Beating",
      categoryColor: "text-primary",
      description:
        "I will buff and reharden your car exterior. Panel beating, polishing, repainting",
      images: [
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&h=200&fit=crop",
      ],
    },
    {
      id: 3,
      category: "Battery Charging",
      categoryColor: "text-primary",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi doloribus repudiandae corrupti illo, nesciunt sed! Est ea culpa totam numquam.",
      images: [
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?w=200&h=200&fit=crop",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="rounded border border-border/50 bg-white p-6">
              {/* Profile Section */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-xl font-semibold text-white">
                  E
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    Emmanuel Omolaju
                  </h3>
                </div>
                <button className="rounded-full p-2 hover:bg-gray-100">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Stats */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Inbox response rate
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-full bg-emerald-500"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      100%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Inbox response time
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    N/A
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Order response rate
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-full bg-emerald-500"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      100%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Delivered on time
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-full bg-emerald-500"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      100%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Order completion
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-full bg-emerald-500"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      100%
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Earned in March</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₦0
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Inbox</span>
                  <a href="#" className="text-link text-sm hover:text-blue-700">
                    View All
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {/* Active Orders Header */}
            <div className="mb-6 rounded border border-border/50 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-900">
                    Active orders
                  </span>
                  <span className="ml-2 text-gray-500">- 0 (₦0)</span>
                </div>
                <Select value={activeFilter} onValueChange={setActiveFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active-0">Active orders (0)</SelectItem>
                    <SelectItem value="completed">Completed orders</SelectItem>
                    <SelectItem value="cancelled">Cancelled orders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Your Services Section */}
            <div className="mb-6 rounded border border-border/50 bg-white p-6">
              <div className="mb-6 flex w-full items-center justify-between gap-10 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Your Services
                  </h2>
                  <p className="mt-1 max-w-xl text-sm text-gray-600">
                    Below are services you have listed on BriteSkills. You can
                    edit or create more services in your category
                  </p>
                </div>
                <Link to={"/artisan/skills/new"}>
                  <Button size="sm" className="">
                    <Plus /> Add Service
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    {/* Service Images */}
                    <div className="mb-4 flex gap-2">
                      {service.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="h-20 w-20 overflow-hidden rounded-lg bg-gray-200"
                          style={{
                            backgroundImage: `url(${img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      ))}
                    </div>

                    {/* Service Info */}
                    <div className="mb-4">
                      <div className="text-heading mb-2 font-semibold">
                        <span className="">In </span>
                        <span className={`${service.categoryColor}`}>
                          {service.category}
                        </span>
                      </div>
                      <p className="line-clamp-3 min-h-16 text-sm text-gray-700">
                        {service.description}
                      </p>
                    </div>

                    {/* Edit Button */}
                    <Button
                      variant="outline"
                      className="border-link text-link hover:bg-link/5 w-full"
                    >
                      Edit Service
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Banner Section */}
            <div className="relative h-48 overflow-hidden rounded-lg bg-gradient-to-r from-gray-800 to-gray-600">
              <div className="absolute inset-0 flex items-center justify-between px-8">
                <div className="text-white">
                  <h3 className="mb-2 text-2xl font-bold">
                    Adobe Illustrator Pro tricks
                  </h3>
                  <p className="text-gray-200">
                    Take your design and illustration skills to the next level.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=300&h=200&fit=crop"
                    alt="Instructor"
                    className="h-48 w-64 rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-8 flex gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <div className="h-2 w-2 rounded-full bg-white/50"></div>
                <div className="h-2 w-2 rounded-full bg-white/50"></div>
                <div className="h-2 w-2 rounded-full bg-white/50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
