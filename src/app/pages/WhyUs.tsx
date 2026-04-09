import { motion } from "motion/react";
import {
  Users,
  Building2,
  Code,
  Sparkles,
  Award,
  ArrowRight,
} from "lucide-react";

export default function WhyUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1771408427146-09be9a1d4535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzc0NjM3MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Why CodeXAI"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                CodeXAI
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover what makes CodeXAI the premier choice for tech education and career transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Amenities */}
      <section className="py-20 bg-gradient-to-b from-blue-950/10 via-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Advantages</span>
            </h2>
            <p className="text-xl text-gray-400">Premium learning experience with industry-standard facilities</p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Users,
                title: "1:1 Mentorship",
                desc: "Personalized guidance from industry experts",
                bgColor: "rgba(30, 58, 138, 0.3)",
                borderColor: "rgba(59, 130, 246, 0.3)",
                hoverBorder: "rgba(59, 130, 246, 0.5)",
                iconBgColor: "rgba(59, 130, 246, 0.2)",
                iconColor: "rgb(96, 165, 250)",
              },
              {
                icon: Building2,
                title: "Great Infrastructure",
                desc: "State-of-the-art tech campus with modern facilities",
                bgColor: "rgba(88, 28, 135, 0.3)",
                borderColor: "rgba(168, 85, 247, 0.3)",
                hoverBorder: "rgba(168, 85, 247, 0.5)",
                iconBgColor: "rgba(168, 85, 247, 0.2)",
                iconColor: "rgb(192, 132, 250)",
              },
              {
                icon: Code,
                title: "Coding Sessions",
                desc: "Live coding workshops and hands-on projects",
                bgColor: "rgba(124, 45, 18, 0.3)",
                borderColor: "rgba(249, 115, 22, 0.3)",
                hoverBorder: "rgba(249, 115, 22, 0.5)",
                iconBgColor: "rgba(249, 115, 22, 0.2)",
                iconColor: "rgb(253, 159, 75)",
              },
              {
                icon: Sparkles,
                title: "AI Integration",
                desc: "Learn cutting-edge AI and ML technologies",
                bgColor: "rgba(113, 63, 18, 0.3)",
                borderColor: "rgba(234, 179, 8, 0.3)",
                hoverBorder: "rgba(234, 179, 8, 0.5)",
                iconBgColor: "rgba(234, 179, 8, 0.2)",
                iconColor: "rgb(250, 204, 21)",
              },
              {
                icon: Award,
                title: "Industry Certification",
                desc: "Recognized certificates for career advancement",
                bgColor: "rgba(20, 83, 45, 0.3)",
                borderColor: "rgba(34, 197, 94, 0.3)",
                hoverBorder: "rgba(34, 197, 94, 0.5)",
                iconBgColor: "rgba(34, 197, 94, 0.2)",
                iconColor: "rgb(134, 239, 172)",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl transition-all text-center group cursor-pointer"
                style={{
                  background: `linear-gradient(to bottom right, ${item.bgColor}, transparent)`,
                  border: `2px solid ${item.borderColor}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.hoverBorder;
                  e.currentTarget.style.boxShadow = `0 0 20px ${item.hoverBorder}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = item.borderColor;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: item.iconBgColor }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.iconColor }} />
                </div>
                <h3 className="text-lg mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">World-Class</span> Infrastructure
            </h2>
            <p className="text-xl text-gray-400">State-of-the-art facilities designed for optimal learning</p>
          </motion.div>

          <div className="relative">
            <div className="flex overflow-x-auto pb-6 gap-6 scroll-smooth" style={{ scrollBehavior: "smooth" }}>
              {[
                {
                  title: "Corporate-Grade Campus",
                  image: "https://bullmenrealty.com/uploads/slider/251bhutani-alphathum-etherea-noida6.jpg",
                },
                {
                  title: "Learning Labs",
                  image: "https://qdesq.imagekit.io/tr:w-400/image/upload/v1715161697/nrfgk8n7sk2gvn6r3jpf.webp",
                },
                {
                  title: "Coding Studio",
                  image: "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/etherea-coworking-bhutani-alphathum/11.jpg",
                },
                {
                  title: "Collaboration Space",
                  image: "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/etherea-coworking-bhutani-alphathum/dedicated/wddgy9.jpg",
                },
                {
                  title: "Meeting Rooms",
                  image: "https://alphaetherea.com/assets/images/ethereaimages/ethereaimages-05.jpg",
                },
                {
                  title: "Mentor Zones",
                  image: "https://qdesq.imagekit.io/tr:w-400/image/upload/v1709035857/kjxjnfn5qa2oi5czwm2g.webp",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex-shrink-0 w-80 rounded-2xl overflow-hidden border border-blue-500/30 hover:border-blue-500/60 transition-all group"
                >
                  <div className="relative h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why CodeXAI Detailed Section */}
      <section className="py-20 bg-gradient-to-b from-purple-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">
              What Sets Us <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Apart</span>
            </h2>
            <p className="text-xl text-gray-400">We're committed to your success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Expert Instructors",
                description: "Learn from industry veterans with 10+ years of experience in top tech companies",
                icon: Award,
              },
              {
                title: "Real-World Projects",
                description: "Build production-grade applications that you can showcase in your portfolio",
                icon: Code,
              },
              {
                title: "Career Support",
                description: "Get placement assistance and interview preparation from our dedicated team",
                icon: Sparkles,
              },
              {
                title: "Flexible Learning",
                description: "Offline classes with recorded sessions for flexibility and continuous access",
                icon: Users,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6 p-8 rounded-2xl bg-gradient-to-br from-blue-950/20 to-purple-950/20 border border-blue-500/30 hover:border-blue-500/60 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl mb-6">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Career?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join hundreds of students who've successfully made the transition to premium tech careers
            </p>
            <a
              href="/brochure"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all text-lg font-semibold"
            >
              Download Brochure & Enroll <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
