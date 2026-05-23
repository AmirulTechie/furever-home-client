"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const speciesList = ["Dog", "Cat", "Bird", "Rabbit", "Guinea Pig", "Hamster", "Other"];
const healthStatusList = ["Healthy", "Minor Issues", "Under Treatment", "Needs Special Care"];
const vaccinationStatusList = ["Fully Vaccinated", "Partially Vaccinated", "Not Vaccinated"];
const genderList = ["Male", "Female"];

const FormField = ({ label, required, hint, children }) => (
  <div>
    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
      {label} {required && <span className="text-rose-400">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-neutral-400 mt-1.5">{hint}</p>}
  </div>
);

const inputClass = "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200";
const selectClass = `${inputClass} cursor-pointer appearance-none`;

export default function AddPetPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    imageURL: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const tokenData = await authClient.token();
    const token = tokenData?.data?.token;


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        adoptionFee: Number(form.adoptionFee),
        ownerEmail: user?.email,
      }),
    });


    const data = await res.json();      

    if (!res.ok) {
      setError(data.message || "Failed to add pet. Please try again.");
      setLoading(false);
      return;
    }
    toast.success("Pet added successfully!");
    router.push("/pets");
  } catch (err) {
    
    setError("Something went wrong. Please try again.");
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/dashboard" className="hover:text-amber-500 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-neutral-600 font-medium">Add Pet</span>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden">

          {/* header */}
          <div className="bg-amber-400 px-8 py-6">
            <h1 className="text-2xl font-extrabold text-amber-900">List a Pet for Adoption</h1>
            <p className="text-amber-800 text-sm mt-1">
              Fill in the details below to list your pet and find them a loving home
            </p>
          </div>

          <div className="p-8">

            {form.imageURL && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-neutral-700 mb-2">Image Preview</p>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-50">
                  <img
                    src={form.imageURL}
                    alt="Pet preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Pet Name" required>
                  <input
                    type="text"
                    name="petName"
                    value={form.petName}
                    onChange={handleChange}
                    placeholder="e.g. Bruno"
                    required
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Species" required>
                  <select
                    name="species"
                    value={form.species}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select species</option>
                    {speciesList.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </FormField>
              </div>

    
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Breed" required>
                  <input
                    type="text"
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    placeholder="e.g. Golden Retriever"
                    required
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Age" required>
                  <input
                    type="text"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="e.g. 2 Years, 8 Months"
                    required
                    className={inputClass}
                  />
                </FormField>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Gender" required>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select gender</option>
                    {genderList.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Adoption Fee (USD)" required>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-medium text-sm">$</span>
                    <input
                      type="number"
                      name="adoptionFee"
                      value={form.adoptionFee}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      required
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Health Status" required>
                  <select
                    name="healthStatus"
                    value={form.healthStatus}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select health status</option>
                    {healthStatusList.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Vaccination Status" required>
                  <select
                    name="vaccinationStatus"
                    value={form.vaccinationStatus}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select vaccination status</option>
                    {vaccinationStatusList.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="Location" required>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Chittagong, Bangladesh"
                    required
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </FormField>

              <FormField
                label="Image URL"
                required
                hint="Upload your image to imgbb.com or postimage.org and paste the direct link here. The preview above will update live."
              >
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </span>
                  <input
                    type="url"
                    name="imageURL"
                    value={form.imageURL}
                    onChange={handleChange}
                    placeholder="https://i.ibb.co/your-image.jpg"
                    required
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </FormField>

              <FormField label="Owner Email">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className={`${inputClass} pl-10 cursor-not-allowed bg-neutral-50 text-neutral-400`}
                  />
                </div>
              </FormField>

              <FormField label="Description" required>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell adopters about this pet's personality, habits, and what makes them special..."
                  rows={4}
                  required
                  className={`${inputClass} resize-none`}
                />
              </FormField>

              {error && (
                <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium px-4 py-3 rounded-xl">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm py-3.5 rounded-xl transition-colors duration-200 ${
                    loading
                      ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      : "bg-amber-400 hover:bg-amber-500 text-amber-900"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Adding Pet...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Add Pet
                    </>
                  )}
                </button>
                <Link
                  href="/dashboard/my-listings"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-600 font-semibold text-sm px-6 py-3.5 rounded-xl border border-neutral-200 transition-colors duration-200"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}