"use client";

const steps = [
  {
    number: "01",
    title: "Browse Pets",
    description: "Explore available pets by species, breed, age, or location. Use filters to find your perfect match.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    badgeColor: "bg-amber-400 text-amber-900",
    iconBg: "bg-amber-50 text-amber-500",
    connectorColor: "from-amber-300 to-teal-300",
  },
  {
    number: "02",
    title: "View Profile",
    description: "Read full details about the pet's health status, personality, vaccination record, and care needs.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    badgeColor: "bg-teal-500 text-white",
    iconBg: "bg-teal-50 text-teal-500",
    connectorColor: "from-teal-300 to-rose-300",
  },
  {
    number: "03",
    title: "Submit Request",
    description: "Fill out a simple adoption form with your pickup date and a short message. Takes less than 2 minutes.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
    badgeColor: "bg-rose-400 text-white",
    iconBg: "bg-rose-50 text-rose-500",
    connectorColor: "from-rose-300 to-violet-300",
  },
  {
    number: "04",
    title: "Welcome Home",
    description: "Get approval from the pet owner and bring your new companion home to start your journey together.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    badgeColor: "bg-violet-400 text-white",
    iconBg: "bg-violet-50 text-violet-500",
    connectorColor: null,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            How it works
          </span>
          <h2 className="text-4xl font-extrabold text-neutral-800 tracking-tight mb-3">
            Adopt in 4 Simple Steps
          </h2>
          <p className="text-neutral-500 text-base max-w-md mx-auto">
            We made the adoption process easy, transparent, and stress-free for everyone
          </p>
        </div>

        {/* steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">

              {/* connector line between cards — desktop only */}
              {step.connectorColor && (
                <div className={`hidden lg:block absolute top-12 left-[calc(50%+56px)] w-[calc(100%-56px)] h-0.5 bg-linear-to-r ${step.connectorColor} z-0`} />
              )}

              {/* icon circle */}
              <div className={`relative z-10 w-24 h-24 rounded-2xl ${step.iconBg} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200`}>
                {step.icon}
                {/* step number badge */}
                <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${step.badgeColor}`}>
                  {i + 1}
                </span>
              </div>

              {/* text */}
              <h3 className="font-bold text-neutral-800 text-lg mb-2">{step.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-50">{step.description}</p>
            </div>
          ))}
        </div>

        {/* bottom CTA strip */}
        <div className="mt-16 bg-[#F7F5F0] rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-neutral-800 text-lg">Ready to find your companion?</p>
            <p className="text-neutral-500 text-sm mt-0.5">Hundreds of pets are waiting for a loving home right now.</p>
          </div>
          <a
            href="/pets"
            className="shrink-0 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm px-7 py-3 rounded-xl transition-colors duration-200"
          >
            Start Browsing
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;