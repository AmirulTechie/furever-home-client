"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const speciesBadgeColor = (species) => {
  const map = {
    Dog: "bg-amber-100 text-amber-700",
    Cat: "bg-teal-100 text-teal-700",
    Rabbit: "bg-rose-100 text-rose-700",
    Bird: "bg-violet-100 text-violet-700",
  };
  return map[species] || "bg-neutral-100 text-neutral-600";
};

const PetCard = ({ pet }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
    {/* image */}
    <div className="relative h-52 overflow-hidden">
      <img
        src={pet.imageURL}
        alt={pet.petName}
        className="w-full h-full object-cover"
      />
      <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${speciesBadgeColor(pet.species)}`}>
        {pet.species}
      </span>
      {pet.vaccinationStatus === "Fully Vaccinated" && (
        <span className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          Vaccinated
        </span>
      )}
    </div>

    {/* info */}
    <div className="p-5">
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-bold text-neutral-800 text-lg">{pet.petName}</h3>
        <span className="text-amber-600 font-semibold text-sm">${pet.adoptionFee}</span>
      </div>
      <p className="text-neutral-400 text-xs mb-3">{pet.breed}</p>

      <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
        <span className="flex items-center gap-1">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {pet.age}
        </span>
        <span className="flex items-center gap-1">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {pet.location.split(",")[0]}
        </span>
        <span className="flex items-center gap-1">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {pet.gender}
        </span>
      </div>

      <Link
        href={`/pets/${pet.petName.toLowerCase().replace(/\s+/g, "-")}`}
        className="block w-full text-center border-2 border-amber-400 hover:bg-amber-400 text-amber-700 hover:text-amber-900 font-semibold text-sm py-2.5 rounded-xl transition-all duration-200"
      >
        View Details
      </Link>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse">
    <div className="h-52 bg-neutral-100" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-neutral-100 rounded w-1/2" />
      <div className="h-3 bg-neutral-100 rounded w-1/3" />
      <div className="h-3 bg-neutral-100 rounded w-full" />
      <div className="h-10 bg-neutral-100 rounded-xl" />
    </div>
  </div>
);

const FeaturedPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // show first 6 pets for featured section
        setPets(data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#F7F5F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Featured pets
          </span>
          <h2 className="text-4xl font-extrabold text-neutral-800 tracking-tight mb-3">
            Find Your Perfect Companion
          </h2>
          <p className="text-neutral-500 text-base max-w-md mx-auto">
            Browse our featured pets looking for a loving forever home
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : pets.map((pet, i) => <PetCard key={i} pet={pet} />)
          }
        </div>

        {/* see all button */}
        {!loading && (
          <div className="text-center mt-12">
            <Link
              href="/pets"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm px-8 py-3.5 rounded-xl transition-colors duration-200"
            >
              See All Pets
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedPets;