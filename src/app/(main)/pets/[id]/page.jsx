"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

// Matches the badge colors from your PetCard
const speciesBadgeColor = (species) => {
  const map = {
    Dog: "bg-amber-100 text-amber-700",
    Cat: "bg-teal-100 text-teal-700",
    Rabbit: "bg-rose-100 text-rose-700",
    Bird: "bg-violet-100 text-violet-700",
  };
  return map[species] || "bg-neutral-100 text-neutral-600";
};

export default function PetDetailsPage({ params }) {
  // In a real app, you would fetch the pet by ID or Name using params
  const  P =  params.id; // This is just a placeholder to show how you would access the dynamic route parameter
  console.log(P)
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fetch for the specific pet
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // Mock finding the pet (replace with your actual logic)
        const foundPet = data[0]; 
        setPet({
          ...foundPet,
          // Adding some extra mock details that usually go on a details page
          description: `Meet ${foundPet.petName}! This lovely ${foundPet.species.toLowerCase()} is looking for a forever home. They are incredibly friendly, love to play, and have been well-cared for. If you're looking for a new best friend, ${foundPet.petName} might just be the perfect match for your family.`,
          healthStatus: "Healthy, vet-checked",
          color: "Mixed",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <p className="text-neutral-500 font-medium animate-pulse">Loading pet details...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-neutral-800">Pet not found</h2>
        <Link href="/" className="text-amber-600 hover:underline">Back to all pets</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-amber-600 font-medium mb-6 transition-colors duration-200"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to all pets
        </Link>

        {/* Main Details Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm flex flex-col lg:flex-row">
          
          {/* Left: Image Section */}
          <div className="lg:w-1/2 relative h-80 lg:h-auto min-h-[400px]">
            <img 
              src={pet.imageURL} 
              alt={pet.petName} 
              className="w-full h-full object-cover"
            />
            {pet.vaccinationStatus === "Fully Vaccinated" && (
              <span className="absolute top-5 left-5 bg-teal-500 text-white text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Fully Vaccinated
              </span>
            )}
          </div>

          {/* Right: Info Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-4xl font-extrabold text-neutral-800 tracking-tight">
                {pet.petName}
              </h1>
              <span className="text-2xl font-bold text-amber-600">
                ${pet.adoptionFee}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className={`text-sm font-semibold px-4 py-1.5 rounded-full ${speciesBadgeColor(pet.species)}`}>
                {pet.species}
              </span>
              <span className="bg-neutral-100 text-neutral-600 text-sm font-medium px-4 py-1.5 rounded-full">
                {pet.breed}
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-1">Age</p>
                <p className="text-neutral-800 font-semibold flex items-center gap-2">
                  <svg width="16" height="16" className="text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {pet.age}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-1">Gender</p>
                <p className="text-neutral-800 font-semibold flex items-center gap-2">
                  <svg width="16" height="16" className="text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {pet.gender}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-1">Location</p>
                <p className="text-neutral-800 font-semibold flex items-center gap-2">
                  <svg width="16" height="16" className="text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {pet.location}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-1">Health</p>
                <p className="text-neutral-800 font-semibold flex items-center gap-2">
                  <svg width="16" height="16" className="text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  {pet.healthStatus}
                </p>
              </div>
            </div>

            {/* About / Description */}
            <div className="mb-10 flex-1">
              <h3 className="text-lg font-bold text-neutral-800 mb-3">About {pet.petName}</h3>
              <p className="text-neutral-500 leading-relaxed text-sm sm:text-base">
                {pet.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button className="flex-1 bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold text-base py-4 px-6 rounded-xl transition-all duration-200 text-center shadow-sm hover:shadow-md">
                Adopt {pet.petName}
              </button>
              <button className="sm:w-auto bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold border border-amber-200 text-base py-4 px-6 rounded-xl transition-all duration-200 flex justify-center items-center gap-2">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Favorite
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}