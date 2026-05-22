/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";

const RequestsModal = ({ pet, onClose, onUpdate }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const tokenData = await authClient.token();
        const token = tokenData?.data?.token;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/adoption-requests/pet/${pet._id}`,
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
    fetchRequests();
  }, [pet._id]);

  const handleDecision = async (reqId, decision) => {
    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token;
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoption-requests/${reqId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: decision, petId: pet._id }),
      });
      setRequests((prev) =>
        prev.map((r) => (r._id === reqId ? { ...r, status: decision } : r))
      );
      if (decision === "approved") onUpdate();
    } catch {
    }
  };

  const hasApproved = requests.some((r) => r.status === "approved");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-neutral-900/40 backdrop-blur-sm">
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors cursor-pointer"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 className="text-neutral-900 font-bold text-lg mb-1">Adoption Requests</h2>
        <p className="text-neutral-500 text-sm mb-5">For <span className="text-amber-600 font-medium">{pet.petName}</span></p>

        {loading ? (
          <div className="text-center py-10 text-neutral-500 text-sm">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-neutral-500 text-sm">No requests yet for this pet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((req) => (
              <div key={req._id} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-neutral-900 text-sm font-semibold">{req.requesterName}</p>
                    <p className="text-neutral-500 text-xs">{req.requesterEmail}</p>
                    <p className="text-neutral-500 text-xs mt-1">Pickup: {req.pickupDate}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize flex-shrink-0 ${
                    req.status === "approved" ? "bg-teal-50 text-teal-700 border-teal-200" :
                    req.status === "rejected" ? "bg-rose-50 text-rose-700 border-rose-200" :
                    "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {req.status}
                  </span>
                </div>
                {req.message && (
                  <p className="text-neutral-600 text-xs bg-neutral-100 rounded-lg px-3 py-2 mb-3 italic">"{req.message}"</p>
                )}
                {req.status === "pending" && !hasApproved && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDecision(req._id, "approved")}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecision(req._id, "rejected")}
                      className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DeleteModal = ({ pet, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token;
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${pet._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleted(pet._id);
      onClose();
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-neutral-900/40 backdrop-blur-sm">
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
        <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <svg width="20" height="20" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </div>
        <h3 className="text-neutral-900 font-bold text-lg mb-2">Delete {pet.petName}?</h3>
        <p className="text-neutral-500 text-sm mb-6">This will permanently remove this listing. This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold py-2.5 rounded-xl border border-neutral-200 transition-colors cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MyListingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsModal, setRequestsModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);   

  const fetchPets = async () => {
    if (!user?.email) return;
    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-pets?email=${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setPets(Array.isArray(data) ? data : []);
    } catch {
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [user?.email]);

  const handleDeleted = (id) => setPets((prev) => prev.filter((p) => p._id !== id));

  const available = pets.filter((p) => p.status !== "adopted").length;
  const adopted = pets.filter((p) => p.status === "adopted").length;

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
            My Listings
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-900">My Pet Listings</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage the pets you've listed for adoption.</p>
        </div>
        {!loading && pets.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: "Total", value: pets.length, color: "text-neutral-900" },
              { label: "Available", value: available, color: "text-teal-600" },
              { label: "Adopted", value: adopted, color: "text-amber-600" },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-neutral-200 rounded-xl p-4 text-center shadow-sm">
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-neutral-500 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white border border-neutral-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : pets.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl py-20 flex flex-col items-center text-center shadow-sm">
            <div className="text-5xl mb-4">🐾</div>
            <h3 className="text-neutral-900 font-bold text-lg mb-2">No listings yet</h3>
            <p className="text-neutral-500 text-sm mb-6">List your first pet for adoption.</p>
            <Link
              href="/dashboard/add-pet"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200"
            >
              + Add Pet
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white border border-neutral-200 rounded-2xl hover:border-neutral-300 transition-all duration-200 shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0">
                  <img src={pet.imageURL} alt={pet.petName} className="w-full h-full object-cover" />
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-neutral-900 font-semibold text-sm">{pet.petName}</p>
                    {pet.status === "adopted" && (
                      <span className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full">Adopted</span>
                    )}
                  </div>
                  <p className="text-neutral-500 text-xs mt-0.5">{pet.species} · {pet.breed}</p>
                  <p className="text-amber-600 text-xs font-semibold mt-0.5">${pet.adoptionFee}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setRequestsModal(pet)}
                    className="text-xs font-medium text-violet-600 border border-violet-200 hover:bg-violet-50 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    Requests
                  </button>
                  <Link
                    href={`/dashboard/edit-pet/${pet._id}`}
                    className="text-xs font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/pets/${pet._id}`}
                    className="text-xs font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => setDeleteModal(pet)}
                    className="text-xs font-medium text-rose-600 border border-rose-200 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {requestsModal && (
        <RequestsModal
          pet={requestsModal}
          onClose={() => setRequestsModal(null)}
          onUpdate={fetchPets}
        />
      )}

      {deleteModal && (
        <DeleteModal
          pet={deleteModal}
          onClose={() => setDeleteModal(null)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}