"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useApp } from "../context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-[#303431] bg-[#0d0f0e]">
      <div className="container-fit flex min-h-18 items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-[0.08em]"
        >
         <img
  src="/logo.png"
  alt="FitLog logo"
  className="h-8 w-8 object-contain"
/>

          <span className="text-xl">FITLOG</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">

          {/* Workouts */}
          <Link
            href="/"
            className={
              pathname === "/"
                ? "rounded-full bg-[#1d2a0d] px-5 py-2 text-sm font-medium text-[#ccff00]"
                : "rounded-full px-5 py-2 text-sm font-medium text-[#9ba09c] hover:text-white"
            }
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan"
                ? "rounded-full bg-[#1d2a0d] px-5 py-2 text-sm font-medium text-[#ccff00]"
                : "rounded-full px-5 py-2 text-sm font-medium text-[#9ba09c] hover:text-white"
            }
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="flex items-center gap-3">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-[#d0d3d0]"
          >
            <span>Plan</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-[#9ba09c]"
          >
            <span>Saved</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#3b403d] px-1.5 text-xs">
              {saved.length}
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}