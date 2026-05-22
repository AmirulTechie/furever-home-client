"use client";

import PetCard from "@/components/Shared/PetCard";
import SkeletonCard from "@/components/Shared/SkeletonCard";
import { useEffect, useState } from "react";

const speciesList = ["All", "Dog", "Cat", "Rabbit", "Bird"];

export default function AllPetsPage() {
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`)
      .then((res) => res.json())
      .then((data) => {
        setAllPets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = allPets
    .filter((pet) => {
      const matchSearch = pet.petName.toLowerCase().includes(search.toLowerCase());
      const matchSpecies = selectedSpecies === "All" || pet.species === selectedSpecies;
      return matchSearch && matchSpecies;
    })
    .sort((a, b) => {
      if (sortBy === "fee-asc") return a.adoptionFee - b.adoptionFee;
      if (sortBy === "fee-desc") return b.adoptionFee - a.adoptionFee;
      if (sortBy === "name-asc") return a.petName.localeCompare(b.petName);
      if (sortBy === "name-desc") return b.petName.localeCompare(a.petName);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#F7F5F0]">

      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-1.5 rounded-full mb-3">
            Browse pets
          </span>
          <h1 className="text-4xl font-extrabold text-neutral-800 tracking-tight mb-2">
            All Available Pets
          </h1>
          <p className="text-neutral-500 text-base">
            {loading ? "Loading pets..." : `${filtered.length} pet${filtered.length !== 1 ? "s" : ""} available for adoption`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="bg-white rounded-2xl border border-neutral-100 p-4 mb-8 flex flex-col sm:flex-row gap-3">

          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by pet name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
            />
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </span>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-700 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200 appearance-none  hover:cursor-pointer"
            >
              {speciesList.map((s) => (
                <option key={s} value={s}>{s === "All" ? "All Species" : s}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/>
              </svg>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-700 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="default">Sort By</option>
              <option value="fee-asc">Fee: Low to High</option>
              <option value="fee-desc">Fee: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {(search || selectedSpecies !== "All" || sortBy !== "default") && (
            <button
              onClick={() => { setSearch(""); setSelectedSpecies("All"); setSortBy("default"); }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-500 hover:text-rose-500 hover:border-rose-200 text-sm transition-colors duration-200"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {speciesList.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSpecies(s)}
              className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all duration-200 ${
                selectedSpecies === s
                  ? "bg-amber-400 border-amber-400 text-amber-900"
                  : "bg-white border-neutral-200 text-neutral-600 hover:border-amber-300 hover:text-amber-600"
              }`}
            >
              {s === "All" ? "All Pets" : `${s}s`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-xl font-bold text-neutral-700 mb-2">No pets found</h3>
            <p className="text-neutral-400 text-sm mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setSelectedSpecies("All"); setSortBy("default"); }}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pet, i) => <PetCard key={i} pet={pet} />)}
          </div>
        )}

      </div>
    </div>
  );
}