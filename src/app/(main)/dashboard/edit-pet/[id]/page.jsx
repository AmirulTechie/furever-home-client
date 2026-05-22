"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function EditPetPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [formData, setFormData] = useState({
    petName: "",
    species: "",
    breed: "",
    adoptionFee: "",
    imageURL: "",
    status: "available",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchPetDetails = async () => {
      try {
        const tokenData = await authClient.token();
        const token = tokenData?.data?.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load pet data");
        const data = await res.json();

        setFormData({
          petName: data.petName || "",
          species: data.species || "",
          breed: data.breed || "",
          adoptionFee: data.adoptionFee || "",
          imageURL: data.imageURL || "",
          status: data.status || "available",
        });
      } catch (err) {
        setError(err.message || "Something went wrong loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token;

      // Fixed: Updated method to PATCH to perfectly match your backend API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          adoptionFee: Number(formData.adoptionFee),
        }),
      });

      if (!res.ok) throw new Error("Failed to update pet profile");

      router.push("/dashboard/my-listings");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to update listing configuration.");
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-sm text-neutral-500 font-medium">Loading data structural arrays...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50/40 px-6 py-12">
      <div className="max-w-xl mx-auto bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Edit Pet Profile</h1>
          <p className="text-neutral-500 text-xs mt-0.5">Modify parameters for ID: {id}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">Pet Name</label>
            <input
              type="text"
              name="petName"
              required
              value={formData.petName}
              onChange={handleChange}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">Species</label>
              <input
                type="text"
                name="species"
                required
                value={formData.species}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">Breed</label>
              <input
                type="text"
                name="breed"
                required
                value={formData.breed}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">Adoption Fee ($)</label>
            <input
              type="number"
              name="adoptionFee"
              required
              min="0"
              value={formData.adoptionFee}
              onChange={handleChange}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">Image URL</label>
            <input
              type="url"
              name="imageURL"
              required
              value={formData.imageURL}
              onChange={handleChange}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="available">Available</option>
              <option value="adopted">Adopted</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-neutral-100">
            <Link
              href="/dashboard/my-listings"
              className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold py-2.5 rounded-xl text-center border border-neutral-200 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}