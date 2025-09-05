"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import CardNav, { CardNavItem } from "./CardNav";

const logo = "/brand/Mononio_Logo.png";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  const items: CardNavItem[] = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Our Vision", href: "#about", ariaLabel: "About Mononio AI" },
        {
          label: "Customer Stories",
          href: "#about",
          ariaLabel: "Customer Stories",
        },
        { label: "FAQ", href: "#about", ariaLabel: "Frequently Asked Questions" },
      ],
    },
    {
      label: "Platform", // 🔥 updated name instead of Product
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Features", href: "#platform", ariaLabel: "Platform Features" },
        { label: "Pricing", href: "#platform", ariaLabel: "Platform Pricing" },
        {
          label: "Integrations",
          href: "#platform",
          ariaLabel: "Platform Integrations",
        },
      ],
    },
    {
      label: isAuthenticated ? "Account" : "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: isAuthenticated ? [
        { label: "Dashboard", href: "/app", ariaLabel: "Go to Dashboard" },
        { label: `Welcome, ${user?.name || user?.email}`, href: "/app", ariaLabel: "User Profile" },
        { label: "Logout", href: "#", ariaLabel: "Logout" },
      ] : [
        { label: "Contact Us", href: "#contact", ariaLabel: "Contact Us" },
        { label: "Book a Demo", href: "#contact", ariaLabel: "Book a Demo" },
        { label: "Press & Media", href: "#contact", ariaLabel: "Press & Media" },
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
