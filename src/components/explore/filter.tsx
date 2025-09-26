import React, { useState } from "react";
import { X, MapPin, ChevronDown, ChevronUp } from "lucide-react";

const FilterSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    ratings: true,
  });

  // State for all filters
  const [filters, setFilters] = useState({
    location: "",
    city: "",
    country: "germany",
    categories: ["spa"],
    priceRanges: ["EUR 30.00 - EUR 80.00"],
    ratings: [5],
  });

  // Location suggestions based on input
  const [locationSuggestions] = useState([
    "berlin",
    "12051",
    "munich",
    "hamburg",
  ]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const categories = [
    "Facials",
    "Hair Salon",
    "Barbing Salon",
    "Medicure",
    "Pedicure",
    "Massage",
    "spa",
  ];

  const priceRanges = [
    "EUR 15.00 - EUR 30.00",
    "EUR 30.00 - EUR 80.00",
    "EUR 80.00 - EUR 150.00",
    "EUR 150.00 - EUR 500.00",
    "EUR 500.00 - EUR 999.00",
  ];

  const cities = ["berlin", "munich", "hamburg", "cologne", "frankfurt"];
  const countries = [
    { code: "germany", name: "Germany" },
    { code: "austria", name: "Austria" },
    { code: "switzerland", name: "Switzerland" },
  ];

  // Generate applied filters from current state
  const getAppliedFilters = () => {
    const applied = [];

    // Add country
    if (filters.country) {
      applied.push({
        id: `country-${filters.country}`,
        label: filters.country,
        type: "country",
      });
    }

    // Add city
    if (filters.city) {
      applied.push({
        id: `city-${filters.city}`,
        label: filters.city,
        type: "city",
      });
    }

    // Add location if it matches suggestions
    if (
      filters.location &&
      locationSuggestions.includes(filters.location.toLowerCase())
    ) {
      applied.push({
        id: `location-${filters.location}`,
        label: filters.location,
        type: "location",
      });
    }

    // Add categories
    filters.categories.forEach((category) => {
      applied.push({
        id: `category-${category}`,
        label: category,
        type: "category",
      });
    });

    // Add price ranges (show as EUR X format)
    filters.priceRanges.forEach((range) => {
      const price = range.split(" - ")[0]; // Get first price
      applied.push({
        id: `price-${range}`,
        label: price,
        type: "price",
      });
    });

    // Add ratings
    filters.ratings.forEach((rating) => {
      applied.push({
        id: `rating-${rating}`,
        label: "★".repeat(rating),
        type: "rating",
      });
    });

    return applied;
  };

  const removeFilter = (filterId) => {
    const [type, value] = filterId.split("-", 2);

    setFilters((prev) => {
      const newFilters = { ...prev };

      switch (type) {
        case "country":
          newFilters.country = "";
          break;
        case "city":
          newFilters.city = "";
          break;
        case "location":
          newFilters.location = "";
          break;
        case "category":
          newFilters.categories = newFilters.categories.filter(
            (c) => c !== value,
          );
          break;
        case "price":
          newFilters.priceRanges = newFilters.priceRanges.filter(
            (p) => !p.startsWith(value),
          );
          break;
        case "rating":
          newFilters.ratings = newFilters.ratings.filter(
            (r) => r !== parseInt(value),
          );
          break;
      }

      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      location: "",
      city: "",
      country: "",
      categories: [],
      priceRanges: [],
      ratings: [],
    });
  };

  const handleLocationChange = (e) => {
    setFilters((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleCityChange = (e) => {
    setFilters((prev) => ({ ...prev, city: e.target.value }));
  };

  const handleCountryChange = (e) => {
    setFilters((prev) => ({ ...prev, country: e.target.value }));
  };

  const handleCategoryChange = (category, checked) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter((c) => c !== category),
    }));
  };

  const handlePriceChange = (priceRange, checked) => {
    setFilters((prev) => ({
      ...prev,
      priceRanges: checked
        ? [...prev.priceRanges, priceRange]
        : prev.priceRanges.filter((p) => p !== priceRange),
    }));
  };

  const handleRatingChange = (rating, checked) => {
    setFilters((prev) => ({
      ...prev,
      ratings: checked
        ? [...prev.ratings, rating]
        : prev.ratings.filter((r) => r !== rating),
    }));
  };

  const StarRating = ({ filled, total = 5 }) => (
    <div className="flex">
      {[...Array(total)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${i < filled ? "text-pink-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );

  const appliedFilters = getAppliedFilters();

  return (
    <div className="space-y-6 bg-white p-4">
      {/* Applied Filters */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Applied Filters</h3>
        {appliedFilters.length > 0 ? (
          <>
            <div className="mb-3 flex flex-wrap gap-2">
              {appliedFilters.map((filter) => (
                <div
                  key={filter.id}
                  className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  <span className="mr-2">{filter.label}</span>
                  <button
                    onClick={() => removeFilter(filter.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={clearAllFilters}
              className="text-sm text-pink-500 hover:text-pink-600"
            >
              Clear All Filters
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-500">No filters applied</p>
        )}
      </div>

      {/* Location */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Location</h3>
        <div className="space-y-3">
          <div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Type the location"
              value={filters.location}
              onChange={handleLocationChange}
              className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="relative">
            <select
              value={filters.city}
              onChange={handleCityChange}
              className="w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={16}
            />
          </div>

          <div className="relative">
            <div className="flex items-center">
              <select
                value={filters.country}
                onChange={handleCountryChange}
                className="flex-1 appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                size={16}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Categories</h3>
          <button
            onClick={() => toggleSection("categories")}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.categories ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>

        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category, index) => (
              <label
                key={index}
                className="flex cursor-pointer items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={(e) =>
                    handleCategoryChange(category, e.target.checked)
                  }
                  className="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Price</h3>
          <button
            onClick={() => toggleSection("price")}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.price ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>

        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <label
                key={index}
                className="flex cursor-pointer items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={filters.priceRanges.includes(range)}
                  onChange={(e) => handlePriceChange(range, e.target.checked)}
                  className="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Ratings */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Ratings</h3>
          <button
            onClick={() => toggleSection("ratings")}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.ratings ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>

        {expandedSections.ratings && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex cursor-pointer items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={filters.ratings.includes(rating)}
                  onChange={(e) => handleRatingChange(rating, e.target.checked)}
                  className="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-pink-500"
                />
                <StarRating filled={rating} />
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
