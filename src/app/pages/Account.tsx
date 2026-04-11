import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  GraduationCap,
  ShieldCheck,
  MessageSquare,
  Tag,
  Paperclip,
  ChevronDown,
  ChevronUp,
  Inbox,
  TriangleAlert,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CoursesContext";
import type { Course } from "../types/course";

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

interface SupportTicket {
  ticketId: string;
  name: string;
  email: string;
  phoneNumber: string;
  category: string;
  priority: "low" | "medium" | "high";
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  documents: string[];
  responses: { message: string; respondedAt: string; respondedBy?: string }[];
  comments?: string[];
  createdAt: string;
  updatedAt: string;
  viewedAt: string | null;
}

export default function Account() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { courses } = useCourses();

  const [activeTab, setActiveTab] = useState<"courses" | "tickets">("courses");

  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState<string | null>(null);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [ticketsError, setTicketsError] = useState<string | null>(null);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const extractUserIdFromIdToken = (): string | null => {
    try {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) return null;
      const parts = idToken.split(".");
      if (parts.length !== 3) return null;
      const payload = parts[1];
      const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
      const decoded = JSON.parse(atob(padded));
      return decoded.sub || null;
    } catch {
      return null;
    }
  };

  const fetchCourses = useCallback(async () => {
    if (!user) return;
    setCoursesLoading(true);
    setCoursesError(null);
    try {
      const userId = extractUserIdFromIdToken();
      if (!userId) {
        setCoursesError("Unable to verify identity. Please log in again.");
        return;
      }
      const response = await fetch(
        `https://r5exi0cxad.execute-api.ap-south-1.amazonaws.com/payments/user/${userId}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      if (!response.ok) throw new Error(`Failed to fetch courses: ${response.statusText}`);
      const data = await response.json();
      if (data.data?.payments) setEnrolledCourses(data.data.payments);
    } catch (err) {
      setCoursesError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setCoursesLoading(false);
    }
  }, [user]);

  const fetchTickets = useCallback(async () => {
    if (!user?.email) return;
    setTicketsLoading(true);
    setTicketsError(null);
    try {
      const response = await fetch(
        `https://r5exi0cxad.execute-api.ap-south-1.amazonaws.com/support/queries/by-email?email=${encodeURIComponent(user.email)}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      if (!response.ok) throw new Error(`Failed to fetch tickets: ${response.statusText}`);
      const data = await response.json();
      if (data.tickets) setSupportTickets(data.tickets);
    } catch (err) {
      setTicketsError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setTicketsLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);
  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchCourses(), fetchTickets()]);
    setRefreshing(false);
  };

  const getCourseDetails = (courseId: string): Course | undefined =>
    courses.find((c) => c.courseId === courseId);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (fullName: string) =>
    fullName.split(" ").map((n) => n.charAt(0).toUpperCase()).join("").slice(0, 2);

  const priorityConfig = {
    low:    { label: "Low",    bg: "bg-slate-100 dark:bg-slate-800",   text: "text-slate-600 dark:text-slate-400",   dot: "bg-slate-400" },
    medium: { label: "Medium", bg: "bg-yellow-50 dark:bg-yellow-950/20", text: "text-yellow-700 dark:text-yellow-400",  dot: "bg-yellow-400" },
    high:   { label: "High",   bg: "bg-red-50 dark:bg-red-950/20",      text: "text-red-600 dark:text-red-400",        dot: "bg-red-500" },
  };

  const statusConfig = {
    open:        { label: "Open",        bg: "bg-blue-50 dark:bg-blue-950/20",   text: "text-blue-700 dark:text-blue-400",   border: "border-blue-200 dark:border-blue-800" },
    "in-progress": { label: "In Progress", bg: "bg-purple-50 dark:bg-purple-950/20", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800" },
    resolved:    { label: "Resolved",    bg: "bg-green-50 dark:bg-green-950/20",  text: "text-green-700 dark:text-green-400",  border: "border-green-200 dark:border-green-800" },
    closed:      { label: "Closed",      bg: "bg-slate-100 dark:bg-slate-800",   text: "text-slate-600 dark:text-slate-400",  border: "border-slate-200 dark:border-slate-700" },
  };

  const totalInvested = enrolledCourses.reduce((sum, e) => sum + e.amount, 0);
  const activeCount = enrolledCourses.filter((e) => e.status === "captured").length;
  const openTickets = supportTickets.filter((t) => t.status === "open").length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black">
      <div className="container mx-auto px-4 pt-28 pb-20">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            My <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Account</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your profile and enrolled courses</p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-80 lg:sticky lg:top-28 flex-shrink-0 space-y-5"
          >
            {/* Profile card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              {/* Banner */}
              <div className="h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700" />
              {/* Avatar */}
              <div className="px-6 pb-6">
                <div className="-mt-10 mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-white dark:ring-slate-900">
                    {getInitials(user.fullName)}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.fullName}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Student
                </span>
              </div>
            </div>

            {/* Details card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
              <div className="px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">Contact Info</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">Email</p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 break-all">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400">Phone</p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {user.phoneNumber || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">Account Info</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">User ID</p>
                      <p className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 break-all">{user.id}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400">Member Since</p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats card */}
            {!coursesLoading && enrolledCourses.length > 0 && (
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-200 mb-4">Summary</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-100">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm">Courses Enrolled</span>
                    </div>
                    <span className="text-xl font-bold">{enrolledCourses.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-100">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Active</span>
                    </div>
                    <span className="text-xl font-bold">{activeCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-100">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">Open Tickets</span>
                    </div>
                    <span className="text-xl font-bold">{openTickets}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-100">
                      <IndianRupee className="w-4 h-4" />
                      <span className="text-sm">Total Invested</span>
                    </div>
                    <span className="text-lg font-bold">₹ {totalInvested}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Support note */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 text-xs text-blue-700 dark:text-blue-300">
              To update your information, contact{" "}
              <a href="mailto:codexaitechnologies@gmail.com" className="underline">
                codexaitechnologies@gmail.com
              </a>
            </div>
          </motion.aside>

          {/* ── RIGHT MAIN ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 min-w-0"
          >
            {/* Tabs + Refresh */}
            <div className="flex items-center gap-3 mb-7">
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab("courses")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "courses"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                My Courses
                {!coursesLoading && enrolledCourses.length > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === "courses" ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "bg-slate-200 dark:bg-slate-700 text-slate-500"}`}>
                    {enrolledCourses.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("tickets")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "tickets"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Support Tickets
                {!ticketsLoading && supportTickets.length > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === "tickets" ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "bg-slate-200 dark:bg-slate-700 text-slate-500"}`}>
                    {supportTickets.length}
                  </span>
                )}
              </button>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing || coursesLoading || ticketsLoading}
              title="Refresh data"
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            </div>

            <AnimatePresence mode="wait">

              {/* ──── MY COURSES TAB ──────────────────────────────── */}
              {activeTab === "courses" && (
                <motion.div key="courses" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {coursesLoading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                      <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Loading your courses...</p>
                    </div>
                  )}
                  {coursesError && !coursesLoading && (
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-5 flex items-start gap-4">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-800 dark:text-red-200 text-sm">Failed to load courses</p>
                        <p className="text-red-600 dark:text-red-300 text-sm mt-1">{coursesError}</p>
                      </div>
                    </div>
                  )}
                  {!coursesLoading && !coursesError && enrolledCourses.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-5">
                        <BookOpen className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No Courses Yet</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                        You haven't enrolled in any courses yet. Start your learning journey today!
                      </p>
                      <button
                        onClick={() => navigate("/#courses")}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all"
                      >
                        <BookOpen className="w-4 h-4" />
                        Browse Courses
                      </button>
                    </div>
                  )}
                  {!coursesLoading && !coursesError && enrolledCourses.length > 0 && (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {enrolledCourses.map((enrollment, idx) => {
                        const courseDetails = getCourseDetails(enrollment.courseId);
                        return (
                          <motion.div
                            key={enrollment.paymentId}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.07 }}
                            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden flex flex-col"
                          >
                            <div className="h-28 bg-gradient-to-br from-blue-500 to-purple-600 p-5 flex items-end">
                              <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                                {courseDetails?.title || "Unknown Course"}
                              </h3>
                            </div>
                            <div className="p-5 flex flex-col flex-1 gap-4">
                              <div className="flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-xs font-semibold text-green-600 dark:text-green-400">Enrolled</span>
                              </div>
                              {courseDetails && (
                                <div className="space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span>{courseDetails.duration}</span>
                                  </div>
                                  {courseDetails.curriculum && (
                                    <div className="flex items-center gap-2">
                                      <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                                      <span>{courseDetails.curriculum.length} modules</span>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-500 dark:text-slate-400">Paid</span>
                                  <span className="font-semibold text-slate-800 dark:text-white">₹ {enrollment.amount}</span>
                                </div>
                                {enrollment.couponCode && (
                                  <div className="flex justify-between">
                                    <span className="text-slate-500 dark:text-slate-400">Coupon</span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">{enrollment.couponCode}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-slate-500 dark:text-slate-400">Date</span>
                                  <span className="font-medium text-slate-700 dark:text-slate-300">{formatDate(enrollment.createdAt)}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => navigate(`/course/${enrollment.courseId}`)}
                                className="mt-auto w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-md hover:shadow-blue-500/40 transition-all"
                              >
                                View Course
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ──── SUPPORT TICKETS TAB ─────────────────────────── */}
              {activeTab === "tickets" && (
                <motion.div key="tickets" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {ticketsLoading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                      <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Loading your support tickets...</p>
                    </div>
                  )}
                  {ticketsError && !ticketsLoading && (
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-5 flex items-start gap-4">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-800 dark:text-red-200 text-sm">Failed to load tickets</p>
                        <p className="text-red-600 dark:text-red-300 text-sm mt-1">{ticketsError}</p>
                      </div>
                    </div>
                  )}
                  {!ticketsLoading && !ticketsError && supportTickets.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-5">
                        <Inbox className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No Support Tickets</h3>
                      <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                        You haven't raised any support tickets yet. Contact us whenever you need help.
                      </p>
                    </div>
                  )}
                  {!ticketsLoading && !ticketsError && supportTickets.length > 0 && (
                    <div className="space-y-4">
                      {supportTickets.map((ticket, idx) => {
                        const pri = priorityConfig[ticket.priority] ?? priorityConfig.medium;
                        const sta = statusConfig[ticket.status] ?? statusConfig.open;
                        const isExpanded = expandedTicket === ticket.ticketId;
                        return (
                          <motion.div
                            key={ticket.ticketId}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.06 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                          >
                            {/* Ticket header — always visible */}
                            <button
                              onClick={() => setExpandedTicket(isExpanded ? null : ticket.ticketId)}
                              className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                              {/* Priority dot */}
                              <div className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${pri.dot}`} />

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                  <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">{ticket.ticketId}</span>
                                  {/* Status badge */}
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${sta.bg} ${sta.text} ${sta.border}`}>
                                    {sta.label}
                                  </span>
                                  {/* Priority badge */}
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pri.bg} ${pri.text}`}>
                                    {pri.label} Priority
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-2 text-left">{ticket.description}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                  <span className="flex items-center gap-1 text-xs text-slate-400">
                                    <Tag className="w-3 h-3" />
                                    {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs text-slate-400">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(ticket.createdAt)}
                                  </span>
                                  {ticket.documents.length > 0 && (
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                      <Paperclip className="w-3 h-3" />
                                      {ticket.documents.length} attachment{ticket.documents.length > 1 ? "s" : ""}
                                    </span>
                                  )}
                                  {ticket.responses.length > 0 && (
                                    <span className="flex items-center gap-1 text-xs text-blue-500 font-medium">
                                      <MessageSquare className="w-3 h-3" />
                                      {ticket.responses.length} response{ticket.responses.length > 1 ? "s" : ""}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex-shrink-0 text-slate-400 mt-1">
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </button>

                            {/* Ticket expanded details */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-5 space-y-5">
                                    {/* Full description */}
                                    <div>
                                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Description</p>
                                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{ticket.description}</p>
                                    </div>

                                    {/* Attachments */}
                                    {ticket.documents.length > 0 && (
                                      <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Attachments</p>
                                        <div className="flex flex-wrap gap-3">
                                          {ticket.documents.map((doc, dIdx) => (
                                            <a
                                              key={dIdx}
                                              href={doc}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-blue-600 dark:text-blue-400 hover:border-blue-400 transition-colors"
                                            >
                                              <Paperclip className="w-3.5 h-3.5" />
                                              Attachment {dIdx + 1}
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Comments */}
                                    {ticket.comments && ticket.comments.length > 0 && (
                                      <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Internal Comments</p>
                                        <div className="space-y-2">
                                          {ticket.comments.map((comment, cIdx) => (
                                            <div key={cIdx} className="flex gap-3">
                                              <div className="w-1.5 rounded-full bg-yellow-400 flex-shrink-0 self-stretch" />
                                              <p className="text-sm text-slate-700 dark:text-slate-300 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/50 rounded-xl px-4 py-3 flex-1">{comment}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Responses */}
                                    {ticket.responses.length > 0 ? (
                                      <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Responses</p>
                                        <div className="space-y-3">
                                          {ticket.responses.map((resp, rIdx) => (
                                            <div key={rIdx} className="flex gap-3">
                                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                                <MessageSquare className="w-3.5 h-3.5 text-white" />
                                              </div>
                                              <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                                                    {resp.respondedBy || "Support Team"}
                                                  </span>
                                                  <span className="text-xs text-slate-400">{formatDate(resp.respondedAt)}</span>
                                                </div>
                                                <p className="text-sm text-slate-700 dark:text-slate-300">{resp.message}</p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2 text-xs text-slate-400 py-2">
                                        <TriangleAlert className="w-3.5 h-3.5" />
                                        No responses yet — our team will get back to you soon.
                                      </div>
                                    )}

                                    {/* Timestamps */}
                                    <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                                      <div>
                                        <p className="text-xs text-slate-400">Raised on</p>
                                        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{formatDate(ticket.createdAt)}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-slate-400">Last updated</p>
                                        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{formatDate(ticket.updatedAt)}</p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
