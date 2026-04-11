import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CheckCircle,
  Loader,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Ticket,
  CreditCard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CoursesContext";
import type { Course } from "../types/course";
import {
  loadRazorpayScript,
  openRazorpayCheckout,
  createPaymentOrder,
  verifyPayment,
  formatCurrency,
} from "../utils/razorpayUtils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Enrollment() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, login, isLoading: authLoading, isAuthenticated } = useAuth();
  const { courses } = useCourses();

  // Form states
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponDiscountType, setCouponDiscountType] = useState<"flat" | "percentage" | null>(null);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay and fetch coupons on mount
  useEffect(() => {
    const loadRazorpay = async () => {
      try {
        const loaded = await loadRazorpayScript();
        setRazorpayLoaded(loaded);
      } catch (error) {
        console.error("Failed to load Razorpay:", error);
      }
    };
    loadRazorpay();
  }, []);

  // Fetch available coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      setCouponsLoading(true);
      try {
        const response = await fetch(
          "https://r5exi0cxad.execute-api.ap-south-1.amazonaws.com/coupons",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }

        const data = await response.json();
        console.log("🎟️ Coupons fetched:", data);
        setAvailableCoupons(data.coupons || []);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setAvailableCoupons([]);
      } finally {
        setCouponsLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  // Auto-move to step 2 if user is logged in
  useEffect(() => {
    if (isAuthenticated && currentStep === 1) {
      setCurrentStep(2);
    }
  }, [isAuthenticated, currentStep]);

  // Find course
  const courseData = courses.find((c) => c.courseId === courseId);
  const course = courseData as any;

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl mb-4">Course Not Found</h1>
        <button
          onClick={() => navigate("/")}
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!email.trim()) {
      setLoginError("Please enter your email");
      return;
    }
    if (!password.trim()) {
      setLoginError("Please enter your password");
      return;
    }

    try {
      await login(email, password);
      setCurrentStep(2);
    } catch (err) {
      setLoginError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    }
  };

  // Remove coupon code
  const removeCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    setCouponDiscountType(null);
    setCouponError("");
    setAppliedCoupon(null);
  };

  // Apply coupon code
  const applyCoupon = () => {
    setCouponError("");
    
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    const coupon = availableCoupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (!coupon) {
      setCouponError("Invalid coupon code");
      setCouponDiscount(0);
      setCouponDiscountType(null);
      setAppliedCoupon(null);
      return;
    }

    // Check if coupon has reached max uses
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      setCouponError("This coupon has expired");
      setCouponDiscount(0);
      setCouponDiscountType(null);
      setAppliedCoupon(null);
      return;
    }

    // Check minimum amount requirement
    if (coupon.minAmount && price < coupon.minAmount * 100) {
      setCouponError(
        `Minimum order amount of ₹${coupon.minAmount} required`
      );
      setCouponDiscount(0);
      setCouponDiscountType(null);
      setAppliedCoupon(null);
      return;
    }

    // Apply coupon
    setCouponDiscountType(coupon.type);
    setCouponDiscount(coupon.value);
    setAppliedCoupon(coupon);
    console.log("✓ Coupon applied:", coupon);
  };

  // Calculate total
  const price = course.price * 100 || 10000;
  const gstExact = price * 0.18;
  const gstFloored = Math.floor(gstExact / 100) * 100; // Floor to nearest rupee
  const roundedOff = gstExact - gstFloored; // Decimal part that gets rounded off
  
  // Calculate discount based on type
  let discount = 0;
  if (couponDiscountType === "flat") {
    discount = couponDiscount * 100; // Convert rupees to paise
  } else if (couponDiscountType === "percentage") {
    discount = Math.round((price * couponDiscount) / 100);
  }
  
  const totalAmount = price + gstFloored - discount;

  // Helper function to decode JWT and extract sub claim
  const extractUserIdFromIdToken = (): string | null => {
    try {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) {
        console.warn("⚠️ No idToken found in localStorage");
        return null;
      }

      // Split JWT into parts
      const parts = idToken.split(".");
      if (parts.length !== 3) {
        console.error("❌ Invalid JWT format");
        return null;
      }

      // Decode payload (second part)
      const payload = parts[1];
      // Add padding if necessary
      const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
      const decoded = JSON.parse(atob(padded));

      const userId = decoded.sub;
      if (userId) {
        console.log("✅ Extracted userId from idToken:", userId);
        return userId;
      } else {
        console.warn("⚠️ No 'sub' claim found in idToken");
        return null;
      }
    } catch (error) {
      console.error("❌ Error extracting userId from idToken:", error);
      return null;
    }
  };

  // Handle payment
  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert("Payment system is loading. Please try again.");
      return;
    }

    setPaymentLoading(true);

    try {
      const studentEmail =
        user?.email || localStorage.getItem("studentEmail") || "student@example.com";
      const fullName =
        user?.fullName || localStorage.getItem("studentName") || "Student";
      let phoneNumber =
        user?.phoneNumber || localStorage.getItem("phoneNumber") || "9876543210";
      
      // Extract userId from idToken
      const userId = extractUserIdFromIdToken();
      
      // Clean up phone number - remove any non-digit characters except leading +
      const cleanPhone = phoneNumber.replace(/[^\d+]/g, "");
      // Ensure phone number starts with + and has country code
      const formattedPhoneNumber = cleanPhone.startsWith("+")
        ? cleanPhone
        : cleanPhone.length === 10
        ? `+91${cleanPhone}`
        : `+${cleanPhone}`;

      console.log("🔄 Creating payment order...");
      console.log("💰 Price:", price, "paise");
      console.log("💰 GST Exact:", gstExact);
      console.log("💰 GST Floored:", gstFloored);
      console.log("💰 Discount:", discount);
      console.log("💰 Total Amount (paise):", totalAmount);
      console.log("💰 Total Amount (rupees):", Math.floor(totalAmount / 100));
      console.log("👤 User Details:", {
        studentEmail,
        fullName,
        phoneNumber: formattedPhoneNumber,
        courseId: course.courseId || courseId,
        userId: userId || "Not found",
      });

      // Prepare the payment order request
      // Note: Convert paise to rupees for the API (common requirement)
      const amountInRupees = Math.floor(totalAmount / 100);

      // Validate inputs before sending
      if (!amountInRupees || amountInRupees <= 0) {
        throw new Error(`Invalid amount: ${amountInRupees} rupees`);
      }
      if (!studentEmail || !studentEmail.includes("@")) {
        throw new Error(`Invalid email: ${studentEmail}`);
      }
      if (!fullName || fullName.trim().length === 0) {
        throw new Error("Student name is required");
      }
      if (!formattedPhoneNumber || formattedPhoneNumber.length < 10) {
        throw new Error(`Invalid phone number: ${formattedPhoneNumber}`);
      }

      console.log("✅ All validations passed. Sending payment request...");
      
      const orderResponse = await createPaymentOrder({
        amount: amountInRupees,
        currency: "INR",
        email: studentEmail,
        fullName: fullName,
        phoneNumber: formattedPhoneNumber,
        description: course.title,
        courseId: course.courseId || courseId || "UNKNOWN",
        userId: userId || undefined,
      });

      const { order } = orderResponse;

      const checkoutOptions = {
        key: order.paymentDetails.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "CodeXAI",
        description: course.title,
        image: "https://codexai.co.in/logo.png",
        order_id: order.id,

        prefill: {
          name: fullName,
          email: studentEmail,
          contact: phoneNumber,
        },

        theme: {
          color: "#00B4D8",
        },

        handler: async function (paymentResponse: any) {
          try {
            const verifyPayload = {
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              studentEmail: studentEmail,
              courseId: course.courseId || courseId || "",
            };

            const verifyResponse = await verifyPayment(verifyPayload);
            const isPaymentValid = verifyResponse.valid || verifyResponse.success;

            if (isPaymentValid) {
              const paymentDetails = {
                paymentId: paymentResponse.razorpay_payment_id,
                orderId: paymentResponse.razorpay_order_id,
                amount: totalAmount / 100,
                courseName: course.title,
                courseId: course.courseId || courseId,
                studentName: fullName,
                email: studentEmail,
                date: new Date().toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              };

              localStorage.setItem(
                "paymentDetails",
                JSON.stringify(paymentDetails)
              );

              const params = new URLSearchParams({
                paymentId: paymentResponse.razorpay_payment_id,
                amount: String(totalAmount / 100),
                courseName: course.title,
              });

              window.location.href = `/payment-success?${params.toString()}`;
            } else {
              const errorMsg = verifyResponse.message || "Payment verification failed";
              alert(
                `Payment verification failed: ${errorMsg}\n\nPlease contact support if the problem persists.\n\nPayment ID: ${paymentResponse.razorpay_payment_id}`
              );
            }
          } catch (error) {
            alert(
              `Payment verification failed: ${
                error instanceof Error ? error.message : "Unknown error"
              }\n\nPlease contact support.`
            );
          } finally {
            setPaymentLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          },
        },
      };

      openRazorpayCheckout(checkoutOptions);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("❌ Payment error details:", {
        error: errorMessage,
        totalAmount,
        email: user?.email,
        fullName: user?.fullName,
        courseId,
      });
      alert(
        `Failed to create payment order:\n${errorMessage}\n\nPlease check the browser console for more details.`
      );
      setPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 max-w-2xl"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Course Enrollment
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Step {currentStep} of 3
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full transition-all ${
                step <= currentStep
                  ? "bg-blue-600"
                  : "bg-slate-200 dark:bg-slate-800"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Login/Sign In */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-blue-600" />
              Sign In or Create Account
            </h2>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm mb-6"
              >
                {loginError}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
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
                    disabled={authLoading}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password */}
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
                    disabled={authLoading}
                    className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Sign In & Continue
                  </>
                )}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                >
                  Sign up here
                </button>
              </p>
            </form>
          </motion.div>
        )}

        {/* Step 2: Course Details */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-6"
          >
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Review Course & Apply Coupon
            </h2>

            {/* Course Summary */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Course Title
                </p>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  {course.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Duration
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {course.duration}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Modules
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {course.curriculum?.length || "12"} weeks
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Description
                </p>
                <p className="text-slate-700 dark:text-slate-300 line-clamp-3">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Apply Coupon Code
              </label>
              
              {appliedCoupon && couponDiscount > 0 ? (
                <div className="space-y-3">
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-green-900 dark:text-green-100">
                          ✓ Coupon Applied
                        </p>
                        <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                          {appliedCoupon.code} - {appliedCoupon.description}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                          Discount: {couponDiscountType === "flat" ? `₹${couponDiscount}` : `${couponDiscount}%`}
                        </p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder={couponsLoading ? "Loading coupons..." : "Enter coupon code"}
                      disabled={couponsLoading}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    disabled={!couponCode || couponsLoading || availableCoupons.length === 0}
                    className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {couponsLoading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
              )}
              
              {couponError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  ✗ {couponError}
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Course Price
                </span>
                <span className="text-slate-900 dark:text-white font-semibold">
                  {formatCurrency(price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">GST (18%)</span>
                <span className="text-slate-900 dark:text-white font-semibold">
                  {formatCurrency(gstExact)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Rounded Off</span>
                <span className="text-slate-900 dark:text-white font-semibold">
                  - {formatCurrency(roundedOff)}
                </span>
              </div>
              {appliedCoupon && couponDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Discount {couponDiscountType === "flat" ? `(₹${couponDiscount})` : `(${couponDiscount}%)`}
                  </span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    -{formatCurrency(discount)}
                  </span>
                </div>
              )}
              <div className="h-px bg-slate-200 dark:bg-slate-700" />
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                  Amount to be paid
                </span>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatCurrency(Math.floor(totalAmount / 100) * 100)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {/* <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Back
              </button> */}
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Continue to Payment
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Payment Confirmation */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-6"
          >
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Payment
            </h2>

            {/* Order Review */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Order Summary
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-slate-900 dark:text-white font-semibold">
                  {course.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total: {formatCurrency(Math.floor(totalAmount / 100) * 100)}
                </p>
              </div>
              {appliedCoupon && couponDiscount > 0 && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  ✓ Coupon "{appliedCoupon.code}" applied: {couponDiscountType === "flat" ? `₹${couponDiscount} off` : `${couponDiscount}% discount`}
                </p>
              )}
            </div>

            {/* Security Info */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                🔒 Secure Payment
              </p>
              <p className="text-slate-900 dark:text-white text-sm">
                Your payment is processed by Razorpay, India's trusted payment gateway. Your card details are completely secure.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={paymentLoading || !razorpayLoaded}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  paymentLoading || !razorpayLoaded
                    ? "bg-gray-400 opacity-50 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
                }`}
              >
                {paymentLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Pay {formatCurrency(Math.floor(totalAmount / 100) * 100)}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
