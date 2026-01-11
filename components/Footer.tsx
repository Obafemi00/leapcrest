"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-background-dark border-t border-primary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Leapcrest</h3>
            <p className="text-gray-400 text-sm">
              Elevating Skills. Accelerating Careers.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <a
                  href="mailto:info@leapcrest.in"
                  className="hover:text-primary transition-colors"
                  aria-label="Email Leapcrest"
                >
                  info@leapcrest.in
                </a>
              </p>
              <p className="text-gray-500">Phone: Coming soon</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Connect
            </h4>
            <a
              href="https://www.linkedin.com/company/leapcrest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-400 hover:text-primary transition-colors"
              aria-label="Visit Leapcrest on LinkedIn"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="ml-2">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Leapcrest Workforce Solutions. All
            rights reserved. CAP<sup>©</sup> is a registered trademark.
          </p>
        </div>
      </div>
    </footer>
  );
}
