import { Link } from "react-router-dom";
import { SkillCard } from "../skills-ui/skill-card";
import { ReactNode } from "react";

interface Props {
  title?: ReactNode | string;
  id?: string;
}
export const skills = [
  {
    id: "1",
    name: "Adebayo Cooling",
    title: "Top artisan",
    description: "I will install your sinks and water closet professionally",
    rating: 5.0,
    reviews: 3,
    avatar: "https://i.pravatar.cc/150?img=32",
    cover: "https://picsum.photos/seed/adebayo/600/400",
    email: "adeocool@gmail.com",
    phone: "09011922193",
    response_time: "1 hour",
    extra_services: 3,
    category: "Plumbing",
    location: "KANO",
    status: "Away",
  },
  {
    id: "2",
    name: "Chinedu Fixit",
    title: "Expert Technician",
    description: "Professional AC installation and servicing for homes.",
    rating: 4.8,
    reviews: 12,
    avatar: "https://i.pravatar.cc/150?img=76",
    cover: "https://picsum.photos/seed/chinedu/600/400",
    email: "chinedu.fixit@gmail.com",
    phone: "08023456789",
    response_time: "2 hours",
    extra_services: 5,
    category: "Air Conditioning",
    location: "LAGOS",
    status: "Available",
  },
  {
    id: "3",
    name: "Grace Interiors",
    title: "Creative Designer",
    description: "Transform your living spaces with modern interior designs.",
    rating: 4.9,
    reviews: 8,
    avatar: "https://i.pravatar.cc/150?img=45",
    cover: "https://picsum.photos/seed/grace/600/400",
    email: "grace.designs@gmail.com",
    phone: "08198765432",
    response_time: "30 mins",
    extra_services: 2,
    category: "Interior Design",
    location: "ABUJA",
    status: "Available",
  },
];

export function Section({ title, id }: Props) {
  return (
    <section id={id || undefined} className="px-1 py-6 md:px-12">
      <div className="">
        {title && (
          <h2 className="mb-3 text-3xl font-extrabold xl:mb-6">{title}</h2>
        )}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:gap-4 xl:grid-cols-5">
          {skills.map((skill, index) => (
            <Link to={`/service/${id}`}>
              <SkillCard key={index} skill={skill} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Section;
