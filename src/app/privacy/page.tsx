import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-muted-foreground">
          <section>
            <p className="text-sm mb-4">
              <strong>Last Updated:</strong> November 3, 2025
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p>
              Welcome to Synapse Learn ("we," "our," or "us"). We are committed to protecting your personal 
              information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our website and services at synapselearn.live.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Personal Information</h3>
            <p className="mb-4">
              When you register for an account through Google OAuth, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Profile picture</li>
              <li>Google account ID</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">2.2 Usage Information</h3>
            <p className="mb-4">We automatically collect information about how you use our services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Videos you process and analyze</li>
              <li>Chat history with our AI features</li>
              <li>Quiz attempts and scores</li>
              <li>Flashcards created and viewed</li>
              <li>Payment and subscription information</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">2.3 Technical Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our services</li>
              <li>Process your transactions and manage your subscription</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Generate video summaries, quizzes, and flashcards</li>
              <li>Improve and personalize your experience</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
            <p className="mb-4">We may share your information with:</p>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">4.1 Service Providers</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Google (for authentication)</li>
              <li>Payment processors (for handling transactions)</li>
              <li>Cloud hosting providers</li>
              <li>AI and machine learning service providers</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-2">4.2 Legal Requirements</h3>
            <p>
              We may disclose your information if required by law or in response to valid requests by 
              public authorities (e.g., a court or government agency).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your 
              personal information. However, no method of transmission over the Internet or electronic 
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and 
              fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is 
              required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Children's Privacy</h2>
            <p>
              Our services are not intended for children under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected information 
              from a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of 
              residence. These countries may have data protection laws that are different from the laws of 
              your country.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: support@synapselearn.live<br />
              Website: https://synapselearn.live
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
