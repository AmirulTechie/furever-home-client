"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NavItem = ({ href, icon, label, active }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-amber-500 text-white"
        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
    }`}
  >
    <span className={active ? "text-white" : "text-neutral-400"}>{icon}</span>
    {label}
  </Link>
);

const IconRequests = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconAdd = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const IconListings = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
    <div className="min-h-screen bg-neutral-50 flex">

      {/* sidebar */}
      <aside className="hidden lg:flex w-56 flex-col fixed top-0 left-0 h-full bg-white border-r border-neutral-200 z-30">

        {/* logo */}
        <div className="px-5 py-5 border-b border-neutral-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" fill="white" viewBox="0 0 60 60">
                <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/>
                <circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
                <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
              </svg>
            </div>
            <span className="text-neutral-900 font-bold text-sm">FurEver Home</span>
          </Link>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          <p className="text-xs text-neutral-400 font-semibold uppercase tracking-widest px-4 mb-2">Menu</p>
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

        {/* user + logout */}
        <div className="px-3 py-4 border-t border-neutral-200">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-neutral-200"
              />
              <div className="flex-1 min-w-0">
                <p className="text-neutral-900 text-xs font-semibold truncate">{user.name}</p>
                <p className="text-neutral-500 text-xs truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all duration-200 cursor-pointer"
          >
            <IconLogout />
            Logout
          </button>
        </div>
      </aside>

      {/* mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" fill="white" viewBox="0 0 60 60">
              <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/>
              <circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
              <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
            </svg>
          </div>
          <span className="text-neutral-900 font-bold text-sm">FurEver Home</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            {mobileOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-20 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="w-56 h-full bg-white flex flex-col pt-16 border-r border-neutral-200" onClick={(e) => e.stopPropagation()}>
            <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
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
            <div className="px-3 py-4 border-t border-neutral-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all duration-200 cursor-pointer"
              >
                <IconLogout />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* main content */}
      <main className="flex-1 lg:ml-56 pt-0 lg:pt-0">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}