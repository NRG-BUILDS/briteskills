import BacktoTopButton from "@/components/ui/back-to-top-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Image } from "@/components/ui/image";
import ScrollToTop from "@/hooks/scroll-to-top";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ServicePage = () => {
  const { id } = useParams();
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  ScrollToTop();

  const handleBookClick = (i: number) => {
    navigate(`/service/${id}/book`, { state: { i } });
  };
  return (
    <section className="container mx-auto grid gap-4 p-0 lg:grid-cols-12 lg:p-6">
      <h1 className="col-span-full px-4 text-3xl font-bold lg:p-0">
        Damilola's Luxury Salon
      </h1>
      <div className="space-y-6 lg:col-span-7">
        <div className="relative w-full">
          <Carousel
            setApi={setApi}
            className="aspect-video w-full overflow-clip lg:rounded-xl"
          >
            <CarouselContent>
              {[...Array(3)].map((_, index) => (
                <CarouselItem key={index}>
                  <Image
                    src="https://www.apprenticeship.ng/wp-content/uploads/2020/03/hairdresser-attribution-in-picassa.jpg"
                    alt="Hairdresser"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Custom Arrows */}
          <Button
            onClick={() => api?.scrollPrev()}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            <ChevronLeft size={40} />
          </Button>
          <Button
            onClick={() => api?.scrollNext()}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            <ChevronRight size={40} />
          </Button>

          <div className="absolute right-2 top-2 z-10 rounded-md bg-white/20 p-2 px-4 text-white backdrop-blur-sm hover:bg-white/30">
            {current + 1} / {count}
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className={`h-2 w-2 rounded-full ${
                  current === i ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => api?.scrollTo(i)}
              />
            ))}
          </div>
        </div>
        <section className="px-4 lg:p-0">
          <h2 className="text-xl font-bold">Services</h2>
          <div className="divide-y *:flex *:items-center *:justify-between *:py-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <p>Hair Wash Only</p>
                <div className="flex items-center gap-2">
                  <div className="grid text-right">
                    <p>EUR 10.00</p>
                    <span className="text-sm">40 mins</span>
                  </div>
                  <Button onClick={() => handleBookClick(i)}>Book Now</Button>
                </div>
              </div>
            ))}
          </div>
          <section>
            <ServiceReviews />
          </section>
        </section>
      </div>
      <div className="space-y-5 px-4 lg:col-span-5 lg:p-0">
        <section className="">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <MapPin />
            <p>Siegfriedstrasse 30 12051, Berlin, DE</p>
          </div>
          <div className="aspect-[3/3.5] overflow-clip rounded-xl border bg-neutral-100 md:aspect-[4/2]">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `7, Jehovah Witness Assembly, Street, Ota.`,
              )}&output=embed`}
              width="100%"
              height="100%"
              style={{ borderWidth: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </section>
        <section className="space-y-6 rounded-lg border-2 border-border/70 p-4 text-lg">
          <div>
            <h2 className="mb-2 text-lg font-bold">Contact us</h2>

            <div className="mb-1 flex items-center gap-2 text-muted-foreground">
              <Phone />
              <p>+49 (1) 70 354 0006 | 030 223 446</p>
            </div>
            <div className="mb-1 flex items-center gap-2 text-muted-foreground">
              <Mail />
              <Link
                to={"mailto:ajanlekok@salon.de"}
                className="hover:underline"
              >
                ajanlekok@salon.de
              </Link>
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold">About us?</h2>
            <div className="text-base text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              deleniti, et, reiciendis assumenda harum corrupti sunt atque
              quisquam incidunt maiores error sequi sed velit eaque itaque
              recusandae vitae est perspiciatis?
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-lg font-bold">Business Hours</h2>
              <Badge className="bg-green-100 text-green-500">Open</Badge>
            </div>
            <div className="text-base text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="min-w-16">Mon - Fri</span>
                <span>:</span>
                <span className="font-medium">8:00 - 17:00</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="min-w-16">Sat</span>
                <span>:</span>
                <span className="font-medium">9:00 - 16:00</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="min-w-16">Sun</span>
                <span>:</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <BacktoTopButton />
    </section>
  );
};

export default ServicePage;

const ServiceReviews = () => {
  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      review:
        "Absolutely fantastic service! The team was professional, timely, and exceeded all my expectations. I couldn't be happier with the results and would definitely recommend to anyone looking for quality work.",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "2024-01-12",
      review:
        "Great experience overall. The service was delivered on time and met most of my requirements. There were a few minor issues but nothing that couldn't be resolved quickly.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      date: "2024-01-10",
      review:
        "Outstanding quality and attention to detail. The communication throughout the process was excellent, and the final result was exactly what I was hoping for.",
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 3,
      date: "2024-01-08",
      review:
        "Decent service, though there's room for improvement. The work was completed satisfactorily but took longer than expected. Customer service was responsive when issues arose.",
    },
    {
      id: 5,
      name: "Lisa Park",
      rating: 5,
      date: "2024-01-05",
      review:
        "Exceptional service from start to finish! Professional, reliable, and the quality exceeded my expectations. Will definitely be using this service again.",
    },
    {
      id: 6,
      name: "James Wilson",
      rating: 4,
      date: "2024-01-03",
      review:
        "Very satisfied with the service provided. The team was knowledgeable and helpful throughout the process. Minor delays but overall a positive experience.",
    },
  ];

  // Calculate rating distribution
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  // Star component for ratings
  const StarRating = ({ rating, size = "w-4 h-4" }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  // Progress bar for rating distribution
  const RatingDistribution = () => {
    return (
      <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Customer Reviews
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} size="w-5 h-5" />
              <span className="text-lg font-medium text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-500">({totalReviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[rating] || 0;
            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex min-w-0 items-center gap-1">
                  <span className="text-sm text-gray-600">{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="h-2 flex-1 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="min-w-0 text-sm text-gray-600">
                  {count} ({percentage.toFixed(0)}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Individual review component
  const ReviewCard = ({ review }) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-medium text-white">
              {review.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{review.name}</h4>
              <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
            </div>
          </div>
          <StarRating rating={review.rating} />
        </div>
        <p className="leading-relaxed text-gray-700">{review.review}</p>
      </div>
    );
  };

  return (
    <div className="">
      <RatingDistribution />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Recent Reviews</h3>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
