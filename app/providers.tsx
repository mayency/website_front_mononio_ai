"use client";

import React from "react";
import { AuthProvider } from "./hooks/useAuth";
import CookieBanner from "./components/CookieBanner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <CookieBanner />
    </AuthProvider>
  );
}
