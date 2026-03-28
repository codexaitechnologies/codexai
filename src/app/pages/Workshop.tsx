import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
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
} from "lucide-react";

export default function Workshop() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "full-stack-ai",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                <span className="text-yellow-400 text-sm">🎉 FREE Workshop - Limited Seats</span>
              </div>
              <h1 className="text-5xl md:text-7xl mb-6">
                Experience the{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                  CodeXAI
                </span>{" "}
                Difference
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Join our free offline workshop and discover how to accelerate your tech career
                with hands-on learning in Java, AWS, and AI.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Calendar, text: "Next Workshop: April 5, 2026" },
                  { icon: Clock, text: "Duration: 3 Hours" },
                  { icon: MapPin, text: "Offline @ Our Tech Campus" },
                  { icon: Users, text: "Limited to 30 Participants" },
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
              className="bg-gradient-to-br from-blue-950/80 to-purple-950/80 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl mb-4">You're Registered!</h3>
                  <p className="text-gray-300 mb-6">
                    Check your email for workshop details and preparation materials.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400">
                      We'll send you a reminder 24 hours before the workshop.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl mb-2">Register Now</h2>
                  <p className="text-gray-400 mb-6">Secure your spot today - FREE entry!</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2 text-gray-300">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-black/50 border border-blue-500/30 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-gray-300">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-black/50 border border-blue-500/30 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-gray-300">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-black/50 border border-blue-500/30 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-gray-300">Interested In</label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="full-stack-ai">Full Stack AI Engineer</option>
                        <option value="java-backend">Java Backend Engineering</option>
                        <option value="aws-cloud">AWS Cloud Engineering</option>
                        <option value="gen-ai">Generative AI Builder</option>
                        <option value="corporate">Corporate Training</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 text-lg"
                    >
                      Register for Free <ArrowRight className="w-5 h-5" />
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      By registering, you agree to receive updates about the workshop
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
              What You'll <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-xl text-gray-400">A glimpse into our teaching methodology</p>
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

      {/* Workshop Agenda */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Workshop Agenda</h2>
            <p className="text-xl text-gray-400">3 hours of intensive learning</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                time: "10:00 AM - 10:30 AM",
                title: "Welcome & Introduction",
                desc: "Overview of CodeXAI, meet the instructors, and network with peers",
              },
              {
                time: "10:30 AM - 11:30 AM",
                title: "Live Coding: Backend API",
                desc: "Build a REST API with Java Spring Boot from scratch",
              },
              {
                time: "11:30 AM - 12:15 PM",
                title: "Cloud Deployment Demo",
                desc: "Deploy the application to AWS and configure CI/CD",
              },
              {
                time: "12:15 PM - 12:45 PM",
                title: "AI Integration",
                desc: "Add AI capabilities using OpenAI API and LangChain",
              },
              {
                time: "12:45 PM - 1:00 PM",
                title: "Q&A & Course Overview",
                desc: "Your questions answered, course details, and enrollment process",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6 p-6 rounded-xl bg-gradient-to-r from-blue-950/30 to-transparent border border-blue-500/30"
              >
                <div className="text-blue-400 text-sm flex-shrink-0 w-32">{item.time}</div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-20 bg-gradient-to-b from-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Workshop <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Bonuses</span>
            </h2>
            <p className="text-xl text-gray-400">Extra value for all attendees</p>
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">What Attendees Say</h2>
            <p className="text-xl text-gray-400">Previous workshop feedback</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "Software Engineer",
                text: "The workshop was eye-opening! The hands-on approach and real-world examples convinced me to enroll immediately.",
              },
              {
                name: "Priya Patel",
                role: "Student",
                text: "Best tech workshop I've attended. The instructors are knowledgeable and the content is industry-relevant.",
              },
              {
                name: "Amit Kumar",
                role: "Career Switcher",
                text: "After the workshop, I knew CodeXAI was the right choice for my career transformation. Now earning 18 LPA!",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-950/30 to-transparent border border-blue-500/30"
              >
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-blue-950/20 via-purple-950/20 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl mb-6">
              Only <span className="text-yellow-400">30 Seats</span> Available
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Don't miss this opportunity to experience premium tech education for free.
              Register now before spots run out!
            </p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg hover:shadow-lg transition-all text-lg"
            >
              Register Now - It's Free! <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
