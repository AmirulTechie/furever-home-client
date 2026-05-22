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
      desc: "Track your adoption requests",
      count: stats.requests,
      countLabel: "requests",
      color: "from-violet-500/10 to-violet-500/5",
      border: "border-violet-500/20 hover:border-violet-500/40",
      iconBg: "bg-violet-500/10",
      icon: (
        <svg width="20" height="20" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
    },
    {
      href: "/dashboard/add-pet",
      label: "Add Pet",
      desc: "List a new pet for adoption",
      count: null,
      color: "from-amber-500/10 to-amber-500/5",
      border: "border-amber-500/20 hover:border-amber-500/40",
      iconBg: "bg-amber-500/10",
      icon: (
        <svg width="20" height="20" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      ),
    },
    {
      href: "/dashboard/my-listings",
      label: "My Listings",
      desc: "Manage your listed pets",
      count: stats.listings,
      countLabel: "pets listed",
      color: "from-teal-500/10 to-teal-500/5",
      border: "border-teal-500/20 hover:border-teal-500/40",
      iconBg: "bg-teal-500/10",
      icon: (
        <svg width="20" height="20" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* greeting */}
        <div className="mb-10">
          <p className="text-neutral-500 text-sm mb-1">Welcome back</p>
          <h1 className="text-3xl font-extrabold text-neutral-900">
            {user?.name?.split(" ")[0] || "There"} 👋
          </h1>
          <p className="text-neutral-500 text-sm mt-1">{user?.email}</p>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`bg-gradient-to-br ${card.color} ${card.border} border rounded-2xl p-6 transition-all duration-200 group`}
            >
              <div className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <p className="text-neutral-900 font-bold text-base mb-1 group-hover:text-amber-600 transition-colors">{card.label}</p>
              <p className="text-neutral-500 text-xs mb-3">{card.desc}</p>
              {card.count !== null && !loading && (
                <p className="text-2xl font-extrabold text-neutral-900">
                  {card.count} <span className="text-xs font-normal text-neutral-500">{card.countLabel}</span>
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* quick links */}
        <div className="mt-8 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <p className="text-neutral-500 text-xs font-semibold uppercase tracking-widest mb-4">Quick Actions</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/pets" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200">
              Browse Pets
            </Link>
            <Link href="/dashboard/add-pet" className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-sm px-5 py-2.5 rounded-xl border border-neutral-200 transition-colors duration-200">
              + List a Pet
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}