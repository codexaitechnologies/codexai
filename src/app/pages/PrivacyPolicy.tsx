export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last Updated: March 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              CodeXAI Technologies ("Company", "we", "our", or "us") operates the CodeXAI website and services. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">2.1 Information You Voluntarily Provide</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Name, email address, and phone number when you create an account or contact us</li>
                  <li>Educational background, work experience, and career aspirations</li>
                  <li>Payment information for course enrollment</li>
                  <li>Messages and feedback submitted through our contact forms</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">2.2 Information Collected Automatically</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Browser type, IP address, and access times</li>
                  <li>Pages viewed and interactions with our website</li>
                  <li>Device type and operating system information</li>
                  <li>Course progress and learning data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <div className="space-y-2">
              <p>• Providing and improving our courses and services</p>
              <p>• Personalizing your learning experience</p>
              <p>• Sending educational materials, updates, and announcements</p>
              <p>• Processing payments and course enrollments</p>
              <p>• Providing customer support and responding to inquiries</p>
              <p>• Analyzing usage patterns to enhance user experience</p>
              <p>• Detecting and preventing fraudulent activity</p>
              <p>• Complying with legal obligations</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell or rent your personal information. We may share your information only in the following 
              circumstances:
            </p>
            <div className="space-y-2">
              <p><strong className="text-blue-400">Service Providers:</strong> Third-party services for payment processing, hosting, and analytics</p>
              <p><strong className="text-blue-400">Mentors and Instructors:</strong> Limited access to your course progress for educational purposes</p>
              <p><strong className="text-blue-400">Legal Requirements:</strong> When required by law or to protect our rights and safety</p>
              <p><strong className="text-blue-400">Business Transfers:</strong> In case of merger, acquisition, or sale of assets</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption, secure servers, and firewalls 
              to protect your personal information. However, no method of transmission over the internet is 100% 
              secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Individual Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <div className="space-y-2">
              <p>• Access your personal information and request copies</p>
              <p>• Correct inaccurate or incomplete data</p>
              <p>• Request deletion of your information</p>
              <p>• Opt-out of marketing communications</p>
              <p>• Data portability (obtain your data in structured format)</p>
              <p>• Withdraw consent at any time</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Similar Technologies</h2>
            <p>
              We use cookies to enhance your browsing experience, remember preferences, and analyze site usage. 
              You can control cookie settings through your browser. Disabling cookies may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children. If we become aware of such collection, we will take appropriate steps to 
              delete such information and terminate the child's account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Third-Party Links</h2>
            <p>
              Our website may contain links to external websites. This Privacy Policy does not apply to third-party 
              websites, and we are not responsible for their privacy practices. We encourage you to review their 
              privacy policies independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Policy Changes</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated 
              "Last Updated" date. Your continued use of our services constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, 
              please contact us at:
            </p>
            <div className="mt-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
              <p className="font-semibold text-white mb-2">CodeXAI Technologies</p>
              <p>Email: codexaitechnologies@gmail.com</p>
              <p>Address: Koramangala, Bangalore - 560034</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
