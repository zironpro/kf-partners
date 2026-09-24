"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  { label: "Study visa", href: "#" },
  { label: "Work routes", href: "#" },
  { label: "Family reunion", href: "#" },
  { label: "Business immigration", href: "#" },
  { label: "Visitor visa", href: "#" },
];

const company = [
  { label: "About us", href: "#" },
  { label: "Our journey", href: "#" },
  { label: "Case studies", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
];

const socials = [
  {
    name: "LinkedIn",
    href: "#",
    d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    name: "Twitter",
    href: "#",
    d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
  },
  {
    name: "Instagram",
    href: "#",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
];

const linkClass =
  "text-[15px] text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative w-full overflow-hidden bg-primary text-white font-sans">
      <div className="container-safe mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-12 lg:gap-x-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="mb-5 flex items-center gap-1.5 group">
              <span className="text-2xl font-serif font-bold tracking-tight text-accent transition-colors group-hover:text-white">
                KF
              </span>
              <span className="text-2xl font-serif font-bold tracking-tight text-white transition-colors group-hover:text-accent">
                Partners
              </span>
            </Link>
            <p className="mb-8 max-w-sm text-base leading-relaxed text-white/70">
              Immigration guidance for study, work, visit and family visas, with clear steps and honest advice.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-2 lg:col-start-6">
            <h3 className="mb-5 font-serif text-lg text-accent">Services</h3>
            <ul className="space-y-3.5">
              {services.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="lg:col-span-2">
            <h3 className="mb-5 font-serif text-lg text-accent">Company</h3>
            <ul className="space-y-3.5">
              {company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className="mb-3 font-serif text-lg text-accent">Immigration updates</h3>
            <p className="mb-5 text-[15px] leading-relaxed text-white/70">
              Policy changes and visa news, sent when it matters.
            </p>
            {subscribed ? (
              <p role="status" className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-[15px] text-white">
                Thanks, you&apos;re subscribed.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="flex items-center rounded-full border border-white/20 bg-white/5 p-1.5 transition-colors focus-within:border-accent"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2 text-[15px] text-white placeholder-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-[15px] font-semibold text-primary transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal row */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/60 md:flex-row md:items-center">
          <p>&copy; {currentYear} KF Partners. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="#" className="transition-colors hover:text-white">Privacy policy</Link>
            <Link href="#" className="transition-colors hover:text-white">Terms of service</Link>
            <Link href="#" className="transition-colors hover:text-white">Cookie policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}