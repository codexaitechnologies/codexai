import { Outlet, Link, useLocation } from "react-router";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useCourses } from "../context/CoursesContext";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { courses } = useCourses();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-slate-200/60 dark:border-blue-900/20 transition-colors duration-300">
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
            <Link to="/" className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link to="/enquiry" className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Why Us?
            </Link>
            <Link
              to="/enquiry"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Download Brochure
            </Link>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-blue-900/40 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle (mobile) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-blue-900/40 bg-slate-100 dark:bg-slate-800 transition-all"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
            <button
              className="text-slate-800 dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-slate-200/60 dark:border-blue-900/20 transition-colors duration-300">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/enquiry"
                className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Us?
              </Link>
              <Link
                to="/enquiry"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-center"
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
      <footer className="bg-slate-100/50 dark:bg-black/50 border-t border-slate-200/40 dark:border-blue-900/20 mt-20 transition-colors duration-300">
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
              <p className="text-slate-500 dark:text-gray-400 text-sm">
                Career acceleration through practical training in backend development,
                cloud computing, and generative AI.
              </p>
            </div>

            {/* Courses */}
            <div>
              <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">Courses</h3>
              <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-gray-400">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <Link
                      key={course.courseId}
                      to={course.link}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {course.title}
                    </Link>
                  ))
                ) : (
                  <p>Loading courses...</p>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">Quick Links</h3>
              <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-gray-400">
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About Us
                </Link>
                <Link to="/enquiry" className="hover:text-blue-400 transition-colors">
                  Download Brochure
                </Link>
                <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">Contact</h3>
              <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-gray-400">
                <p>Email: codexaitechnologies@gmail.com</p>
                <p>Phone: +91 82859 94903</p>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Twitter</a>
                  <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/40 dark:border-blue-900/20 mt-8 pt-8 text-center text-sm text-slate-500 dark:text-gray-400">
            <p>© 2026 CodeXAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
