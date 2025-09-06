"use client";

import React from "react";
import { motion } from "framer-motion";
import "./HeroBackground.css";

export default function AnimatedHero() {
  return (
    <section className="hero-background flex flex-col items-center justify-center min-h-screen text-white text-center px-6">
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold tracking-tight text-indigo-400"
        >
          Automate Multi-Channel Marketing with AI Agents
        </motion.h1>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl">
          One brief → campaigns across Google, Meta, TikTok, LinkedIn, Taboola & Outbrain.
        </p>
        <div className="mt-8 flex space-x-4">
          <a
            href="/pricing"
            className="px-6 py-3 rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors font-semibold"
          >
            Get Started
          </a>
          <a
            href="/features"
            className="px-6 py-3 rounded-md border border-gray-600 hover:border-indigo-500 transition-colors"
          >
            See Features
          </a>
        </div>
      </div>
    </section>
  );
}
