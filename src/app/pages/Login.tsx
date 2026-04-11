import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, resendCode, isAuthenticated, isLoading, googleSignUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [verificationSending, setVerificationSending] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUnverifiedEmail(null);

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again.";
      console.error("Login error:", err);

      // Check if email is not verified
      if (errorMessage.includes("not verified") || errorMessage.includes("not been verified")) {
        setUnverifiedEmail(email);
        // Wait for user to confirm before resending
      } else {
        setError(errorMessage);
      }
    }
  };

  // Handle resending verification code for unverified email
  const handleResendAndVerify = async () => {
    if (!unverifiedEmail) return;

    setVerificationSending(true);
    try {
      await resendCode(unverifiedEmail);
      console.log("📧 Verification code resent to", unverifiedEmail);
      
      // Redirect to confirm email page
      setTimeout(() => {
        navigate(`/confirm-email?email=${encodeURIComponent(unverifiedEmail)}`);
      }, 500);
    } catch (err) {
      console.error("Error resending code:", err);
      setError(err instanceof Error ? err.message : "Failed to resend verification code");
      setUnverifiedEmail(null);
    } finally {
      setVerificationSending(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setError("");
      const googleIdToken = credentialResponse.credential;
      if (!googleIdToken) {
        throw new Error("Failed to get Google token");
      }
      
      console.log("🔐 Google token received");
      console.log("📋 Token:", googleIdToken);
      console.log("🔐 Token length:", googleIdToken.length);
      console.log("📦 Full credential response:", credentialResponse);
      console.log("✅ Authenticating with backend...");
      await googleSignUp(googleIdToken);
      
      // Redirect to home or dashboard on successful login
      console.log("✅ Google login successful");
      navigate("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Google login failed. Please try again.";
      setError(errorMessage);
      console.error("Google login error:", err);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
    console.error("Google login error occurred");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center px-6 sm:px-12 py-12 lg:py-0"
        >

          {/* Content */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Sign in to your account to continue learning
            </p>

            {/* Form */}
            <form onSubmit={handleEmailLogin} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-8">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Google Login */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="signin_with"
              theme="outline"
              shape="circle"
              size="large"
              width="100%"
              logo_alignment="center"
            />

            {/* Sign Up Link */}
            <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Unverified Email Alert Dialog */}
          <AnimatePresence>
            {unverifiedEmail && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-sm w-full overflow-hidden"
                >
                  {/* Alert Icon */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 flex justify-center">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
                      Email Not Verified
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-center">
                      Your email hasn't been verified yet. We'll resend the verification code to <span className="font-semibold text-slate-900 dark:text-white">{unverifiedEmail}</span> so you can complete your registration.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setUnverifiedEmail(null)}
                        disabled={verificationSending}
                        className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleResendAndVerify}
                        disabled={verificationSending}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {verificationSending ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Verify Email
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-8 flex flex-col items-center justify-center min-h-full">
            {/* Logo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-8"
            >
              <img
                src="/logo.png"
                alt="CodeXAI Logo"
                className="h-46 object-contain"
              />
            </motion.div>

            <h2 className="text-4xl font-bold text-white mb-4">
              Start Learning Today
            </h2>
            <p className="text-lg text-white/80 max-w-sm mb-8">
              Master backend development, cloud computing, and generative AI with
              expert instructors
            </p>

            {/* Features */}
            <div className="space-y-4 text-left">
              {[
                "Live interactive sessions",
                "Industry expert mentorship",
                "Lifetime course access",
                "Job placement assistance",
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
