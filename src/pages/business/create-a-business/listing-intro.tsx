import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import banner from "@/assets/banners/Brtieflux_properties_list_banner.jpeg";

const ListingIntro = () => {
  return (
    <div className="lg:min-h-screen grid lg:grid-cols-2">
      <div className="order-2 lg:order-1 flex items-start lg:items-center py-10 text-center lg:text-left h-full p-4 md:p-6">
        <div className="">
          <h1 className="font-bold text-3xl md:text-4xl leading-tight mb-4">
            Connect with Thousands of Qualified Renters
          </h1>
          <p className="text-lg font-medium text-muted-foreground mb-8">
            List yout property in a few easy steps and get seen by eyes of
            hundreds of potential renters.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link to={"form"}>Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="order-1 lg:order-2 max-h-[40vh] lg:min-h-full">
        <img src={banner} alt="" className="size-full object-cover" />
      </div>
    </div>
  );
};

export default ListingIntro;
