import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useRequest from "@/hooks/use-request";
import { toast } from "sonner";
import useCategories from "@/hooks/useCategories";
import useAmenities from "@/hooks/useAmmenities";

import { Logo } from "@/components/ui/logo";
import useProfile from "@/hooks/use-profile";
import Loading from "@/components/ui/loader";
import { BasicInfoStep } from "./steps/2-basic-info";
import { BusinessHoursStep } from "./steps/3-business-time";
import { BusinessSummaryStep } from "./steps/9-summary";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { LucideBriefcaseBusiness } from "lucide-react";
import { removeFalsyKeys } from "@/lib/utils";

export type BusinessCreateForm = {
  owner: string;
  name: string;
  description: string;
  address: string;
  email: string;
  phone_number: string;
  open_time: string;
  days_open: string;
  close_time: string;
  always_open: boolean;
  category: string;
  ratings_average: 0;
  ratings_count: 0;
};
export interface Address {
  id: string;
  street: string;
  street2: string;
  city: string;
  state: string;
  zipcode: number;
}

const ListingForm = () => {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BusinessCreateForm>({
    name: "",
    description: "",
    address: "",
    email: "",
    phone_number: "",
    owner: "a69ad64f-4458-4bce-bd56-04a03d8a8749", // "TO-DO: use dynamic value when implemented in backend"
    open_time: "",
    days_open: "",
    close_time: "",
    always_open: false,
    category: "",
    ratings_average: 0,
    ratings_count: 0,
  });
  const { id } = useParams();
  const [addresses, setAddresses] = useState<Address[]>([]);

  const { makeRequest, loading } = useRequest("business/create");
  const { makeRequest: getExistingProperty, loading: existingPropertyLoad } =
    useRequest(`properties/${id}/`);
  const { makeRequest: uploadPhotos, loading: uploadLoading } = useRequest(""); //api url will be inserted when property has been created and id is fetched
  const { makeRequest: requestAddresses, loading: addressLoading } =
    useRequest("business/address"); //api url will be inserted when property has been created and id is fetched
  const { categories, catError, catLoading } = useCategories();

  // const { profileData, profileLoad, profileError } = useProfile(); // This will fetch the current user's profile and set the owner ID in formData

  // useEffect(() => {
  //   if (profileData) {
  //     console.log("Profile Data:", profileData);
  //     setFormData((prev) => ({
  //       ...prev,
  //       owner: profileData.id, // Set the owner ID from the profile data
  //     }));
  //   }
  // }, [profileData]);

  useEffect(() => {
    requestAddresses().then((res) => setAddresses(res.result));
  }, []);

  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  const steps = [
    {
      component: (
        <BasicInfoStep
          form={formData}
          setForm={setFormData}
          categories={categories}
          addresses={addresses}
          setAddresses={setAddresses}
        />
      ),
    },
    {
      component: <BusinessHoursStep form={formData} setForm={setFormData} />,
    },
    {
      component: (
        <BusinessSummaryStep form={formData} onSubmit={() => handleSubmit()} />
      ),
    },
  ];

  const handleSubmit = () => {
    // Submit and redirect to dashboard
    const cleaned = removeFalsyKeys(formData);
    makeRequest(
      {
        ...cleaned,
        ratings_average: 0,
        ratings_count: 0,
      },
      "POST",
    )
      .then((res) => {
        if (res.status === 201) {
          // Handle successful response
          // handleImageUpload(res.id);
          setIsSubmitted(true);
        } else {
          // Handle error response
          console.error("Error during listing creation", res.data);
        }
      })
      .catch((err) => {
        console.error("Error during listing creation", err);
        toast.error(err.message);
      });
  };

  if (catLoading || addressLoading) {
    // Show loading screen while fetching data
    return (
      <Loading
        loading={catLoading}
        error={catError}
        loadingText="Hang tight! We're setting things up for you..."
      />
    );
  }

  if (categories && !addressLoading) {
    return (
      <div className="relative">
        <div className="z-10 w-full bg-white/40 backdrop-blur-sm">
          <div className="max-w-screen mx-auto flex items-center justify-between p-4">
            <Logo />
            <span>
              Step {step + 1} of {steps.length}
            </span>
          </div>
        </div>
        <div className="mx-auto flex min-h-screen w-full max-w-4xl justify-center bg-background p-4 *:min-w-full md:px-12">
          <div className="md:p-8">
            {step < steps.length ? <div>{steps[step].component}</div> : null}
          </div>
        </div>

        <div className="sticky bottom-0 left-0 w-full bg-white/40 backdrop-blur-sm">
          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-border">
            <div
              className="h-2 bg-black transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between p-4">
            {step > 0 ? (
              <Button variant="link" onClick={prevStep}>
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {step + 1 !== steps.length ? (
              <Button onClick={nextStep}>Next</Button>
            ) : null}
          </div>
        </div>

        {isSubmitted && (
          <Dialog open={isSubmitted} onOpenChange={() => {}}>
            <DialogContent className="max-w-md overflow-clip rounded-md p-0">
              <div className="">
                <div className="flex min-h-32 items-center justify-center bg-gray-100 py-10">
                  <LucideBriefcaseBusiness
                    size={100}
                    className="text-primary"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold">
                    Your business is now listed!
                  </h2>
                  <p>
                    Congratulations! Your business profile is live and ready for
                    customers to discover. Next, set up your business address so
                    people can find you easily
                  </p>
                  <div className="grid gap-2 pt-4 md:flex">
                    <Button asChild>
                      <Link to={"/business/manage/address"}>
                        Set Up Business Address
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={"/business/manage"}>Go to My Business</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }
};
export default ListingForm;
