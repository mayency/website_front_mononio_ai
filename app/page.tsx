import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30" />
        
        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
            
            {/* Logo */}
            <div className="mb-6">
              <img 
                src="/brand/Monio_Logo.png" 
                alt="Mononio AI" 
                className="h-16 w-auto mx-auto"
              />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Mononio AI
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 font-normal">
                Your Autonomous Marketing Agency
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Deploy AI-powered campaigns across all major platforms with complete autonomy. 
              From strategy to execution, we handle everything while you maintain full control.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105">
                Start Your Campaign
              </button>
              <button className="px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-xl text-lg font-semibold transition-all duration-200">
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">7+</div>
                <div className="text-gray-400">Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">Autonomous</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-400">Your Control</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
