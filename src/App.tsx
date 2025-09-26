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
import ProfileLayout from "./pages/profile/layout";
import ListingForm from "./pages/business/create-a-business/listing-form";
import BusinessManage from "./pages/business/manage";
import SetAppointment from "./pages/service/set-appointment";

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
          <Route path="/service/:id/book" element={<SetAppointment />} />
          <Route path="/profile/*" element={<ProfileLayout />} />
        </Route>
        <Route path="/business/create" element={<ListingForm />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );
};

export default App;
