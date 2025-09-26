export type Business = {
  id: number;
  tag: string;
  image: string;
  location: string;
  title: string;
  category: string;
  servicesCount: number;
  startingPrice: number;
  ratingValue: number;
  ratingCountLabel: string;
};
export const mockBusinesses: Business[] = [
  {
    id: 1,
    tag: "Nearby",
    image:
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Accra, Greater Accra",
    title: "Damilola's Luxury Salon",
    category: "Barbing",
    servicesCount: 2,
    startingPrice: 3000,
    ratingValue: 3.4,
    ratingCountLabel: "3k users",
  },
  {
    id: 2,
    tag: "Featured",
    image:
      "https://images.pexels.com/photos/3992873/pexels-photo-3992873.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Lagos, Nigeria",
    title: "Glow Up Hair Studio",
    category: "Hairdressing",
    servicesCount: 5,
    startingPrice: 5000,
    ratingValue: 4.7,
    ratingCountLabel: "1.2k users",
  },
  {
    id: 3,
    tag: "Popular",
    image:
      "https://images.pexels.com/photos/3998417/pexels-photo-3998417.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Kumasi, Ashanti",
    title: "Elite Cuts",
    category: "Barbing",
    servicesCount: 3,
    startingPrice: 2500,
    ratingValue: 4.1,
    ratingCountLabel: "580 users",
  },
  {
    id: 4,
    tag: "Nearby",
    image:
      "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Ibadan, Nigeria",
    title: "Shear Bliss",
    category: "Hairdressing",
    servicesCount: 4,
    startingPrice: 3500,
    ratingValue: 3.9,
    ratingCountLabel: "800 users",
  },
  {
    id: 5,
    tag: "Top Rated",
    image:
      "https://images.pexels.com/photos/3992875/pexels-photo-3992875.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Takoradi, Ghana",
    title: "Signature Cuts",
    category: "Barbing",
    servicesCount: 6,
    startingPrice: 4000,
    ratingValue: 4.9,
    ratingCountLabel: "2.4k users",
  },
  {
    id: 6,
    tag: "Nearby",
    image:
      "https://images.pexels.com/photos/3993245/pexels-photo-3993245.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Port Harcourt, Nigeria",
    title: "Crown & Glory Salon",
    category: "Hairdressing",
    servicesCount: 3,
    startingPrice: 2800,
    ratingValue: 4.3,
    ratingCountLabel: "1.7k users",
  },
  {
    id: 7,
    tag: "New",
    image:
      "https://images.pexels.com/photos/3998416/pexels-photo-3998416.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Enugu, Nigeria",
    title: "Finesse Styles",
    category: "Hairdressing",
    servicesCount: 2,
    startingPrice: 2200,
    ratingValue: 3.6,
    ratingCountLabel: "450 users",
  },
  {
    id: 8,
    tag: "Nearby",
    image:
      "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Benin City, Nigeria",
    title: "Trim Haven",
    category: "Barbing",
    servicesCount: 4,
    startingPrice: 3000,
    ratingValue: 4.2,
    ratingCountLabel: "970 users",
  },
  {
    id: 9,
    tag: "Trending",
    image:
      "https://images.pexels.com/photos/3993461/pexels-photo-3993461.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Cape Coast, Ghana",
    title: "Royal Touch",
    category: "Hairdressing",
    servicesCount: 5,
    startingPrice: 3200,
    ratingValue: 4.6,
    ratingCountLabel: "1.9k users",
  },
  {
    id: 10,
    tag: "Nearby",
    image:
      "https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Abuja, Nigeria",
    title: "Classy Clippers",
    category: "Barbing",
    servicesCount: 3,
    startingPrice: 3500,
    ratingValue: 4.0,
    ratingCountLabel: "1.1k users",
  },
];
