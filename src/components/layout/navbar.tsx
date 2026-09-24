"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#" },
    { name: "Our Journey", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-sm py-5" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="container-safe mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="text-2xl font-serif font-bold tracking-tight text-accent transition-colors group-hover:text-primary">
            KF
          </span>
          <span className="text-2xl font-serif font-bold tracking-tight text-primary transition-colors group-hover:text-accent">
            Partners
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-primary/80 hover:text-accent font-medium transition-colors text-sm uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link 
            href="#" 
            className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-accent hover:text-primary transition-all shadow-md hover:shadow-lg"
          >
            Free Consultation
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-primary p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`absolute top-full left-0 right-0 bg-background border-t border-black/5 shadow-xl transition-all duration-300 md:hidden overflow-hidden ${
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="py-4 px-2 text-primary font-medium border-b border-black/5 uppercase tracking-wider text-sm hover:bg-black/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="#" 
            className="mt-6 w-full py-3 bg-primary text-white text-center rounded-full font-medium hover:bg-accent hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
