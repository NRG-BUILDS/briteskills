import Filter from "@/components/explore/filter";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import useRequest from "@/hooks/use-request";
import { formatMoney } from "@/lib/utils";
import { mockBusinesses } from "@/types/business";
import {
  Briefcase,
  FilterIcon,
  ListFilter,
  MapPin,
  Scissors,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [collapseFilter, setCollapseFilter] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const { makeRequest, loading } = useRequest("business/", false);

  useEffect(() => {
    makeRequest().then((res) => setBusinesses(res.result));
  }, []);

  return (
    <section className="bg-accent/5">
      <div className="relative mx-auto flex min-h-screen max-w-screen-2xl flex-none flex-wrap *:transition-all lg:p-4">
        <div
          className={`left-0 top-4 w-full flex-none space-y-4 overflow-clip lg:pr-4 ${collapseFilter ? "h-0 lg:w-0" : "fixed z-[999] h-screen lg:sticky lg:w-1/4"}`}
        >
          <button
            onClick={() => setCollapseFilter(!collapseFilter)}
            className={`${collapseFilter ? "fixed bottom-4 left-4 z-[999] w-fit max-w-fit opacity-60 md:bottom-auto md:top-4" : "max-w-[660px] opacity-100"} flex w-full items-center gap-2 rounded-lg bg-secondary p-4 text-left font-semibold text-secondary-foreground transition-all hover:opacity-100`}
          >
            <ListFilter /> {collapseFilter ? "" : "Filter"}
          </button>
          <section className="rounded-xl border bg-white shadow-elevate-01">
            <ScrollArea className="h-[100svh] p-4">
              <Filter />
            </ScrollArea>
          </section>
        </div>
        <section
          className={`border bg-white p-2 shadow-elevate-02 md:p-4 ${collapseFilter ? "lg:w-full" : "lg:w-3/4"}`}
        >
          <div
            className={`grid grid-cols-2 gap-1.5 md:gap-4 lg:grid-cols-3 ${collapseFilter ? "xl:grid-cols-5" : "xl:grid-cols-4"} `}
          >
            {mockBusinesses.map((bus, i) => (
              <>
                <Link to={`/service/${i}`}>
                  <div className="relative overflow-hidden rounded-2xl border transition-shadow hover:shadow-elevate-01">
                    <div className="aspect-[3.5/3]">
                      <div className="absolute left-1 top-1 z-10">
                        <Badge className="">{bus.tag}</Badge>
                      </div>
                      <Image src={bus.image} className="relative -z-0" />
                    </div>
                    {/* Product info */}
                    <div className="flex flex-col gap-3 border-b p-3">
                      <div className="flex items-center gap-2 text-xs leading-none text-muted-foreground">
                        <MapPin size={14} />
                        <span>{bus.location}</span>
                      </div>
                      <h3 className="font-medium">{bus.title}</h3>

                      <div className="flex flex-col justify-between gap-1 md:flex-row lg:items-center">
                        <div className="flex items-center gap-1 text-xs leading-none text-muted-foreground">
                          <div className="flex items-center justify-center rounded-full border bg-accent/5 p-1.5 text-primary">
                            <Briefcase size={12} />
                          </div>
                          <span>{bus.category}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs leading-none text-muted-foreground">
                          <div className="flex items-center justify-center gap-1 truncate rounded-full border border-secondary/50 bg-secondary/5 p-1.5 text-secondary">
                            <Scissors size={12} />
                            <span>{bus.servicesCount} services</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Pricing and review info */}
                    <div className="flex items-center justify-between p-3 text-xs">
                      <div className="flex items-center justify-center gap-1 text-secondary">
                        <span>
                          From{" "}
                          <span className="font-medium">
                            {formatMoney(bus.startingPrice)}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-secondary">
                        <span className="flex flex-wrap items-center justify-center gap-1 gap-y-0">
                          {bus.ratingValue}
                          <Star className="fill-secondary" size={12} />
                          <span className="text-[8px] font-light">
                            ({bus.ratingValue} users)
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
            {mockBusinesses.map((bus, i) => (
              <>
                <Link to={`/service/${i}`}>
                  <div className="relative overflow-hidden rounded-2xl border transition-shadow hover:shadow-elevate-01">
                    <div className="aspect-[3.5/3]">
                      <div className="absolute left-1 top-1 z-10">
                        <Badge className="">{bus.tag}</Badge>
                      </div>
                      <Image src={bus.image} className="relative -z-0" />
                    </div>
                    {/* Product info */}
                    <div className="flex flex-col gap-3 border-b p-3">
                      <div className="flex items-center gap-2 text-xs leading-none text-muted-foreground">
                        <MapPin size={14} />
                        <span>{bus.location}</span>
                      </div>
                      <h3 className="font-medium">{bus.title}</h3>

                      <div className="flex flex-col justify-between gap-1 md:flex-row lg:items-center">
                        <div className="flex items-center gap-1 text-xs leading-none text-muted-foreground">
                          <div className="flex items-center justify-center rounded-full border bg-accent/5 p-1.5 text-primary">
                            <Briefcase size={12} />
                          </div>
                          <span>{bus.category}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs leading-none text-muted-foreground">
                          <div className="flex items-center justify-center gap-1 truncate rounded-full border border-secondary/50 bg-secondary/5 p-1.5 text-secondary">
                            <Scissors size={12} />
                            <span>{bus.servicesCount} services</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Pricing and review info */}
                    <div className="flex items-center justify-between p-3 text-xs">
                      <div className="flex items-center justify-center gap-1 text-secondary">
                        <span>
                          From{" "}
                          <span className="font-medium">
                            {formatMoney(bus.startingPrice)}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-secondary">
                        <span className="flex flex-wrap items-center justify-center gap-1 gap-y-0">
                          {bus.ratingValue}
                          <Star className="fill-secondary" size={12} />
                          <span className="text-[8px] font-light">
                            ({bus.ratingValue} users)
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
            {mockBusinesses.map((bus, i) => (
              <>
                <Link to={`/service/${i}`}>
                  <div className="relative overflow-hidden rounded-2xl border transition-shadow hover:shadow-elevate-01">
                    <div className="aspect-[3.5/3]">
                      <div className="absolute left-1 top-1 z-10">
                        <Badge className="">{bus.tag}</Badge>
                      </div>
                      <Image src={bus.image} className="relative -z-0" />
                    </div>
                    {/* Product info */}
                    <div className="flex flex-col gap-3 border-b p-3">
                      <div className="flex items-center gap-2 text-xs leading-none text-muted-foreground">
                        <MapPin size={14} />
                        <span>{bus.location}</span>
                      </div>
                      <h3 className="font-medium">{bus.title}</h3>

                      <div className="flex flex-col justify-between gap-1 md:flex-row lg:items-center">
                        <div className="flex items-center gap-1 text-xs leading-none text-muted-foreground">
                          <div className="flex items-center justify-center rounded-full border bg-accent/5 p-1.5 text-primary">
                            <Briefcase size={12} />
                          </div>
                          <span>{bus.category}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs leading-none text-muted-foreground">
                          <div className="flex items-center justify-center gap-1 truncate rounded-full border border-secondary/50 bg-secondary/5 p-1.5 text-secondary">
                            <Scissors size={12} />
                            <span>{bus.servicesCount} services</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Pricing and review info */}
                    <div className="flex items-center justify-between p-3 text-xs">
                      <div className="flex items-center justify-center gap-1 text-secondary">
                        <span>
                          From{" "}
                          <span className="font-medium">
                            {formatMoney(bus.startingPrice)}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-secondary">
                        <span className="flex flex-wrap items-center justify-center gap-1 gap-y-0">
                          {bus.ratingValue}
                          <Star className="fill-secondary" size={12} />
                          <span className="text-[8px] font-light">
                            ({bus.ratingValue} users)
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ExplorePage;
