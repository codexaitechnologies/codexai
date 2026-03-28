import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CurriculumPreviewSection() {
  const curriculumPaths = [
    {
      title: "Java Backend Engineering",
      color: "orange",
      stages: [
        "Fundamentals & Syntax",
        "OOP Concepts",
        "Collections Framework",
        "File Handling & I/O",
        "Exception Handling",
        "Multi-threading Basics",
      ],
    },
    {
      title: "AWS Cloud Engineering",
      color: "blue",
      stages: [
        "Cloud Basics & Setup",
        "EC2 & Compute",
        "S3 & Storage",
        "IAM & Security",
        "Scaling & Load Balancing",
        "Docker & CI/CD",
        "Mock Interviews",
      ],
    },
    {
      title: "Generative AI",
      color: "purple",
      stages: [
        "Prompt Engineering",
        "LLM APIs & Integration",
        "RAG (Retrieval-Augmented Generation)",
        "AI Agents & Automation",
        "Vector Databases",
        "Production AI Apps",
      ],
    },
  ];

  const colorMap = {
    orange: {
      gradient: "from-orange-500 to-red-500",
      bg: "from-orange-500/20 to-red-500/20",
      text: "text-orange-400",
      border: "border-orange-500/30",
    },
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      bg: "from-blue-500/20 to-cyan-500/20",
      text: "text-blue-400",
      border: "border-blue-500/30",
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      bg: "from-purple-500/20 to-pink-500/20",
      text: "text-purple-400",
      border: "border-purple-500/30",
    },
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Structured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Learning Paths</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From fundamentals to production-ready skills with a clear, progressive curriculum
          </p>
        </div>

        {/* Curriculum Paths */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {curriculumPaths.map((path, pathIndex) => {
            const colors = colorMap[path.color as keyof typeof colorMap];
            return (
              <div key={pathIndex} className="relative">
                {/* Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-lg p-4 mb-6`}>
                    <h3 className={`text-xl font-bold ${colors.text}`}>{path.title}</h3>
                  </div>

                  {/* Stages */}
                  <div className="space-y-4">
                    {path.stages.map((stage, stageIndex) => (
                      <div key={stageIndex} className="flex items-start gap-3 group">
                        <div className="relative flex-shrink-0">
                          {/* Connector Line */}
                          {stageIndex < path.stages.length - 1 && (
                            <div className="absolute left-1/2 top-8 w-0.5 h-full bg-gradient-to-b from-white/20 to-transparent transform -translate-x-1/2"></div>
                          )}
                          {/* Circle */}
                          <div className={`w-6 h-6 rounded-full border-2 ${colors.border} bg-gray-900 flex items-center justify-center relative z-10`}>
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.gradient}`}></div>
                          </div>
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p className="text-gray-300 group-hover:text-white transition-colors">
                            {stage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm text-gray-400">{path.stages.length} Weeks</span>
                    <ArrowRight className={colors.text} size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 border border-white/10 rounded-full">
            <CheckCircle2 className="text-green-400" size={20} />
            <span className="text-white">All programs include capstone projects and certification</span>
          </div>
        </div>
      </div>
    </section>
  );
}
