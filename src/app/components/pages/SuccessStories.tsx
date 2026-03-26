import { useState } from "react";
import { TrendingUp, Briefcase, Award, Quote, Star, Filter } from "lucide-react";

export function SuccessStories() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", name: "All Stories" },
    { id: "career-switch", name: "Career Switch" },
    { id: "freshers", name: "Freshers" },
    { id: "salary-hike", name: "Salary Hike" }
  ];

  const stories = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "PS",
      previousRole: "Non-Tech Background",
      currentRole: "Software Engineer at Google",
      category: "career-switch",
      salaryHike: "Career Transition",
      course: "Full Stack Web Development",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      story: "I was working in a completely different field and always dreamed of getting into tech. CodeXAI made that dream a reality. The hands-on projects and mentorship gave me the confidence to apply for tech roles. Within 3 months of completing the course, I landed my dream job at Google!",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      timeline: "6 months"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      avatar: "RK",
      previousRole: "Junior Developer",
      currentRole: "Senior Developer at Amazon",
      category: "salary-hike",
      salaryHike: "150%",
      course: "AWS Cloud Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      story: "I was stuck in my career with limited growth opportunities. The AWS course not only upgraded my technical skills but also helped me understand cloud architecture at scale. The mock interviews prepared me perfectly for Amazon's rigorous interview process.",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      timeline: "4 months"
    },
    {
      id: 3,
      name: "Sneha Patel",
      avatar: "SP",
      previousRole: "College Student",
      currentRole: "ML Engineer at Microsoft",
      category: "freshers",
      salaryHike: "₹18 LPA",
      course: "Machine Learning & AI",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      story: "As a final year student, I was worried about placements. CodeXAI's ML program gave me the practical skills and project experience that stood out to recruiters. The career counseling and mock interviews were invaluable. Got placed in my dream company!",
      skills: ["Python", "TensorFlow", "PyTorch", "NLP"],
      timeline: "5 months"
    },
    {
      id: 4,
      name: "Amit Verma",
      avatar: "AV",
      previousRole: "Manual Tester",
      currentRole: "Full Stack Developer at Flipkart",
      category: "career-switch",
      salaryHike: "200%",
      course: "Full Stack Web Development",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      story: "I wanted to transition from testing to development but didn't know where to start. The structured curriculum and real-world projects at CodeXAI gave me the foundation I needed. The placement support team connected me with Flipkart, and I cleared all rounds!",
      skills: ["JavaScript", "React", "Node.js", "PostgreSQL"],
      timeline: "7 months"
    },
    {
      id: 5,
      name: "Neha Gupta",
      avatar: "NG",
      previousRole: "Backend Developer",
      currentRole: "Tech Lead at Razorpay",
      category: "salary-hike",
      salaryHike: "180%",
      course: "Advanced React & System Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      story: "I wanted to grow into a leadership role but lacked system design skills. The course helped me understand how to build scalable systems. The mentorship from industry experts was the game-changer. Now I'm leading a team of 8 engineers!",
      skills: ["System Design", "React", "Microservices", "Redis"],
      timeline: "3 months"
    },
    {
      id: 6,
      name: "Vikram Singh",
      avatar: "VS",
      previousRole: "College Graduate",
      currentRole: "Cloud Engineer at Adobe",
      category: "freshers",
      salaryHike: "₹16 LPA",
      course: "AWS Cloud Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      story: "Fresh out of college with no real-world experience, I was struggling to get interviews. CodeXAI's cloud program gave me hands-on AWS experience and industry-relevant projects. The resume building and interview prep helped me land a role at Adobe on my first try!",
      skills: ["AWS", "Python", "Linux", "CI/CD"],
      timeline: "4 months"
    }
  ];

  const filteredStories = stories.filter(story =>
    selectedFilter === "all" || story.category === selectedFilter
  );

  const stats = [
    { value: "95%", label: "Placement Rate" },
    { value: "150%", label: "Avg Salary Hike" },
    { value: "50+", label: "Partner Companies" },
    { value: "1000+", label: "Success Stories" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Real transformations from our students who achieved their career goals
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
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

      {/* Filter */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Filter Stories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-8">
                  {/* Profile */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {story.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                      <div className="text-sm text-gray-600 mb-2">
                        <div>{story.previousRole}</div>
                        <div className="flex items-center gap-2 text-green-600 font-medium">
                          <TrendingUp className="w-4 h-4" />
                          {story.currentRole}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          {story.salaryHike} {story.category === "salary-hike" ? "Salary Hike" : ""}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          {story.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                    <p className="text-gray-700 leading-relaxed pl-6 italic">
                      {story.story}
                    </p>
                  </div>

                  {/* Course */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Course Completed</div>
                    <div className="font-semibold text-gray-900">{story.course}</div>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Skills Gained</div>
                    <div className="flex flex-wrap gap-2">
                      {story.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mt-1">Highly recommends CodeXAI</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with CodeXAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Courses
            </a>
            <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20">
              Talk to Career Counselor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
