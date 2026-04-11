import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CoursesContext";
import type { Course } from "../types/course";
import { formatCurrency } from "../utils/razorpayUtils";

interface EnrolledCourse {
  courseId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  amount: number;
  status: string;
  createdAt: string;
  verifiedAt: string;
  paymentId: string;
  orderId: string;
  couponCode?: string;
  discount?: number;
}

export default function MyCourses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courses } = useCourses();

  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract userId from idToken
  const extractUserIdFromIdToken = (): string | null => {
    try {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) {
        console.warn("⚠️ No idToken found in localStorage");
        return null;
      }

      const parts = idToken.split(".");
      if (parts.length !== 3) {
        console.error("❌ Invalid JWT format");
        return null;
      }

      const payload = parts[1];
      const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
      const decoded = JSON.parse(atob(padded));

      return decoded.sub || null;
    } catch (err) {
      console.error("❌ Error extracting userId from idToken:", err);
      return null;
    }
  };

  // Fetch enrolled courses
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const userId = extractUserIdFromIdToken();

        if (!userId) {
          setError("Unable to verify your identity. Please log in again.");
          setLoading(false);
          return;
        }

        console.log("📡 Fetching enrolled courses for userId:", userId);

        const response = await fetch(
          `https://r5exi0cxad.execute-api.ap-south-1.amazonaws.com/payments/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch enrolled courses: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Enrolled courses fetched:", data);

        if (data.data?.payments) {
          setEnrolledCourses(data.data.payments);
        } else {
          setError("No courses found.");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("❌ Error fetching enrolled courses:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  // Get course details by courseId
  const getCourseDetails = (courseId: string): Course | undefined => {
    return courses.find((c) => c.courseId === courseId);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format currency
//   const formatCurrency = (amount: number): string => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//     }).format(amount / 100);
//   };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl mb-4">Please Log In</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          You need to be logged in to view your enrolled courses.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
            My <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Courses</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            View and manage your enrolled courses
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-32"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <Loader className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Loading your courses...
              </p>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-6 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                  Error Loading Courses
                </h3>
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && enrolledCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center py-16"
          >
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
              No Courses Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              You haven't enrolled in any courses yet. Start learning today!
            </p>
            <button
              onClick={() => navigate("/#courses")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all inline-flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Browse Courses
            </button>
          </motion.div>
        )}

        {/* Courses Grid */}
        {!loading && !error && enrolledCourses.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((enrollment, idx) => {
              const courseDetails = getCourseDetails(enrollment.courseId);

              return (
                <motion.div
                  key={enrollment.paymentId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl dark:hover:shadow-blue-500/20"
                >
                  {/* Course Header */}
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white h-32 flex items-end">
                    <h3 className="text-xl font-bold line-clamp-2">
                      {courseDetails?.title || "Unknown Course"}
                    </h3>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 space-y-4">
                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        Enrolled
                      </span>
                    </div>

                    {/* Course Details */}
                    {courseDetails && (
                      <div className="space-y-3 py-3 border-y border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span>{courseDetails.duration}</span>
                        </div>
                        {courseDetails.curriculum && (
                          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <BookOpen className="w-4 h-4" />
                            <span>{courseDetails.curriculum.length} modules</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Payment Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Amount Paid:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {formatCurrency(enrollment.amount)}
                        </span>
                      </div>
                      {enrollment.couponCode && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 dark:text-slate-400">Coupon:</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {enrollment.couponCode}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Enrolled:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {formatDate(enrollment.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => navigate(`/course/${enrollment.courseId}`)}
                      className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                    >
                      View Course
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Summary Card */}
        {!loading && !error && enrolledCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800/50">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Your Learning Summary
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {enrolledCourses.length}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    {enrolledCourses.length === 1 ? "Course" : "Courses"} Enrolled
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {enrolledCourses.filter((e) => e.status === "captured").length}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Active Enrollments
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatCurrency(
                      enrolledCourses.reduce((sum, e) => sum + e.amount, 0)
                    )}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Total Investment
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
