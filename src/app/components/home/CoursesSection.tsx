import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Code, Cloud, Sparkles, CheckCircle, Zap } from "lucide-react";
import type { Course } from "../../types/course";

export function CoursesSection() {
  const courses: Course[] = [
    {
      title: "Java Engineering + AI Integration",
      duration: "2 Months",
      icon: Code,
      description:
        "Master Java fundamentals, OOP, collections, file handling, and build real backend projects.",
      features: [
        "Core Java + OOP Concepts",
        "Collections & Exception Handling",
        "File I/O & Real Projects",
      ],
      projectCount: "3+ Projects",
      link: "/course/java-backend",
      colorClass: {
        from: "from-blue-950/50",
        to: "to-black",
        icon: "text-blue-500",
        badge: "bg-blue-500",
        border: "border-blue-500/30",
        hoverBorder: "hover:border-blue-500",
        hoverShadow: "hover:shadow-xl hover:shadow-blue-500/20",
      },
    },
    {
      title: "AWS Cloud + AI Integration",
      duration: "8 Weeks",
      icon: Cloud,
      description:
        "Learn EC2, S3, IAM, CI/CD, Docker, serverless computing with hands-on AWS labs and AI services integration.",
      features: [
        "AWS Core Services + IAM",
        "Docker & CI/CD Pipelines",
        "Serverless & Mock Interviews",
      ],
      projectCount: "4+ Projects",
      link: "/course/aws-cloud",
      colorClass: {
        from: "from-purple-950/50",
        to: "to-black",
        icon: "text-purple-500",
        badge: "bg-purple-500",
        border: "border-purple-500/30",
        hoverBorder: "hover:border-purple-500",
        hoverShadow: "hover:shadow-xl hover:shadow-purple-500/20",
      },
    },
    {
      title: "GenAI Foundation Program",
      duration: "3 Months",
      icon: Sparkles,
      description: "Prompt engineering, LLMs, RAG, AI agents, and production-ready AI applications.",
      features: [
        "Prompt Engineering + LLM APIs",
        "RAG & AI Agents",
        "Production AI Apps + Capstone",
      ],
      projectCount: "5+ Projects",
      link: "/course/gen-ai",
      colorClass: {
        from: "from-orange-950/50",
        to: "to-black",
        icon: "text-orange-500",
        badge: "bg-orange-500",
        border: "border-orange-500/30",
        hoverBorder: "hover:border-orange-500",
        hoverShadow: "hover:shadow-xl hover:shadow-orange-500/20",
      },
    },
    {
      title: "Full Stack + AI Integration Program",
      duration: "6 Months",
      icon: Zap,
      description:
        "Complete 6-month transformation: Java Backend + AWS Cloud + Generative AI integrated throughout with system design & career mentorship.",
      features: [
        "Full Java Backend",
        "AWS Cloud Mastery",
        "Generative AI",
        "System Design",
        "Interview Prep",
        "Career Mentorship",
      ],
      projectCount: "15+ Projects",
      link: "/course/full-stack-ai",
      colorClass: {
        from: "from-blue-500/20 via-purple-500/20",
        to: "to-orange-500/20",
        icon: "text-yellow-500",
        badge: "bg-gradient-to-r from-blue-500 to-purple-500",
        border: "border-2 border-blue-500",
        hoverBorder: "hover:shadow-2xl",
        hoverShadow: "hover:shadow-blue-500/30",
      },
      isFlagship: true,
    },
  ];

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
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative bg-gradient-to-br ${course.colorClass.from} ${course.colorClass.to} ${course.colorClass.border} rounded-2xl p-8 transition-all ${
                course.isFlagship
                  ? `border-2 border-blue-500 hover:shadow-2xl ${course.colorClass.hoverShadow}`
                  : `${course.colorClass.hoverBorder} ${course.colorClass.hoverShadow}`
              }`}
            >
              <div
                className={`absolute top-4 right-4 ${course.colorClass.badge} text-xs px-3 py-1 rounded-full`}
              >
                {course.isFlagship ? "🔥 FLAGSHIP" : course.duration}
              </div>
              <course.icon className={`w-12 h-12 ${course.colorClass.icon} mb-4`} />
              <h3 className="text-3xl mb-4">{course.title}</h3>
              <p className="text-gray-400 mb-6">{course.description}</p>
              {course.isFlagship ? (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {course.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 mb-6">
                  {course.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className={course.colorClass.icon}>{course.projectCount}</span>
                <Link
                  to={course.link}
                  className={`flex items-center gap-2 ${course.colorClass.icon} group-hover:opacity-80 transition-colors`}
                >
                  View Curriculum <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
