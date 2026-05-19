"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-4">

      {/* background paw watermarks */}
      <svg viewBox="0 0 60 60" className="absolute top-10 left-10 w-40 h-40 text-amber-100 fill-current rotate-[-15deg] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/><circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
        <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
      </svg>
      <svg viewBox="0 0 60 60" className="absolute bottom-10 right-10 w-56 h-56 text-amber-100 fill-current rotate-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/><circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
        <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
      </svg>

      <div className="relative z-10 text-center max-w-lg mx-auto">

        {/* illustration */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-48 h-48 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-8xl select-none">🐕</span>
          </div>
          {/* 404 badge */}
          <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-900 font-extrabold text-lg px-4 py-1.5 rounded-2xl rotate-6 shadow-sm">
            404
          </div>
        </div>

        {/* text */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-800 tracking-tight mb-3">
          Oops! Page Not Found
        </h1>
        <p className="text-neutral-500 text-base leading-relaxed mb-8">
          Looks like this page ran off like an excited puppy. It may have been moved, deleted, or never existed in the first place.
        </p>

        {/* actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors duration-200"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </Link>
          <Link
            href="/pets"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-sm px-7 py-3.5 rounded-xl border border-neutral-200 transition-colors duration-200"
          >
            Browse Pets
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* subtle helper links */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {["Home", "All Pets", "Add Pet", "Login"].map((label, i) => (
            <Link
              key={i}
              href={label === "Home" ? "/" : `/${label.toLowerCase().replace(" ", "-")}`}
              className="text-neutral-400 hover:text-amber-500 text-xs transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;