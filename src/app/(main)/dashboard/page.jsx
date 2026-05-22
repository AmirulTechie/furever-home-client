"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [stats, setStats] = useState({ listings: 0, requests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        const tokenData = await authClient.token();
        const token = tokenData?.data?.token;

        const [petsRes, reqRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-pets?email=${user.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoption-requests?email=${user.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const pets = await petsRes.json();
        const reqs = await reqRes.json();

        setStats({
          listings: Array.isArray(pets) ? pets.length : 0,
          requests: Array.isArray(reqs) ? reqs.length : 0,
        });
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.email]);

  const cards = [
    {
      href: "/dashboard/my-requests",
      label: "My Requests",
      desc: "Track active adoption inquiries",
      count: stats.requests,
      countLabel: "requests submitted",
      color: "from-violet-500/5 to-transparent",
      border: "border-neutral-200/70 hover:border-violet-500/30",
      iconBg: "bg-violet-50 text-violet-600",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
    },
    {
      href: "/dashboard/add-pet",
      label: "Add Pet",
      desc: "List a new animal buddy",
      count: null,
      color: "from-amber-500/5 to-transparent",
      border: "border-neutral-200/70 hover:border-amber-500/30",
      iconBg: "bg-amber-50 text-amber-600",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      ),
    },
    {
      href: "/dashboard/my-listings",
      label: "My Listings",
      desc: "Overview your hosted listings",
      count: stats.listings,
      countLabel: "active pet cards",
      color: "from-teal-500/5 to-transparent",
      border: "border-neutral-200/70 hover:border-teal-500/30",
      iconBg: "bg-teal-50 text-teal-600",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50/40 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">Account Dashboard</p>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
              Hello, {user?.name || "User"} 👋
            </h1>
            <p className="text-neutral-500 text-xs mt-0.5">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`bg-white bg-gradient-to-br ${card.color} ${card.border} border rounded-2xl p-5 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06)] transform hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                <div className={`w-9 h-9 ${card.iconBg} rounded-xl flex items-center justify-center mb-4 border border-current/5`}>
                  {card.icon}
                </div>
                <p className="text-neutral-800 font-bold text-base mb-1 group-hover:text-amber-600 transition-colors">{card.label}</p>
                <p className="text-neutral-400 text-xs mb-4 line-clamp-2">{card.desc}</p>
              </div>
              {card.count !== null && !loading && (
                <div className="border-t border-neutral-100/70 pt-3 mt-2">
                  <p className="text-2xl font-black text-neutral-900 tracking-tight">
                    {card.count} <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block sm:inline sm:ml-1">{card.countLabel}</span>
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-4">Quick Operations</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/pets" className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow-md shadow-amber-500/10 transition-colors">
              🐾 Open Explorer
            </Link>
            <Link href="/dashboard/add-pet" className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs px-5 py-2.5 rounded-full border border-neutral-200/60 transition-colors">
              ＋ Register New Entry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}