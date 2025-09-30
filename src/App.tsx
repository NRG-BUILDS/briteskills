import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import VerifyOTP from "./pages/auth/verify-otp";
import Index from "./pages/Index";
import ExplorePage from "./pages/explore";
import ServicePage from "./pages/service";
import MainLayout from "./components/layout/main-layout";
import ProfilePage from "./pages/profile";

import SetAppointment from "./pages/service/send-message";
import ProfileLayout from "./pages/profile/layout";
import ArtisanDashboard from "./pages/artisan/dashboard";
import SkillsDashboard from "./pages/artisan/skills";

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner richColors />
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/ref" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verify-otp" element={<VerifyOTP />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/service/:id" element={<ServicePage />} />

          <Route path="/profile/*" element={<ProfileLayout />} />

          <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
          <Route path="/artisan/skills" element={<SkillsDashboard />} />
        </Route>

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );
};

export default App;
