"use client";

import ThemeToggle from "./ThemeToggle";

export default function SimpleNavbar() {
  return (
    <nav className="p-4 flex justify-between items-center bg-white dark:bg-gray-900 dark:text-white">
      <div className="text-xl font-bold">Mononio AI</div>
      <ThemeToggle />
    </nav>
  );
} 