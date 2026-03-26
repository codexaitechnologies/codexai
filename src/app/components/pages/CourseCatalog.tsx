import { Link } from "react-router";
import {
  Clock, Users, Award, Star, TrendingUp,
  Code, Cloud, Brain, Database, Smartphone,
  Search, Filter
} from "lucide-react";
import { useState } from "react";

export function CourseCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "ai-ml", name: "AI & Machine Learning" },
    { id: "cloud", name: "Cloud Computing" },
    { id: "backend", name: "Backend Development" },
    { id: "fullstack", name: "Full Stack" },
    { id: "mobile", name: "Mobile Development" }
  ];

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development with MERN",
      category: "fullstack",
      description: "Master MongoDB, Express, React, and Node.js to build modern web applications",
      duration: "16 weeks",
      level: "Intermediate",
      students: 450,
      rating: 4.8,
      price: "₹45,000",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      features: ["Live Sessions", "Projects", "Placement Support"]
    },
    {
      id: 2,
      title: "AWS Cloud Solutions Architect",
      category: "cloud",
      description: "Learn to design and deploy scalable cloud solutions on Amazon Web Services",
      duration: "12 weeks",
      level: "Advanced",
      students: 320,
      rating: 4.9,
      price: "₹55,000",
      icon: Cloud,
      color: "from-orange-500 to-red-500",
      features: ["AWS Certified", "Hands-on Labs", "Real Projects"]
    },
    {
      id: 3,
      title: "Machine Learning & AI Engineering",
      category: "ai-ml",
      description: "Build intelligent applications with Python, TensorFlow, and PyTorch",
      duration: "20 weeks",
      level: "Advanced",
      students: 380,
      rating: 4.7,
      price: "₹65,000",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      features: ["ML Projects", "Deep Learning", "NLP & CV"]
    },
    {
      id: 4,
      title: "Backend Development with Node.js",
      category: "backend",
      description: "Create robust APIs and microservices using Node.js and Express",
      duration: "10 weeks",
      level: "Beginner",
      students: 520,
      rating: 4.6,
      price: "₹35,000",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      features: ["REST APIs", "Database Design", "Authentication"]
    },
    {
      id: 5,
      title: "Python for Data Science & ML",
      category: "ai-ml",
      description: "Learn data analysis, visualization, and machine learning with Python",
      duration: "14 weeks",
      level: "Intermediate",
      students: 410,
      rating: 4.8,
      price: "₹48,000",
      icon: Brain,
      color: "from-indigo-500 to-purple-500",
      features: ["Data Analysis", "ML Algorithms", "Projects"]
    },
    {
      id: 6,
      title: "React Native Mobile Development",
      category: "mobile",
      description: "Build cross-platform mobile apps for iOS and Android",
      duration: "12 weeks",
      level: "Intermediate",
      students: 290,
      rating: 4.7,
      price: "₹42,000",
      icon: Smartphone,
      color: "from-pink-500 to-rose-500",
      features: ["iOS & Android", "Native Modules", "App Store Deploy"]
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Course Catalog</h1>
          <p className="text-xl text-blue-100">
            Industry-focused programs designed to accelerate your tech career
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                <div className={`h-40 bg-gradient-to-br ${course.color} p-6 flex items-center justify-center`}>
                  <course.icon className="w-20 h-20 text-white opacity-90" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{course.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not sure which course is right for you?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Talk to our career counselors for personalized guidance
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
            Schedule Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
