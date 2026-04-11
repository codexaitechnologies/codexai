import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, Loader, Check, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import LegalDocumentModal from "../components/LegalDocumentModal";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup, isAuthenticated, isLoading, googleSignUp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [apiError, setApiError] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // Field-level error states
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  // Touched/focused fields for validation display
  const [touchedFields, setTouchedFields] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const inputRefs = {
    fullName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Validation functions
  const validateFullName = (value: string): string => {
    if (!value.trim()) {
      return "Full name is required";
    }
    if (value.trim().length < 2) {
      return "Full name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      return "Full name can only contain letters, spaces, hyphens, and apostrophes";
    }
    return "";
  };

  const validateEmail = (value: string): string => {
    if (!value.trim()) {
      return "Email address is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (value: string): string => {
    if (!value.trim()) {
      return "Phone number is required";
    }
    const cleanPhone = value.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return "Phone number must have at least 10 digits";
    }
    if (cleanPhone.length > 15) {
      return "Phone number cannot exceed 15 digits";
    }
    return "";
  };

  const validatePassword = (value: string): string => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must include at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must include at least one lowercase letter";
    }
    if (!/\d/.test(value)) {
      return "Password must include at least one number";
    }
    return "";
  };

  const validateConfirmPassword = (value: string): string => {
    if (!value) {
      return "Please confirm your password";
    }
    if (value !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  // Handle field blur - mark as touched and validate
  const handleFieldBlur = (fieldName: keyof typeof touchedFields) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName);
  };

  // Validate individual field
  const validateField = (fieldName: string) => {
    let error = "";

    switch (fieldName) {
      case "fullName":
        error = validateFullName(fullName);
        break;
      case "email":
        error = validateEmail(email);
        break;
      case "phone":
        error = validatePhone(phone);
        break;
      case "password":
        error = validatePassword(password);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(confirmPassword);
        break;
    }

    setFieldErrors((prev) => ({ ...prev, [fieldName]: error }));
    return error === "";
  };

  // Handle real-time validation as user types
  const handleFullNameChange = (value: string) => {
    setFullName(value);
    if (touchedFields.fullName) {
      setFieldErrors((prev) => ({ ...prev, fullName: validateFullName(value) }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touchedFields.email) {
      setFieldErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (touchedFields.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touchedFields.password) {
      setFieldErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
    // Re-validate confirm password if it's already filled
    if (confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(confirmPassword),
      }));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (touchedFields.confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    // Validate all fields
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    const termsError = !agreedToTerms ? "You must agree to the terms and conditions" : "";

    const newErrors = {
      fullName: fullNameError,
      email: emailError,
      phone: phoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      terms: termsError,
    };

    setFieldErrors(newErrors);
    setTouchedFields({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      // Find first invalid field and focus on it
      if (fullNameError && inputRefs.fullName.current) {
        inputRefs.fullName.current.focus();
      } else if (emailError && inputRefs.email.current) {
        inputRefs.email.current.focus();
      } else if (phoneError && inputRefs.phone.current) {
        inputRefs.phone.current.focus();
      } else if (passwordError && inputRefs.password.current) {
        inputRefs.password.current.focus();
      } else if (confirmPasswordError && inputRefs.confirmPassword.current) {
        inputRefs.confirmPassword.current.focus();
      }
      return;
    }

    try {
      // Clean phone number
      const cleanPhone = phone.replace(/\D/g, "");
      const phoneWithCountry = cleanPhone.startsWith("91") 
        ? `+${cleanPhone}` 
        : `+91${cleanPhone}`;

      await signup(email, password, fullName, phoneWithCountry);
      
      // Redirect to confirm email page
      navigate(`/confirm-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Signup failed. Please try again.");
      console.error("Signup error:", err);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setApiError("");
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
      
      // Redirect to home or dashboard on successful signup
      console.log("✅ Google signup successful");
      navigate("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Google signup failed. Please try again.";
      setApiError(errorMessage);
      console.error("Google signup error:", err);
    }
  };

  const handleGoogleError = () => {
    setApiError("Google signup failed. Please try again.");
    console.error("Google signup error occurred");
  };

  const passwordStrength = {
    hasLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
  };

  const isPasswordStrong =
    passwordStrength.hasLength &&
    passwordStrength.hasUpperCase &&
    passwordStrength.hasLowerCase &&
    passwordStrength.hasNumbers;

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
              Create Account
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Join us to start your learning journey in AI and backend development
            </p>

            {/* Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-5">
              {/* API Error Alert */}
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 dark:text-red-300 font-semibold text-sm">Signup Failed</p>
                    <p className="text-red-700 dark:text-red-400 text-sm mt-0.5">{apiError}</p>
                  </div>
                </motion.div>
              )}

              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    fieldErrors.fullName && touchedFields.fullName
                      ? "text-red-400"
                      : "text-slate-400"
                  }`} />
                  <input
                    ref={inputRefs.fullName}
                    type="text"
                    value={fullName}
                    onChange={(e) => handleFullNameChange(e.target.value)}
                    onBlur={() => handleFieldBlur("fullName")}
                    placeholder="John Doe"
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 ${
                      fieldErrors.fullName && touchedFields.fullName
                        ? "border-red-500 focus:ring-red-400 dark:focus:ring-red-500"
                        : "border-slate-200 dark:border-slate-800 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                    }`}
                  />
                </div>
                {fieldErrors.fullName && touchedFields.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.fullName}
                  </motion.p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    fieldErrors.email && touchedFields.email
                      ? "text-red-400"
                      : "text-slate-400"
                  }`} />
                  <input
                    ref={inputRefs.email}
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={() => handleFieldBlur("email")}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 ${
                      fieldErrors.email && touchedFields.email
                        ? "border-red-500 focus:ring-red-400 dark:focus:ring-red-500"
                        : "border-slate-200 dark:border-slate-800 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                    }`}
                  />
                </div>
                {fieldErrors.email && touchedFields.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.email}
                  </motion.p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    fieldErrors.phone && touchedFields.phone
                      ? "text-red-400"
                      : "text-slate-400"
                  }`} />
                  <input
                    ref={inputRefs.phone}
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={() => handleFieldBlur("phone")}
                    placeholder="+91 98765 43210"
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 ${
                      fieldErrors.phone && touchedFields.phone
                        ? "border-red-500 focus:ring-red-400 dark:focus:ring-red-500"
                        : "border-slate-200 dark:border-slate-800 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                    }`}
                  />
                </div>
                {fieldErrors.phone && touchedFields.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.phone}
                  </motion.p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    fieldErrors.password && touchedFields.password
                      ? "text-red-400"
                      : "text-slate-400"
                  }`} />
                  <input
                    ref={inputRefs.password}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onBlur={() => handleFieldBlur("password")}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 ${
                      fieldErrors.password && touchedFields.password
                        ? "border-red-500 focus:ring-red-400 dark:focus:ring-red-500"
                        : "border-slate-200 dark:border-slate-800 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                    }`}
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
                {fieldErrors.password && touchedFields.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.password}
                  </motion.p>
                )}

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Password Requirements</p>
                    <div className="space-y-1.5">
                      {[
                        { label: "At least 8 characters", met: passwordStrength.hasLength },
                        { label: "One uppercase letter (A-Z)", met: passwordStrength.hasUpperCase },
                        { label: "One lowercase letter (a-z)", met: passwordStrength.hasLowerCase },
                        { label: "One number (0-9)", met: passwordStrength.hasNumbers },
                      ].map((req, idx) => (
                        <div key={idx} className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md transition-colors ${
                          req.met
                            ? "bg-green-50 dark:bg-green-950/30"
                            : "bg-slate-50 dark:bg-slate-800/50"
                        }`}>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                            req.met ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
                          }`}>
                            {req.met && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span className={req.met ? "text-green-700 dark:text-green-400" : "text-slate-600 dark:text-slate-400"}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    fieldErrors.confirmPassword && touchedFields.confirmPassword
                      ? "text-red-400"
                      : "text-slate-400"
                  }`} />
                  <input
                    ref={inputRefs.confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    onBlur={() => handleFieldBlur("confirmPassword")}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 ${
                      fieldErrors.confirmPassword && touchedFields.confirmPassword
                        ? "border-red-500 focus:ring-red-400 dark:focus:ring-red-500"
                        : "border-slate-200 dark:border-slate-800 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {fieldErrors.confirmPassword && touchedFields.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (e.target.checked) {
                        setFieldErrors((prev) => ({ ...prev, terms: "" }));
                      }
                    }}
                    className="w-5 h-5 rounded accent-blue-600 mt-0.5"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDocument("Terms & Conditions");
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
                    >
                      Terms & Conditions
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDocument("Privacy Policy");
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {fieldErrors.terms && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-xs mt-2 flex items-center gap-1 ml-8"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.terms}
                  </motion.p>
                )}
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading || !isPasswordStrong || !agreedToTerms}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Or sign up with
              </span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Google Sign Up */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="signup_with"
              theme="outline"
              shape="circle"
              size="large"
              logo_alignment="center"
            />

            {/* Login Link */}
            <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col items-center justify-center p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          </div>

          <div className="relative z-10 text-center text-white max-w-md">
            {/* Logo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-8"
            >
              <img
                src="/logo.png"
                alt="CodeXAI Logo"
                className="h-46 object-contain mx-auto"
              />
            </motion.div>

            <h2 className="text-4xl font-bold mb-4">Welcome to CodeXAI</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Start your journey into advanced AI and backend development with industry-leading courses and expert instructors.
            </p>
            <div className="space-y-4">
              {["Expert-led courses", "Hands-on projects", "Lifetime access", "Community support"].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-blue-100">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Legal Document Modal */}
      <LegalDocumentModal
        isOpen={isModalOpen}
        documentName={selectedDocument}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDocument(null);
        }}
      />
    </div>
  );
}
