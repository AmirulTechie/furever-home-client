"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client"; // ← adjust path if needed

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Pets", href: "/pets" },
  { label: "My Requests", href: "/my-requests" },
  { label: "Add Pet", href: "/add-pet" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Better Auth — gives you { data: session, isPending, error }
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const linkClass = (href: string) =>
    pathname === href
      ? "text-amber-500 font-medium border-b-2 border-amber-400 pb-0.5"
      : "text-neutral-600 hover:text-amber-500 transition-colors duration-200";

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  // Fallback avatar: first letter of name or email
  const avatarLetter = user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/logo-compact.svg"
            alt="logo"
            width={200}
            height={200}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            // Skeleton while session loads
            <div className="w-8 h-8 rounded-full bg-neutral-100 animate-pulse" />
          ) : user ? (
            // ── Logged-in state ──────────────────────────────────────
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 focus:outline-none group"
                aria-label="User menu"
              >
                {/* Avatar */}
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "User avatar"}
                    width={34}
                    height={34}
                    className="rounded-full object-cover ring-2 ring-transparent group-hover:ring-amber-400 transition-all duration-200"
                  />
                ) : (
                  <span className="w-[34px] h-[34px] rounded-full bg-amber-400 text-amber-900 font-semibold text-sm flex items-center justify-center ring-2 ring-transparent group-hover:ring-amber-400 transition-all duration-200 select-none">
                    {avatarLetter}
                  </span>
                )}
                {/* Chevron */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className={`text-neutral-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="2 4 6 8 10 4" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 text-sm">
                  {/* User info */}
                  <div className="px-4 py-2.5 border-b border-neutral-100">
                    <p className="font-medium text-neutral-800 truncate">{user.name ?? "User"}</p>
                    <p className="text-neutral-400 text-xs truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-amber-500 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="7" cy="5" r="3" /><path d="M1 13c0-3.3 2.7-6 6-6s6 2.7 6 6" /></svg>
                    My Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" /><polyline points="12 8 15 8" /><polyline points="13 5 16 8 13 11" /></svg>
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // ── Logged-out state ─────────────────────────────────────
            <Link
              href="/login"
              className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-medium text-sm px-5 py-2 rounded-lg transition-colors duration-200"
            >
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-neutral-600 hover:text-amber-500 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="12" x2="19" y2="12" />
                <line x1="3" y1="18" x2="19" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-4 pb-4 pt-2 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-amber-500 font-medium text-sm"
                  : "text-neutral-600 text-sm hover:text-amber-500 transition-colors"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              {/* Mini user card */}
              <div className="flex items-center gap-2.5 py-1">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "User avatar"}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="w-[30px] h-[30px] rounded-full bg-amber-400 text-amber-900 font-semibold text-xs flex items-center justify-center select-none">
                    {avatarLetter}
                  </span>
                )}
                <div className="text-xs">
                  <p className="font-medium text-neutral-800">{user.name ?? "User"}</p>
                  <p className="text-neutral-400 truncate max-w-[180px]">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full text-left text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-medium text-sm px-5 py-2 rounded-lg text-center transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;