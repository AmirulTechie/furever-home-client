"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NavItem = ({ href, icon, label, active }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 relative group ${
      active
        ? "bg-neutral-100 text-neutral-900 font-semibold shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50/80 font-medium"
    }`}
  >
    {active && (
      <span className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-amber-500 rounded-r-md" />
    )}
    <span className={`transition-colors duration-200 ${active ? "text-amber-600" : "text-neutral-400 group-hover:text-neutral-600"}`}>
      {icon}
    </span>
    {label}
  </Link>
);

const IconRequests = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const IconAdd = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const IconListings = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconLogout = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const navItems = [
    { href: "/dashboard/my-requests", label: "My Requests", icon: <IconRequests /> },
    { href: "/dashboard/add-pet", label: "Add Pet", icon: <IconAdd /> },
    { href: "/dashboard/my-listings", label: "My Listings", icon: <IconListings /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-50/50 flex">
      <aside className="hidden lg:flex w-60 flex-col fixed top-0 left-0 h-full bg-white border-r border-neutral-200/70 z-30 p-4">
        <div className="px-3 py-4 mb-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-500/10 transition-transform group-hover:scale-[1.03]">
              <svg width="15" height="15" fill="white" viewBox="0 0 60 60">
                <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/>
                <circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
                <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
              </svg>
            </div>
            <span className="text-neutral-800 font-bold text-sm tracking-tight">FurEver Home</span>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-1">
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider px-4 mb-2 select-none">Navigation</p>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </nav>

        <div className="mt-auto border-t border-neutral-100 pt-4 px-1">
          {user && (
            <div className="flex items-center gap-3 p-2 bg-neutral-50 rounded-xl mb-2 border border-neutral-100">
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-neutral-200/50"
              />
              <div className="flex-1 min-w-0">
                <p className="text-neutral-800 text-xs font-semibold truncate">{user.name}</p>
                <p className="text-neutral-400 text-[10px] truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:text-rose-600 hover:bg-rose-50/50 transition-all duration-150 cursor-pointer"
          >
            <IconLogout />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200/70 px-4 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" fill="white" viewBox="0 0 60 60">
              <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/>
              <circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
              <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
            </svg>
          </div>
          <span className="text-neutral-800 font-bold text-sm">FurEver Home</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-50 transition-all cursor-pointer"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            {mobileOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-neutral-900/30 backdrop-blur-xs" onClick={() => setMobileOpen(false)}>
          <div className="w-60 h-full bg-white flex flex-col p-4 border-r border-neutral-200 animate-in slide-in-from-left duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="py-4 px-3 mb-4">
              <span className="text-neutral-800 font-bold text-sm">Navigation</span>
            </div>
            <nav className="flex-1 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={pathname === item.href}
                />
              ))}
            </nav>
            <div className="border-t border-neutral-100 pt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
              >
                <IconLogout />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 lg:ml-60 min-h-screen">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}