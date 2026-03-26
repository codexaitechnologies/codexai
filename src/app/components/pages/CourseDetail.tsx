import { Link, useParams } from "react-router";
import {
  Clock, Users, Award, Star, CheckCircle, Play,
  BookOpen, Target, Calendar, Video, FileText, Code
} from "lucide-react";

export function CourseDetail() {
  const { id } = useParams();

  const course = {
    id: Number(id),
    title: "Full Stack Web Development with MERN",
    description: "Master the complete MERN stack (MongoDB, Express, React, Node.js) and build production-ready web applications. This comprehensive program covers everything from frontend to backend, databases, authentication, deployment, and more.",
    duration: "16 weeks",
    level: "Intermediate",
    students: 450,
    rating: 4.8,
    reviews: 156,
    price: "₹45,000",
    instructor: {
      name: "Rajesh Kumar",
      title: "Senior Full Stack Engineer",
      experience: "10+ years",
      avatar: "RK"
    },
    highlights: [
      "Build 5+ real-world projects",
      "Live interactive sessions (offline + recorded)",
      "Weekly coding assessments",
      "1:1 mentorship sessions",
      "Mock interviews and placement prep",
      "Lifetime community access"
    ],
    curriculum: [
      {
        week: "Weeks 1-2",
        title: "Frontend Fundamentals",
        topics: [
          "HTML5 & CSS3 Advanced",
          "JavaScript ES6+",
          "Responsive Design",
          "Git & GitHub"
        ]
      },
      {
        week: "Weeks 3-6",
        title: "React Development",
        topics: [
          "React Basics & Hooks",
          "State Management (Redux)",
          "React Router",
          "API Integration"
        ]
      },
      {
        week: "Weeks 7-10",
        title: "Backend with Node.js",
        topics: [
          "Node.js & Express",
          "REST API Design",
          "Authentication & Authorization",
          "MongoDB & Mongoose"
        ]
      },
      {
        week: "Weeks 11-14",
        title: "Full Stack Integration",
        topics: [
          "MERN App Development",
          "Real-time Features (Socket.io)",
          "File Upload & Storage",
          "Testing & Debugging"
        ]
      },
      {
        week: "Weeks 15-16",
        title: "Deployment & Career Prep",
        topics: [
          "Cloud Deployment (AWS/Heroku)",
          "CI/CD Pipelines",
          "Interview Preparation",
          "Capstone Project"
        ]
      }
    ],
    projects: [
      "E-commerce Platform with Payment Gateway",
      "Social Media Application",
      "Task Management System",
      "Real-time Chat Application",
      "Portfolio & Blog Platform"
    ],
    prerequisites: [
      "Basic programming knowledge",
      "Understanding of HTML/CSS",
      "Laptop with 8GB+ RAM",
      "Commitment of 15-20 hours/week"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-4">
                <Award className="w-4 h-4" />
                <span className="text-sm">{course.level} Level</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-blue-100">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.students} students enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 text-gray-900">
                <div className="text-3xl font-bold mb-2">{course.price}</div>
                <p className="text-gray-600 text-sm mb-4">One-time payment</p>

                <Link
                  to={`/enroll/${course.id}`}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow mb-3"
                >
                  Enroll Now
                </Link>

                <button className="block w-full text-center border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Download Syllabus
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                      {course.instructor.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{course.instructor.name}</div>
                      <div className="text-sm text-gray-600">{course.instructor.title}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{course.instructor.experience} industry experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
                </div>

                <div className="space-y-4">
                  {course.curriculum.map((module, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                        <div>
                          <div className="font-semibold text-gray-900">{module.title}</div>
                          <div className="text-sm text-gray-600">{module.week}</div>
                        </div>
                        <div className="text-sm text-gray-600">{module.topics.length} topics</div>
                      </div>
                      <div className="px-6 py-4">
                        <ul className="space-y-2">
                          {module.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-700">
                              <Play className="w-4 h-4 text-blue-600" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Projects You'll Build</h2>
                </div>

                <div className="space-y-3">
                  {course.projects.map((project, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                      <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 font-medium">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h2>
                <ul className="space-y-3">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">This course includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Video className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">50+ hours of content</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Code className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Coding exercises</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Community access</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Lifetime access</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Batch Starting Soon</h4>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Next Batch: April 1, 2026</span>
                    </div>
                    <div className="text-sm text-gray-600">Limited seats available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
