"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";

const statusStyle = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-teal-50 text-teal-700 border-teal-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-2xl animate-pulse">
    <div className="w-14 h-14 bg-neutral-200 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-neutral-200 rounded w-1/3" />
      <div className="h-3 bg-neutral-200 rounded w-1/4" />
    </div>
    <div className="h-6 w-20 bg-neutral-200 rounded-full" />
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
            <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
            My Requests
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-900">My Adoption Requests</h1>
          <p className="text-neutral-500 text-sm mt-1">Track the status of all your adoption requests here.</p>
        </div>

        {/* content */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => <SkeletonRow key={i} />)}
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl py-20 flex flex-col items-center text-center shadow-sm">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-neutral-900 font-bold text-lg mb-2">No requests yet</h3>
            <p className="text-neutral-500 text-sm mb-6">Browse available pets and submit your first adoption request.</p>
            <Link
              href="/pets"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200"
            >
              🐾 Browse Pets
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((req) => (
              <div
                key={req._id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white border border-neutral-200 rounded-2xl hover:border-neutral-300 transition-all duration-200 shadow-sm"
              >
                {/* pet image */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0">
                  {req.petImage ? (
                    <img src={req.petImage} alt={req.petName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🐾</div>
                  )}
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <p className="text-neutral-900 font-semibold text-sm">{req.petName}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <p className="text-neutral-500 text-xs">
                      Requested: {new Date(req.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <p className="text-neutral-500 text-xs">
                      Pickup: {req.pickupDate}
                    </p>
                  </div>
                </div>

                {/* status */}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize text-center sm:text-left ${statusStyle[req.status] || statusStyle.pending}`}>
                  {req.status}
                </span>

                {/* actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/pets/${req.petId}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    View
                  </Link>
                  {req.status === "pending" && (
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 border border-rose-200 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
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