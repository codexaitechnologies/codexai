import { Award, Users, BookOpen, Target } from "lucide-react";

export function TrustSection() {
  const stats = [
    {
      icon: Award,
      value: "10+ Projects",
      description: "Real-world projects to build your portfolio",
    },
    {
      icon: BookOpen,
      value: "Weekly Assessments",
      description: "Track progress with regular evaluations",
    },
    {
      icon: Users,
      value: "1:1 Mentorship",
      description: "Personal guidance from industry experts",
    },
    {
      icon: Target,
      value: "Placement Prep",
      description: "Mock interviews & resume building",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-950 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">CodeXAI</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Offline + Recorded + Real Projects = Your Career Success
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Offline Classroom</h3>
            <p className="text-gray-400 text-sm">Face-to-face learning with peers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📹</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Recorded Sessions</h3>
            <p className="text-gray-400 text-sm">LMS access for lifetime revision</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Real Projects</h3>
            <p className="text-gray-400 text-sm">Production-grade applications</p>
          </div>
        </div>
      </div>
    </section>
  );
}
