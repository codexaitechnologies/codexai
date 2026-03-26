import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Clock, AlertCircle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

export function AssessmentTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes

  const assessment = {
    id: Number(id),
    title: "React Hooks & State Management",
    questions: [
      {
        id: 1,
        question: "What is the purpose of the useEffect hook in React?",
        options: [
          "To manage component state",
          "To perform side effects in function components",
          "To create context providers",
          "To optimize rendering performance"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which hook would you use to preserve a value between renders without causing re-renders?",
        options: [
          "useState",
          "useEffect",
          "useRef",
          "useMemo"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What does the dependency array in useEffect control?",
        options: [
          "The order of effect execution",
          "When the effect should run",
          "The number of times the effect runs",
          "The cleanup function behavior"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is the main difference between useMemo and useCallback?",
        options: [
          "useMemo memoizes values, useCallback memoizes functions",
          "useMemo is faster than useCallback",
          "useCallback can only be used with event handlers",
          "There is no difference"
        ],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "When should you use the useReducer hook instead of useState?",
        options: [
          "When you have simple state logic",
          "When you need complex state logic with multiple sub-values",
          "When you want better performance",
          "useReducer is deprecated"
        ],
        correctAnswer: 1
      }
    ]
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const confirmed = window.confirm("Are you sure you want to submit your assessment?");
    if (confirmed) {
      navigate("/student/assessments");
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{assessment.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className={`font-semibold ${timeLeft < 300 ? 'text-red-600' : 'text-blue-600'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                {answeredCount}/{assessment.questions.length} answered
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                  Question {currentQuestion + 1}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {assessment.questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {assessment.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        answers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion] === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQuestion] === index && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-gray-800">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  {currentQuestion === assessment.questions.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Submit Assessment
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {assessment.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors ${
                      index === currentQuestion
                        ? 'bg-blue-600 text-white'
                        : answers[index] !== undefined
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded"></div>
                    <span className="text-gray-600">Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 rounded"></div>
                    <span className="text-gray-600">Not answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-gray-600">Current</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Make sure to answer all questions before submitting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
