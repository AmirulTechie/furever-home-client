"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Pets", href: "/pets" },
  { label: "My Requests", href: "/my-requests" },
  { label: "Add Pet", href: "/add-pet" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href) =>
    pathname === href
      ? "text-amber-500 font-medium border-b-2 border-amber-400 pb-0.5"
      : "text-neutral-600 hover:text-amber-500 transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <Link href="/" className="flex-shrink-0">
          <Image 
            src={'/assets/logo-compact.svg'}
            alt="logo"
            width={200}
            height={200}
          >
            
          </Image>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-medium text-sm px-5 py-2 rounded-lg transition-colors duration-200"
          >
            Login / Register
          </Link>
        </div>

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
          <Link
            href="/login"
            className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-medium text-sm px-5 py-2 rounded-lg text-center transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Login / Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;