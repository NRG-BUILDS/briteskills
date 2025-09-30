import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProfileTabs = () => {
  const isMobile = useIsMobile();
  const routes = [
    { path: isMobile ? "/profile/manage" : "/profile", label: "Account" },
    { path: "/profile/security", label: "Security" },
    { path: "/profile/notifications", label: "Notifications" },
    { path: "/profile/contact-us", label: "Contact us" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  return (
    <div className="bg-white px-4">
      <div className="flex items-center justify-between border-b border-border py-4">
        <div className="flex items-center gap-2">
          <div className="grid size-14 place-items-center rounded-full bg-dark text-lg font-extrabold text-white">
            <p>EO</p>
          </div>
          <h3 className="text-lg font-semibold">Emmanuel Omolaju</h3>
        </div>
        <button className="rounded-full p-1 hover:bg-muted">
          <Settings />
        </button>
      </div>
      <div className="grid gap-y-2 py-8">
        {routes.map((route, index) => (
          <button
            key={route.path}
            onClick={() => {
              navigate(route.path, { replace: true });
            }}
            className={`hover:!text-heading block rounded-md p-4 text-left hover:font-semibold ${
              location?.pathname === route.path
                ? "p- text-heading cursor-default bg-muted font-bold hover:font-bold"
                : isMobile
                  ? "text-lg font-medium shadow-elevate-01 hover:bg-primary/10"
                  : ""
            }`}
          >
            {route.label}
          </button>
        ))}
        <button
          className="block rounded-md p-4 text-left text-destructive hover:!bg-destructive/5"
          // onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileTabs;
