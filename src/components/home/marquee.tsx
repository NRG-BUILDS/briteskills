import React from "react";

const ModernMarquee = () => {
  // Sample data for the marquee boxes
  const items = [
    {
      id: 1,
      title: "Innovation",
      subtitle: "Tech Forward",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Design",
      subtitle: "Creative Vision",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: 3,
      title: "Development",
      subtitle: "Code Excellence",
      color: "from-green-500 to-teal-600",
    },
    {
      id: 4,
      title: "Strategy",
      subtitle: "Smart Solutions",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      title: "Growth",
      subtitle: "Scale Up",
      color: "from-indigo-500 to-blue-600",
    },
    {
      id: 6,
      title: "Analytics",
      subtitle: "Data Driven",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 7,
      title: "Security",
      subtitle: "Trust First",
      color: "from-gray-600 to-gray-800",
    },
    {
      id: 8,
      title: "Performance",
      subtitle: "Speed Matters",
      color: "from-yellow-500 to-orange-600",
    },
  ];

  return (
    <div className="w-full overflow-hidden py-12 pt-6">
      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent"></div>

        {/* Marquee track */}
        <div className="animate-marquee flex">
          {/* First set of items */}
          {items.map((item) => (
            <div
              key={`first-${item.id}`}
              className="group mx-3 size-60 flex-shrink-0 cursor-pointer rounded-xl bg-gradient-to-br shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div
                className={`h-full w-full rounded-xl bg-gradient-to-br ${item.color} relative flex flex-col justify-between overflow-hidden p-4`}
              >
                {/* Background decoration */}
                <div className="absolute right-0 top-0 h-16 w-16 -translate-y-8 translate-x-8 transform rounded-full bg-white bg-opacity-10"></div>
                <div className="absolute bottom-0 left-0 h-12 w-12 -translate-x-6 translate-y-6 transform rounded-full bg-white bg-opacity-10"></div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-white text-opacity-90">
                    {item.subtitle}
                  </p>
                  <div className="mt-2 h-0.5 w-8 bg-white bg-opacity-60 transition-all duration-300 group-hover:w-12"></div>
                </div>
              </div>
            </div>
          ))}

          {/* Second set of items for seamless loop */}
          {items.map((item) => (
            <div
              key={`second-${item.id}`}
              className="group mx-3 h-36 w-36 flex-shrink-0 cursor-pointer rounded-xl bg-gradient-to-br shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ width: "150px", height: "150px" }}
            >
              <div
                className={`h-full w-full rounded-xl bg-gradient-to-br ${item.color} relative flex flex-col justify-between overflow-hidden p-4`}
              >
                {/* Background decoration */}
                <div className="absolute right-0 top-0 h-16 w-16 -translate-y-8 translate-x-8 transform rounded-full bg-white bg-opacity-10"></div>
                <div className="absolute bottom-0 left-0 h-12 w-12 -translate-x-6 translate-y-6 transform rounded-full bg-white bg-opacity-10"></div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-white text-opacity-90">
                    {item.subtitle}
                  </p>
                  <div className="mt-2 h-0.5 w-8 bg-white bg-opacity-60 transition-all duration-300 group-hover:w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ModernMarquee;
