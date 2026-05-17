"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const PawPrint = ({ className }) => (
  <svg viewBox="0 0 60 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="14" r="7" />
    <circle cx="42" cy="14" r="7" />
    <circle cx="9"  cy="28" r="5.5" />
    <circle cx="51" cy="28" r="5.5" />
    <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z" />
  </svg>
);

const StatBadge = ({ number, label }) => (
  <div className="flex flex-col items-center px-6 py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100">
    <span className="text-2xl font-bold text-amber-600">{number}</span>
    <span className="text-xs text-neutral-500 mt-0.5">{label}</span>
  </div>
);

const pets = [
  {
    id: 1,
    name: "Bruno",
    species: "Dog",
    age: "2 years",
    location: "Chittagong",
    bg: "from-amber-100 to-orange-50",
    emoji: "🐕",
    badgeColor: "bg-amber-400 text-amber-900",
  },
  {
    id: 2,
    name: "Luna",
    species: "Cat",
    age: "1 year",
    location: "Dhaka",
    bg: "from-teal-100 to-emerald-50",
    emoji: "🐈",
    badgeColor: "bg-teal-500 text-white",
  },
  {
    id: 3,
    name: "Mochi",
    species: "Rabbit",
    age: "8 months",
    location: "Sylhet",
    bg: "from-rose-100 to-pink-50",
    emoji: "🐇",
    badgeColor: "bg-rose-400 text-white",
  },
  {
    id: 4,
    name: "Rio",
    species: "Bird",
    age: "3 years",
    location: "Rajshahi",
    bg: "from-violet-100 to-purple-50",
    emoji: "🦜",
    badgeColor: "bg-violet-400 text-white",
  },
];

const cardVariants = {
  // the front active card
  active: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    zIndex: 30,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 28 },
  },
  // cards behind — staggered offset
  behind: (i) => ({
    x: i * 14,
    y: i * -10,
    rotate: i * 4,
    scale: 1 - i * 0.04,
    zIndex: 30 - i,
    opacity: 1 - i * 0.1,
    transition: { type: "spring", stiffness: 300, damping: 28 },
  }),
  // card being swiped out to the left
  exit: {
    x: -340,
    y: 40,
    rotate: -18,
    opacity: 0,
    zIndex: 0,
    transition: { duration: 0.38, ease: "easeInOut" },
  },
};

const Banner = () => {
  const [cards, setCards] = useState(pets);
  const [isAnimating, setIsAnimating] = useState(false);

  // auto-cycle every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) handleNext;
    }, 3000);
    return () => clearInterval(timer);
  }, [cards, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    setTimeout(() => setIsAnimating(false), 420);
  };

  return (
    <section className="relative bg-[#F7F5F0] overflow-hidden min-h-[calc(100vh-64px)] flex items-center">

      <PawPrint className="absolute -top-10 -left-10 w-64 h-64 text-amber-100 rotate-[-15deg]" />
      <PawPrint className="absolute bottom-10 right-0 w-80 h-80 text-amber-100 rotate-[20deg]" />
      <PawPrint className="absolute top-1/2 left-1/3 w-24 h-24 text-amber-50 rotate-[10deg] opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
              1,200+ pets found their forever home
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-neutral-800 leading-[1.1] tracking-tight mb-6">
              Give a Pet a{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-amber-500">Forever</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-200 rounded-sm -z-0"></span>
              </span>{" "}
              Home
            </h1>

            <p className="text-neutral-500 text-lg leading-relaxed mb-8 max-w-md">
              Thousands of loving animals are waiting for someone just like you. Browse, connect, and begin your adoption journey today.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/pets"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors duration-200"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Adopt Now
              </Link>
              <Link
                href="/pets"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-sm px-7 py-3.5 rounded-xl border border-neutral-200 transition-colors duration-200"
              >
                Browse All Pets
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              <StatBadge number="1,200+" label="Pets adopted" />
              <StatBadge number="800+"   label="Happy families" />
              <StatBadge number="50+"    label="Breeds" />
            </div>
          </div>

          {/* Right — stacked card slider */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-96">

              {/* decorative circles behind cards */}
              <div className="absolute top-1/2 right-0 w-56 h-56 bg-teal-100 rounded-full opacity-40 -translate-y-1/2 translate-x-8 z-0" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-100 rounded-full opacity-50 translate-y-6 -translate-x-4 z-0" />

              {/* card stack */}
              <div className="relative w-full h-full">
                <AnimatePresence>
                  {cards.map((pet, i) => (
                    <motion.div
                      key={pet.id}
                      custom={i}
                      variants={cardVariants}
                      initial={i === 0 ? "exit" : "behind"}
                      animate={i === 0 ? "active" : "behind"}
                      exit="exit"
                      className="absolute inset-0 w-full h-full"
                      style={{ transformOrigin: "bottom center" }}
                    >
                      <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${pet.bg} border border-white/80 flex flex-col overflow-hidden`}>
                        {/* image area */}
                        <div className="flex-1 flex items-center justify-center">
                          <span className="text-8xl">{pet.emoji}</span>
                        </div>

                        {/* info strip */}
                        <div className="bg-white/80 backdrop-blur-sm px-5 py-4 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-neutral-800 text-lg leading-tight">{pet.name}</p>
                            <p className="text-neutral-400 text-xs mt-0.5">{pet.age} · {pet.location}</p>
                          </div>
                          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${pet.badgeColor}`}>
                            {pet.species}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* manual next button */}
              <button
                onClick={handleNext}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-white border border-neutral-200 hover:border-amber-300 hover:bg-amber-50 text-neutral-600 hover:text-amber-600 text-xs font-medium px-5 py-2 rounded-full transition-all duration-200 z-40"
              >
                Next pet
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

              {/* dot indicators */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 z-40">
                {pets.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      cards[0]?.id === pets[i]?.id
                        ? "w-5 bg-amber-400"
                        : "w-1.5 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;