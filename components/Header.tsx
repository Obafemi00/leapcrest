"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container mx-auto px-6 lg:px-8 py-5"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-end">
          <div className="hidden md:flex items-center space-x-10">
            <button
              onClick={() => scrollToSection("home")}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
              aria-label="Navigate to home section"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("why-cap")}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
              aria-label="Navigate to Why Leapcrest CAP section"
            >
              Why Leapcrest CAP<sup>©</sup>?
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="px-5 py-2 bg-primary text-white font-medium text-sm rounded transition-colors hover:opacity-90"
              aria-label="Navigate to get started section"
            >
              Get Started
            </button>
          </div>

          <button
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              if (menu) {
                menu.classList.toggle("hidden");
              }
            }}
            className="md:hidden text-text-secondary"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div id="mobile-menu" className="hidden md:hidden mt-4 pb-4 space-y-3">
          <button
            onClick={() => scrollToSection("home")}
            className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors text-sm font-medium py-2"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("why-cap")}
            className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors text-sm font-medium py-2"
          >
            Why Leapcrest CAP<sup>©</sup>?
          </button>
          <button
            onClick={() => scrollToSection("cta")}
            className="block w-full text-left px-5 py-2 bg-primary text-white font-medium text-sm rounded transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}
