"use client";

import React from "react";
import CardNav, { CardNavItem } from "./CardNav";
const logo = "/brand/Mononio_Logo.png";

export default function Navbar() {
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
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Contact Us", href: "#contact", ariaLabel: "Contact Us" },
        { label: "Book a Demo", href: "#contact", ariaLabel: "Book a Demo" },
        { label: "Press & Media", href: "#contact", ariaLabel: "Press & Media" },
      ],
    },
  ];

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
