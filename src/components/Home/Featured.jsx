"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PetCard from "../Shared/PetCard";
import SkeletonCard from "../Shared/SkeletonCard";


const FeaturedPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`)
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