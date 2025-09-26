import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProfileTabs = () => {
  const isMobile = useIsMobile();
  const routes = [
    { path: isMobile ? "/profile/manage" : "/profile", label: "Profile" },
    { path: "/profile/business", label: "Business" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Profile Tabs</h2>
      <p className="text-sm text-muted-foreground">
        Here you can manage your profile settings and preferences.
      </p>
      {/* Add more content or components as needed */}

      <div className="my-8 grid space-y-4 *:rounded-xl *:p-6 *:text-left *:transition-all hover:*:bg-primary/20 lg:space-y-0">
        {routes.map((route, index) => (
          <button
            key={route.path}
            onClick={() => {
              navigate(route.path, { replace: true });
            }}
            className={
              location?.pathname === route.path
                ? "bg-primary text-2xl font-bold text-primary-foreground shadow-elevate-01 hover:!bg-primary"
                : isMobile
                  ? "text-lg font-medium shadow-elevate-01 hover:bg-primary/10"
                  : ""
            }
          >
            {route.label}
          </button>
        ))}
        <button
          className="text-left text-destructive hover:!bg-destructive/20"
          // onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileTabs;
