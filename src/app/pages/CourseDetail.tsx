import { useParams, Link } from "react-router";
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

const courses = {
  "java-backend": {
    title: "Java Backend Engineering",
    duration: "2 Months",
    icon: Code,
    color: "blue",
    description:
      "Master Java programming from fundamentals to advanced backend development. Build real-world projects and become job-ready.",
    image: "https://images.unsplash.com/photo-1770159116807-9b2a7bb82294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjBsYXB0b3AlMjBkYXJrfGVufDF8fHx8MTc3NDcwMjE4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    highlights: [
      "Core Java & OOP Mastery",
      "Collections Framework",
      "Exception Handling",
      "File I/O Operations",
      "3+ Real Projects",
      "Weekly Assessments",
    ],
    curriculum: [
      {
        week: "Week 1-2",
        title: "Java Fundamentals",
        topics: [
          "Introduction to Java & JDK Setup",
          "Variables, Data Types, Operators",
          "Control Flow (if-else, loops)",
          "Methods and Functions",
          "Arrays and Strings",
        ],
      },
      {
        week: "Week 3-4",
        title: "Object-Oriented Programming",
        topics: [
          "Classes and Objects",
          "Encapsulation, Inheritance, Polymorphism",
          "Abstraction and Interfaces",
          "Constructors and this keyword",
          "Static and Final Keywords",
        ],
      },
      {
        week: "Week 5-6",
        title: "Advanced Java Concepts",
        topics: [
          "Collections Framework (List, Set, Map)",
          "Generics and Type Safety",
          "Exception Handling (try-catch-finally)",
          "File I/O Operations",
          "Serialization and Deserialization",
        ],
      },
      {
        week: "Week 7-8",
        title: "Real Projects & Assessment",
        topics: [
          "Project 1: Student Management System",
          "Project 2: Banking Application",
          "Project 3: E-commerce Backend",
          "Code Review and Best Practices",
          "Final Assessment and Interview Prep",
        ],
      },
    ],
    outcomes: [
      "Build production-ready Java applications",
      "Understand OOP principles deeply",
      "Write clean, maintainable code",
      "Ready for backend developer roles",
    ],
  },
  "aws-cloud": {
    title: "AWS Cloud Engineering",
    duration: "8 Weeks",
    icon: Cloud,
    color: "purple",
    description:
      "Become an AWS certified cloud engineer. Learn EC2, S3, IAM, Docker, CI/CD, and serverless computing with hands-on labs.",
    image: "https://images.unsplash.com/photo-1690627931320-16ac56eb2588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMG5ldHdvcmt8ZW58MXx8fHwxNzc0NjA2NzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    highlights: [
      "AWS Core Services",
      "IAM & Security",
      "Docker & Containers",
      "CI/CD Pipelines",
      "4+ Cloud Projects",
      "Mock Interviews",
    ],
    curriculum: [
      {
        week: "Week 1-2",
        title: "Cloud Fundamentals & AWS Basics",
        topics: [
          "Introduction to Cloud Computing",
          "AWS Account Setup and Management",
          "IAM (Users, Groups, Roles, Policies)",
          "AWS CLI and SDK Basics",
          "Cloud Security Best Practices",
        ],
      },
      {
        week: "Week 3-4",
        title: "Compute & Storage Services",
        topics: [
          "EC2 (Launch, Configure, Security Groups)",
          "S3 (Buckets, Objects, Lifecycle Policies)",
          "EBS and EFS Storage",
          "Load Balancers and Auto Scaling",
          "Project: Deploy Web App on EC2",
        ],
      },
      {
        week: "Week 5-6",
        title: "DevOps & Containers",
        topics: [
          "Docker Fundamentals",
          "Container Orchestration Basics",
          "AWS CodePipeline and CodeBuild",
          "CI/CD Pipeline Setup",
          "Project: Automated Deployment Pipeline",
        ],
      },
      {
        week: "Week 7-8",
        title: "Serverless & Interview Prep",
        topics: [
          "AWS Lambda Functions",
          "API Gateway",
          "DynamoDB and RDS",
          "CloudWatch Monitoring",
          "Mock Interviews and Case Studies",
        ],
      },
    ],
    outcomes: [
      "Deploy and manage AWS infrastructure",
      "Build scalable cloud applications",
      "Implement CI/CD pipelines",
      "Ready for cloud engineer roles",
    ],
  },
  "gen-ai": {
    title: "Generative AI Builder Program",
    duration: "3 Months",
    icon: Sparkles,
    color: "orange",
    description:
      "Build production-ready AI applications. Learn prompt engineering, LLMs, RAG, AI agents, and deploy real AI systems.",
    image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzQ2NTU5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    highlights: [
      "Prompt Engineering",
      "LLM APIs (OpenAI, Anthropic)",
      "RAG Systems",
      "AI Agents",
      "5+ AI Projects",
      "Capstone Project",
    ],
    curriculum: [
      {
        week: "Week 1-3",
        title: "AI Fundamentals & Prompt Engineering",
        topics: [
          "Introduction to Generative AI",
          "LLM Basics and Capabilities",
          "Advanced Prompt Engineering Techniques",
          "OpenAI API and Anthropic Claude",
          "Project: AI Content Generator",
        ],
      },
      {
        week: "Week 4-6",
        title: "LLM APIs & Integration",
        topics: [
          "Working with Multiple LLM Providers",
          "Token Management and Cost Optimization",
          "Streaming Responses",
          "Function Calling and Tool Use",
          "Project: AI Chatbot with Memory",
        ],
      },
      {
        week: "Week 7-9",
        title: "RAG & Vector Databases",
        topics: [
          "Retrieval-Augmented Generation (RAG)",
          "Vector Embeddings and Similarity Search",
          "Pinecone, Weaviate, and Chroma",
          "Document Processing and Chunking",
          "Project: AI Knowledge Base System",
        ],
      },
      {
        week: "Week 10-12",
        title: "AI Agents & Production Deployment",
        topics: [
          "Building Autonomous AI Agents",
          "LangChain and LlamaIndex",
          "Multi-Agent Systems",
          "Production Best Practices",
          "Capstone: Full AI Application",
        ],
      },
    ],
    outcomes: [
      "Build production-ready AI applications",
      "Master prompt engineering",
      "Implement RAG systems",
      "Ready for AI engineer roles",
    ],
  },
  "full-stack-ai": {
    title: "Full Stack AI Engineer Program",
    duration: "6 Months",
    icon: Zap,
    color: "gradient",
    description:
      "Complete career transformation program. Master Java Backend, AWS Cloud, and Generative AI. Includes system design, interview prep, and career mentorship.",
    image: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzc0NjcwMzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    highlights: [
      "Complete Java Backend",
      "AWS Cloud Mastery",
      "Generative AI",
      "System Design",
      "15+ Projects",
      "Career Mentorship",
    ],
    curriculum: [
      {
        week: "Month 1-2",
        title: "Java Backend Engineering",
        topics: [
          "Complete Java Fundamentals",
          "Advanced OOP Concepts",
          "Collections and Generics",
          "File I/O and Serialization",
          "3 Backend Projects",
        ],
      },
      {
        week: "Month 3-4",
        title: "AWS Cloud Engineering",
        topics: [
          "AWS Core Services (EC2, S3, IAM)",
          "Docker and Containerization",
          "CI/CD Pipeline Implementation",
          "Serverless Computing",
          "4 Cloud Projects",
        ],
      },
      {
        week: "Month 5-6",
        title: "Generative AI & Full Stack Integration",
        topics: [
          "Prompt Engineering and LLM APIs",
          "RAG Systems and Vector Databases",
          "AI Agents and Automation",
          "Full Stack AI Application",
          "5 AI Projects + Capstone",
        ],
      },
      {
        week: "Throughout",
        title: "System Design & Interview Prep",
        topics: [
          "System Design Fundamentals",
          "Scalability and Performance",
          "Mock Technical Interviews",
          "Resume Building",
          "Career Mentorship Sessions",
        ],
      },
    ],
    outcomes: [
      "Complete full-stack AI engineer skillset",
      "15+ production-ready projects",
      "System design expertise",
      "Senior Developer Roles",
    ],
  },
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses[courseId as keyof typeof courses];

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

  const Icon = course.icon;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
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
              <Icon className={`w-12 h-12 text-${course.color}-500`} />
              <span
                className={`bg-${course.color}-500/20 border border-${course.color}-500/50 px-4 py-1 rounded-full text-sm`}
              >
                {course.duration}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6">{course.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-8">{course.description}</p>
            <Link
              to="/workshop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Enroll Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl mb-12 text-center">Course Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {course.highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-xl bg-gradient-to-br from-${course.color}-950/30 to-transparent border border-${course.color}-500/30 flex items-center gap-4`}
              >
                <CheckCircle className={`w-6 h-6 text-${course.color}-500 flex-shrink-0`} />
                <span className="text-lg">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
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
            {course.curriculum.map((module, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-2xl bg-gradient-to-br from-${course.color}-950/30 to-transparent border border-${course.color}-500/30`}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br from-${course.color}-500 to-${course.color}-700 flex items-center justify-center flex-shrink-0`}
                  >
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-400">{module.week}</span>
                    </div>
                    <h3 className="text-2xl mb-4">{module.title}</h3>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIdx) => (
                        <li key={topicIdx} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle className={`w-5 h-5 text-${course.color}-500 flex-shrink-0 mt-1`} />
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

      {/* Learning Outcomes */}
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
            {course.outcomes.map((outcome, idx) => (
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
              Join our free workshop to experience the CodeXAI difference
            </p>
            <Link
              to="/workshop"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg hover:shadow-lg transition-all text-lg"
            >
              Book Free Workshop
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
