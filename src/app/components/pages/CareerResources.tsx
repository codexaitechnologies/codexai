import { Link } from "react-router";
import {
  FileText, Code, Video, BookOpen, Briefcase,
  Target, TrendingUp, Award, Download, ExternalLink
} from "lucide-react";

export function CareerResources() {
  const resources = [
    {
      category: "Resume & Portfolio",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      items: [
        { title: "Resume Builder", description: "Create ATS-friendly resumes", link: "/career-resources/resume-builder", type: "tool" },
        { title: "Portfolio Templates", description: "Showcase your projects professionally", type: "download" },
        { title: "LinkedIn Optimization Guide", description: "Stand out to recruiters", type: "guide" }
      ]
    },
    {
      category: "Interview Preparation",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      items: [
        { title: "Common Interview Questions", description: "200+ questions with answers", type: "guide" },
        { title: "System Design Cheatsheet", description: "Design scalable systems", type: "download" },
        { title: "Behavioral Interview Guide", description: "Master the STAR method", type: "guide" }
      ]
    },
    {
      category: "Coding Practice",
      icon: Code,
      color: "from-green-500 to-emerald-500",
      items: [
        { title: "DSA Problems", description: "Curated list of 150 problems", type: "guide" },
        { title: "LeetCode Study Plan", description: "Structured 12-week plan", type: "guide" },
        { title: "Live Coding Tips", description: "Ace coding interviews", type: "guide" }
      ]
    },
    {
      category: "Tech Skills",
      icon: BookOpen,
      color: "from-orange-500 to-red-500",
      items: [
        { title: "JavaScript Cheatsheet", description: "Quick reference guide", type: "download" },
        { title: "React Best Practices", description: "Write better React code", type: "guide" },
        { title: "AWS Services Overview", description: "Complete AWS guide", type: "download" }
      ]
    },
    {
      category: "Job Search",
      icon: Briefcase,
      color: "from-indigo-500 to-purple-500",
      items: [
        { title: "Job Boards List", description: "Top tech job platforms", type: "guide" },
        { title: "Salary Negotiation Guide", description: "Get what you deserve", type: "guide" },
        { title: "Company Research Template", description: "Prepare for interviews", type: "download" }
      ]
    },
    {
      category: "Video Tutorials",
      icon: Video,
      color: "from-pink-500 to-rose-500",
      items: [
        { title: "Mock Interview Series", description: "Watch real interviews", type: "video" },
        { title: "Career Transition Stories", description: "Learn from success stories", type: "video" },
        { title: "Tech Interview Walkthroughs", description: "Step-by-step solutions", type: "video" }
      ]
    }
  ];

  const companyLogos = [
    "Google", "Amazon", "Microsoft", "Meta", "Apple",
    "Netflix", "Adobe", "Salesforce", "Oracle", "IBM"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Career Resources</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Everything you need to land your dream tech job
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/career-resources/resume-builder"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Build Your Resume</h3>
              <p className="text-gray-600 mb-4">Create an ATS-friendly resume in minutes</p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                Start Building
                <ExternalLink className="w-4 h-4" />
              </div>
            </Link>

            <Link
              to="/student/mock-interviews"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mock Interviews</h3>
              <p className="text-gray-600 mb-4">Practice with industry experts</p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                Schedule Now
                <ExternalLink className="w-4 h-4" />
              </div>
            </Link>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Placement Support</h3>
              <p className="text-gray-600 mb-4">Get connected with hiring companies</p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                Learn More
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse Resources</h2>
            <p className="text-gray-600">Comprehensive guides, tools, and materials for your career success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>

                <div className="space-y-3">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                        <div className="flex-shrink-0">
                          {item.type === 'download' && <Download className="w-5 h-5 text-gray-400" />}
                          {item.type === 'tool' && <ExternalLink className="w-5 h-5 text-gray-400" />}
                          {item.type === 'video' && <Video className="w-5 h-5 text-gray-400" />}
                          {item.type === 'guide' && <BookOpen className="w-5 h-5 text-gray-400" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Hiring Partners</h2>
            <p className="text-xl text-gray-600">Our students work at top tech companies</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {companyLogos.map((company, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-400">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our programs and get access to all career resources, mentorship, and placement support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Courses
              <TrendingUp className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20">
              Talk to Career Counselor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
