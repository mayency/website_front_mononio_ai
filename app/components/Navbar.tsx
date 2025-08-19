import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Mononio AI
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signin" className="text-gray-300 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/app/onboarding/1" className="bg-white text-gray-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 