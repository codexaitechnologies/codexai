import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, Calendar, CreditCard, BookOpen, Home as HomeIcon, ArrowRight } from "lucide-react";

interface PaymentDetails {
  paymentId: string;
  amount: string;
  courseName: string;
  courseId: string;
  studentName: string;
  email: string;
  date: string;
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get payment details from URL params or localStorage
    const pid = searchParams.get("paymentId");
    const stored = localStorage.getItem("paymentDetails");

    if (pid || stored) {
      try {
        if (stored) {
          const details = JSON.parse(stored);
          setPaymentDetails(details);
          // Clear localStorage after retrieving
          localStorage.removeItem("paymentDetails");
        } else if (pid) {
          // If only paymentId in URL, create a structured object
          setPaymentDetails({
            paymentId: pid,
            amount: searchParams.get("amount") || "N/A",
            courseName: searchParams.get("courseName") || "Course",
            courseId: searchParams.get("courseId") || "",
            studentName: searchParams.get("studentName") || "Student",
            email: searchParams.get("email") || "",
            date: new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          });
        }
      } catch (error) {
        console.error("Error parsing payment details:", error);
      }
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-spin">
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl mb-2">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="text-4xl mb-4">No Payment Details Found</h1>
          <p className="text-gray-400 mb-8">
            We couldn't find payment information for this transaction.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950/20 to-purple-950/20 py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-950/40 to-purple-950/40 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 md:p-12"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full flex items-center justify-center border border-green-500/50">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-300">
              Thank you for enrolling with CodeXAI
            </p>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 mb-12 bg-blue-950/30 rounded-xl p-8 border border-blue-500/20"
          >
            {/* Payment ID */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Payment ID</p>
                <p className="text-lg font-semibold text-white break-all">{paymentDetails.paymentId}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Payment Date</p>
                <p className="text-lg font-semibold text-white">{paymentDetails.date}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-yellow-400">₹</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Amount Paid</p>
                <p className="text-lg font-semibold text-white">₹ {paymentDetails.amount}</p>
              </div>
            </div>

            {/* Course Details */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Course Enrolled</p>
                <p className="text-lg font-semibold text-white">{paymentDetails.courseName}</p>
              </div>
            </div>

            {/* Student Name */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-green-400">👤</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Student Name</p>
                <p className="text-lg font-semibold text-white">{paymentDetails.studentName}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-pink-400">✉</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Email Address</p>
                <p className="text-lg font-semibold text-white break-all">{paymentDetails.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">What's Next?</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Check your email for course access details and welcome materials</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Our team will contact you within 24 hours to confirm enrollment</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Access your course dashboard and start learning immediately</span>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              <HomeIcon className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
            to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 px-8 py-3 rounded-lg hover:bg-blue-500/30 transition-all"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-2">Need help?</p>
          <p className="text-gray-400">
            Email us at{" "}
            <a href="mailto:support@codexai.co.in" className="text-blue-400 hover:text-blue-300">
              support@codexai.co.in
            </a>
            {" "}or call{" "}
            <a href="tel:+919876543210" className="text-blue-400 hover:text-blue-300">
              +91 98765 43210
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
