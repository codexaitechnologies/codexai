import { Link } from "react-router";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-purple-950/20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm text-blue-400">Offline-First Tech Education</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Build Real Skills.</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Switch to Better Tech Careers.
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Offline-first learning with <span className="text-blue-400 font-semibold">AI</span>, <span className="text-purple-400 font-semibold">Cloud</span>, and <span className="text-orange-400 font-semibold">Backend</span> training designed for real-world outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/workshop">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 h-14 group">
                  Join Free Workshop
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#courses">
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white text-lg px-8 h-14">
                  Explore Courses
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-400">Students Trained</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-gray-400">Job Readiness</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">12 LPA</div>
                <div className="text-sm text-gray-400">Avg Salary</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjBkYXJrJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3NDY5OTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Developer working on code"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Floating Code Snippet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-gray-900/90 backdrop-blur-lg border border-white/10 rounded-lg p-4 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <code className="text-xs text-green-400 font-mono">
                <span className="text-purple-400">const</span> success = <span className="text-blue-400">await</span> buildCareer();
              </code>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
