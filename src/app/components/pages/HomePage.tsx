import { Link } from "react-router";
import {
  ArrowRight, Code, Cloud, Brain, Users, Target,
  CheckCircle, TrendingUp, Award, Clock, BookOpen,
  Rocket, Star
} from "lucide-react";

export function HomePage() {
  const features = [
    {
      icon: Code,
      title: "Hands-On Projects",
      description: "Build real-world applications with industry-standard tools and technologies"
    },
    {
      icon: Users,
      title: "1:1 Mentorship",
      description: "Get personalized guidance from experienced industry professionals"
    },
    {
      icon: Target,
      title: "Interview Prep",
      description: "Mock interviews, coding assessments, and resume building support"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Structured programs for job switches and career advancement"
    },
    {
      icon: Brain,
      title: "AI & Cloud Focus",
      description: "Master cutting-edge technologies including AI, cloud, and modern frameworks"
    },
    {
      icon: Award,
      title: "Community Driven",
      description: "Join a vibrant community of learners and industry professionals"
    }
  ];

  const stats = [
    { value: "1000+", label: "Students Trained" },
    { value: "95%", label: "Placement Rate" },
    { value: "50+", label: "Hiring Partners" },
    { value: "4.8/5", label: "Average Rating" }
  ];

  const techStack = [
    "Python", "JavaScript", "React", "Node.js", "AWS",
    "Azure", "Docker", "Kubernetes", "TensorFlow", "PyTorch",
    "MongoDB", "PostgreSQL", "Redis", "GraphQL", "TypeScript"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">Next-Gen Tech Career Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              From Learning to <span className="text-yellow-300">Earning</span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Transform your career with hands-on technical training, real-world projects,
              and personalized mentorship. Build skills that companies actually need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CodeXAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We solve the key problems in today's tech education market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Learning Ecosystem
              </h2>
              <div className="space-y-4">
                {[
                  "Live interactive sessions (offline + recorded)",
                  "Project-based learning with real use cases",
                  "Weekly assessments and performance tracking",
                  "1:1 mentorship and career guidance",
                  "Mock interview and placement preparation",
                  "Collaborative peer community"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Focus Areas</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Cloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Cloud Tech</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">AI/ML</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <Code className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Backend Dev</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Modern Stack</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technologies You'll Master
            </h2>
            <p className="text-xl text-gray-600">
              Industry-standard tools and frameworks
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg px-6 py-3 font-medium text-gray-800 hover:shadow-md transition-shadow"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>

          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully transitioned to their dream tech careers
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Learning Today
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/success-stories"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              View Success Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}