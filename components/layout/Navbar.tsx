"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { events } from "@/lib/analytics";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/usluge", label: "Usluge" },
  { href: "/cenovnik", label: "Cenovnik" },
  { href: "/taxi-do-aerodroma", label: "Taxi do aerodroma" },
  { href: "/poslovni-taxi", label: "Poslovni taxi" },
  { href: "/galerija", label: "Galerija" },
  { href: "/kontakt", label: "Kontakt" },
];

interface NavbarProps {
  phoneNumber?: string;
}

export default function Navbar({ phoneNumber = "060 000 0000" }: NavbarProps) {
  const phone = phoneNumber;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-950/98 shadow-lg" : "bg-gray-950"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Naxi Taxi BB"
              width={56}
              height={56}
              className="rounded-full"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-green-600 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              onClick={events.callTaxi}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-gray-900 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              <span>📞</span> Pozovi taxi
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Otvori meni"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-gray-950 border-t border-gray-800 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-green-600 hover:bg-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-4 border-t border-gray-800 mt-2">
              <a
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                onClick={events.callTaxi}
                className="flex items-center justify-center gap-2 bg-green-600 text-gray-900 font-bold py-3 rounded-xl w-full"
              >
                <span>📞</span> Pozovi taxi
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
