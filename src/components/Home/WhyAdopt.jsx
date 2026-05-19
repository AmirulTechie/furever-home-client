"use client";

const reasons = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    iconBg: "bg-rose-50 text-rose-500",
    title: "Save a Life",
    desc: "Adopted pets come from shelters facing overcrowding. Your decision directly gives a life a second chance.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    iconBg: "bg-amber-50 text-amber-500",
    title: "Already Socialized",
    desc: "Many adult rescue pets are house-trained, calm, and ready to bond. Less work, more love from day one.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    iconBg: "bg-teal-50 text-teal-500",
    title: "Affordable Fees",
    desc: "Adoption costs far less than buying from breeders. Most fees include vaccinations and health checkups.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    iconBg: "bg-violet-50 text-violet-500",
    title: "Health Verified",
    desc: "Every pet listed on FurEver Home is vet-checked and vaccinated before being made available for adoption.",
  },
];

const WhyAdopt = () => {
  return (
    <section className="bg-[#F7F5F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* left — image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden h-56">
                <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80" alt="Dog with family" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden h-56 mt-8">
                <img src="https://images.unsplash.com/photo-1518288774672-b94e808873ff?w=400&q=80" alt="Cat being held" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden h-44 -mt-4">
                <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80" alt="Two dogs playing" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden h-44">
                <img src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&q=80" alt="Happy dog" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-5 py-4 border border-neutral-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 text-xl">🐾</div>
              <div>
                <p className="font-bold text-neutral-800 text-sm">1,200+ Adoptions</p>
                <p className="text-neutral-400 text-xs">and counting every day</p>
              </div>
            </div>
          </div>

          {/* right — reasons */}
          <div>
            <span className="inline-block bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
              Why adopt?
            </span>
            <h2 className="text-4xl font-extrabold text-neutral-800 tracking-tight mb-3">
              Every Adoption Changes{" "}
              <span className="text-amber-500">Two Lives</span>
            </h2>
            <p className="text-neutral-500 text-base mb-8 max-w-md">
              When you adopt, you gain a loyal companion and give a pet the safe, loving home they deserve.
            </p>

            <div className="flex flex-col gap-5">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${r.iconBg}`}>
                    {r.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm mb-0.5">{r.title}</p>
                    <p className="text-neutral-500 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;