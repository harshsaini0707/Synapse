import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-muted-foreground">
          <section>
            <p className="text-sm mb-4">
              <strong>Last Updated:</strong> November 3, 2025
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using Synapse Learn ("the Service"), you agree to be bound by these Terms of 
              Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Synapse Learn is an AI-powered educational platform that provides:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Video transcript analysis and summarization</li>
              <li>AI-powered chatbot for video content</li>
              <li>Automated quiz generation</li>
              <li>Flashcard creation and management</li>
              <li>Chapter-based video navigation</li>
              <li>Study analytics and progress tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">3.1 Account Creation</h3>
            <p className="mb-4">
              You must register for an account using Google OAuth to use our Service. You agree to provide 
              accurate, current, and complete information during the registration process.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">3.2 Account Security</h3>
            <p className="mb-4">
              You are responsible for maintaining the security of your account and for all activities that 
              occur under your account. You must immediately notify us of any unauthorized use of your account.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">3.3 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate your account at our discretion, without notice, 
              for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Subscription and Payments</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">4.1 Free Trial</h3>
            <p className="mb-4">
              New users may receive a limited free trial with restrictions on the number of videos that can 
              be processed. Trial terms are subject to change at our discretion.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">4.2 Premium Subscription</h3>
            <p className="mb-4">
              Premium subscriptions provide access to unlimited video processing and advanced features. 
              Subscription fees are charged according to the plan you select.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">4.3 Payment Terms</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>All fees are in USD unless otherwise stated</li>
              <li>Payments are processed securely through our payment provider</li>
              <li>You agree to provide current, complete, and accurate billing information</li>
              <li>Fees are non-refundable except as required by law</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-2">4.4 Renewal and Cancellation</h3>
            <p>
              Subscriptions automatically renew unless cancelled before the renewal date. You may cancel 
              your subscription at any time through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Acceptable Use</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Attempt to gain unauthorized access to the Service or related systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated systems to access the Service without permission</li>
              <li>Upload or process copyrighted content without proper authorization</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate any person or entity</li>
              <li>Collect or harvest any personally identifiable information from the Service</li>
              <li>Use the Service to transmit viruses, malware, or harmful code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">6.1 Our Content</h3>
            <p className="mb-4">
              The Service and its original content, features, and functionality are owned by Synapse Learn 
              and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">6.2 User Content</h3>
            <p className="mb-4">
              You retain ownership of any content you submit to the Service. By submitting content, you grant 
              us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display the 
              content solely for the purpose of providing the Service.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">6.3 AI-Generated Content</h3>
            <p>
              Content generated by our AI features (summaries, quizzes, flashcards) is provided to you for 
              your personal educational use. You may use this content for your own learning purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Third-Party Services</h2>
            <p>
              Our Service may contain links to third-party websites or services (including YouTube videos) 
              that are not owned or controlled by Synapse Learn. We have no control over and assume no 
              responsibility for the content, privacy policies, or practices of any third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Disclaimers</h2>
            <p className="mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER 
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
              <li>The accuracy, completeness, or reliability of AI-generated content</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Security of data transmission</li>
            </ul>
            <p className="mt-4">
              We do not guarantee that AI-generated summaries, quizzes, or other content will be accurate 
              or suitable for your educational needs. You should verify important information independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SYNAPSE LEARN SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
              WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER 
              INTANGIBLE LOSSES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Synapse Learn and its affiliates, officers, agents, 
              and employees from any claim, demand, loss, or damage, including reasonable attorneys' fees, 
              arising out of or related to your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Data Usage and AI Processing</h2>
            <p>
              By using the Service, you acknowledge that your video transcripts and interactions may be 
              processed by AI systems to provide summaries, quizzes, and other educational features. We do 
              not use your data to train third-party AI models without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Modifications to Service</h2>
            <p>
              We reserve the right to modify or discontinue the Service (or any part thereof) at any time, 
              with or without notice. We shall not be liable to you or any third party for any modification, 
              suspension, or discontinuance of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any material 
              changes by posting the new Terms on this page and updating the "Last Updated" date. Your 
              continued use of the Service after such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
              in which Synapse Learn operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">15. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid or unenforceable, such provision shall be 
              struck and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">16. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p>
              Email: support@synapselearn.live<br />
              Website: https://synapselearn.live
            </p>
          </section>

          <section className="mt-12 pt-6 border-t border-border">
            <p className="text-sm">
              By using Synapse Learn, you acknowledge that you have read, understood, and agree to be bound 
              by these Terms of Service and our Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
