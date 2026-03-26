import { useState } from "react";
import { Calendar, Clock, Video, User, CheckCircle, AlertCircle, Star, MessageSquare } from "lucide-react";

export function MockInterviewPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const upcomingInterviews = [
    {
      id: 1,
      type: "Technical - DSA",
      interviewer: "Rahul Mehta",
      date: "Mar 28, 2026",
      time: "3:00 PM - 4:00 PM",
      status: "confirmed",
      experience: "12 years",
      company: "Google"
    },
    {
      id: 2,
      type: "System Design",
      interviewer: "Priya Singh",
      date: "Apr 1, 2026",
      time: "5:00 PM - 6:30 PM",
      status: "confirmed",
      experience: "10 years",
      company: "Amazon"
    }
  ];

  const pastInterviews = [
    {
      id: 3,
      type: "Technical - Frontend",
      interviewer: "Amit Kumar",
      date: "Mar 20, 2026",
      rating: 4.5,
      feedback: "Great understanding of React concepts. Work on optimization techniques.",
      strengths: ["Component Design", "State Management"],
      improvements: ["Performance Optimization", "Testing"]
    },
    {
      id: 4,
      type: "Behavioral",
      interviewer: "Sneha Patel",
      date: "Mar 15, 2026",
      rating: 4.0,
      feedback: "Good communication skills. Practice STAR method for better structure.",
      strengths: ["Communication", "Examples"],
      improvements: ["Structure", "Confidence"]
    }
  ];

  const interviewTypes = [
    {
      id: "dsa",
      name: "Data Structures & Algorithms",
      duration: "60 min",
      description: "Coding problems and algorithmic thinking"
    },
    {
      id: "system-design",
      name: "System Design",
      duration: "90 min",
      description: "Design scalable systems and architectures"
    },
    {
      id: "frontend",
      name: "Frontend Development",
      duration: "60 min",
      description: "React, JavaScript, and UI development"
    },
    {
      id: "backend",
      name: "Backend Development",
      duration: "60 min",
      description: "APIs, databases, and server-side logic"
    },
    {
      id: "behavioral",
      name: "Behavioral Interview",
      duration: "45 min",
      description: "Leadership, teamwork, and soft skills"
    }
  ];

  const availableSlots = [
    "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Interviews</h1>
          <p className="text-gray-600">Practice with industry experts and get personalized feedback</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Schedule Interview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Schedule New Interview</h2>

              <div className="space-y-6">
                {/* Interview Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Select Interview Type
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {interviewTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`text-left p-4 rounded-lg border-2 transition-all ${
                          selectedType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 mb-1">{type.name}</div>
                        <div className="text-sm text-gray-600 mb-1">{type.description}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {type.duration}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedTime === slot
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={!selectedType || !selectedDate || !selectedTime}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Schedule Interview
                </button>
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Interviews</h2>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{interview.type}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{interview.interviewer}</span>
                          <span className="text-gray-400">•</span>
                          <span>{interview.experience} at {interview.company}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Confirmed
                      </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {interview.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {interview.time}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                        <Video className="w-4 h-4" />
                        Join Meeting
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Interviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Past Interviews & Feedback</h2>
              <div className="space-y-6">
                {pastInterviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{interview.type}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{interview.interviewer}</span>
                          <span className="text-gray-400">•</span>
                          <span>{interview.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">{interview.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{interview.feedback}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Strengths
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {interview.strengths.map((strength, idx) => (
                            <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                          Areas to Improve
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {interview.improvements.map((improvement, idx) => (
                            <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                              {improvement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-xl font-bold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Choose Type</div>
                    <div className="text-sm text-blue-100">Select the interview type you want to practice</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Schedule</div>
                    <div className="text-sm text-blue-100">Pick a convenient date and time</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Practice</div>
                    <div className="text-sm text-blue-100">Interview with industry experts</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Get Feedback</div>
                    <div className="text-sm text-blue-100">Receive detailed feedback and improve</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Interview Tips</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Test your audio/video setup beforehand</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Keep your resume and notes handy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Join 5 minutes early</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Find a quiet, well-lit space</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Ask questions if you need clarification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Total Interviews</span>
                    <span className="font-semibold text-gray-900">8</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-semibold text-gray-900">4.3/5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-gray-900">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
