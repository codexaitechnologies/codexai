import { Outlet, Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-blue-900/20">
        <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mt-1">
            <img 
              src="/logo.png" 
              alt="CodeXAI Logo" 
              className="h-12 w-50 mt-1 object-cover"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link to="/enquiry" className="hover:text-blue-400 transition-colors">
              Why Us?
            </Link>
            <Link
              to="/enquiry"
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Download Brochure
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-blue-900/20">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                className="hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/enquiry"
                className="hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Us?
              </Link>
              <Link
                to="/enquiry"
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download Brochure
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-blue-900/20 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src="/logo.png" 
                  alt="CodeXAI Logo" 
                  className="h-12 w-30 object-cover"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Career acceleration through practical training in backend development,
                cloud computing, and generative AI.
              </p>
            </div>

            {/* Courses */}
            <div>
              <h3 className="font-semibold mb-4">Courses</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <Link to="/course/java-backend" className="hover:text-blue-400 transition-colors">
                  Java Backend Engineering
                </Link>
                <Link to="/course/aws-cloud" className="hover:text-blue-400 transition-colors">
                  AWS Cloud Engineering
                </Link>
                <Link to="/course/gen-ai" className="hover:text-blue-400 transition-colors">
                  Generative AI Builder
                </Link>
                <Link to="/course/full-stack-ai" className="hover:text-blue-400 transition-colors">
                  Full Stack AI Engineer
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
                <Link to="/enquiry" className="hover:text-blue-400 transition-colors">
                  Download Brochure
                </Link>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <p>Email: info@codexai.com</p>
                <p>Phone: +91 82859 94903</p>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-900/20 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 CodeXAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
