"use client";

import Link from "next/link";

const pillars = [
  {
    title: "Verified Community Connect",
    desc: "Every interaction connects direct pet guardians with prospective adopters. No third-party brokers, no middleman handling overhead.",
    badge: "Direct Contact",
    bgClass: "bg-white border-neutral-200/60 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.02)]",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Transparent Health Logs",
    desc: "Review vaccination histories, behavioral documentation, and dietary care schedules openly before moving forward with an adoption request.",
    badge: "100% Transparency",
    bgClass: "bg-white border-neutral-200/60 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.02)]",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: "Zero Operational Costs",
    desc: "We operate completely free of platform service charges. Every resource goes directly toward facilitating a seamless transition for the animals.",
    badge: "Community Resource",
    bgClass: "bg-white border-neutral-200/60 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.02)]",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <circle cx="12" cy="12" r="2"/>
        <path d="M6 12h.01M18 12h.01"/>
      </svg>
    ),
  }
];

const PlatformTrust = () => {
  return (
    <section className="bg-neutral-50/50 py-24 border-y border-neutral-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1.5">Core Philosophy</span>
          <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Built on Safety, Clarity, & Trust</h2>
          <p className="text-neutral-500 text-sm mt-2">A simplified, ethical ecosystem designed around animal welfare and secure placement coordination.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={`border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${pillar.bgClass}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide bg-neutral-100 border border-neutral-200/40 px-2.5 py-1 rounded-md">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-neutral-900 font-bold text-base mb-2 tracking-tight">{pillar.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-400 font-medium">
            Have questions about our security frameworks?{" "}
            <Link href="/pets" className="text-neutral-700 underline font-semibold hover:text-amber-600 transition-colors">
              Explore Available Profiles
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
};

export default PlatformTrust;