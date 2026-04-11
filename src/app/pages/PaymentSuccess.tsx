import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import {
  CheckCircle,
  Download,
  Home as HomeIcon,
  ArrowRight,
  Loader,
} from "lucide-react";
import jsPDF from "jspdf";

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
  const [downloading, setDownloading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const pid = searchParams.get("paymentId");
    const stored = localStorage.getItem("paymentDetails");

    if (pid || stored) {
      try {
        if (stored) {
          const details = JSON.parse(stored);
          // Override student info with live auth state
          setPaymentDetails({
            ...details,
            studentName: user?.fullName || details.studentName || "Student",
            email: user?.email || details.email || "",
          });
          localStorage.removeItem("paymentDetails");
        } else if (pid) {
          setPaymentDetails({
            paymentId: pid,
            amount: searchParams.get("amount") || "N/A",
            courseName: searchParams.get("courseName") || "Course",
            courseId: searchParams.get("courseId") || "",
            studentName: user?.fullName || "Student",
            email: user?.email || "",
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
  }, [searchParams, user]);

  const handleDownloadReceipt = () => {
    if (!paymentDetails) return;
    setDownloading(true);
    try {
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const W = pdf.internal.pageSize.getWidth();
      const pad = 15;

      // ── Header bar ──────────────────────────────────────────────────────────
      pdf.setFillColor(37, 99, 235);
      pdf.rect(0, 0, W, 36, "F");
      // subtle right-side purple tint
      pdf.setFillColor(109, 40, 217);
      pdf.rect(W * 0.6, 0, W * 0.4, 36, "F");
      pdf.setFillColor(37, 99, 235);
      pdf.rect(W * 0.6, 0, W * 0.15, 36, "F"); // blend overlap

      pdf.setTextColor(191, 219, 254); // blue-200
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "normal");
      pdf.text("PAYMENT RECEIPT", pad, 11);

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(15);
      pdf.setFont("helvetica", "bold");
      pdf.text("CodeXAI Technologies", pad, 22);

      pdf.setTextColor(191, 219, 254);
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "normal");
      pdf.text("Receipt No.", W - pad, 11, { align: "right" });
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text(`#${paymentDetails.paymentId.slice(-8).toUpperCase()}`, W - pad, 21, { align: "right" });

      // ── Status bar ───────────────────────────────────────────────────────────
      pdf.setFillColor(240, 253, 244);
      pdf.rect(0, 36, W, 20, "F");
      pdf.setDrawColor(187, 247, 208);
      pdf.setLineWidth(0.3);
      pdf.line(0, 36, W, 36);
      pdf.line(0, 56, W, 56);

      // check circle
      pdf.setFillColor(134, 239, 172);
      pdf.circle(pad + 4, 46, 4, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.text("✓", pad + 4, 47.5, { align: "center" });

      pdf.setTextColor(21, 128, 61);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text("Transaction Successful", pad + 11, 44);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.text(paymentDetails.date, pad + 11, 51);

      // PAID badge
      pdf.setFillColor(187, 247, 208);
      pdf.roundedRect(W - 30, 39, 16, 8, 2, 2, "F");
      pdf.setDrawColor(134, 239, 172);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(W - 30, 39, 16, 8, 2, 2, "S");
      pdf.setTextColor(21, 128, 61);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "bold");
      pdf.text("PAID", W - 22, 44.5, { align: "center" });

      // ── Student + Course section ─────────────────────────────────────────────
      let y = 68;

      const label = (txt: string, xPos: number, yPos: number) => {
        pdf.setTextColor(148, 163, 184);
        pdf.setFontSize(7);
        pdf.setFont("helvetica", "normal");
        pdf.text(txt.toUpperCase(), xPos, yPos);
      };
      const value = (txt: string, xPos: number, yPos: number, maxW = 85) => {
        pdf.setTextColor(30, 41, 59);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        const lines = pdf.splitTextToSize(txt, maxW);
        pdf.text(lines, xPos, yPos);
        return lines.length;
      };

      const midX = W / 2 + 5;
      label("Student Name", pad, y);
      label("Email Address", midX, y);
      y += 5;
      value(paymentDetails.studentName, pad, y, 80);
      const emailLines = value(paymentDetails.email, midX, y, 80);
      y += Math.max(1, emailLines) * 5 + 8;

      label("Course Enrolled", pad, y);
      y += 5;
      const courseLines = value(paymentDetails.courseName, pad, y, W - pad * 2);
      y += courseLines * 5 + 10;

      // divider
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.line(pad, y, W - pad, y);
      y += 10;

      // ── Payment details section ──────────────────────────────────────────────
      label("Payment Details", pad, y);
      y += 8;

      const row = (lbl: string, val: string, yPos: number) => {
        pdf.setTextColor(100, 116, 139);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.text(lbl, pad, yPos);
        pdf.setTextColor(30, 41, 59);
        pdf.setFont("helvetica", "bold");
        const lines = pdf.splitTextToSize(val, W - pad * 2 - 50);
        pdf.text(lines, W - pad, yPos, { align: "right" });
      };

      row("Transaction ID", paymentDetails.paymentId, y);
      y += 8;
      row("Payment Date", paymentDetails.date, y);
      y += 8;
      row("Payment Method", "Online Payment", y);
      y += 12;

      // divider
      pdf.setDrawColor(226, 232, 240);
      pdf.line(pad, y, W - pad, y);
      y += 2;

      // ── Total amount row ─────────────────────────────────────────────────────
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, y, W, 22, "F");
      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      pdf.text("Total Amount Paid", pad, y + 14);
      pdf.setTextColor(15, 23, 42);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(`Rs. ${paymentDetails.amount}`, W - pad, y + 14, { align: "right" });
      y += 27;

      // ── Footer ───────────────────────────────────────────────────────────────
      pdf.setDrawColor(226, 232, 240);
      pdf.line(pad, y, W - pad, y);
      y += 8;
      pdf.setTextColor(148, 163, 184);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        "Thank you for enrolling with CodeXAI Technologies. Support: codexaitechnologies@gmail.com",
        W / 2, y, { align: "center", maxWidth: W - pad * 2 }
      );
      y += 6;
      pdf.text("© 2026 CodeXAI Technologies. All rights reserved.", W / 2, y, { align: "center" });

      pdf.save(`CodeXAI_Receipt_${paymentDetails.paymentId}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
          <p className="text-slate-500 dark:text-gray-400">Loading payment details...</p>
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
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">No Payment Found</h1>
          <p className="text-slate-500 dark:text-gray-400 mb-8">
            We couldn't find payment information for this transaction.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black py-16 px-4">
      <div className="container mx-auto max-w-2xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {/* Animated success ring */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-500/30"
            >
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </motion.div>
            {/* Pulse rings */}
            <span className="absolute w-24 h-24 rounded-full bg-green-400/20 animate-ping" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-white"
          >
            Payment <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Successful!</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-lg text-slate-500 dark:text-gray-400"
          >
            Your enrollment is confirmed. Welcome to CodeXAI! 🎉
          </motion.p>
        </motion.div>

        {/* Receipt Card — this gets captured for PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Printable / PDF receipt */}
          <div
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {/* Receipt header strip */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-xs font-medium uppercase tracking-widest mb-1">Payment Receipt</p>
                  <h2 className="text-white text-2xl font-bold">CodeXAI Technologies</h2>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-xs mb-1">Receipt No.</p>
                  <p className="text-white font-mono text-sm font-semibold">#{paymentDetails.paymentId.slice(-8).toUpperCase()}</p>
                </div>
              </div>
            </div>

            {/* Status badge */}
            <div className="px-8 py-4 bg-green-50 border-b border-green-100 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-green-700 font-semibold text-sm">Transaction Successful</p>
                <p className="text-green-600 text-xs">{paymentDetails.date}</p>
              </div>
              <div className="ml-auto">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                  PAID
                </span>
              </div>
            </div>

            {/* Student & Course Info */}
            <div className="px-8 py-6 grid grid-cols-2 gap-6 border-b border-slate-100">
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Student Name</p>
                <p className="text-slate-800 font-semibold">{paymentDetails.studentName}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Email Address</p>
                <p className="text-slate-800 font-semibold text-sm break-all">{paymentDetails.email}</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Course Enrolled</p>
                <p className="text-slate-800 font-semibold">{paymentDetails.courseName}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="px-8 py-6 border-b border-slate-100">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-4">Payment Details</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Transaction ID</span>
                  <span className="text-slate-800 font-mono text-sm font-medium">{paymentDetails.paymentId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Payment Date</span>
                  <span className="text-slate-800 text-sm font-medium">{paymentDetails.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Payment Method</span>
                  <span className="text-slate-800 text-sm font-medium">Online Payment</span>
                </div>
              </div>
            </div>

            {/* Amount Total */}
            <div className="px-8 py-5 bg-slate-50 flex items-center justify-between">
              <span className="text-slate-600 font-medium">Total Amount Paid</span>
              <span className="text-2xl font-bold text-slate-900">₹{paymentDetails.amount}</span>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-xs">
                Thank you for enrolling with CodeXAI Technologies. For support, contact{" "}
                <span className="text-blue-500">codexaitechnologies@gmail.com</span>
              </p>
              <p className="text-slate-300 text-xs mt-1">© 2026 CodeXAI Technologies. All rights reserved.</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
        >
          <button
            onClick={handleDownloadReceipt}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Receipt
              </>
            )}
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Contact Support
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/20 rounded-2xl p-6"
        >
          <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-4">What happens next?</h3>
          <ul className="space-y-3">
            {[
              "A confirmation email has been sent to your registered email address.",
              "Our team will reach out within 24 hours to confirm your enrollment.",
              "You'll receive course access details and onboarding materials shortly.",
            ].map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-gray-400">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Support footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-center mt-8 text-sm text-slate-500 dark:text-gray-500"
        >
          Need help?{" "}
          <a href="mailto:codexaitechnologies@gmail.com" className="text-blue-500 hover:text-blue-400">
            codexaitechnologies@gmail.com
          </a>{" "}
          ·{" "}
          <a href="tel:+918285994903" className="text-blue-500 hover:text-blue-400">
            +91 82859 94903
          </a>
        </motion.div>
      </div>
    </div>
  );
}

