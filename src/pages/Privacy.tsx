import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-sm font-medium text-slate-500 mb-8 border-b pb-4">Effective Date: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Introduction and Legally Binding Agreement</h2>
        <p className="text-slate-600 mb-4">
          Welcome to Invoicor ("we", "our", "us"). We are headquartered in the Netherlands and provide an iOS-based invoice generation service. 
        </p>
        <p className="text-slate-600 mb-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <strong>By downloading, accessing, or using the Invoicor application, you explicitly consent to the data practices described in this policy.</strong> If you do not agree, you must cease using the App immediately.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Our Core Principle: Your Data is Not for Sale</h2>
        <p className="text-slate-600 mb-4">
          <strong>We strictly do not sell, rent, or trade your personal data or your clients' data to third-party advertisers or data brokers.</strong> The data collected is utilized exclusively to provide the core functionality of our invoice generator.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Data Storage and Cloud API Architecture</h2>
        <p className="text-slate-600 mb-4">
          It is important to understand how Invoicor handles your data:
        </p>
        <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
          <li><strong>No Permanent Local Storage:</strong> Invoicor does not permanently store your invoice or client database locally on your iOS device. The App functions by utilizing an API to securely fetch your data in real-time from our servers.</li>
          <li><strong>German Server Hosting:</strong> All user-generated content (invoices, client details, business profiles) is securely transmitted to and stored on Enterprise-grade Virtual Private Servers (VPS) located strictly within <strong>Germany</strong>. We rely on German infrastructure to ensure your data benefits from some of the most rigorous privacy standards in the European Union.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Third-Party Services and Independent Controllers</h2>
        <p className="text-slate-600 mb-4">
          To provide a seamless experience, we integrate with industry-leading third-party services. <strong>These entities operate as independent data controllers. Their collection and processing of your data are governed by their respective privacy policies, for which Invoicor holds no liability:</strong>
        </p>
        <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
          <li><strong>Authentication Providers (Apple & Google):</strong> If you choose to log in via "Sign in with Apple" or "Google Sign-In," these providers authenticate your identity and share basic profile information (like your email) with us. We do not manage their security protocols.</li>
          <li><strong>Apple App Store:</strong> All financial transactions are processed securely by Apple. We never see, process, or store your credit card information.</li>
          <li><strong>RevenueCat:</strong> We utilize RevenueCat to validate your subscription status. RevenueCat collects anonymous App User IDs and purchase receipts.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Your GDPR Rights</h2>
        <p className="text-slate-600 mb-4">
          Operating under Dutch jurisdiction, we fully comply with the General Data Protection Regulation (GDPR). You retain the right to Access, Rectify, Export, and Delete ("Right to be Forgotten") your personal data. You may exercise these rights directly within the App or by contacting us.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Policy Updates</h2>
        <p className="text-slate-600 mb-4">
          We reserve the right to update this Privacy Policy to reflect technical, operational, or legal changes. Continued use of the App following any updates signifies your acceptance of the revised terms. Please review this page periodically.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Contact Us</h2>
        <p className="text-slate-600 mb-4">
          For legal inquiries or data requests, contact us at <strong>info@invoicor.com</strong>.
        </p>
      </div>
    </div>
  );
}