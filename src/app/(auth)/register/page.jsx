"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const Logo = () => (
  <svg width="160" height="32" viewBox="0 0 240 36" role="img" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="36" height="36" rx="9" fill="#EF9F27" />
    <circle cx="13" cy="11" r="3.5" fill="#fff" opacity="0.9" />
    <circle cx="23" cy="11" r="3.5" fill="#fff" opacity="0.9" />
    <circle cx="7" cy="17" r="2.8" fill="#fff" opacity="0.9" />
    <circle cx="29" cy="17" r="2.8" fill="#fff" opacity="0.9" />
    <path d="M18 33 C10 33 6 26 8 21 C10 17 13 16 18 16 C23 16 26 17 28 21 C30 26 26 33 18 33Z" fill="#fff" opacity="0.9" />
    <text x="46" y="14" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="#2C2C2A" letterSpacing="-0.2">FurEver</text>
    <text x="46" y="29" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="400" fill="#854F0B" letterSpacing="2">HOME</text>
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

const CheckItem = ({ passed, text }) => (
  <div className={`flex items-center gap-1.5 text-xs ${passed ? "text-teal-600" : "text-neutral-400"}`}>
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      {passed
        ? <path d="M20 6L9 17l-5-5"/>
        : <circle cx="12" cy="12" r="10"/>
      }
    </svg>
    {text}
  </div>
);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const {name, email, photoURL, password} = form;
  const pw = password;
  const validations = {
    length: pw.length >= 6,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    match: pw === form.confirmPassword && form.confirmPassword.length > 0,
  };
  const allValid = Object.values(validations).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allValid) return;
    else{
        const { data, error } = await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        photoURL, // User image URL (optional)
        callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
        });
        }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col relative overflow-hidden">

      {/* bg paw watermarks */}
      <svg viewBox="0 0 60 60" className="absolute -top-8 -left-8 w-52 h-52 text-amber-100 fill-current rotate-[-15deg] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/><circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
        <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
      </svg>
      <svg viewBox="0 0 60 60" className="absolute -bottom-10 -right-10 w-72 h-72 text-amber-100 fill-current rotate-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="14" r="7"/><circle cx="42" cy="14" r="7"/><circle cx="9" cy="28" r="5.5"/><circle cx="51" cy="28" r="5.5"/>
        <path d="M30 52 C16 52 10 40 13 30 C16 22 22 20 30 20 C38 20 44 22 47 30 C50 40 44 52 30 52Z"/>
      </svg>

      {/* top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <Link href="/">
          <Logo />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-amber-500 text-sm transition-colors duration-200"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Back to Home
        </Link>
      </div>

      {/* form card */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm">

          {/* heading */}
          <div className="text-center mb-8">
            <span className="inline-block bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
              Join FurEver Home
            </span>
            <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight mb-1">
              Create your account
            </h1>
            <p className="text-neutral-500 text-sm">
              Start your pet adoption journey today
            </p>
          </div>

          {/* google button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium text-sm py-3 rounded-xl transition-colors duration-200 mb-5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-neutral-100" />
            <span className="text-neutral-400 text-xs">or register with email</span>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                />
              </div>
            </div>

            {/* email */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
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
                  placeholder="https://your-photo-url.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-500 transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {/* password checklist — shows only when typing */}
              {form.password.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5 px-1">
                  <CheckItem passed={validations.length}    text="At least 6 characters" />
                  <CheckItem passed={validations.uppercase} text="One uppercase letter" />
                  <CheckItem passed={validations.lowercase} text="One lowercase letter" />
                </div>
              )}
            </div>

            {/* confirm password */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-neutral-200 bg-[#F7F5F0] text-neutral-800 text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-500 transition-colors"
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {form.confirmPassword.length > 0 && (
                <div className="mt-2 px-1">
                  <CheckItem passed={validations.match} text="Passwords match" />
                </div>
              )}
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={!allValid}
              className={`w-full font-semibold text-sm py-3.5 rounded-xl transition-colors duration-200 mt-1 ${
                allValid
                  ? "bg-amber-400 hover:bg-amber-500 text-amber-900 cursor-pointer"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              }`}
            >
              Create Account
            </button>
          </form>

          {/* login link */}
          <p className="text-center text-sm text-neutral-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-500 hover:text-amber-600 font-semibold transition-colors">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}