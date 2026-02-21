// src/components/Footer.jsx

/*
Component: Footer
Purpose: Application footer with branding, navigation links, and copyright
Used in: MainLayout (appears on all pages)
Design: Minimal enterprise dashboard footer
*/

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Branding */}
          <div>
            <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              Driver Sentiment Dashboard
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transport feedback & analytics system
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-300">
            <a
              href="/dashboard"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Dashboard
            </a>
            <a
              href="/feedback"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Feedback
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Documentation
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Support
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-4" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Driver Sentiment Dashboard. All rights
            reserved.
          </p>

          <p>Built with React, Vite & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
