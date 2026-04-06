import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Mail, CheckCircle, RotateCcw, Loader } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { confirmEmail, resendCode, isLoading } = useAuth();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [timer, setTimer] = useState(0);

  // Mask email address for privacy
  const maskEmail = (emailAddress: string): string => {
    if (!emailAddress || !emailAddress.includes("@")) return emailAddress;
    
    const [localPart, domain] = emailAddress.split("@");
    if (localPart.length <= 2) {
      return `${localPart}***@${domain}`;
    }
    
    const firstChar = localPart[0];
    const lastChar = localPart[localPart.length - 1];
    return `${firstChar}***${lastChar}@${domain}`;
  };

  // Countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    try {
      await confirmEmail(email, code);
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify email");
    }
  };

  const handleResend = async () => {
    setError("");
    setResendSuccess(false);

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setResendLoading(true);
    try {
      await resendCode(email);
      setResendSuccess(true);
      setTimer(60); // 60 second cooldown
      
      // Clear success message after 3 seconds
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend code");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          {success ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            </motion.div>
          ) : (
            <Mail className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          )}

          <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
            {success ? "Email Verified!" : "Verify Your Email"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {success
              ? "Your email has been verified successfully. Redirecting to login..."
              : `We've sent a verification code to ${maskEmail(email)}.`}
          </p>
        </div>

        {!success && (
          <form onSubmit={handleConfirm} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {resendSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm"
              >
                ✓ Verification code sent to your email
              </motion.div>
            )}

            {/* Verification Code Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 text-center tracking-widest font-mono text-lg"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Check your email inbox for the verification code
              </p>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !code}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Verify Email
                </>
              )}
            </button>

            {/* Resend Code */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Didn't receive the code?
                </span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading || timer > 0 || !email}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  {resendLoading ? "Sending..." : "Resend Code"}
                </button>
              </div>

              {/* Timer Display */}
              {timer > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                  <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                    Wait {timer} second{timer !== 1 ? "s" : ""} to resend
                  </span>
                </motion.div>
              )}
            </div>
          </form>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-8"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              You will be redirected to login in a moment...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
