import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Sun, Moon, ChevronDown, LogOut, User, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useCourses } from "../context/CoursesContext";
import { useAuth } from "../context/AuthContext";
import { getLegals } from "../services/legalsService";
import type { Legal } from "../types/legals";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [legals, setLegals] = useState<Legal[]>([]);
  const [legalsLoading, setLegalsLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { courses } = useCourses();
  const { user, logout, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Fetch legal documents from API
  useEffect(() => {
    const fetchLegals = async () => {
      try {
        const response = await getLegals({ limit: 20 });
        setLegals(response.legals);
      } catch (err) {
        console.error("Failed to fetch legals:", err);
      } finally {
        setLegalsLoading(false);
      }
    };

    fetchLegals();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Get initials from user name
  const getInitials = (fullName?: string) => {
    console.log("👤 getInitials called with:", { fullName });
    if (!fullName || fullName.trim().length === 0) {
      return "U"; // Default initial if name is not available
    }
    return fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setProfileDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCoursesClick = () => {
    // If already on home page, scroll to courses section
    if (location.pathname === "/") {
      const coursesSection = document.getElementById("courses");
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Otherwise navigate to home and let useEffect handle the scroll
      navigate("/#courses");
    }
  };

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
            <button
              onClick={handleCoursesClick}
              className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer bg-none border-none p-0"
            >
              Courses
            </button>
            <Link to="/why-us" className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Why Us
            </Link>
            <Link to="/ai-news" className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              AI News Feed
            </Link>
            <Link to="/contact" className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </Link>

            {/* Profile or Login Button */}
            {user ? (
              <div ref={profileDropdownRef} className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(user.fullName)}
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.fullName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>

                    {/* Menu Options */}
                    <Link
                      to="/account"
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">View Account</span>
                    </Link>

                    <Link
                      to="/my-courses"
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">My Courses</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">{isLoading ? "Logging out..." : "Logout"}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Login/SignUp
              </Link>
            )}
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
              <button
                onClick={() => {
                  handleCoursesClick();
                  setMobileMenuOpen(false);
                }}
                className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left bg-none border-none p-0 cursor-pointer w-full"
              >
                Courses
              </button>
              <Link
                to="/brochure"
                className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Us?
              </Link>
              <Link
                to="/contact"
                className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/ai-news"
                className="text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI News Feed
              </Link>

              {/* Mobile Profile or Login */}
              {user ? (
                <>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white px-2 mb-3">{user.fullName}</p>
                    <Link
                      to="/account"
                      className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>View Account</span>
                    </Link>
                    <Link
                      to="/my-courses"
                      className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>My Courses</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      disabled={isLoading}
                      className="w-full flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors px-2 py-2 disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isLoading ? "Logging out..." : "Logout"}</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login/SignUp
                </Link>
              )}
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
                <Link to="/brochure" className="hover:text-blue-400 transition-colors">
                  Brochures
                </Link>
                <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">Contact</h3>
              <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-gray-400">
                <p>Email: codexaitechnologies@gmail.com</p>
                <p>Phone: +91 82859 94903</p>
                <div className="flex gap-4 mt-2">
                  <a href="https://www.linkedin.com/in/codexai-technologies-29024a400/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
                  <a href="https://twitter.com/codexaitech" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Twitter</a>
                  <a href="https://instagram.com/codexai_india" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/40 dark:border-blue-900/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 dark:text-gray-400 text-sm">© 2026 CodeXAI. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {legalsLoading ? (
                <p className="text-slate-500 dark:text-gray-400">Loading...</p>
              ) : legals && legals.length > 0 ? (
                legals.map((legal, idx) => (
                  <div key={legal.id} className="flex items-center gap-4">
                    <Link 
                      to={`/legal/${legal.documentName.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {legal.documentName}
                    </Link>
                    {idx < legals.length - 1 && (
                      <span className="text-slate-400 dark:text-gray-600">|</span>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <Link to="/legal/privacy-policy" className="text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </Link>
                  <span className="text-slate-400 dark:text-gray-600">|</span>
                  <Link to="/legal/terms-conditions" className="text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Terms & Conditions
                  </Link>
                  <span className="text-slate-400 dark:text-gray-600">|</span>
                  <Link to="/legal/refund-policy" className="text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Refund Policy
                  </Link>
                  <span className="text-slate-400 dark:text-gray-600">|</span>
                  <Link to="/legal/cookie-policy" className="text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Cookie Policy
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
