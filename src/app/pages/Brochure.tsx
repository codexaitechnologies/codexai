import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Users,
  CheckCircle,
  Sparkles,
  Code,
  Cloud,
  Award,
  Gift,
  ArrowRight,
  User,
  Mail,
  Phone,
  Loader,
} from "lucide-react";
import type { Enquiry } from "../types/enquiry";
import { createUser } from "../utils/apiUtils";
import { useCourses } from "../context/CoursesContext";
import { useAuth } from "../context/AuthContext";

export default function Brochure() {
  const { courses, loading: loadingCourses } = useCourses();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: courses.length > 0 ? courses[0].courseId : "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-fill form with logged-in user data
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      }));
    }
  }, [isAuthenticated, user]);

  // Update interest field when courses load
  if (courses.length > 0 && formData.interest === "") {
    setFormData((prev) => ({
      ...prev,
      interest: courses[0].courseId,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const selectedCourse = courses.find(
      (c) => c.courseId === formData.interest
    );
    
    if (!selectedCourse) {
      console.error("Course not found for interest:", formData.interest);
      console.error("Available courses:", courses.map((c) => ({ courseId: c.courseId, title: c.title })));
      setLoading(false);
      alert("Error: Please select a valid course");
      return;
    }
    
    const courseName = selectedCourse.title;
    const courseId = selectedCourse.courseId;

    // Create enquiry object
    const enquiry: Enquiry = {
      fullName: formData.name,
      emailAddress: formData.email,
      phoneNumber: formData.phone,
      courseOfInterest: formData.interest,
      submittedAt: new Date(),
    };

    // Log enquiry to console
    console.log("Enquiry Submitted:", enquiry);

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      course: courseName,
      courseId,
    };
    
    console.log("API Payload:", payload);

    await createUser(payload).then((response) => {
      console.log("API Response:", response);
      // Show success message
      setLoading(false);
      setSubmitted(true);

      // Clear form fields after delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: courses.length > 0 ? courses[0].courseId : "",
        });
        setSubmitted(false);
      }, 3000);
    }).catch((error) => {
      console.error("API Error:", error);
      setLoading(false);
      alert("Failed to submit enquiry. Please try again.");
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formData.name.trim() !== "" &&
      emailRegex.test(formData.email) &&
      formData.phone.trim() !== "" &&
      formData.interest.trim() !== ""
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1771408427146-09be9a1d4535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzc0NjM3MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-yellow-500/20 border border-yellow-500/50 rounded-full px-4 py-2 mb-6">
                <span className="text-yellow-400 text-sm">🎉 Enroll Now - Limited Seats</span>
              </div>
              <h1 className="text-5xl md:text-7xl mb-6">
                Experience Premium{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                  Tech Education
                </span>{" "}
                at CodeXAI
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Send us an enquiry to learn about our comprehensive training programs in Java, AWS, AI, and Full Stack development.
              </p>

              <div className="space-y-4">
                {[
                  { icon: MapPin, text: "Offline @ Our Tech Campus" },
                  { icon: Users, text: "Personalized Learning Experience" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-950/80 to-purple-950/80 backdrop-blur-lg rounded-2xl p-5 border border-blue-500/30 max-w-md mx-auto"
            >
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-spin">
                    <Loader className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl mb-2">Processing...</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Please wait while we process your request.
                  </p>
                </div>
              ) : submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl mb-2">Thank you!</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Thank you for your interest. Our team will contact you shortly.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-xs text-gray-400">
                      Check your email for updates.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl mb-1">Download Brochure</h2>
                  <p className="text-gray-400 mb-4 text-sm">Tell us about your learning goals</p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs mb-1 text-gray-300">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isAuthenticated}
                          required
                          className={`w-full bg-black/50 border border-blue-500/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm ${
                            isAuthenticated ? "opacity-75 cursor-not-allowed" : ""
                          }`}
                          placeholder="Your Full Name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs mb-1 text-gray-300">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isAuthenticated}
                          required
                          className={`w-full bg-black/50 border border-blue-500/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm ${
                            isAuthenticated ? "opacity-75 cursor-not-allowed" : ""
                          }`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs mb-1 text-gray-300">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={isAuthenticated}
                          required
                          className={`w-full bg-black/50 border border-blue-500/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm ${
                            isAuthenticated ? "opacity-75 cursor-not-allowed" : ""
                          }`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs mb-1 text-gray-300">Course of Interest</label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                      >
                        {loadingCourses ? (
                          <option>Loading...</option>
                        ) : (
                          courses.map((course) => (
                            <option key={course.courseId} value={course.courseId}>
                              {course.title} ({course.duration})
                            </option>
                          ))
                        )}
                      </select>
                    </div>


                    <button
                      type="submit"
                      disabled={!isFormValid()}
                      className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-all ${
                        isFormValid()
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
                          : "bg-gray-600 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Download Brochure <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      By submitting, you agree to receive program information
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>



      {/* What You'll Learn */}
      <section className="py-20 bg-gradient-to-b from-blue-950/10 via-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              What You'll <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Learn</span>
            </h2>
            <p className="text-xl text-gray-400">Comprehensive curriculum designed for industry needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Live Coding Session",
                desc: "Watch our instructors build a real application from scratch",
                color: "blue",
              },
              {
                icon: Cloud,
                title: "AWS Demo",
                desc: "Deploy an app to the cloud in real-time",
                color: "purple",
              },
              {
                icon: Sparkles,
                title: "AI in Action",
                desc: "See how to integrate AI into your applications",
                color: "orange",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-2xl bg-gradient-to-br from-${item.color}-950/30 to-transparent border border-${item.color}-500/30 hover:border-${item.color}-500/50 transition-all`}
              >
                <item.icon className={`w-12 h-12 text-${item.color}-500 mb-4`} />
                <h3 className="text-2xl mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Bird Discounts */}
      <section className="py-20 bg-gradient-to-b from-yellow-950/10 via-orange-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Early Bird <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Discounts</span>
            </h2>
            <p className="text-xl text-gray-400">Limited time offers for our programs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                program: "Full Stack AI Engineer",
                discount: "30% OFF",
              },
              {
                program: "Java Backend Engineering",
                discount: "25% OFF",
              },
              {
                program: "AWS Cloud Engineering",
                discount: "20% OFF",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-yellow-950/30 via-orange-950/30 to-transparent border border-yellow-500/30 hover:border-yellow-500/60 transition-all overflow-hidden"
              >
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-orange-500 px-4 py-2 rounded-full text-sm font-bold text-white">
                  {item.discount}
                </div>
                <h3 className="text-2xl font-bold mb-6">{item.program}</h3>
                <div className="space-y-3">
                  <p className="text-gray-400">Limited time offer - Enroll today!</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-b from-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Program <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Bonuses</span>
            </h2>
            <p className="text-xl text-gray-400">Extra value packed in every program</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Gift,
                title: "Course Discount",
                desc: "Exclusive 20% off for workshop attendees",
              },
              {
                icon: Award,
                title: "Free Resources",
                desc: "Learning roadmap & study materials",
              },
              {
                icon: Users,
                title: "Community Access",
                desc: "Join our developer community",
              },
              {
                icon: CheckCircle,
                title: "Career Guidance",
                desc: "Free 1:1 career counseling session",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-b from-blue-950/30 to-transparent border border-blue-500/30"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Student <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-400">Hear from our successful students</p>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
