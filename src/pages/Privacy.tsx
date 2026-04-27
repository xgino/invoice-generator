import React from 'react';

export default function Privacy() {
  return (
    <div style={{ fontFamily: "'Satoshi', 'DM Sans', -apple-system, sans-serif", background: '#09090b', color: '#e2e8f0', minHeight: '100vh' }}>
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=cabinet-grotesk@700,800&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 80px' }}>

        <p style={{ fontSize: 13, fontWeight: 700, color: '#4ade80', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Privacy</p>
        <h1 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px', color: '#fff' }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 48, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          Last updated: April 27, 2026 &middot; Invoicor &middot; Operated from the Netherlands
        </p>

        <S n="1" t="Our Core Principle">
          <H>We do not sell, rent, or trade your personal data or your clients' data to third-party advertisers, data brokers, or any other entity. The data we collect is used exclusively to provide and improve the Service.</H>
          <P>Invoicor is built on the principle that your financial data belongs to you. We collect only what is necessary to operate the Service, and we are transparent about how we use it.</P>
        </S>

        <S n="2" t="Who We Are">
          <P>Invoicor is operated from the Netherlands. For the purposes of the General Data Protection Regulation (GDPR), Invoicor is the data controller for the personal data processed through the Service. You can reach us at info@invoicor.com for any privacy-related inquiries.</P>
        </S>

        <S n="3" t="Data We Collect">
          <P><strong style={{ color: '#e2e8f0' }}>Account data:</strong> When you register, we collect your email address and an encrypted password. If you use Sign in with Apple, Apple provides us with a verified email address (or a private relay address if you choose to hide your email).</P>
          <P><strong style={{ color: '#e2e8f0' }}>Business data:</strong> Information you enter into your business profiles, including company name, address, tax ID, banking details, and logo. This data is used to populate your invoices.</P>
          <P><strong style={{ color: '#e2e8f0' }}>Client data:</strong> Contact information for your clients that you enter into the app, including names, email addresses, phone numbers, and addresses. This data is stored to enable invoice creation.</P>
          <P><strong style={{ color: '#e2e8f0' }}>Invoice data:</strong> The content of invoices you create, including line items, amounts, dates, and payment status. This data is processed to render and deliver your invoices.</P>
          <P><strong style={{ color: '#e2e8f0' }}>Usage data:</strong> We collect anonymized usage metrics such as which features are used, how often invoices are created, and general app interaction patterns. This helps us improve the Service. We do not track individual user behavior for advertising purposes.</P>
          <P><strong style={{ color: '#e2e8f0' }}>Device data:</strong> When you submit feedback, we may collect your device model, OS version, and app version to help diagnose issues. This data is only collected when you explicitly submit feedback.</P>
        </S>

        <S n="4" t="How We Use Your Data">
          <P>We use your data exclusively for the following purposes:</P>
          <P>Providing the Service: creating, rendering, storing, and delivering your invoices and managing your account. Improving the Service: understanding usage patterns to prioritize features and fix issues. Communication: sending you important service updates, security alerts, or responding to your inquiries. Legal compliance: fulfilling our obligations under applicable law, including GDPR.</P>
          <P>We do not use your data for targeted advertising, profiling, or automated decision-making.</P>
        </S>

        <S n="5" t="Data Storage and Security">
          <H>All user-generated content (invoices, client details, business profiles) is stored on enterprise-grade servers located in Germany. We rely on German infrastructure to ensure your data benefits from the rigorous privacy standards of the European Union.</H>
          <P>Invoicor does not permanently store data locally on your iOS device. The app functions by securely fetching your data in real-time from our servers via encrypted API connections (HTTPS/TLS).</P>
          <P>We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security reviews. However, no digital system is impenetrable, and we cannot guarantee absolute security.</P>
        </S>

        <S n="6" t="Third-Party Services">
          <P>To provide the Service, we integrate with the following third-party services. Each operates under their own privacy policies:</P>
          <P><strong style={{ color: '#e2e8f0' }}>Apple (Authentication &amp; Payments):</strong> If you use Sign in with Apple, Apple authenticates your identity and shares basic profile information. All financial transactions are processed by Apple through the App Store. We never see, process, or store your payment information.</P>
          <P><strong style={{ color: '#e2e8f0' }}>RevenueCat (Subscription Management):</strong> We use RevenueCat to validate your subscription status. RevenueCat receives anonymous app user IDs and purchase receipts. They do not receive your email or personal details.</P>
          <P><strong style={{ color: '#e2e8f0' }}>Hosting Provider:</strong> Our servers are hosted by a German infrastructure provider. They process data on our behalf under a Data Processing Agreement (DPA) compliant with GDPR Article 28.</P>
          <P>We do not share your data with any advertising networks, analytics platforms that track individuals, or data brokers.</P>
        </S>

        <S n="7" t="Data Retention">
          <P>We retain your data for as long as your account is active. If you delete your account, we will permanently delete all your data from our servers within 30 days, except where we are required by law to retain certain records (e.g., for tax or legal compliance purposes).</P>
          <P>Anonymized, aggregated data that cannot be used to identify you may be retained indefinitely for analytical purposes.</P>
        </S>

        <S n="8" t="Your GDPR Rights">
          <P>Under the General Data Protection Regulation (GDPR), you have the following rights regarding your personal data:</P>
          <P><strong style={{ color: '#e2e8f0' }}>Right of Access:</strong> You can request a copy of all personal data we hold about you. <strong style={{ color: '#e2e8f0' }}>Right to Rectification:</strong> You can correct inaccurate data directly in the app or by contacting us. <strong style={{ color: '#e2e8f0' }}>Right to Erasure:</strong> You can delete your account and all associated data at any time through the app settings. <strong style={{ color: '#e2e8f0' }}>Right to Data Portability:</strong> You can request your data in a machine-readable format. <strong style={{ color: '#e2e8f0' }}>Right to Restrict Processing:</strong> You can request that we limit how we use your data. <strong style={{ color: '#e2e8f0' }}>Right to Object:</strong> You can object to certain processing activities.</P>
          <P>To exercise any of these rights, contact us at info@invoicor.com. We will respond within 30 days as required by GDPR. If you believe your data protection rights have been violated, you have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).</P>
        </S>

        <S n="9" t="Children's Privacy">
          <P>The Service is not intended for use by anyone under the age of 18. We do not knowingly collect personal data from minors. If we become aware that we have collected data from someone under 18, we will take steps to delete it promptly.</P>
        </S>

        <S n="10" t="International Data Transfers">
          <P>Your data is stored and processed within the European Union (Germany). We do not transfer your data outside the EU/EEA unless required by a third-party service (e.g., Apple's servers), in which case appropriate safeguards such as Standard Contractual Clauses are in place.</P>
        </S>

        <S n="11" t="Cookies and Tracking">
          <P>The Invoicor iOS app does not use cookies. Our website (invoicor.com) may use essential cookies for functionality and anonymous analytics (via PostHog) to understand website traffic. We do not use advertising cookies or cross-site tracking.</P>
        </S>

        <S n="12" t="Changes to This Policy">
          <P>We may update this Privacy Policy to reflect changes in our practices, services, or legal requirements. When we make material changes, we will notify you through the app or via email. We encourage you to review this page periodically. Your continued use of the Service after changes constitutes your acceptance of the updated policy.</P>
        </S>

        <S n="13" t="Contact">
          <P>For privacy inquiries, data requests, or concerns, contact us at <a href="mailto:info@invoicor.com" style={{ color: '#4ade80', textDecoration: 'none' }}>info@invoicor.com</a>.</P>
          <P>Data Controller: Invoicor, the Netherlands.</P>
          <P>Supervisory Authority: Autoriteit Persoonsgegevens (Dutch Data Protection Authority), <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none' }}>autoriteitpersoonsgegevens.nl</a>.</P>
        </S>

      </div>
    </div>
  );
}

function S({ n, t, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 21, fontWeight: 800, color: '#fff', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
        <span style={{ color: '#4b5563', marginRight: 8 }}>{n}.</span>{t}
      </h2>
      {children}
    </div>
  );
}
function P({ children }) { return <p style={{ fontSize: 15, lineHeight: 1.75, color: '#94a3b8', margin: '0 0 12px' }}>{children}</p>; }
function H({ children }) { return <p style={{ fontSize: 14, lineHeight: 1.7, color: '#cbd5e1', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 10, padding: '14px 18px', margin: '0 0 12px', fontWeight: 500 }}>{children}</p>; }