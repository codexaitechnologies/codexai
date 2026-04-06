import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Code,
  Cloud,
  Sparkles,
  Zap,
  CheckCircle,
  Calendar,
  Award,
  Target,
  Users,
  BookOpen,
} from "lucide-react";
import type { Course } from "../types/course";
import { useCourses } from "../context/CoursesContext";
import { getIconComponent } from "../utils/iconMap";
import {
  formatCurrency,
} from "../utils/razorpayUtils";

// Helper function to extract color from colorClass icon property
function extractColorFromClass(iconClass: string): string {
  // Extract color from patterns like "text-blue-500", "text-purple-500", etc.
  const match = iconClass.match(/text-(\w+)-\d+/);
  return match ? match[1] : "blue";
}

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  // Handle enrollment navigation
  const handleEnrollment = () => {
    navigate(`/enrollment/${courseId}`);
  };

  // Find course from API by matching link
  const courseData = courses.find((c) => c.link === `/course/${courseId}`);
  const course = courseData as any; // Type assertion to handle API responses

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl mb-4">Course Not Found</h1>
        <Link to="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const Icon = getIconComponent(course.icon || course.iconName || "Code");
  const color = course.colorClass ? extractColorFromClass(course.colorClass.icon) : "blue";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={course.image || "https://png.pngtree.com/thumb_back/fw800/background/20250329/pngtree-robot-head-facing-the-right-side-in-black-and-white-against-image_17151288.jpg"} 
            alt={course.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Icon className={`w-12 h-12 text-${color}-500`} />
              <span
                className={`bg-${color}-500/20 border border-${color}-500/50 px-4 py-1 rounded-full text-sm`}
              >
                {course.duration}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6">{course.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">{course.description}</p>
            <button
              onClick={handleEnrollment}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg transition-all ${
                isLoading
                  ? "bg-gray-600 opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
              }`}
            >
              {isLoading ? "Processing..." : `Enroll Now`}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      {course.highlights && course.highlights.length > 0 && (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl mb-12 text-center">Course Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {course.highlights.map((highlight: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-xl bg-gradient-to-br from-${color}-950/30 to-transparent border border-${color}-500/30 flex items-center gap-4`}
              >
                <CheckCircle className={`w-6 h-6 text-${color}-500 flex-shrink-0`} />
                <span className="text-lg">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Curriculum */}
      {course.curriculum && course.curriculum.length > 0 && (
      <section className="py-20 bg-gradient-to-b from-blue-950/10 via-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl mb-4">Detailed Curriculum</h2>
            <p className="text-xl text-gray-400">Week-by-week learning structure</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {course.curriculum.map((module: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-2xl bg-gradient-to-br from-${color}-950/30 to-transparent border border-${color}-500/30`}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br from-${color}-500 to-${color}-700 flex items-center justify-center flex-shrink-0`}
                  >
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-400">{module.week}</span>
                    </div>
                    <h3 className="text-2xl mb-4">{module.title}</h3>
                    <ul className="space-y-2">
                      {module.topics.map((topic: string, topicIdx: number) => (
                        <li key={topicIdx} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle className={`w-5 h-5 text-${color}-500 flex-shrink-0 mt-1`} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Learning Outcomes */}
      {course.outcomes && course.outcomes.length > 0 && (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl mb-4">Learning Outcomes</h2>
            <p className="text-xl text-gray-400">What you'll achieve</p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {course.outcomes.map((outcome: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-950/30 to-transparent border border-blue-500/30 flex items-start gap-4"
              >
                <Award className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <p className="text-gray-300">{outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Additional Features */}
      <section className="py-20 bg-gradient-to-b from-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "1:1 Mentorship",
                desc: "Personal guidance from industry experts",
              },
              {
                icon: BookOpen,
                title: "Lifetime Access",
                desc: "All recordings and resources forever",
              },
              {
                icon: Target,
                title: "Interview Prep",
                desc: "Mock interviews and resume reviews",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-b from-blue-950/30 to-transparent border border-blue-500/30"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Enroll now and start learning from our expert instructors
            </p>
            <button
              onClick={handleEnrollment}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg transition-all ${
                isLoading
                  ? "bg-gray-400 opacity-50 cursor-not-allowed text-gray-700"
                  : "bg-white text-black hover:shadow-lg cursor-pointer"
              }`}
            >
              {isLoading ? "Processing..." : `Enroll Now`}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
