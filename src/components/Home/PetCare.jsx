"use client";

const tips = [
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    tag: "Nutrition",
    tagColor: "bg-teal-100 text-teal-700",
    title: "Feed the Right Diet",
    desc: "Always provide age-appropriate food and fresh water daily. Puppies, adults, and seniors have different nutritional needs — talk to your vet about the right plan.",
    tip: "Pro tip: Avoid feeding pets human food like chocolate, onions, or grapes — these are toxic.",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    tag: "Exercise",
    tagColor: "bg-amber-100 text-amber-700",
    title: "Keep Them Active",
    desc: "Daily walks and play sessions keep your pet physically fit and mentally stimulated. Dogs need at least 30 minutes of activity a day, while cats benefit from interactive toys.",
    tip: "Pro tip: Rotate toys weekly to keep playtime exciting and engaging for your pet.",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    tag: "Health",
    tagColor: "bg-rose-100 text-rose-700",
    title: "Schedule Regular Vet Visits",
    desc: "Annual checkups catch health issues early. Keep all vaccinations up to date and schedule dental cleanings at least once a year to prevent common issues.",
    tip: "Pro tip: Keep a health journal for your pet — track vaccinations, medications, and vet visits.",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    tag: "Bonding",
    tagColor: "bg-violet-100 text-violet-700",
    title: "Build Trust Early",
    desc: "Spend quality time with your pet daily. Gentle handling, consistent routines, and positive reinforcement help newly adopted pets feel safe and secure in their new home.",
    tip: "Pro tip: Give a new pet 3 days to decompress, 3 weeks to learn routines, 3 months to feel at home.",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    tag: "Grooming",
    tagColor: "bg-amber-100 text-amber-700",
    title: "Groom Regularly",
    desc: "Regular brushing, nail trimming, and baths keep your pet comfortable and healthy. Long-haired breeds may need more frequent grooming to prevent matting.",
    tip: "Pro tip: Start grooming habits early — pets get used to it faster when introduced young.",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    tag: "Environment",
    tagColor: "bg-teal-100 text-teal-700",
    title: "Create a Safe Space",
    desc: "Give your pet a dedicated resting area away from noise and foot traffic. A comfortable bed, familiar scents, and a quiet corner help reduce anxiety, especially for new pets.",
    tip: "Pro tip: Use a crate as a safe den — never as punishment — so your pet sees it as their retreat.",
  },
];

const PetCareTips = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Pet care tips
          </span>
          <h2 className="text-4xl font-extrabold text-neutral-800 tracking-tight mb-3">
            Keep Your Pet Happy & Healthy
          </h2>
          <p className="text-neutral-500 text-base max-w-md mx-auto">
            Simple, practical tips every new pet owner should know before and after adoption
          </p>
        </div>

        {/* tips grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <div key={i} className="bg-[#F7F5F0] rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tip.iconBg} ${tip.iconColor}`}>
                  {tip.icon}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tip.tagColor}`}>
                  {tip.tag}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-neutral-800 text-base mb-1.5">{tip.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{tip.desc}</p>
              </div>

              <div className="bg-white rounded-xl px-4 py-3 border border-neutral-100">
                <p className="text-xs text-neutral-500 leading-relaxed">{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PetCareTips;