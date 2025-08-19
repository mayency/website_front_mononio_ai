import Navbar from "./components/Navbar";
import LogoCloud from "./components/LogoCloud";
import InteractiveButtons from "./components/InteractiveButtons";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <main>
        <section className="container mx-auto px-6 min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Automate multi-channel marketing <br /> with AI agents
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl">
            One brief → campaigns across Google, Meta, TikTok, LinkedIn & more.
            Generate copy, images, and video with built-in policy guardrails.
          </p>
          <div className="mt-8">
            <InteractiveButtons />
          </div>
        </section>
        <LogoCloud />
      </main>
    </div>
  );
}
