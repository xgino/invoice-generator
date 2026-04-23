import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-sm font-medium text-slate-500 mb-8 border-b pb-4">Effective Date: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Legally Binding Agreement</h2>
        <p className="text-slate-600 mb-4">
          <strong>By downloading, accessing, or using the Invoicor iOS application ("App"), you agree to be bound by these Terms of Service.</strong> If you do not agree to every term outlined below, you are strictly prohibited from using the App.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. User Content and Responsibility</h2>
        <p className="text-slate-600 mb-4">
          Invoicor provides a tool to generate invoices; we do not audit, verify, or endorse the content you create. <strong>You bear sole legal responsibility for the accuracy, legality, and tax compliance of the invoices you generate.</strong> You agree not to use the App for fraudulent billing, money laundering, or any illegal activities. Invoicor accepts zero liability for disputes between you and your clients or any tax authorities.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Third-Party Services and Severance of Liability</h2>
        <p className="text-slate-600 mb-4">
          Our App relies on external platforms to function optimally. <strong>You explicitly acknowledge and agree that Invoicor is not liable for any failures, breaches, or damages caused by these third-party services:</strong>
        </p>
        <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
          <li><strong>Authentication (Apple & Google):</strong> If you lose access to your Apple or Google account, or if their systems experience a security breach, Invoicor cannot be held responsible for your inability to access the App or any resulting data exposure.</li>
          <li><strong>Billing & Subscriptions (Apple & RevenueCat):</strong> Subscription renewals, cancellations, and billing are handled entirely by Apple and validated by RevenueCat. Invoicor cannot be held liable for erroneous charges, failed subscription validations, or account suspension resulting from Apple or RevenueCat platform errors.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. "As-Is" Disclaimer and Cloud Reliability</h2>
        <p className="text-slate-600 mb-4">
          Because Invoicor fetches data via API rather than storing it locally, the App requires an active internet connection. <strong>THE APP IS PROVIDED "AS-IS" AND "AS AVAILABLE."</strong> We do not guarantee 100% server uptime. We disclaim all warranties, express or implied, including fitness for a particular purpose.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Strict Limitation of Liability (Hacks & Outages)</h2>
        <p className="text-slate-600 mb-4">
          While we utilize secure servers in Germany and industry-standard security protocols, no digital system is impenetrable. <strong>Under no circumstances shall Invoicor, its founders, or affiliates be liable for any indirect, incidental, consequential, or punitive damages, including loss of profits, loss of data, or business interruption resulting from cyberattacks, server hacks, API outages, or force majeure events.</strong>
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Right to Terminate</h2>
        <p className="text-slate-600 mb-4">
          We reserve the right to suspend or terminate your account and access to the App at our sole discretion, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Governing Law</h2>
        <p className="text-slate-600 mb-4">
          These Terms shall be governed by and construed in accordance with the laws of <strong>the Netherlands</strong>. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the Dutch courts.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Modifications to Terms</h2>
        <p className="text-slate-600 mb-4">
          We may modify these Terms at any time to reflect legal or operational changes. Your continued use of the App signifies your acceptance of any such modifications.
        </p>
      </div>
    </div>
  );
}