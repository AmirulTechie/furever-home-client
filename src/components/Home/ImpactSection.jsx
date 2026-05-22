"use client";

import Link from "next/link";

const stats = [
  { value: "320+", title: "Successful Placements", desc: "Animals connected with dedicated lifelong guardians." },
  { value: "12 Days", title: "Average Placement Turn", desc: "Inquiries process smoothly into real physical safe shelter." },
  { value: "100%", title: "Zero Listing Overhead", desc: "Platform operations handle structural management free of cost." }
];

const ImpactSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl shadow-neutral-900/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />

          <div className="max-w-2xl mb-12 relative z-10">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1.5">Platform Performance</span>
            <h2 className="text-3xl font-black text-white tracking-tight sm:text-4xl">Our Shared Community Footprint</h2>
            <p className="text-neutral-400 text-sm mt-2">Connecting shelter architecture configurations with safe domestic environments across real operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-neutral-800 pt-10 relative z-10">
            {stats.map((stat) => (
              <div key={stat.title} className="flex flex-col justify-between">
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">{stat.value}</p>
                  <h3 className="text-white font-bold text-base mt-2">{stat.title}</h3>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <p className="text-xs text-neutral-400 font-medium">Want to support our operations? Register your listings or adopt today.</p>
            <Link
              href="/dashboard/add-pet"
              className="bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              List an Animal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;