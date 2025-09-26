import banner from "@/assets/images/hero_banner.jpg";
import { Logo } from "../ui/logo";
import { Button } from "../ui/button";
import { LucideSearch } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Hero = () => {
  return (
    <section className="relative flex min-h-[70dvh] items-center justify-center">
      <div className="max-w-4xl space-y-5 p-6 text-center text-lg">
        <h1 className="w-full text-4xl font-extrabold leading-10 tracking-tight lg:text-6xl">
          Find Skilled Artisans
          <br />
          Near You
        </h1>
        <p className="text-xl font-medium leading-snug">
          Book trusted professionals in minutes—no more waiting, no more hassle.
        </p>
        <div className="flex w-full items-stretch py-2">
          <Input
            type="text"
            placeholder="Select a service"
            className="w-full rounded-none border-r-0 py-1 focus:!outline-none focus:!ring-0"
          />

          <Button className="flex h-full items-center justify-center gap-2 rounded rounded-l-none py-2.5 !text-primary-foreground">
            <span>Search</span>
            <LucideSearch size={36} />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p>Popular:</p>
          {[
            "Architecture",
            "Mansory",
            "POP Casting",
            "Auto Repair",
            "Furniture",
          ].map((skill) => (
            <button
              key={skill}
              className="grid place-items-center whitespace-nowrap rounded-full border border-dark px-4 py-1 text-lg"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
