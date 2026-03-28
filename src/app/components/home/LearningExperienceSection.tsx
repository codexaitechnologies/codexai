import { Users, Video, Code, CheckCircle, MessageSquare, TrendingUp } from "lucide-react";

export function LearningExperienceSection() {
  const features = [
    {
      icon: Users,
      title: "Offline Classroom Learning",
      description: "Interactive face-to-face sessions with instructors and peers in modern classrooms",
      color: "blue",
    },
    {
      icon: Video,
      title: "Recorded Sessions",
      description: "Lifetime access to all lectures through our LMS for anytime revision",
      color: "purple",
    },
    {
      icon: Code,
      title: "Real-World Projects",
      description: "Build production-grade applications that showcase your skills to employers",
      color: "orange",
    },
    {
      icon: CheckCircle,
      title: "Weekly Tests & Assignments",
      description: "Regular assessments to track progress and reinforce learning",
      color: "green",
    },
    {
      icon: MessageSquare,
      title: "Mock Interviews",
      description: "Practice with industry-style technical and HR interviews",
      color: "pink",
    },
    {
      icon: TrendingUp,
      title: "1:1 Mentorship",
      description: "Personal guidance from experienced professionals throughout your journey",
      color: "cyan",
    },
  ];

  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    green: "from-green-500 to-green-600",
    pink: "from-pink-500 to-pink-600",
    cyan: "from-cyan-500 to-cyan-600",
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-black relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Complete <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Learning Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to succeed in your tech career, all in one place
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${colorMap[feature.color as keyof typeof colorMap]} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Highlight */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Why Our Learning Model Works
              </h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                We combine the best of <span className="text-blue-400 font-semibold">offline classroom interaction</span>, 
                <span className="text-purple-400 font-semibold"> flexible online access</span>, and 
                <span className="text-orange-400 font-semibold"> hands-on project building</span> to ensure you not only learn but actually <span className="font-semibold text-white">succeed</span> in your career.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-3 bg-gray-900/80 border border-white/10 rounded-full">
                  <span className="text-white font-semibold">95% Completion Rate</span>
                </div>
                <div className="px-6 py-3 bg-gray-900/80 border border-white/10 rounded-full">
                  <span className="text-white font-semibold">4.8/5 Student Rating</span>
                </div>
                <div className="px-6 py-3 bg-gray-900/80 border border-white/10 rounded-full">
                  <span className="text-white font-semibold">85% Job Placement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
