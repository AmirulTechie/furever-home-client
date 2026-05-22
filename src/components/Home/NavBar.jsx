"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Pets", href: "/pets" },
  { label: "My Requests", href: "/dashboard/my-requests" },
  { label: "Add Pet", href: "/dashboard/add-pet" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setDropdownOpen(false);
          setMenuOpen(false);
          router.push('/login');
        },
      },
    });
  };

  const avatarLetter =
    user?.name?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "?";

  const activeLinkClass = "bg-amber-500/10 text-amber-700 font-semibold px-4 py-1.5 rounded-full shadow-[inset_0_1px_2px_rgba(217,119,6,0.05)]";
  const idleLinkClass = "text-neutral-500 hover:text-neutral-800 font-medium px-4 py-1.5 rounded-full hover:bg-neutral-100/70 transition-all duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="shrink-0 transition-transform hover:scale-[1.02]">
          <Image
            src="/assets/logo-compact.svg"
            alt="logo"
            width={180}
            height={45}
            className="w-auto h-8"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? activeLinkClass : idleLinkClass}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-neutral-100 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar button */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 p-1 rounded-full border border-neutral-200/60 hover:bg-neutral-50 transition-all duration-150 focus:outline-none"
                aria-label="User menu"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "User avatar"}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 font-bold text-xs flex items-center justify-center select-none">
                    {avatarLetter}
                  </span>
                )}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={`text-neutral-400 mr-1 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                >
                  <polyline points="2 4 6 8 10 4" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white border border-neutral-200/80 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] p-1.5 text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-2.5 border-b border-neutral-100 bg-neutral-50/50 rounded-t-xl mb-1">
                    <p className="font-semibold text-neutral-800 truncate">{user.name ?? "User"}</p>
                    <p className="text-neutral-400 text-xs truncate mt-0.5">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-neutral-600 hover:bg-neutral-50 rounded-xl hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="9" rx="1" />
                      <rect x="14" y="3" width="7" height="5" rx="1" />
                      <rect x="14" y="12" width="7" height="9" rx="1" />
                      <rect x="3" y="16" width="7" height="5" rx="1" />
                    </svg>
                    Dashboard
                  </Link>

                  <Link
                    href="/my-profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-neutral-600 hover:bg-neutral-50 rounded-xl hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
                      <circle cx="12" cy="7" r="4" />
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    </svg>
                    My Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 hover:bg-rose-50/60 rounded-xl transition-colors cursor-pointer border-t border-neutral-100 mt-1 pt-2 font-medium"
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M9 3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" />
                      <polyline points="12 8 15 8" />
                      <polyline points="13 5 16 8 13 11" />
                    </svg>
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm px-5 py-2 rounded-full shadow-[0_2px_10px_rgba(245,158,11,0.2)] transition-all duration-200"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 rounded-xl text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200/60 px-4 pb-6 pt-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={
                pathname === link.href
                  ? "bg-amber-500/10 text-amber-700 font-semibold px-4 py-2.5 rounded-xl text-sm"
                  : "text-neutral-600 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-neutral-50"
              }
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="mt-2 pt-4 border-t border-neutral-100 flex flex-col gap-2">
              <div className="flex items-center gap-3 px-4 py-2 bg-neutral-50 rounded-xl mb-2">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "User avatar"}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="w-9 h-9 rounded-full bg-amber-400 text-amber-900 font-bold text-sm flex items-center justify-center select-none">
                    {avatarLetter}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-800 truncate">{user.name ?? "User"}</p>
                  <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                </div>
              </div>

              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-950 px-4 py-2 rounded-xl"
              >
                Dashboard
              </Link>
              <Link
                href="/my-profile"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-950 px-4 py-2 rounded-xl"
              >
                My Profile
              </Link>

              <button
                onClick={handleSignOut}
                className="text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-xl mt-2"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-3 rounded-xl text-center transition-colors shadow-md mt-2"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;