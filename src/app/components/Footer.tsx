import { Link } from "react-router";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CodeXAI
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Transforming careers through practical tech education in Backend, Cloud & AI.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/course/java-backend" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Java Backend + AI Integration
                </Link>
              </li>
              <li>
                <Link to="/course/aws-cloud" className="text-gray-400 hover:text-white text-sm transition-colors">
                  AWS Cloud Engineering + AI Integration
                </Link>
              </li>
              <li>
                <Link to="/course/gen-ai" className="text-gray-400 hover:text-white text-sm transition-colors">
                  GenAI Engineering Flagship Program
                </Link>
              </li>
              <li>
                <Link to="/course/full-stack-ai" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Full Stack + AI Engineering Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/workshop" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Free Workshop
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Corporate Training
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  College Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <span>contact@codexai.in</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Koramangala, Bangalore - 560034</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; 2026 CodeXAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
