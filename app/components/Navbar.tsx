"use client";

import React from "react";
import { useAuth } from "../hooks/useAuth";
import CardNav, { CardNavItem } from "./CardNav";

const logo = "/brand/Mononio_Logo.png";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();

  const items: CardNavItem[] = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Our Story", href: "#about", ariaLabel: "About Mononio AI" },
        { label: "Customer Stories", href: "#testimonials", ariaLabel: "Customer Stories" },
        { label: "FAQ", href: "#faq", ariaLabel: "Frequently Asked Questions" },
      ],
    },
    {
      label: "Platform", // 🔥 updated name instead of Product
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Features", href: "#platform", ariaLabel: "Features" },
        { label: "Pricing", href: "#pricing", ariaLabel: "Platform Pricing" },
        {
          label: "Compare",
          href: "#platform",
          ariaLabel: "Compare",
        },
      ],
    },
    {
      label: isAuthenticated ? "Account" : "Demo",
      bgColor: "#271E37",
      textColor: "#fff",
      links: isAuthenticated ? [
        { label: "Dashboard", href: "/app", ariaLabel: "Go to Dashboard" },
        { label: `Welcome, ${user?.name || user?.email}`, href: "/app", ariaLabel: "User Profile" },
        { label: "Logout", href: "#", ariaLabel: "Logout" },
      ] : [
        { label: "Watch Live Demo", href: "#Watch Live Demo", ariaLabel: "Watch Live Demo" },
        { label: "Free Trial", href: "#contact", ariaLabel: "Free Trial" },
        { label: "How It Works", href: "#how-it-works", ariaLabel: "How It Works" },
      ],
    },
  ];

  // Add auth buttons if not authenticated
  if (!isAuthenticated) {
    items.push({
      label: "Sign In",
      bgColor: "#6D28D9",
      textColor: "#fff",
      links: [
        { label: "Login", href: "/login", ariaLabel: "Login to your account" },
        { label: "Sign Up", href: "/signup", ariaLabel: "Create new account" },
      ],
    });
  }

  return (
    <div className="relative z-[9999]">
      <CardNav
        logo={logo}
        logoAlt="Mononio AI"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#6D28D9"
        buttonTextColor="#fff"
      />
    </div>
  );
}
