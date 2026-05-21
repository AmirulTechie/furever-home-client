"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const Avatar = ({ user, previewUrl }) => {
  const src = previewUrl || user?.image;
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt="Profile preview"
        className="w-24 h-24 rounded-full object-cover border-4 border-amber-100"
        onError={(e) => { e.target.style.display = "none"; }}
      />
    );
  }

  return (
    <div className="w-24 h-24 rounded-full bg-amber-400 flex items-center justify-center font-bold text-amber-900 text-2xl border-4 border-amber-100">
      {initials}
    </div>
  );
};

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    displayName: "",
    photoURL: "",
  });
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // populate form once session loads
  if (user && !initialized) {
    setForm({
      displayName: user.name || "",
      photoURL: user.image || "",
    });
    setInitialized(true);
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: updateError } = await authClient.updateUser({
      name: form.displayName,
      image: form.photoURL || undefined,
    });

    if (updateError) {
      setError(updateError.message || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push("/my-profile"), 1200);
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <svg className="animate-spin w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/my-profile" className="hover:text-amber-500 transition-colors">My Profile</Link>
          <span>/</span>
          <span className="text-neutral-600 font-medium">Update Profile</span>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden">

          {/* header strip */}
          <div className="bg-amber-400 px-8 py-6">
            <h1 className="text-2xl font-extrabold text-amber-900">Update Profile</h1>
            <p className="text-amber-800 text-sm mt-1">Keep your information up to date</p>
          </div>

          <div className="p-8">

            {/* avatar preview */}
            <div className="flex items-center gap-5 mb-8 pb-8 border-b border-neutral-100">
              <div className="relative">
                <Avatar user={user} previewUrl={form.photoURL} />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center">
                  <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-bold text-neutral-800">{form.displayName || user?.name}</p>
                <p className="text-neutral-400 text-sm">{user?.email}</p>
                <p className="text-xs text-neutral-400 mt-1">Avatar updates live as you type the photo URL</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="displayName"
                    value={form.displayName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  />
                </div>
              </div>

              {/* email — read only */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Email Address
                  <span className="ml-2 text-neutral-400 font-normal">(cannot be changed)</span>
                </label>
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-400 text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              {/* photo url */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Photo URL</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </span>
                  <input
                    type="url"
                    name="photoURL"
                    value={form.photoURL}
                    onChange={handleChange}
                    placeholder="https://your-photo-url.com/photo.jpg"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  />
                </div>
                <p className="text-xs text-neutral-400 mt-1.5">
                  Paste a hosted image URL from imgbb, Cloudinary, or postimage.
                </p>
              </div>

              {/* error */}
              {error && (
                <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium px-4 py-3 rounded-xl">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              {/* success */}
              {success && (
                <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium px-4 py-3 rounded-xl">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Profile updated successfully. Redirecting...
                </div>
              )}

              {/* actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm py-3.5 rounded-xl transition-colors duration-200 cursor-pointer ${
                    loading || success
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
                <Link
                  href="/my-profile"
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