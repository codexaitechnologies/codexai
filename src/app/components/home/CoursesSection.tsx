
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { Course } from "../../types/course";
import { getIconComponent } from "../../utils/iconMap";
import { useCourses } from "../../context/CoursesContext";

// Helper function to extract shadow color from hoverShadow string
// e.g., "hover:shadow-xl hover:shadow-blue-500/20" -> "shadow-blue-500/20"
function extractShadowColor(hoverShadow: string): string {
  const match = hoverShadow.match(/shadow-[^/\s]+(?:\/\d+)?/);
  return match ? match[0] : "shadow-black/40";
}

export function CoursesSection() {
  const { courses, loading } = useCourses();


  if (loading) {
    return <div className="text-center py-20 text-xl text-gray-400">Loading courses...</div>;
  }

  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4">
            Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Premium</span> Courses
          </h2>
          <p className="text-xl text-gray-400">Choose your career transformation path</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course: Course, idx: number) => {
            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{
                boxShadow: `0 10px 25px -5px rgba(${course.isFlagship ? '59, 130, 246' : '100, 116, 139'}, 0.2)` // light theme shadow
              }}
              className={`group relative light:bg-white dark:bg-gradient-to-br dark:${course.colorClass.from} dark:${course.colorClass.to} dark:shadow-lg ${
                course.isFlagship
                  ? `dark:shadow-blue-500/30 light:border-2 light:border-blue-200 dark:border-2 dark:border-blue-500 dark:hover:shadow-2xl dark:hover:shadow-blue-500/50 light:hover:shadow-xl light:hover:shadow-blue-300`
                  : `dark:${extractShadowColor(course.colorClass.hoverShadow)} dark:${course.colorClass.hoverBorder} dark:hover:${course.colorClass.hoverShadow} light:hover:shadow-lg`
              } light:border light:border-slate-200 dark:${course.colorClass.border} rounded-2xl p-8 transition-all cursor-pointer`}
            >
              <div
                className={`absolute top-4 right-4 light:bg-gray-200 dark:${course.colorClass.badge} text-xs px-3 py-1 rounded-full light:text-gray-800 dark:text-inherit`}
              >
                {course.isFlagship ? "🔥 FLAGSHIP" : course.duration}
              </div>
              {(() => {
                const IconComponent = getIconComponent(course.icon);
                return <IconComponent className={`w-12 h-12 ${course.colorClass.icon} mb-4`} />;
              })()}
              <h3 className="text-3xl mb-4">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{course.description}</p>
              {course.isFlagship ? (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {course.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 mb-6">
                  {course.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-blue-500">{course.projectCount}+ Projects</span>
                <Link
                  to={course.link}
                  className={`flex items-center gap-2 text-blue-500 group-hover:opacity-80 transition-colors`}
                >
                  View Curriculum <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
