import { Link } from "react-router";
import { Button } from "../ui/button";
import { Clock, Award, ArrowRight, Sparkles } from "lucide-react";

export function CoursesSection() {
  const courses = [
    {
      id: "java-backend",
      title: "Java Backend + AI Integration",
      duration: "2 Months",
      level: "Beginner to Intermediate",
      description: "Master Java fundamentals, OOP, collections, file handling, and build real backend systems integrated with AI capabilities.",
      skills: ["Core Java", "OOP", "Collections", "File Handling", "AI Integration"],
      projects: "5+ Projects",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      image: "https://images.unsplash.com/photo-1641156803026-0b819059b04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrZW5kJTIwc2VydmVyJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzQ2OTkxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "aws-cloud",
      title: "AWS Cloud + AI Integration",
      duration: "8 Weeks",
      level: "Intermediate",
      description: "Build, deploy, and scale AI-enabled applications on AWS with hands-on labs covering EC2, S3, IAM, Docker, CI/CD & AI services.",
      skills: ["EC2", "S3", "IAM", "Docker", "AI Integration", "Serverless"],
      projects: "4+ AWS Labs",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      image: "https://images.unsplash.com/photo-1721444127971-b7d0023bbef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzQ2OTkxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "gen-ai",
      title: "Generative AI Builder Program",
      duration: "3 Months",
      level: "Intermediate to Advanced",
      description: "Learn prompt engineering, LLMs, RAG, AI agents, and build production-ready AI applications.",
      skills: ["Prompt Engineering", "LLMs", "RAG", "AI Agents", "LangChain", "Vector DBs"],
      projects: "6+ AI Projects",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      image: "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NzQ2ODUzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "full-stack-ai",
      title: "Full Stack + AI Integration Program",
      duration: "6 Months",
      level: "Complete Program",
      description: "The ultimate program combining Python + Machine Learning + Generative AI integrated throughout the full stack with system design & interview prep.",
      skills: ["Full Stack", "Backend", "Cloud", "AI Integration", "System Design", "DSA"],
      projects: "15+ End-to-End Projects",
      gradient: "from-blue-600 to-purple-600",
      bgGradient: "from-blue-600/10 to-purple-600/10",
      image: "https://images.unsplash.com/photo-1768796370577-c6e8b708b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29kaW5nJTIwd29ya3Nob3AlMjBsZWFybmluZ3xlbnwxfHx8fDE3NzQ2OTkxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section id="courses" className="py-20 bg-black relative">
      <div className="px-4 mb-16">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm text-blue-400">Transform Your Career</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Path to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Industry-focused programs designed for real-world career outcomes
          </p>
        </div>
      </div>

      {/* Courses Horizontal Scroll */}
      <div style={{ overflowX: 'auto', overflowY: 'hidden' }} className="pb-4">
        <div style={{ display: 'flex', gap: '24px', minWidth: 'min-content', padding: '0 16px' }}>
          {courses.map((course) => (
            <div
              key={course.id}
              style={{ flex: '0 0 384px' }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${course.bgGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}></div>

              {/* Card */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <Clock size={14} className="text-blue-400" />
                    <span className="text-sm text-white">{course.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                        <span className="text-sm text-gray-400">{course.level}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {course.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${course.bgGradient} border border-white/10 text-white`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Projects Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <Award size={16} className="text-purple-400" />
                      <span className="text-sm text-gray-300">{course.projects}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={`/course/${course.id}`} className="block">
                    <Button
                      className={`w-full bg-gradient-to-r ${course.gradient} hover:opacity-90 group`}
                    >
                      View Curriculum
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
