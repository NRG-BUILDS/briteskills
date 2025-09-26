import { useState, useEffect, JSXElementConstructor, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  House,
  LogIn,
  LogOut,
  LucideLogIn,
  LucideUser,
  LucideUser2,
  Megaphone,
  Menu,
  MessageSquareText,
  Phone,
  User2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Avatar } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const boundary = isMobile ? 20 : 50;
      setIsScrolled(window.scrollY > boundary);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks: NavItem[] = [
    { label: "Home", href: "/", icon: <House /> },
    {
      label: "Sell on Groomica",
      href: "/business/create",
      icon: <Megaphone />,
    },
    isAuthenticated &&
      user && {
        label: "Messages",
        href: "/chats",
        icon: <MessageSquareText />,
      },
    { label: "Contact", href: "/contact", icon: <Phone /> },
    isAuthenticated
      ? { label: "Profile", href: "/profile", icon: <User2 /> }
      : { label: "Login", href: "/auth/login", icon: <LogIn /> },
    ,
  ].filter(Boolean);

  return (
    <header
      className={cn(
        "sticky left-0 right-0 top-0 z-50 px-2 transition-all duration-300 ease-in-out md:px-12",
        isScrolled
          ? "glass-light dark:glass py-2"
          : "border-b bg-transparent py-3",
      )}
    >
      {/* Desktop Navigation */}
      <div className="mx-auto md:max-w-screen-2xl">
        <div className="group flex items-center justify-between gap-4">
          <Link to="/" className="z-50 hidden w-1/4 md:block">
            <Logo size="xl" />
          </Link>

          <div className="hidden w-1/4 items-center justify-end space-x-6 md:flex">
            <Link
              to={"/business/create"}
              className="text-sm font-semibold hover:underline"
            >
              Sell on Groomica
            </Link>
            <Popover>
              <PopoverTrigger className="flex items-center gap-2 rounded-full bg-muted p-1 shadow-inner">
                <Button
                  variant="outline"
                  size="icon"
                  className="flex size-8 items-center justify-center rounded-full bg-white leading-[0] shadow-lg"
                >
                  {isAuthenticated ? (
                    <span>{user?.first_name?.slice(0, 1).toUpperCase()}</span>
                  ) : (
                    <LucideUser />
                  )}
                </Button>
                <div className="w-8 text-center">
                  <Menu className="text-muted-foreground" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-fit p-0 *:flex *:items-center *:gap-2 *:p-3 hover:*:bg-neutral-100"
              >
                {isAuthenticated && (
                  <div className="flex items-center border-b">
                    <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-black">
                      <span className="font-semibold text-white">
                        {user?.first_name?.slice(0, 1)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h1 className="font-semibold capitalize text-gray-900">
                        {user?.first_name}
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                )}
                {navLinks.map((link) => (
                  <Link to={link.href}>
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </PopoverContent>
            </Popover>
          </div>
          {/* Desktop Navigation End */}

          {/* Mobile Menu Toggle */}
          <div className="w-fit md:hidden md:w-auto">
            <Link
              to={"/profile"}
              className="z-50 block p-2"
              aria-label="Proile popover trigger"
            >
              <User2 className="h-6 w-6" />
            </Link>
          </div>

          <div className="z-50 w-fit md:hidden md:w-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col bg-background px-6 pt-20 md:hidden"
          >
            <nav className="flex flex-col space-y-6 pt-8">
              <div className="flex flex-col space-y-4 pt-4">
                {isAuthenticated && (
                  <div className="flex items-center border-b py-2">
                    <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-black">
                      <span className="font-semibold text-white">
                        {user?.first_name?.slice(0, 1)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h1 className="font-semibold capitalize text-gray-900">
                        {user?.first_name}
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                )}
                {navLinks.map((link) => (
                  <Link
                    to={link.href}
                    className="block py-2 text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <Link to="/auth/login">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-full rounded-full"
                    >
                      <span>Log in</span> <LucideUser />
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
