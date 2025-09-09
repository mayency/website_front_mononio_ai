import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-indigo-400 transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-600">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-indigo-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-300">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
