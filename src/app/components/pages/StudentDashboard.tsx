import { Link } from "react-router";
import {
  BookOpen, TrendingUp, Clock, Award, Calendar,
  CheckCircle, Play, AlertCircle, Users, Target,
  BarChart3, Trophy, ArrowRight
} from "lucide-react";

export function StudentDashboard() {
  const studentData = {
    name: "Priya Sharma",
    enrolledCourses: [
      {
        id: 1,
        name: "Full Stack Web Development",
        progress: 65,
        nextSession: "Tomorrow, 6:00 PM",
        instructor: "Rajesh Kumar",
        status: "active"
      },
      {
        id: 2,
        name: "AWS Cloud Solutions",
        progress: 30,
        nextSession: "Friday, 7:00 PM",
        instructor: "Amit Patel",
        status: "active"
      }
    ],
    upcomingSessions: [
      {
        id: 1,
        course: "Full Stack Web Development",
        topic: "React State Management with Redux",
        date: "Tomorrow",
        time: "6:00 PM - 8:00 PM",
        type: "Live Session"
      },
      {
        id: 2,
        course: "AWS Cloud Solutions",
        topic: "EC2 & Auto Scaling",
        date: "Friday",
        time: "7:00 PM - 9:00 PM",
        type: "Live Session"
      },
      {
        id: 3,
        course: "Full Stack Web Development",
        topic: "1:1 Mentorship Session",
        date: "Saturday",
        time: "11:00 AM - 12:00 PM",
        type: "Mentorship"
      }
    ],
    pendingAssessments: [
      {
        id: 1,
        title: "React Hooks & State Management",
        course: "Full Stack Web Development",
        dueDate: "2 days left",
        questions: 20
      },
      {
        id: 2,
        title: "AWS VPC & Networking",
        course: "AWS Cloud Solutions",
        dueDate: "5 days left",
        questions: 15
      }
    ],
    recentAchievements: [
      {
        id: 1,
        title: "JavaScript Expert",
        description: "Completed all JS modules",
        icon: Trophy,
        color: "text-yellow-500"
      },
      {
        id: 2,
        title: "5 Projects Completed",
        description: "Built 5 real-world projects",
        icon: Target,
        color: "text-blue-500"
      },
      {
        id: 3,
        title: "Top Performer",
        description: "Scored 95% in last assessment",
        icon: Award,
        color: "text-purple-500"
      }
    ],
    stats: {
      hoursLearned: 120,
      assessmentsPassed: 12,
      projectsCompleted: 5,
      rank: 8
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {studentData.name}! 👋
          </h1>
          <p className="text-gray-600">Here's your learning progress and upcoming activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{studentData.stats.hoursLearned}</div>
            </div>
            <div className="text-sm text-gray-600">Hours Learned</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{studentData.stats.assessmentsPassed}</div>
            </div>
            <div className="text-sm text-gray-600">Assessments Passed</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{studentData.stats.projectsCompleted}</div>
            </div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">#{studentData.stats.rank}</div>
            </div>
            <div className="text-sm text-gray-600">Class Rank</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrolled Courses */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                <Link to="/courses" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Browse More
                </Link>
              </div>

              <div className="space-y-4">
                {studentData.enrolledCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
                        <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Active
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Next: {course.nextSession}</span>
                      </div>
                      <Link
                        to={`/courses/${course.id}`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Sessions</h2>
                <Link to="/student/schedule" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {studentData.upcomingSessions.map((session) => (
                  <div key={session.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{session.topic}</h3>
                        <p className="text-sm text-gray-600">{session.course}</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                        {session.type}
                      </span>
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

            {/* Pending Assessments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Pending Assessments</h2>
                <Link to="/student/assessments" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {studentData.pendingAssessments.map((assessment) => (
                  <div key={assessment.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{assessment.title}</h3>
                        <p className="text-sm text-gray-600">{assessment.course}</p>
                      </div>
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {assessment.questions} questions • {assessment.dueDate}
                      </div>
                      <Link
                        to={`/student/assessments/${assessment.id}`}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700"
                      >
                        Start Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
              <div className="space-y-4">
                {studentData.recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center ${achievement.color}`}>
                      <achievement.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/student/mock-interviews"
                  className="block w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-sm font-medium transition-colors"
                >
                  Schedule Mock Interview
                </Link>
                <Link
                  to="/community"
                  className="block w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-sm font-medium transition-colors"
                >
                  Join Community Discussion
                </Link>
                <Link
                  to="/career-resources"
                  className="block w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-sm font-medium transition-colors"
                >
                  Career Resources
                </Link>
                <Link
                  to="/projects"
                  className="block w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-sm font-medium transition-colors"
                >
                  Browse Projects
                </Link>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Progress</h2>
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-10">{day}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
