"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const Logo = () => (
  <svg width="160" height="32" viewBox="0 0 240 36" role="img" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="36" height="36" rx="9" fill="#EF9F27" />
    <circle cx="13" cy="11" r="3.5" fill="#fff" opacity="0.9" />
    <circle cx="23" cy="11" r="3.5" fill="#fff" opacity="0.9" />
    <circle cx="7" cy="17" r="2.8" fill="#fff" opacity="0.9" />
    <circle cx="29" cy="17" r="2.8" fill="#fff" opacity="0.9" />
    <path d="M18 33 C10 33 6 26 8 21 C10 17 13 16 18 16 C23 16 26 17 28 21 C30 26 26 33 18 33Z" fill="#fff" opacity="0.9" />
    <text x="46" y="14" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="#F7F5F0" letterSpacing="-0.2">FurEver</text>
    <text x="46" y="29" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="400" fill="#EF9F27" letterSpacing="2">HOME</text>
  </svg>
);



const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "All Pets", href: "/pets" },
      { label: "Add a Pet", href: "/add-pet" },
      { label: "My Requests", href: "/my-requests" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "How It Works", href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "Partner Shelters", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1E1D1A"/>
      </svg>
    ),
  },
];

const Footer = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  return (
    <>
    { !user &&
      <section className="bg-[#2C2C2A] py-20 relative overflow-hidden">
        {/* decorative paw watermarks */}
        <svg viewBox="0 0 60 60" className="absolute -top-6 -left-6 w-48 h-48 text-white/5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/><circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
          <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
        </svg>
        <svg viewBox="0 0 60 60" className="absolute -bottom-8 -right-8 w-64 h-64 text-white/5 fill-current rotate-12" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/><circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
          <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-amber-400/20 border border-amber-400/30 text-amber-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            Start your journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Ready to Change{" "}
            <span className="text-amber-400">a Life?</span>
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Your future best friend is waiting right now. Take the first step — browse available pets and begin your adoption journey today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pets"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm px-8 py-3.5 rounded-xl transition-colors duration-200"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Find My Pet
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-8 py-3.5 rounded-xl border border-white/20 transition-colors duration-200"
            >
              Create Account
            </Link>
          </div>

          {/* trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {[
              "1,200+ Pets Adopted",
              "No Hidden Fees",
              "Verified Listings Only",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-neutral-400 text-xs">
                <svg width="14" height="14" fill="none" stroke="#EF9F27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      }
      
      {/* Footer */}
      <footer className="bg-[#1E1D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* brand col — spans 2 */}
            <div className="lg:col-span-2">
              <Link href="/">
                <Logo />
              </Link>
              <p className="text-neutral-500 text-sm leading-relaxed mt-4 max-w-xs">
                Connecting loving families with pets who need a forever home across Bangladesh. Every adoption matters.
              </p>

              {/* social icons */}
              <div className="flex items-center gap-2 mt-6">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-amber-400/20 text-neutral-500 hover:text-amber-400 flex items-center justify-center transition-colors duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* contact */}
              <div className="mt-6 flex flex-col gap-2">
                <a href="mailto:hello@fureverhome.com" className="flex items-center gap-2 text-neutral-500 hover:text-amber-400 text-xs transition-colors">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  hello@fureverhome.com
                </a>
                <a href="tel:+8801700000000" className="flex items-center gap-2 text-neutral-500 hover:text-amber-400 text-xs transition-colors">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.37a16 16 0 0 0 6.29 6.29l.95-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  +880 1700 000000
                </a>
                <span className="flex items-center gap-2 text-neutral-500 text-xs">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Chittagong, Bangladesh
                </span>
              </div>
            </div>

            {/* link cols */}
            {footerLinks.map((col, i) => (
              <div key={i}>
                <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">{col.heading}</h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="text-neutral-500 hover:text-amber-400 text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-neutral-600 text-xs">
              &copy; {new Date().getFullYear()} FurEver Home. All rights reserved.
            </p>
            <p className="text-neutral-600 text-xs">
              Made with{" "}
              <span className="text-amber-500">♥</span>{" "}
              for pets and the people who love them
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;