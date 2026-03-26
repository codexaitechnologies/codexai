import { Link } from "react-router";
import { Clock, FileText, CheckCircle, AlertCircle, TrendingUp, Award } from "lucide-react";

export function AssessmentPage() {
  const assessments = {
    pending: [
      {
        id: 1,
        title: "React Hooks & State Management",
        course: "Full Stack Web Development",
        questions: 20,
        duration: "45 minutes",
        dueDate: "Mar 27, 2026",
        daysLeft: 2,
        difficulty: "Medium"
      },
      {
        id: 2,
        title: "AWS VPC & Networking",
        course: "AWS Cloud Solutions",
        questions: 15,
        duration: "30 minutes",
        dueDate: "Mar 30, 2026",
        daysLeft: 5,
        difficulty: "Hard"
      },
      {
        id: 3,
        title: "Node.js Express Framework",
        course: "Full Stack Web Development",
        questions: 25,
        duration: "60 minutes",
        dueDate: "Apr 2, 2026",
        daysLeft: 8,
        difficulty: "Medium"
      }
    ],
    completed: [
      {
        id: 4,
        title: "JavaScript ES6+ Fundamentals",
        course: "Full Stack Web Development",
        score: 95,
        maxScore: 100,
        completedDate: "Mar 20, 2026",
        status: "Excellent"
      },
      {
        id: 5,
        title: "HTML5 & CSS3 Advanced",
        course: "Full Stack Web Development",
        score: 88,
        maxScore: 100,
        completedDate: "Mar 15, 2026",
        status: "Good"
      },
      {
        id: 6,
        title: "AWS IAM & Security",
        course: "AWS Cloud Solutions",
        score: 92,
        maxScore: 100,
        completedDate: "Mar 18, 2026",
        status: "Excellent"
      }
    ]
  };

  const stats = {
    totalCompleted: 12,
    averageScore: 91,
    highestScore: 98,
    passRate: 100
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessments</h1>
          <p className="text-gray-600">Track your progress and complete pending assessments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalCompleted}</div>
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900">{stats.averageScore}%</div>
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <div className="text-2xl font-bold text-gray-900">{stats.highestScore}%</div>
            </div>
            <div className="text-sm text-gray-600">Highest Score</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900">{stats.passRate}%</div>
            </div>
            <div className="text-sm text-gray-600">Pass Rate</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pending Assessments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Assessments</h2>
              <div className="space-y-4">
                {assessments.pending.map((assessment) => (
                  <div key={assessment.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{assessment.title}</h3>
                        <p className="text-sm text-gray-600">{assessment.course}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                        {assessment.difficulty}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        {assessment.questions} questions
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {assessment.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <AlertCircle className={`w-4 h-4 ${assessment.daysLeft <= 2 ? 'text-red-500' : 'text-gray-400'}`} />
                        {assessment.daysLeft} days left
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Due: {assessment.dueDate}
                      </div>
                      <Link
                        to={`/student/assessments/${assessment.id}`}
                        className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow text-sm"
                      >
                        Start Assessment
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Assessments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Completed Assessments</h2>
              <div className="space-y-4">
                {assessments.completed.map((assessment) => (
                  <div key={assessment.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{assessment.title}</h3>
                        <p className="text-sm text-gray-600">{assessment.course}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className={`text-2xl font-bold ${getScoreColor(assessment.score)}`}>
                            {assessment.score}
                          </span>
                          <span className="text-gray-500">/{assessment.maxScore}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Completed: {assessment.completedDate}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assessment.status === 'Excellent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {assessment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white mb-6">
              <h3 className="text-xl font-bold mb-4">Assessment Guidelines</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Complete assessments before the due date</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Passing score is 60% or above</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>You can retake failed assessments once</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Review explanations after submission</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Performance Trend</h3>
              <div className="space-y-3">
                {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
                  <div key={week}>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>{week}</span>
                      <span className="font-semibold text-gray-900">{85 + index * 3}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${85 + index * 3}%` }}
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
