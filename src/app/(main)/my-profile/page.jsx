"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Avatar = ({ user, size = "lg" }) => {
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizeClass = size === "lg" ? "w-24 h-24 text-2xl" : "w-10 h-10 text-sm";

  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={user.name}
        className={`${sizeClass} rounded-full object-cover border-4 border-amber-100`}
      />
    );
  }

  return (
    <div className={`${sizeClass} rounded-full bg-amber-400 flex items-center justify-center font-bold text-amber-900 border-4 border-amber-100`}>
      {initials}
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 py-4 border-b border-neutral-100 last:border-0">
    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-neutral-800">{value || "—"}</p>
    </div>
  </div>
);

const StatCard = ({ icon, label, value, color }) => (
  <div className={`rounded-2xl p-5 flex items-center gap-4 ${color}`}>
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-2xl font-extrabold text-neutral-800">{value}</p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  </div>
);

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <p className="text-neutral-400 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-neutral-600 font-medium">My Profile</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* left — profile card */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-3xl border border-neutral-100 p-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar user={user} size="lg" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full border-2 border-white" />
              </div>
              <h2 className="text-xl font-extrabold text-neutral-800 mb-0.5">{user?.name}</h2>
              <p className="text-neutral-400 text-sm mb-4">{user?.email}</p>

              <div className="w-full flex flex-col gap-2">
                <Link
                  href="/my-profile/update"
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm py-2.5 rounded-xl transition-colors duration-200"
                >
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Update Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-rose-50 text-rose-500 hover:text-rose-600 font-semibold text-sm py-2.5 rounded-xl border border-neutral-200 hover:border-rose-200 transition-colors duration-200"
                >
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Log Out
                </button>
              </div>
            </div>

            {/* member since */}
            <div className="bg-white rounded-2xl border border-neutral-100 px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-500">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Member since</p>
                <p className="text-sm font-semibold text-neutral-800">{joinDate}</p>
              </div>
            </div>
          </div>

          {/* right — details + stats */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            <div className="grid grid-cols-3 gap-4">
              <StatCard icon="🐾" label="Pets Listed" value="0" color="bg-amber-50" />
              <StatCard icon="📋" label="Requests Sent" value="0" color="bg-teal-50" />
              <StatCard icon="✅" label="Adopted" value="0" color="bg-violet-50" />
            </div>

            <div className="bg-white rounded-3xl border border-neutral-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-neutral-800 text-lg">Account Information</h3>
                <Link
                  href="/my-profile/update"
                  className="text-xs text-amber-500 hover:text-amber-600 font-semibold transition-colors"
                >
                  Edit
                </Link>
              </div>
              <p className="text-neutral-400 text-xs mb-4">Your personal details on FurEver Home</p>

              <InfoRow
                label="Full Name"
                value={user?.name}
                icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              />
              <InfoRow
                label="Email Address"
                value={user?.email}
                icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
              />
              <InfoRow
                label="Profile Photo"
                value={user?.image ? "Custom photo set" : "Using initials avatar"}
                icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>}
              />
            </div>

            <div className="bg-white rounded-3xl border border-neutral-100 p-6">
              <h3 className="font-extrabold text-neutral-800 text-lg mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "My Pet Listings", href: "/dashboard/my-listings", emoji: "🐾", desc: "Manage pets you listed" },
                  { label: "My Requests", href: "/my-requests", emoji: "📋", desc: "Track adoption requests" },
                  { label: "Add a Pet", href: "/add-pet", emoji: "➕", desc: "List a new pet" },
                  { label: "Browse All Pets", href: "/pets", emoji: "🔍", desc: "Find a companion" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F7F5F0] transition-colors duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-base shrink-0">
                      {item.emoji}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800 group-hover:text-amber-500 transition-colors">{item.label}</p>
                      <p className="text-xs text-neutral-400">{item.desc}</p>
                    </div>
                    <svg className="ml-auto text-neutral-300 group-hover:text-amber-400 transition-colors" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}