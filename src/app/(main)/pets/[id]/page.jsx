"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const speciesBadgeColor = (species) => {
  const map = {
    Dog: "bg-amber-100 text-amber-700",
    Cat: "bg-teal-100 text-teal-700",
    Rabbit: "bg-rose-100 text-rose-700",
    Bird: "bg-violet-100 text-violet-700",
  };
  return map[species] || "bg-neutral-100 text-neutral-600";
};

const StatRow = ({ icon, label, value }) => (
  <div>
    <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-1">{label}</p>
    <p className="text-neutral-800 font-semibold flex items-center gap-2">
      <span className="text-amber-500">{icon}</span>
      {value}
    </p>
  </div>
);

const OwnerModal = ({ pet, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center border border-neutral-100">
      <div className="text-5xl mb-4">🐾</div>
      <h3 className="text-xl font-extrabold text-neutral-800 mb-2">This is your listing</h3>
      <p className="text-neutral-500 text-sm mb-6">
        You listed <span className="font-semibold text-neutral-700">{pet.petName}</span>. Pet owners cannot submit adoption requests for their own pets.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-sm py-3 rounded-xl transition-colors duration-200 cursor-pointer"
        >
          Close
        </button>
        <Link
          href="/dashboard/my-listings"
          className="flex-1 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm py-3 rounded-xl transition-colors duration-200 text-center"
        >
          My Listings
        </Link>
      </div>
    </div>
  </div>
);

const AdoptionModal = ({ pet, user, onClose }) => {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({ pickupDate: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoption-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          petId: pet._id,
          petName: pet.petName,
          petImage: pet.imageURL,
          requesterEmail: user.email,
          requesterName: user.name,
          pickupDate: form.pickupDate,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to submit request.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center border border-neutral-100">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h3 className="text-xl font-extrabold text-neutral-800 mb-2">Request Sent!</h3>
          <p className="text-neutral-500 text-sm mb-6">
            Your adoption request for{" "}
            <span className="font-semibold text-neutral-700">{pet.petName}</span>{" "}
            has been submitted. The owner will review it soon.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm py-3 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-neutral-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors cursor-pointer"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 className="text-2xl font-extrabold text-neutral-800 mb-1">Adopt {pet.petName}</h2>
        <p className="text-neutral-400 text-sm mb-6">Fill in the details below to submit your request</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Pet Name</label>
            <input type="text" value={pet.petName} readOnly className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-400 text-sm cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Your Name</label>
            <input type="text" value={user?.name || ""} readOnly className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-400 text-sm cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Your Email</label>
            <input type="email" value={user?.email || ""} readOnly className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-400 text-sm cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs fon
            t-semibold text-neutral-700 mb-1.5">Pickup Date</label>
            <input
              type="date"
              value={form.pickupDate}
              min={today}
              onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Message to Owner</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell the owner a little about yourself and why you'd like to adopt..."
              rows={3}
              required
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200 resize-none"
            />
          </div>

          {error && (
            <p className="text-rose-500 text-xs font-medium bg-rose-50 border border-rose-200 px-4 py-3 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold text-sm py-3.5 rounded-xl transition-colors duration-200 mt-1 cursor-pointer ${
              loading ? "bg-neutral-100 text-neutral-400 cursor-not-allowed" : "bg-amber-400 hover:bg-amber-500 text-amber-900"
            }`}
          >
            {loading ? "Submitting..." : "Submit Adoption Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
    <div className="max-w-5xl mx-auto">
      <div className="h-4 bg-neutral-200 rounded w-36 mb-8" />
      <div className="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 h-80 lg:h-auto min-h-[400px] bg-neutral-100" />
        <div className="lg:w-1/2 p-10 space-y-4">
          <div className="h-8 bg-neutral-100 rounded w-1/2" />
          <div className="h-4 bg-neutral-100 rounded w-1/3" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-10 bg-neutral-100 rounded" />)}
          </div>
          <div className="h-24 bg-neutral-100 rounded mt-4" />
          <div className="h-14 bg-neutral-100 rounded-xl mt-4" />
        </div>
      </div>
    </div>
  </div>
);

export default function PetDetailsPage({ params }) {
  const { id } = use(params);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user || null;

useEffect(() => {
  const fetchPet = async () => {
    try {
      let token = null;
      try {
        const tokenData = await authClient.token();
        token = tokenData?.data?.token;
      } catch {
      }

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, { headers });

      if (!res.ok) throw new Error("fetch failed");

      const data = await res.json();
      setPet(data);
    } catch {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`);
        const data = await res.json();
        setPet(data.find((p) => p._id === id) || null);
      } catch {
        setPet(null);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchPet();
}, [id]);

  const isOwner = user && pet && user.email === pet.ownerEmail;
  const isAdopted = pet?.status === "adopted";

  const handleAdoptClick = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    if (isOwner) {
      setShowOwnerModal(true);
      return;
    }
    setShowModal(true);
  };

  if (loading) return <Skeleton />;

  if (!pet) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="text-6xl">🐾</div>
        <h2 className="text-2xl font-extrabold text-neutral-800">Pet not found</h2>
        <p className="text-neutral-500 text-sm">This pet may have already been adopted or the link is incorrect.</p>
        <Link href="/pets" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200">
          Browse All Pets
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link href="/pets" className="inline-flex items-center gap-2 text-neutral-500 hover:text-amber-600 font-medium mb-6 transition-colors duration-200">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to all pets
          </Link>

          <div className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative h-80 lg:h-auto min-h-[400px]">
              <img src={pet.imageURL} alt={pet.petName} className="w-full h-full object-cover" />
              {pet.vaccinationStatus === "Fully Vaccinated" && (
                <span className="absolute top-5 left-5 bg-teal-500 text-white text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                  Fully Vaccinated
                </span>
              )}
              {isAdopted && (
                <span className="absolute top-5 right-5 bg-neutral-800 text-white text-sm font-medium px-3 py-1.5 rounded-full">
                  Adopted
                </span>
              )}
              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-neutral-100">
                <p className="text-xs text-neutral-400">Adoption Fee</p>
                <p className="text-xl font-extrabold text-amber-500">${pet.adoptionFee}</p>
              </div>
            </div>

            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
              <h1 className="text-4xl font-extrabold text-neutral-800 tracking-tight mb-2">{pet.petName}</h1>

              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className={`text-sm font-semibold px-4 py-1.5 rounded-full ${speciesBadgeColor(pet.species)}`}>{pet.species}</span>
                <span className="bg-neutral-100 text-neutral-600 text-sm font-medium px-4 py-1.5 rounded-full">{pet.breed}</span>
                {isOwner && (
                  <span className="bg-amber-50 text-amber-600 border border-amber-200 text-xs font-medium px-3 py-1.5 rounded-full">Your listing</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-5 mb-8">
                <StatRow label="Age" value={pet.age} icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} />
                <StatRow label="Gender" value={pet.gender} icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>} />
                <StatRow label="Location" value={pet.location} icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>} />
                <StatRow label="Health" value={pet.healthStatus} icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>} />
              </div>

              <div className="mb-10 flex-1">
                <h3 className="text-lg font-bold text-neutral-800 mb-3">About {pet.petName}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm">{pet.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button
                  onClick={handleAdoptClick}
                  disabled={isAdopted}
                  className={`flex-1 font-bold text-base py-4 px-6 rounded-xl transition-all duration-200 cursor-pointer ${
                    isAdopted
                      ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      : "bg-amber-400 hover:bg-amber-500 text-amber-900"
                  }`}
                >
                  {isAdopted ? "Already Adopted" : `Adopt ${pet.petName}`}
                </button>
              </div>

              {!user && (
                <p className="text-xs text-neutral-400 text-center mt-3">
                  You need to{" "}
                  <Link href="/login" className="text-amber-500 hover:text-amber-600 font-semibold">log in</Link>
                  {" "}to submit an adoption request
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && <AdoptionModal pet={pet} user={user} onClose={() => setShowModal(false)} />}
      {showOwnerModal && <OwnerModal pet={pet} onClose={() => setShowOwnerModal(false)} />}
    </>
  );
}