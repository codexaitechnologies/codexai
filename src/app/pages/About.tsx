import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Lightbulb,
  TrendingUp,
  Code2,
  ArrowRight,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Code2 className="w-12 h-12 text-blue-500" />
              <span className="text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                CodeXAI
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6">
              Transforming Careers Through{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Practical Tech Education
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're on a mission to bridge the gap between traditional education and industry
              requirements through hands-on, offline-first learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-blue-950/50 to-transparent border border-blue-500/30"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-3xl md:text-4xl mb-4">Our Vision</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                To create a generation of highly skilled tech professionals who can build
                real-world solutions and thrive in the AI-powered future of technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-950/50 to-transparent border border-purple-500/30"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className="text-3xl md:text-4xl mb-4">Our Mission</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                To deliver practical, industry-relevant training in backend development, cloud
                computing, and generative AI through offline-first, project-based learning.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why CodeXAI */}
      <section className="py-20 bg-gradient-to-b from-blue-950/10 via-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Why <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">CodeXAI</span>?
            </h2>
            <p className="text-xl text-gray-400">What makes us different</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Offline-First Learning",
                desc: "Face-to-face interaction with expert instructors in a collaborative environment.",
                color: "blue",
              },
              {
                icon: Lightbulb,
                title: "Real-World Projects",
                desc: "Build production-grade applications that showcase your skills to employers.",
                color: "purple",
              },
              {
                icon: TrendingUp,
                title: "Career Outcomes",
                desc: "From 5 LPA to 20+ LPA transformations with our comprehensive training and mentorship.",
                color: "orange",
              },
              {
                icon: Award,
                title: "Industry-Relevant Curriculum",
                desc: "Courses designed with input from tech industry professionals and hiring managers.",
                color: "blue",
              },
              {
                icon: Heart,
                title: "Personalized Mentorship",
                desc: "1:1 guidance from experienced engineers who care about your success.",
                color: "purple",
              },
              {
                icon: Target,
                title: "Interview Preparation",
                desc: "Mock interviews, system design practice, and resume reviews to make you job-ready.",
                color: "orange",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-2xl bg-gradient-to-br from-${item.color}-950/30 to-transparent border border-${item.color}-500/30 hover:border-${item.color}-500/50 transition-all`}
              >
                <div
                  className={`w-12 h-12 bg-${item.color}-500/20 rounded-full flex items-center justify-center mb-4`}
                >
                  <item.icon className={`w-6 h-6 text-${item.color}-500`} />
                </div>
                <h3 className="text-2xl mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Our Approach</h2>
            <p className="text-xl text-gray-400">How we help you succeed</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Strong Fundamentals",
                desc: "We start with core concepts and build a solid foundation before moving to advanced topics.",
              },
              {
                step: "02",
                title: "Hands-On Practice",
                desc: "Every concept is reinforced with practical exercises and real-world projects.",
              },
              {
                step: "03",
                title: "Weekly Assessments",
                desc: "Regular tests and assignments ensure you're mastering the material.",
              },
              {
                step: "04",
                title: "Industry Projects",
                desc: "Build a portfolio of production-ready projects that demonstrate your skills.",
              },
              {
                step: "05",
                title: "Interview Preparation",
                desc: "Mock interviews, coding challenges, and system design practice.",
              },
              {
                step: "06",
                title: "Career Support",
                desc: "Resume building, interview guidance, and job search assistance.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-blue-950/30 to-transparent border border-blue-500/30"
              >
                <div className="text-5xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Students Trained" },
              { number: "15+", label: "Projects Per Student" },
              { number: "3-4x", label: "Average Salary Jump" },
              { number: "100%", label: "Practical Learning" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-b from-blue-950/30 to-transparent border border-blue-500/30"
              >
                <div className="text-5xl md:text-6xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-400">{stat.label}</p>
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
            <h2 className="text-4xl md:text-5xl mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Learn more about our programs and send us your enquiry to get started with your transformation.
            </p>
            <Link
              to="/brochure"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg hover:shadow-lg transition-all text-lg"
            >
              Download Brochure <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
