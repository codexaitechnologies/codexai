export default function RefundPolicy() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Refund & Cancellation Policy</h1>
          <p className="text-gray-400">Last Updated: March 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Overview</h2>
            <p>
              At CodeXAI Technologies, we are confident in the quality of our courses and believe in customer 
              satisfaction. This policy outlines our refund and cancellation terms to ensure transparency and 
              fairness.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Refund Eligibility</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">2.1 7-Day Money-Back Guarantee</h3>
                <p>
                  If you are not satisfied with your course purchase, you are eligible for a full refund within 
                  7 days from the date of enrollment, provided:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>You have accessed less than 20% of the course content</li>
                  <li>You have not submitted more than one assignment</li>
                  <li>You have not participated in mentorship sessions</li>
                  <li>You request the refund in writing with valid reasons</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">2.2 After 7 Days</h3>
                <p>
                  Courses purchased more than 7 days ago are generally not refundable. However, we may consider 
                  refund requests in exceptional circumstances such as:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Technical issues preventing course access</li>
                  <li>Medical emergencies or personal hardships</li>
                  <li>Course cancellation on our part</li>
                  <li>Significant course content changes or removals</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Non-Refundable Items</h2>
            <p>The following are non-refundable:</p>
            <div className="space-y-2 ml-4 mt-2">
              <p>• Courses completed beyond 20% content access</p>
              <p>• Certifications and credentials already awarded</p>
              <p>• One-on-one mentorship sessions already conducted</p>
              <p>• Workshop fees for events already conducted</p>
              <p>• Corporate or bulk training programs already initiated</p>
              <p>• Digital materials, downloadable resources, and lifetime access purchases</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Refund Request Process</h2>
            <p className="mb-4">To request a refund, follow these steps:</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="font-semibold text-blue-400">1.</span>
                <p>Email us at codexaitechnologies@gmail.com with your enrollment details</p>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-blue-400">2.</span>
                <p>Provide your order ID and reason for requesting the refund</p>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-blue-400">3.</span>
                <p>Our team will verify your request within 3-5 business days</p>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-blue-400">4.</span>
                <p>If approved, refund will be processed to your original payment method</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Refund Timeline</h2>
            <p>
              Approved refunds will be processed within 5-10 business days. However, the time for the refund to 
              appear in your bank account depends on your bank and payment method:
            </p>
            <div className="space-y-2 ml-4 mt-2">
              <p>• Credit/Debit Card: 5-15 business days</p>
              <p>• UPI/Net Banking: 2-7 business days</p>
              <p>• Digital Wallets: 3-7 business days</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Course Cancellation</h2>
            <p>
              If you wish to cancel your course enrollment before completing it, you can do so by contacting our 
              support team. Cancellation eligibility for refunds follows the same guidelines as mentioned in 
              Section 2.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Course Rescheduling</h2>
            <p>
              If you are unable to attend your offline classes due to unforeseen circumstances, you can request 
              to reschedule to the next available batch. A maximum of two rescheduling requests are allowed per 
              course enrollment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Credits as Alternative</h2>
            <p>
              Instead of a refund, we offer the option to convert the paid amount into CodeXAI credits that can 
              be used for:
            </p>
            <div className="space-y-2 ml-4 mt-2">
              <p>• Other courses on our platform</p>
              <p>• Mentorship sessions</p>
              <p>• Workshops and webinars</p>
              <p>• Career coaching services</p>
            </div>
            <p className="mt-4">Credits are valid for 12 months from the date of issuance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Force Majeure Events</h2>
            <p>
              In case of unforeseeable events (natural disasters, pandemics, government actions), CodeXAI reserves 
              the right to:
            </p>
            <div className="space-y-2 ml-4 mt-2">
              <p>• Postpone or shift courses to online mode</p>
              <p>• Extend the course duration</p>
              <p>• Offer full refund if the course cannot proceed</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Special Circumstances</h2>
            <p>
              For special cases such as medical emergencies, financial hardship, or other exceptional 
              circumstances, please contact us directly. Each case will be reviewed individually by our management 
              team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Policy Changes</h2>
            <p>
              CodeXAI reserves the right to modify this refund policy at any time. Changes will be effective 
              immediately for new enrollments. Existing enrollments will continue under the policy in effect at 
              the time of enrollment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Dispute Resolution</h2>
            <p>
              If you have a dispute regarding a refund decision, you may escalate it to our management team at 
              codexaitechnologies@gmail.com. We aim to resolve disputes amicably within 14 days of escalation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
            <p>
              For any questions or to initiate a refund request, please reach out to us:
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
