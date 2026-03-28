import { TrendingUp, Award, Briefcase } from "lucide-react";

export function OutcomeSection() {
  const outcomes = [
    {
      icon: TrendingUp,
      title: "From 5 LPA to 20 LPA journeys",
      description: "Our students have consistently doubled and tripled their salaries after completing our programs",
      stats: ["3x Average Salary Hike", "Max Package: 28 LPA"],
      color: "blue",
    },
    {
      icon: Award,
      title: "Build production-ready projects",
      description: "Create a portfolio of real-world applications that impress recruiters and demonstrate your skills",
      stats: ["10+ Portfolio Projects", "Industry-Standard Code"],
      color: "purple",
    },
    {
      icon: Briefcase,
      title: "Crack real interviews",
      description: "Get equipped with technical skills, system design knowledge, and interview strategies to land your dream job",
      stats: ["100+ Mock Interviews", "85% Placement Rate"],
      color: "orange",
    },
  ];

  const colorMap = {
    blue: {
      gradient: "from-blue-500 to-blue-600",
      bg: "from-blue-500/10 to-blue-600/10",
      text: "text-blue-400",
    },
    purple: {
      gradient: "from-purple-500 to-purple-600",
      bg: "from-purple-500/10 to-purple-600/10",
      text: "text-purple-400",
    },
    orange: {
      gradient: "from-orange-500 to-orange-600",
      bg: "from-orange-500/10 to-orange-600/10",
      text: "text-orange-400",
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-black relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Career Outcomes</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our students don't just learn—they transform their careers and lives
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            const colors = colorMap[outcome.color as keyof typeof colorMap];
            return (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.bg} rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{outcome.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{outcome.description}</p>
                  <div className="flex gap-2">
                    {outcome.stats.map((stat, statIndex) => (
                      <span
                        key={statIndex}
                        className={`px-3 py-1 rounded-full text-xs border border-white/10 ${colors.text} bg-gray-900/80`}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success Stories */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Story 1 */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div>
                  <h4 className="text-white font-semibold">Rahul Sharma</h4>
                  <p className="text-gray-400 text-sm">Java Backend → Full Stack AI</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                "Started with no coding experience. After completing the Full Stack AI program, I landed a backend engineer role at a product company with 18 LPA package."
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                  5 LPA → 18 LPA
                </span>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div>
                  <h4 className="text-white font-semibold">Priya Patel</h4>
                  <p className="text-gray-400 text-sm">AWS Cloud Engineer</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                "The AWS program gave me hands-on cloud experience. I transitioned from manual testing to DevOps engineer with a 200% salary increase."
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                  7 LPA → 21 LPA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-400">Students Placed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  28 LPA
                </div>
                <div className="text-sm text-gray-400">Highest Package</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                  12 LPA
                </div>
                <div className="text-sm text-gray-400">Average Package</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  85%
                </div>
                <div className="text-sm text-gray-400">Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
