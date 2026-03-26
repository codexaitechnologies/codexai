import { useState } from "react";
import { useParams } from "react-router";
import { CheckCircle, Calendar, CreditCard, Shield, Award, Users } from "lucide-react";

export function EnrollmentPage() {
  const { courseId } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    batchPreference: "",
    paymentMethod: ""
  });

  const course = {
    id: Number(courseId),
    title: "Full Stack Web Development with MERN",
    price: "₹45,000",
    duration: "16 weeks",
    nextBatch: "April 1, 2026",
    features: [
      "Live interactive sessions",
      "5+ real-world projects",
      "1:1 mentorship",
      "Weekly assessments",
      "Mock interviews",
      "Placement support",
      "Lifetime community access",
      "Certificate of completion"
    ]
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Enroll in {course.title}</h1>
          <p className="text-gray-600">Complete your enrollment in 3 simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {s < step ? <CheckCircle className="w-6 h-6" /> : s}
                  </div>
                  <div className={`mt-2 text-sm font-medium ${s <= step ? 'text-blue-600' : 'text-gray-600'}`}>
                    {s === 1 ? 'Personal Info' : s === 2 ? 'Batch Selection' : 'Payment'}
                  </div>
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-4 ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Highest Education *</label>
                    <select
                      value={formData.education}
                      onChange={(e) => handleInputChange("education", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select your education</option>
                      <option value="high-school">High School</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Work Experience *</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select your experience</option>
                      <option value="fresher">Fresher (0 years)</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Batch Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Batch</h2>

                  <div className="space-y-4">
                    {[
                      { id: "apr-weekday", name: "Weekday Batch (Apr 1)", time: "Mon-Fri, 6:00 PM - 8:00 PM", seats: 8 },
                      { id: "apr-weekend", name: "Weekend Batch (Apr 1)", time: "Sat-Sun, 10:00 AM - 2:00 PM", seats: 5 },
                      { id: "may-weekday", name: "Weekday Batch (May 1)", time: "Mon-Fri, 6:00 PM - 8:00 PM", seats: 15 },
                      { id: "may-weekend", name: "Weekend Batch (May 1)", time: "Sat-Sun, 10:00 AM - 2:00 PM", seats: 12 }
                    ].map((batch) => (
                      <button
                        key={batch.id}
                        onClick={() => handleInputChange("batchPreference", batch.id)}
                        className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                          formData.batchPreference === batch.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">{batch.name}</div>
                            <div className="text-sm text-gray-600">{batch.time}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            batch.seats < 10 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {batch.seats} seats left
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <div className="font-semibold mb-1">Flexible Schedule</div>
                        <div className="text-blue-700">All sessions are recorded and available for 24/7 access</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Course Fee</span>
                      <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                    </div>
                    <div className="text-sm text-gray-600">One-time payment • No hidden charges</div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">Payment Method</label>
                    <div className="space-y-3">
                      {[
                        { id: "card", name: "Credit/Debit Card", icon: CreditCard },
                        { id: "upi", name: "UPI Payment", icon: CreditCard },
                        { id: "netbanking", name: "Net Banking", icon: CreditCard }
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => handleInputChange("paymentMethod", method.id)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                            formData.paymentMethod === method.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <method.icon className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-900">{method.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-900">
                        <div className="font-semibold mb-1">Secure Payment</div>
                        <div className="text-green-700">Your payment information is encrypted and secure</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <div className="font-semibold mb-1">100% Refund Policy</div>
                        <div className="text-blue-700">Full refund available within first 7 days</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  disabled={step === 1}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Continue
                  </button>
                ) : (
                  <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    Complete Enrollment
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Enrollment Summary</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Course</div>
                  <div className="font-semibold text-gray-900">{course.title}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Duration</div>
                  <div className="font-medium text-gray-900">{course.duration}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Next Batch</div>
                  <div className="font-medium text-gray-900">{course.nextBatch}</div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">Course Fee</span>
                    <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                  </div>
                  <div className="text-xs text-gray-500">Inclusive of all taxes</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-sm font-semibold text-gray-900 mb-3">What's Included:</div>
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-900 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">Limited Seats Available</span>
                </div>
                <div className="text-xs text-blue-700">Enroll now to secure your spot</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
