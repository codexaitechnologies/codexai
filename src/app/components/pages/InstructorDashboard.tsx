import {
  Users, BookOpen, Calendar, TrendingUp, Clock,
  MessageSquare, CheckCircle, AlertCircle, FileText, Award
} from "lucide-react";

export function InstructorDashboard() {
  const instructorData = {
    name: "Rajesh Kumar",
    title: "Senior Full Stack Engineer",
    courses: [
      {
        id: 1,
        name: "Full Stack Web Development",
        students: 45,
        completionRate: 78,
        averageScore: 85,
        nextSession: "Tomorrow, 6:00 PM"
      },
      {
        id: 2,
        name: "Advanced React Patterns",
        students: 32,
        completionRate: 65,
        averageScore: 88,
        nextSession: "Friday, 7:00 PM"
      }
    ],
    upcomingSessions: [
      {
        id: 1,
        course: "Full Stack Web Development",
        topic: "React State Management with Redux",
        date: "Tomorrow",
        time: "6:00 PM - 8:00 PM",
        students: 42
      },
      {
        id: 2,
        course: "Full Stack Web Development",
        topic: "1:1 Mentorship - Priya Sharma",
        date: "Saturday",
        time: "11:00 AM - 12:00 PM",
        students: 1
      },
      {
        id: 3,
        course: "Advanced React Patterns",
        topic: "Performance Optimization",
        date: "Friday",
        time: "7:00 PM - 9:00 PM",
        students: 28
      }
    ],
    pendingTasks: [
      {
        id: 1,
        type: "Grading",
        title: "React Hooks Assessment - 12 submissions",
        course: "Full Stack Web Development",
        priority: "high"
      },
      {
        id: 2,
        type: "Questions",
        title: "5 student questions pending",
        course: "Advanced React Patterns",
        priority: "medium"
      },
      {
        id: 3,
        type: "Content",
        title: "Upload Week 8 materials",
        course: "Full Stack Web Development",
        priority: "medium"
      }
    ],
    stats: {
      totalStudents: 77,
      activeCourses: 2,
      averageRating: 4.8,
      sessionsThisMonth: 16
    }
  };

  const topPerformers = [
    { name: "Priya Sharma", course: "Full Stack Web Development", score: 95, avatar: "PS" },
    { name: "Amit Patel", course: "Full Stack Web Development", score: 93, avatar: "AP" },
    { name: "Sneha Kumar", course: "Advanced React Patterns", score: 92, avatar: "SK" }
  ];

  const recentQuestions = [
    {
      id: 1,
      student: "Rahul Singh",
      question: "How to handle authentication in React apps?",
      course: "Full Stack Web Development",
      time: "2 hours ago"
    },
    {
      id: 2,
      student: "Neha Gupta",
      question: "Best practices for state management in large apps?",
      course: "Advanced React Patterns",
      time: "5 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {instructorData.name}! 👨‍🏫
          </h1>
          <p className="text-gray-600">{instructorData.title}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{instructorData.stats.totalStudents}</div>
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{instructorData.stats.activeCourses}</div>
            </div>
            <div className="text-sm text-gray-600">Active Courses</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{instructorData.stats.averageRating}</div>
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{instructorData.stats.sessionsThisMonth}</div>
            </div>
            <div className="text-sm text-gray-600">Sessions This Month</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Courses */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">My Courses</h2>
              <div className="space-y-4">
                {instructorData.courses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students} students
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {course.averageScore}% avg score
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        Manage
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Completion Rate</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                              style={{ width: `${course.completionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{course.completionRate}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Next Session</div>
                        <div className="text-sm font-medium text-gray-900">{course.nextSession}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>
              <div className="space-y-3">
                {instructorData.upcomingSessions.map((session) => (
                  <div key={session.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{session.topic}</h3>
                        <p className="text-sm text-gray-600">{session.course}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                        <Users className="w-3 h-3" />
                        {session.students}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Tasks</h2>
              <div className="space-y-3">
                {instructorData.pendingTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          task.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                        }`}>
                          {task.type === 'Grading' ? (
                            <FileText className={`w-5 h-5 ${task.priority === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />
                          ) : task.type === 'Questions' ? (
                            <MessageSquare className={`w-5 h-5 ${task.priority === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />
                          ) : (
                            <BookOpen className={`w-5 h-5 ${task.priority === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.course}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Questions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Student Questions</h2>
              <div className="space-y-4">
                {recentQuestions.map((q) => (
                  <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{q.student}</div>
                        <p className="text-gray-700 mb-2">{q.question}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{q.course}</span>
                          <span className="text-gray-400">•</span>
                          <span>{q.time}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 whitespace-nowrap">
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-sm font-medium transition-colors text-left">
                  Create New Assignment
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-sm font-medium transition-colors text-left">
                  Upload Course Material
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-sm font-medium transition-colors text-left">
                  Schedule Session
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-sm font-medium transition-colors text-left">
                  View All Students
                </button>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performers</h2>
              <div className="space-y-4">
                {topPerformers.map((student, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                      {student.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-600">{student.course}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{student.score}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* This Week's Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">This Week's Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sessions Conducted</span>
                  <span className="font-semibold text-gray-900">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Assessments Graded</span>
                  <span className="font-semibold text-gray-900">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Questions Answered</span>
                  <span className="font-semibold text-gray-900">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Materials Uploaded</span>
                  <span className="font-semibold text-gray-900">6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
