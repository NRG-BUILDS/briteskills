// ChatLayout.jsx
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useWebSocket } from "@/hooks/useWebSocket";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { LucideMessageSquareText } from "lucide-react";
import ProfileTabs from "./tab-list";
import ProfilePage, { AppointmentCard } from ".";
import BusinessManage from "../business/manage";
import { Button } from "@/components/ui/button";

const useIsMobile = () => window.innerWidth < 768;

export default function ProfileLayout() {
  const [isMobile, setIsMobile] = useState(useIsMobile());
  const [expandUpcoming, setExpandUpcoming] = useState(false);
  const routes = [
    { path: "business/", component: <BusinessManage /> },
    { path: "/", component: isMobile ? <ProfileTabs /> : <ProfilePage /> },
    { path: "/manage", component: <ProfilePage /> },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.component} />
        ))}
      </Routes>
    );
  }

  // Desktop layout: show both side by side
  return (
    <main className="relative">
      <div className="relative flex h-full min-h-screen w-full flex-none items-stretch divide-x bg-white shadow-elevate-03 *:transition-all *:duration-500">
        <div className="sticky top-0 h-full w-1/5">
          <ProfileTabs />
        </div>
        <div
          className={`${expandUpcoming ? "w-0" : "w-full"} max-w-[55%] overflow-clip`}
        >
          <Routes>
            {routes.map((route) => (
              <Route path={route.path} element={route.component} />
            ))}
          </Routes>
        </div>
        <div className={`${expandUpcoming ? "w-4/5" : "w-1/4"}`}>
          <div className="sticky top-0 max-h-[100dvh] overflow-y-auto p-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
              <Button
                variant={"link"}
                className="px-0"
                onClick={() => setExpandUpcoming(!expandUpcoming)}
              >
                Tap to {expandUpcoming ? "collapse" : "expand"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="w-full max-w-[350px]">
                  <AppointmentCard i={i} fromMe={i > 2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
