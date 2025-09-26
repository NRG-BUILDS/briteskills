import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { OTPInputSection } from "@/components/auth/otp-input-section";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import useRequest from "@/hooks/use-request";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateToken } from "@/store/authSlice";

const VerifyOTP = () => {
  const [otp, setOtp] = useState<null | string>("");
  const [email, setEmail] = useState("");
  const [authType, setAuthType] = useState("login");
  const [otpVerified, setOtpVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { makeRequest, loading } = useRequest(
    authType === "reset-password" ? "account/verify-otp" : "account/verify-otp",
    false,
  );
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const secretFromState = location.state?.secret;
  const from = location.state?.from;

  useEffect(() => {
    // Get email from state or redirect back to login
    const emailFromState = location.state?.email || " example@gmai.com";
    const typeFromState = location.state?.type || "login";

    if (!emailFromState || !secretFromState) {
      toast({
        title: "Error",
        description: `EmailSomething went wrong. Please try again.`,
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }

    setEmail(emailFromState);
    setAuthType(typeFromState);
  }, [location.state, navigate, toast]);

  const handleOTPVerification = async () => {
    if (otp && otp.length < 4) {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 4-digit code",
        variant: "destructive",
      });
      return;
    }

    // API call
    await makeRequest(
      { secret: secretFromState, otp: Number(otp) },
      "POST",
    ).then(
      (res) => {
        if (res.status === 200) {
          // Handle different flows
          if (authType === "reset-password") {
            // For password reset flow, show password reset form
            const payload = {
              token: res.access_token,
            };

            dispatch(updateToken(payload));
            setOtpVerified(true);
            toast({
              title: "Verification successful",
            });
          } else {
            // For login/signup flow
            navigate(
              authType === "signup" ? "/auth/login" : from || "/profile",
            );

            toast({
              title: "Success",
              description: "Verification successful",
            });
          }
        }
      },
      (err) => {
        toast({
          title: "Verification Failed",
          description: err.message || "Invalid code. Please try again.",
          variant: "destructive",
        });
      },
    );
  };

  // Handle password reset completion
  const handlePasswordResetComplete = () => {
    navigate("/auth/login", {
      state: {
        passwordReset: true,
        message:
          "Password reset successful. Please login with your new password.",
      },
    });
  };

  // Update to handle OTP input properly
  const handleOtpChange = (value: string) => {
    // Only allow digits
    setOtp(value);
    console.log("OTP value:", value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      {/* Left side - Form */}
      <div className="flex items-center justify-center rounded-3xl bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="mx-auto mb-8 w-fit">
            <Link to="/">
              <Logo size="sm" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {!otpVerified ? (
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold">Verify Your Account</h1>
                  <p className="text-muted-foreground">
                    Enter the 4-digit code sent to {email}
                  </p>
                </div>

                <div className="space-y-6">
                  <OTPInputSection otp={otp} setOtp={handleOtpChange} />

                  <Button
                    onClick={handleOTPVerification}
                    className="mt-2 h-12 w-full text-base"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify Code"}
                  </Button>

                  <div className="text-center">
                    <button
                      onClick={() => navigate(`/auth/${authType}`)}
                      className="text-sm text-primary hover:underline"
                    >
                      Back to {authType === "login" ? "login" : "signup"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <NewPasswordForm
                email={email}
                otp={otp}
                onComplete={handlePasswordResetComplete}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
