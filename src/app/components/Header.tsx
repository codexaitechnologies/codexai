import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mt-1">
            <img 
              src="/logo.png" 
              alt="CodeXAI Logo" 
              className="h-12 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm transition-colors ${
                isActive("/") ? "text-blue-400" : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/#courses"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className={`text-sm transition-colors ${
                isActive("/about") ? "text-blue-400" : "text-gray-300 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              to="/enquiry"
              className={`text-sm transition-colors ${
                isActive("/enquiry") ? "text-blue-400" : "text-gray-300 hover:text-white"
              }`}
            >
              Why CodeXAI?
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/enquiry">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Download Brochure
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#courses"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/enquiry"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Enquiry
              </Link>
              <Link to="/enquiry" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  Download Brochure
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
