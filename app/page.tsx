import Navbar from "./components/Navbar";
import LogoCloud from "./components/LogoCloud";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <main>
        <section className="container mx-auto px-6 min-h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Automate multi-channel marketing <br /> with AI agents
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl">
            One brief → campaigns across Google, Meta, TikTok, LinkedIn & more.
            Generate copy, images, and video with built-in policy guardrails.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/app/onboarding/1" className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
              Get started
            </Link>
            <Link href="/features" className="border border-gray-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
              See features
            </Link>
          </div>
        </section>
        <LogoCloud />
      </main>
    </div>
  );
}
