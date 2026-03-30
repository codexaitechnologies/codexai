import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Code,
  Cloud,
  Sparkles,
  Users,
  BookOpen,
  Target,
  Calendar,
  CheckCircle,
  Award,
  Briefcase,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Zap,
  Video,
  FileText,
  UserCheck,
  Building2,
} from "lucide-react";
import { CoursesSection } from "../components/home/CoursesSection";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="grid grid-cols-8 gap-4 opacity-5 dark:opacity-10">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="border border-blue-500/30"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="grid md:grid-cols-2 gap-60 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                <span className="text-blue-600 dark:text-blue-400 text-sm">🚀 Offline-First Learning Experience</span>
              </div>
              <h1 className="text-5xl md:text-7xl mb-6">
                Build Real Skills.{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                  Switch to Better Tech Careers.
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-gray-400 mb-8">
                Offline-first learning with AI, Cloud, and Backend training designed for
                real-world outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/enquiry"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 justify-center"
                >
                  Download Brochure <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#courses"
                  className="border border-blue-500/40 dark:border-blue-500/30 text-slate-700 dark:text-white px-8 py-4 rounded-lg hover:bg-blue-500/10 transition-all flex items-center gap-2 justify-center"
                >
                  Explore Courses
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-blue-500/20">
                <img
                  src="https://images.unsplash.com/photo-1770159116807-9b2a7bb82294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjBsYXB0b3AlMjBkYXJrfGVufDF8fHx8MTc3NDcwMjE4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Developer working"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              {/* Floating Code Block */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-black/90 border border-slate-200 dark:border-blue-500/30 rounded-lg p-4 backdrop-blur-lg shadow-lg dark:shadow-none">
                <pre className="text-blue-600 dark:text-blue-400 text-sm">
                  <code>{`const future = await\n  buildCareer();`}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-blue-100/40 dark:via-blue-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Target, label: "10+ Projects", desc: "Real-world builds" },
              { icon: Calendar, label: "Weekly Assessments", desc: "Track your progress" },
              { icon: UserCheck, label: "1:1 Mentorship", desc: "Personal guidance" },
              { icon: Award, label: "Placement Prep", desc: "Interview ready" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-xl bg-gradient-to-b from-blue-50 dark:from-blue-950/30 to-transparent border border-blue-200/60 dark:border-blue-500/20 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all"
              >
                <item.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-2xl mb-2">{item.label}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-slate-700 dark:text-white">
                ✅ Offline Classes
              </span>
              <span className="bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 text-slate-700 dark:text-white">
                ✅ Recorded Sessions
              </span>
              <span className="bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 text-slate-700 dark:text-white">
                ✅ Real Projects
              </span>
            </div>
          </div>
        </div>
      </section>

      <CoursesSection />

      {/* Learning Experience Section */}
      <section className="py-20 bg-gradient-to-b from-blue-100/40 dark:from-blue-950/10 via-purple-100/30 dark:via-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              The <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">CodeXAI</span> Experience
            </h2>
            <p className="text-xl text-slate-500 dark:text-gray-400">Everything you need to succeed</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users,       title: "Offline Classroom Learning", desc: "Face-to-face interaction with expert instructors",   color: "blue"   },
              { icon: Video,       title: "Recorded Sessions",          desc: "Lifetime LMS access to all class recordings",        color: "purple" },
              { icon: BookOpen,    title: "Real-World Projects",        desc: "Build production-grade applications",                color: "orange" },
              { icon: FileText,    title: "Weekly Assessments",         desc: "Tests and assignments to track progress",            color: "blue"   },
              { icon: MessageSquare, title: "Mock Interviews",          desc: "Practice with real interview scenarios",             color: "purple" },
              { icon: UserCheck,   title: "1:1 Mentorship",             desc: "Personal guidance from industry experts",            color: "orange" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-2xl bg-gradient-to-br from-${item.color}-50 dark:from-${item.color}-950/30 to-transparent border border-${item.color}-200/60 dark:border-${item.color}-500/30 hover:border-${item.color}-400 dark:hover:border-${item.color}-500/50 transition-all`}
              >
                <item.icon className={`w-12 h-12 text-${item.color}-500 mb-4`} />
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-slate-500 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Structured <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Learning Path</span>
            </h2>
            <p className="text-xl text-gray-400">From basics to production-ready skills</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                title: "Java Backend",
                path: "Fundamentals → OOP → Collections → File Handling → Projects",
                color: "blue",
              },
              {
                title: "AWS Cloud",
                path: "Cloud Basics → Compute (EC2) → Storage (S3) → Scaling → CI/CD → Interviews",
                color: "purple",
              },
              {
                title: "Generative AI",
                path: "Prompts → LLM APIs → RAG → AI Agents → Production Apps → Capstone",
                color: "orange",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-xl bg-gradient-to-r from-${item.color}-950/50 to-transparent border border-${item.color}-500/30`}
              >
                <h3 className={`text-2xl mb-3 text-${item.color}-400`}>{item.title}</h3>
                <p className="text-gray-400">{item.path}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Career <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Transformation</span>
            </h2>
            <p className="text-xl text-gray-400">Real outcomes, real success stories</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "5 LPA to 20 LPA",
                desc: "Multiple students have achieved 3-4x salary jumps",
              },
              {
                icon: Award,
                title: "Production-Ready Projects",
                desc: "Portfolio that impresses recruiters",
              },
              {
                icon: Target,
                title: "Crack Real Interviews",
                desc: "Mock interviews and system design prep",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-b from-blue-950/30 to-transparent border border-blue-500/30"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate & College Training */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Corporate & <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">College Training</span>
            </h2>
            <p className="text-xl text-gray-400">Custom solutions for organizations</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Corporate Upskilling",
                desc: "Transform your team with modern tech skills",
              },
              {
                icon: GraduationCap,
                title: "College Workshops",
                desc: "Interactive lectures and hands-on sessions",
              },
              {
                icon: Briefcase,
                title: "Custom Training",
                desc: "Tailored programs for your specific needs",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-purple-950/30 to-transparent border border-purple-500/30 hover:border-purple-500/50 transition-all"
              >
                <item.icon className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-2xl mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Founders</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Visionary leaders passionate about transforming tech education and career acceleration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Adarsh Chaudhary",
                position: "Director & Co-Founder",
                quote: "We believe everyone deserves access to world-class tech education that bridges the gap between learning and real-world application.",
                image: "/adarsh.jpg",
              },
              {
                name: "Yogesh Chaudhary",
                position: "Director & Co-Founder",
                quote: "Our mission is to create practical, industry-aligned training programs that empower the next generation of tech professionals.",
                image: "/yogesh.jpeg?v=20260329",
                imagePosition: "object-[50%_22%]",
              },
              {
                name: "Roshan Kumar Mehta",
                position: "Director & Co-Founder",
                quote: "Excellence in technical education combined with mentorship is the key to accelerating careers and building confident developers.",
                image: "/roshan.jpeg?v=20260329",
              },
            ].map((founder, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-blue-950/40 to-purple-950/40 rounded-2xl overflow-hidden border border-blue-500/30 hover:border-blue-500/60 transition-all p-8 md:p-10 h-full flex flex-col shadow-lg shadow-blue-950/20">
                  {/* Founder Image */}
                  <div className="mb-8 flex justify-center">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 shadow-[0_18px_45px_rgba(59,130,246,0.28)] transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className={`w-full h-full rounded-full border-2 border-slate-950/80 object-cover ${founder.imagePosition ?? "object-top"} bg-slate-900`}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/18 via-transparent to-blue-500/18 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>

                  {/* Founder Info */}
                  <h3 className="text-xl font-bold text-center mb-1">{founder.name}</h3>
                  <p className="text-sm text-blue-400 text-center mb-4 font-semibold">{founder.position}</p>

                  {/* Quote */}
                  <div className="flex-1 mb-4">
                    <p className="text-gray-300 text-sm italic leading-relaxed text-center">
                      "{founder.quote}"
                    </p>
                  </div>

                  {/* Decorative Line */}
                  <div className="h-1 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 opacity-50"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-950/20 via-purple-950/20 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzQ2Njg3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Workshop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/90 to-blue-900/90"></div>
            </div>

            <div className="relative z-10 py-20 px-8 text-center">
              <h2 className="text-4xl md:text-6xl mb-6">
                Send Your <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Enquiry</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Learn more about our programs, speak with our team, and discover how CodeXAI can
                accelerate your tech career.
              </p>
              <Link
                to="/enquiry"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all text-lg"
              >
                Download Brochure <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
