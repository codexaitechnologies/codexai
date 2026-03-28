import {
  Target, Users, Award, TrendingUp, CheckCircle,
  Heart, Zap, Shield, Globe, Lightbulb, Rocket
} from "lucide-react";

export function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Outcome Focused",
      description: "We measure success by your career outcomes, not just course completion"
    },
    {
      icon: Heart,
      title: "Student First",
      description: "Every decision we make prioritizes student learning and growth"
    },
    {
      icon: Zap,
      title: "Practical Learning",
      description: "Hands-on projects and real-world applications over theoretical concepts"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Industry-vetted curriculum taught by experienced professionals"
    },
    {
      icon: Globe,
      title: "Community Driven",
      description: "Learn, collaborate, and grow together in a supportive environment"
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description: "Constantly updating content to match industry trends"
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & Lead Instructor",
      experience: "15+ years",
      avatar: "RK",
      background: "Ex-Google, Stanford CS"
    },
    {
      name: "Priya Sharma",
      role: "Head of Curriculum",
      experience: "12+ years",
      avatar: "PS",
      background: "Ex-Amazon, IIT Delhi"
    },
    {
      name: "Amit Patel",
      role: "Cloud Architect Instructor",
      experience: "10+ years",
      avatar: "AP",
      background: "AWS Certified, Ex-Microsoft"
    },
    {
      name: "Sneha Singh",
      role: "Career Counselor",
      experience: "8+ years",
      avatar: "SS",
      background: "Tech Recruiter, BITS Pilani"
    }
  ];

  const milestones = [
    { year: "2022", event: "Founded with a vision to transform tech education" },
    { year: "2023", event: "Trained first batch of 50 students, 95% placement rate" },
    { year: "2024", event: "Expanded to 3 cities, partnered with 20+ companies" },
    { year: "2025", event: "Reached 1000+ students, launched AI/ML program" },
    { year: "2026", event: "Building India's largest tech learning community" }
  ];

  const stats = [
    { value: "1000+", label: "Students Trained" },
    { value: "95%", label: "Placement Rate" },
    { value: "50+", label: "Hiring Partners" },
    { value: "4.8/5", label: "Student Rating" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About CodeXAI</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We're on a mission to bridge the gap between traditional education and real industry expectations.
              Our vision is to create a practical, outcome-driven learning ecosystem where aspiring developers
              and working professionals can transform their careers through hands-on technical training,
              real-world projects, and personalized mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  CodeXAI was born from a simple observation: traditional education wasn't preparing
                  students for real tech jobs. We saw talented individuals struggling despite having degrees,
                  and companies struggling to find job-ready candidates.
                </p>
                <p>
                  We decided to do things differently. Instead of another online course platform, we built
                  an offline-first, community-driven learning ecosystem. Our approach combines live interactive
                  sessions, real-world projects, personalized mentorship, and comprehensive career support.
                </p>
                <p>
                  Today, we're proud to have helped over 1000 students transform their careers, with 95%
                  successfully placed in top tech companies. But we're just getting started.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Rocket className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Practical Skills</div>
                    <div className="text-blue-100">Focus on hands-on learning over theoretical knowledge</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Career Success</div>
                    <div className="text-blue-100">Enable individuals to move from learning to earning</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Community Building</div>
                    <div className="text-blue-100">Create a strong tech ecosystem for collaboration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our growth story</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative pl-8 pb-12 last:pb-0">
                {index < milestones.length - 1 && (
                  <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-blue-200"></div>
                )}
                <div className="absolute left-0 top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                  <div className="text-gray-700">{milestone.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Industry experts committed to your success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-2">{member.role}</div>
                <div className="text-sm text-gray-600 mb-1">{member.experience} experience</div>
                <div className="text-sm text-gray-500">{member.background}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of a learning ecosystem where skills meet opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Courses
            </a>
            <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20">
              Talk to Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}