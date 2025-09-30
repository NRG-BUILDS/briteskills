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
import ProfilePage from ".";
import { Button } from "@/components/ui/button";

const useIsMobile = () => window.innerWidth < 768;

export default function ProfileLayout() {
  const [isMobile, setIsMobile] = useState(useIsMobile());
  const routes = [
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
    <main className="relative bg-[#f5f5f5] p-6">
      <div className="relative mx-auto flex h-full min-h-screen max-w-7xl flex-none items-start gap-10 *:transition-all *:duration-500">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="relative h-full lg:col-span-3">
            <div className="sticky top-16">
              <ProfileTabs />
            </div>
          </div>
          <div className={`w-full overflow-clip lg:col-span-9`}>
            <Routes>
              {routes.map((route) => (
                <Route path={route.path} element={route.component} />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </main>
  );
}
