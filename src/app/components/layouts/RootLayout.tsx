import { Outlet, Link, useLocation } from "react-router";
import {
  Home, BookOpen, Users, Briefcase, Trophy,
  Menu, X, User, LogOut, Bell
} from "lucide-react";
import { useState } from "react";

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Career Resources', href: '/career-resources', icon: Briefcase },
    { name: 'Success Stories', href: '/success-stories', icon: Trophy },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <img src="/logo.PNG" alt="CodeXAI Logo" className="h-16 w-auto object-contain" />
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <Link to="/student/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Student Dashboard
                      </Link>
                      <Link to="/instructor/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Instructor Dashboard
                      </Link>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <Link
                  to="/student/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  Student Dashboard
                </Link>
                <Link
                  to="/instructor/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  Instructor Dashboard
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo.PNG" alt="CodeXAI Logo" className="h-16 w-auto object-contain" />
              </div>
              <p className="text-sm text-gray-400">
                Bridging the gap between education and industry expectations through practical, outcome-driven learning.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Programs</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses" className="hover:text-white">All Courses</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/success-stories" className="hover:text-white">Success Stories</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/career-resources" className="hover:text-white">Career Resources</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
                <li><Link to="/projects" className="hover:text-white">Project Showcase</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@codexai.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Bangalore, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
            <p>&copy; 2026 CodeXAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}