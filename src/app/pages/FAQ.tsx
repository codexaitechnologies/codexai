import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      id: "general-1",
      category: "General",
      question: "What is CodeXAI?",
      answer:
        "CodeXAI is a practical tech education platform that bridges the gap between traditional education and industry requirements. We offer hands-on, offline-first learning experiences designed to transform careers through high-quality technical education.",
    },
    {
      id: "general-2",
      category: "General",
      question: "Who is CodeXAI for?",
      answer:
        "CodeXAI is designed for anyone looking to start or advance their career in technology. Whether you're a beginner wanting to learn programming fundamentals or a professional seeking to upskill in emerging technologies, our courses cater to all levels.",
    },
    {
      id: "general-3",
      category: "General",
      question: "What makes CodeXAI different from other platforms?",
      answer:
        "CodeXAI focuses on practical, hands-on learning with an offline-first approach. Our curriculum is designed in collaboration with industry experts to ensure you learn skills that are directly applicable in real-world projects. We prioritize project-based learning over theoretical concepts.",
    },
    {
      id: "courses-1",
      category: "Courses",
      question: "What courses do you offer?",
      answer:
        "We offer a diverse range of courses covering web development, mobile app development, data science, AI/ML, cloud computing, and more. Visit our courses page to explore the complete list of offerings.",
    },
    {
      id: "courses-2",
      category: "Courses",
      question: "Can I access course materials offline?",
      answer:
        "Yes, our offline-first approach means you can download course materials and work on projects without an internet connection. This makes learning more flexible and accessible regardless of your connectivity situation.",
    },
    {
      id: "courses-3",
      category: "Courses",
      question: "How long are the courses?",
      answer:
        "Course duration varies depending on the program. Most courses range from 4-12 weeks, with the flexibility to learn at your own pace. Some intensive programs may be shorter, while comprehensive bootcamps can be longer.",
    },
    {
      id: "enrollment-1",
      category: "Enrollment & Payment",
      question: "How do I enroll in a course?",
      answer:
        "You can browse our courses on the website, click on the course you're interested in, and follow the enrollment process. You'll need to create an account and complete the payment to get access to the course materials.",
    },
    {
      id: "enrollment-2",
      category: "Enrollment & Payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards, digital wallets, and other popular payment gateways. All transactions are secure and processed through Razorpay, our trusted payment partner.",
    },
    {
      id: "enrollment-3",
      category: "Enrollment & Payment",
      question: "Is there a money-back guarantee?",
      answer:
        "Yes, we offer a refund policy. Please refer to our Refund & Cancellation Policy page for detailed information about eligibility criteria and the refund process.",
    },
    {
      id: "learning-1",
      category: "Learning Experience",
      question: "Will I get a certificate after completing a course?",
      answer:
        "Yes, upon successful completion of a course, you'll receive a certificate of completion. This certificate verifies that you've completed the course and can be added to your professional portfolio.",
    },
    {
      id: "learning-2",
      category: "Learning Experience",
      question: "Can I learn at my own pace?",
      answer:
        "Absolutely! Most of our courses are self-paced, allowing you to learn according to your schedule. You have access to all course materials and can progress through them at a speed that works best for you.",
    },
    {
      id: "learning-3",
      category: "Learning Experience",
      question: "Is there instructor support available?",
      answer:
        "Yes, we provide support through multiple channels. You can reach out through our Contact Support page, and our team will assist you with any questions or issues you encounter during your learning journey.",
    },
    {
      id: "technical-1",
      category: "Technical",
      question: "What are the system requirements?",
      answer:
        "Most of our courses require a computer with basic specifications (students typically use laptops). Specific requirements may vary depending on the course. Check the individual course page for detailed technical requirements.",
    },
    {
      id: "technical-2",
      category: "Technical",
      question: "What if I face technical issues?",
      answer:
        "If you encounter any technical issues, our support team is here to help. Visit our Contact Support page to report the issue, and we'll work to resolve it as quickly as possible.",
    },
    {
      id: "account-1",
      category: "Account",
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking the 'Forgot Password' link on the login page. Follow the instructions sent to your email to create a new password.",
    },
    {
      id: "account-2",
      category: "Account",
      question: "Can I update my profile information?",
      answer:
        "Yes, you can update your profile information by logging into your account and navigating to the Account section. You can modify your name, email, and other details as needed.",
    },
  ];

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <HelpCircle className="w-12 h-12 text-blue-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our courses, enrollment, and learning
              experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 text-white">{category}</h2>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {faqs
                    .filter((faq) => faq.category === category)
                    .map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border-b border-slate-700 last:border-b-0"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-700/50 transition-colors duration-200">
                          <span className="text-left font-semibold text-white text-lg">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 bg-slate-900/30 text-gray-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-2xl mt-20 text-center p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg"
        >
          <h3 className="text-2xl font-bold mb-4">Didn't find your answer?</h3>
          <p className="text-gray-400 mb-6">
            If you have any other questions, our support team is here to help. Feel free to reach
            out to us.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Contact Support
          </a>
        </motion.div>
      </section>
    </div>
  );
}
