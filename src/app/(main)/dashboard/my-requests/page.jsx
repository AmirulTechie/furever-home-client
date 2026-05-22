/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";

const statusStyle = {
  pending: "bg-amber-50 text-amber-700 border-amber-200/80",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  rejected: "bg-rose-50 text-rose-700 border-rose-200/80",
};

const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-5 bg-white border border-neutral-200/50 rounded-2xl animate-pulse">
    <div className="w-12 h-12 bg-neutral-100 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-neutral-100 rounded w-1/3" />
      <div className="h-3 bg-neutral-100 rounded w-1/4" />
    </div>
    <div className="h-6 w-16 bg-neutral-100 rounded-full" />
  </div>
);

export default function MyRequestsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    if (!user?.email) return;
    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/adoption-requests?email=${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user?.email]);

  const handleCancel = async (id) => {
    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token;

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoption-requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch {
      // fail silently
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/40 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 border-b border-neutral-200/40 pb-6">
          <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Inquiries Log
          </span>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">My Adoption Requests</h1>
          <p className="text-neutral-400 text-xs mt-1">Review, monitor, and manage ongoing animal placement inquiries.</p>
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => <SkeletonRow key={i} />)}
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-neutral-200/60 rounded-2xl py-16 flex flex-col items-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
            <div className="text-4xl mb-3 select-none">📋</div>
            <h3 className="text-neutral-800 font-bold text-base mb-1">No requests logged</h3>
            <p className="text-neutral-400 text-xs mb-5 max-w-sm">You haven't submitted any adoption inquiries yet. Discover pets looking for a home.</p>
            <Link
              href="/pets"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              Browse Registry
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {requests.map((req) => (
              <div
                key={req._id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white border border-neutral-200/60 rounded-2xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/40 flex-shrink-0 shadow-inner">
                  {req.petImage ? (
                    <img src={req.petImage} alt={req.petName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl bg-neutral-50">🐾</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-neutral-800 font-bold text-sm tracking-tight">{req.petName}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5">
                    <p className="text-neutral-400 text-[11px]">
                      Filed: <span className="font-medium text-neutral-500">{new Date(req.createdAt).toLocaleDateString("en-GB")}</span>
                    </p>
                    <p className="text-neutral-400 text-[11px]">
                      Pickup: <span className="font-medium text-neutral-500">{req.pickupDate}</span>
                    </p>
                  </div>
                </div>

                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border capitalize self-start sm:self-auto text-center ${statusStyle[req.status] || statusStyle.pending}`}>
                  • {req.status}
                </span>

                <div className="flex gap-2 border-t sm:border-t-0 border-neutral-100 pt-3 sm:pt-0 justify-end">
                  <Link
                    href={`/pets/${req.petId}`}
                    className="inline-flex items-center justify-center text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    View Card
                  </Link>
                  {req.status === "pending" && (
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="inline-flex items-center justify-center text-xs font-semibold text-rose-600 hover:text-rose-700 border border-rose-100 hover:bg-rose-50/40 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}