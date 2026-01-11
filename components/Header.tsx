"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background-dark/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-4"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="text-2xl font-bold text-white hover:text-primary transition-colors"
            aria-label="Go to home"
          >
            Leapcrest
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-primary transition-colors font-medium"
              aria-label="Navigate to home section"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("why-cap")}
              className="text-white hover:text-primary transition-colors font-medium"
              aria-label="Navigate to Why Leapcrest CAP section"
            >
              Why Leapcrest CAP<sup>©</sup>?
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-background-dark font-semibold rounded-lg transition-colors"
              aria-label="Navigate to get started section"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
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
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left text-white hover:text-primary transition-colors font-medium py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("why-cap")}
                className="block w-full text-left text-white hover:text-primary transition-colors font-medium py-2"
              >
                Why Leapcrest CAP<sup>©</sup>?
              </button>
              <button
                onClick={() => scrollToSection("cta")}
                className="block w-full text-left px-6 py-2 bg-primary hover:bg-primary-dark text-background-dark font-semibold rounded-lg transition-colors"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
