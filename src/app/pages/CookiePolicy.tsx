export default function CookiePolicy() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-400">Last Updated: March 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help websites 
              remember information about your visit, such as preferences, login details, and browsing history. 
              Cookies are essential for improving user experience and website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">2.1 Essential Cookies</h3>
                <p>
                  Required for the website to function properly. These cookies enable you to navigate the site, 
                  log in, and complete transactions.
                </p>
                <div className="mt-2 ml-4 text-sm">
                  <p><strong>Examples:</strong> Session tokens, authentication cookies, security cookies</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">2.2 Performance Cookies</h3>
                <p>
                  Collect information about how you use our website to help us improve performance and user 
                  experience. These cookies are non-personal and are used for analytics only.
                </p>
                <div className="mt-2 ml-4 text-sm">
                  <p><strong>Examples:</strong> Google Analytics, page load times, feature usage</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">2.3 Functional Cookies</h3>
                <p>
                  Remember your preferences and choices to provide a personalized experience. These include 
                  language preferences, theme selection, and learning progress.
                </p>
                <div className="mt-2 ml-4 text-sm">
                  <p><strong>Examples:</strong> Theme preference, language selection, saved preferences</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">2.4 Marketing & Advertising Cookies</h3>
                <p>
                  Used to provide you with relevant advertising and marketing content based on your interests. 
                  These cookies track your activity across websites.
                </p>
                <div className="mt-2 ml-4 text-sm">
                  <p><strong>Examples:</strong> Retargeting ads, social media tracking cookies</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">2.5 Third-Party Cookies</h3>
                <p>
                  Set by external services embedded on our website such as payment gateways, social media 
                  widgets, and analytics tools.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Cookies</h2>
            <div className="space-y-2">
              <p>• <strong>Authentication:</strong> Keep you logged in to your account</p>
              <p>• <strong>Personalization:</strong> Remember your preferences and learning progress</p>
              <p>• <strong>Analytics:</strong> Understand how users interact with our website</p>
              <p>• <strong>Performance:</strong> Monitor website performance and optimize speed</p>
              <p>• <strong>Security:</strong> Detect and prevent fraudulent activity</p>
              <p>• <strong>Marketing:</strong> Deliver targeted content and advertisements</p>
              <p>• <strong>Experience:</strong> Improve overall user experience and functionality</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Cookie Duration</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">4.1 Session Cookies</h3>
                <p>
                  Deleted automatically when you close your browser. Used for login sessions and temporary 
                  preferences.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">4.2 Persistent Cookies</h3>
                <p>
                  Remain on your device for a specified period (usually from a few days to several years). Used 
                  for remembering long-term preferences.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Managing Your Cookie Preferences</h2>
            <p className="mb-4">You have control over cookies through the following methods:</p>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">5.1 Browser Settings</h3>
                <p>
                  Most browsers allow you to refuse cookies or alert you when cookies are being set. You can 
                  adjust these settings through your browser preferences:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li>Chrome: Settings → Privacy and Security → Cookies</li>
                  <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                  <li>Safari: Preferences → Privacy → Cookies and Website Data</li>
                  <li>Edge: Settings → Privacy → Cookies and other site permissions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">5.2 Cookie Consent Tool</h3>
                <p>
                  We provide a cookie consent banner on our website. You can manage your preferences at any 
                  time by clicking the cookie settings.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">5.3 Opt-Out</h3>
                <p>
                  For marketing cookies, you can opt-out of personalized advertising through industry tools like 
                  the Digital Advertising Alliance (DAA) or Network Advertising Initiative (NAI).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Disabling Cookies</h2>
            <p className="mb-2">
              While you can disable cookies, please note that this may affect your ability to:
            </p>
            <div className="space-y-2 ml-4">
              <p>• Access your account</p>
              <p>• View personalized content</p>
              <p>• Complete course assignments</p>
              <p>• Experience optimal website functionality</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Do-Not-Track Signals</h2>
            <p>
              Some browsers include a "Do-Not-Track" feature. We currently do not respond to Do-Not-Track signals 
              as there is no industry standard for their interpretation. However, you can use browser settings 
              to control cookie placement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Services</h2>
            <p className="mb-2">
              We use third-party services that may place cookies on your device:
            </p>
            <div className="space-y-2 ml-4 mt-2">
              <p>• <strong>Google Analytics:</strong> Website traffic analysis</p>
              <p>• <strong>Payment Gateways:</strong> Secure transaction processing</p>
              <p>• <strong>Social Media:</strong> Social sharing and widgets</p>
              <p>• <strong>Advertising Partners:</strong> Targeted advertising</p>
            </div>
            <p className="mt-4">
              These services have their own privacy policies. We recommend reviewing their cookie policies on 
              their respective websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. GDPR and CCPA Compliance</h2>
            <p>
              We comply with GDPR and CCPA regulations. Before using non-essential cookies, we obtain your 
              explicit consent. You can withdraw consent at any time through our cookie settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Local Storage and Similar Technologies</h2>
            <p>
              In addition to cookies, we may use similar technologies such as local storage, web storage, and 
              cached data. These technologies work similarly to cookies and store data on your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Security of Cookies</h2>
            <p>
              Cookies are transmitted over secure HTTPS connections to protect data from unauthorized access. 
              However, no method of data transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Children and Cookies</h2>
            <p>
              Our website is not intended for children under 13. We do not intentionally use cookies to collect 
              data from children. If we become aware of cookie usage by children, we take immediate action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Policy Updates</h2>
            <p>
              We may update this Cookie Policy periodically. Updates will be posted on this page with a new 
              "Last Updated" date. Your continued use of our website constitutes acceptance of updated policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Us</h2>
            <p>
              For questions regarding our use of cookies, please contact us:
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
