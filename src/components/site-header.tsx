"use client";

import { Menu, Navigation, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { businessProfile } from "@/data/business";

const navItems = [
  { href: "/gas-station-whitchurch-stouffville", label: "Gas" },
  { href: "/diesel-pump-whitchurch-stouffville", label: "Diesel" },
  { href: "/truck-parking-whitchurch-stouffville", label: "Parking" },
  { href: "/lcbo-bloomington", label: "LCBO" },
  { href: "/country-style", label: "Country Style" },
  { href: "/offers/free-samosa-pop-with-gas", label: "Offer" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f6f3ed]/86 backdrop-blur-xl">
      <div className="site-shell flex min-h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${businessProfile.name} home`}
          onClick={() => setIsOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#e1251b] text-sm font-black text-white shadow-lg shadow-red-900/15">
            E
          </span>
          <span className="leading-none">
            <span className="display-type block text-lg font-black text-[#17130f]">
              {businessProfile.name}
            </span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#625a50]">
              LCBO + Country Style
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-extrabold transition-colors ${
                  active
                    ? "bg-[#17130f] text-white"
                    : "text-[#3e372f] hover:bg-black/[0.06]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:${businessProfile.phone}`}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 text-sm font-extrabold text-[#17130f] transition-colors hover:bg-white"
          >
            <Phone size={16} aria-hidden="true" />
            Call
          </a>
          <Link
            href="/directions"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#17130f] px-4 text-sm font-extrabold text-white shadow-lg shadow-black/10 transition-colors hover:bg-[#004a98]"
          >
            <Navigation size={16} aria-hidden="true" />
            Directions
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/75 text-[#17130f] lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-black/10 bg-[#fffdf8] lg:hidden">
          <nav className="site-shell grid gap-2 py-4" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[8px] px-4 py-3 text-sm font-extrabold text-[#17130f] hover:bg-black/[0.05]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${businessProfile.phone}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white text-sm font-extrabold text-[#17130f]"
              >
                <Phone size={16} aria-hidden="true" />
                Call
              </a>
              <Link
                href="/directions"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#17130f] text-sm font-extrabold text-white"
                onClick={() => setIsOpen(false)}
              >
                <Navigation size={16} aria-hidden="true" />
                Directions
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
