import React from 'react';

export default function Terms() {
  return (
    <div style={{ fontFamily: "'Satoshi', 'DM Sans', -apple-system, sans-serif", background: '#09090b', color: '#e2e8f0', minHeight: '100vh' }}>
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=cabinet-grotesk@700,800&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 80px' }}>

        <p style={{ fontSize: 13, fontWeight: 700, color: '#818cf8', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Legal</p>
        <h1 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px', color: '#fff' }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 48, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          Last updated: April 27, 2026 &middot; Invoicor &middot; Operated from the Netherlands
        </p>

        <S n="1" t="Agreement to Terms">
          <P>By creating an account, downloading, or using the Invoicor application and related services (the "Service"), you agree to be legally bound by these Terms of Service (the "Terms"). If you do not agree, you must not use the Service.</P>
          <P>If you are using the Service on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms.</P>
          <P>We may update these Terms to reflect changes in our services, legal requirements, or business practices. When we make material changes, we will notify you through the app or via email. Your continued use of the Service after notification constitutes acceptance of the updated Terms.</P>
        </S>

        <S n="2" t="Description of Service">
          <P>Invoicor is a mobile invoicing application that allows users to create, send, and track PDF invoices. The Service operates as a cloud-based platform, your data is stored on our servers and accessed via API. An active internet connection is required.</P>
          <P>We reserve the right to modify, suspend, or discontinue any part of the Service at any time. We will make reasonable efforts to notify you of significant changes that affect your use.</P>
        </S>

        <S n="3" t="Account Registration and Security">
          <P>You must be at least 18 years of age to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us immediately of any unauthorized access.</P>
          <P>We reserve the right to suspend or terminate accounts that we reasonably believe to be compromised, fraudulent, or in violation of these Terms.</P>
        </S>

        <S n="4" t="User Content and Responsibility">
          <P>Invoicor provides a tool to generate invoices. We do not audit, verify, or endorse the content you create. You are solely responsible for the accuracy, legality, and tax compliance of all invoices and documents you generate.</P>
          <P>You agree not to use the Service for fraudulent billing, money laundering, tax evasion, or any illegal purpose. Invoicor accepts no liability for disputes between you and your clients, tax authorities, or any third party.</P>
          <P>You retain ownership of your content. By using the Service, you grant us a limited license to process, store, and display your content solely to provide the Service to you.</P>
        </S>

        <S n="5" t="Subscriptions and Payments">
          <P>Invoicor offers free and paid subscription plans. Paid plans are billed through the Apple App Store as auto-renewable subscriptions. All billing, payment processing, renewals, and refunds are handled entirely by Apple.</P>
          <P>Subscription prices may change with advance notice. You can manage and cancel your subscription at any time through your Apple ID account settings. Cancellation takes effect at the end of the current billing period.</P>
          <P>Invoicor does not process, see, or store your payment information. For billing disputes or refund requests, contact Apple Support.</P>
        </S>

        <S n="6" t="Third-Party Services">
          <P>The Service integrates with third-party platforms including Apple (authentication and payments), RevenueCat (subscription validation), and cloud infrastructure providers (hosting). These entities operate as independent data controllers or processors.</P>
          <H>You acknowledge and agree that Invoicor is not liable for any failures, outages, data breaches, or damages caused by third-party services. Their data practices are governed by their respective privacy policies and terms.</H>
          <P>If you lose access to your Apple account or a third-party service experiences downtime, Invoicor cannot be held responsible for any resulting inability to access the Service or any data exposure.</P>
        </S>

        <S n="7" t="Service Availability and Disclaimer of Warranties">
          <H>THE SERVICE IS PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, INVOICOR DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND UNINTERRUPTED OR ERROR-FREE OPERATION.</H>
          <P>We do not guarantee 100% uptime. Planned maintenance, unplanned outages, network issues, and third-party disruptions may temporarily affect availability. We will make commercially reasonable efforts to minimize downtime.</P>
          <P>We do not warrant that calculations will be error-free, that the Service will meet your specific requirements, or that it will be compatible with all devices or network configurations.</P>
        </S>

        <S n="8" t="Limitation of Liability">
          <H>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, INVOICOR, ITS FOUNDERS, DIRECTORS, EMPLOYEES, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, BUSINESS OPPORTUNITIES, OR BUSINESS INTERRUPTION, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE, REGARDLESS OF LEGAL THEORY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</H>
          <H>OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO INVOICOR IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR FIFTY EUROS (€50), WHICHEVER IS GREATER.</H>
          <P>This applies to damages from cyberattacks, server outages, API failures, data loss, unauthorized access, or force majeure events (natural disasters, war, pandemics, government actions, or any circumstance beyond our reasonable control).</P>
          <P>Some jurisdictions do not allow certain limitations. In those jurisdictions, our liability is limited to the maximum extent permitted by law.</P>
        </S>

        <S n="9" t="Indemnification">
          <P>You agree to indemnify, defend, and hold harmless Invoicor and its affiliates from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any law; (d) the content of your invoices; or (e) any dispute between you and third parties.</P>
        </S>

        <S n="10" t="Intellectual Property">
          <P>The Service, including its design, code, templates, and branding, is the exclusive property of Invoicor. These Terms grant you only a limited right to use the Service as described herein. You may not copy, modify, distribute, or reverse-engineer any part of the Service without prior written consent.</P>
        </S>

        <S n="11" t="Acceptable Use">
          <P>You agree not to: (a) use the Service for any unlawful purpose; (b) attempt unauthorized access to the Service or its infrastructure; (c) interfere with or disrupt the Service; (d) use automated tools to scrape or extract data; (e) impersonate another person; or (f) transmit malware, spam, or harmful content.</P>
        </S>

        <S n="12" t="Account Termination">
          <P>You may delete your account at any time through the app. Upon deletion, your data will be permanently removed in accordance with our Privacy Policy.</P>
          <P>We reserve the right to suspend or terminate your account without prior notice for any reason, including breach of these Terms or fraudulent activity. Upon termination, your right to use the Service ceases immediately.</P>
        </S>

        <S n="13" t="Governing Law and Disputes">
          <P>These Terms are governed by the laws of the Netherlands. Disputes shall be subject to the exclusive jurisdiction of the competent courts in the Netherlands.</P>
          <P>Before initiating formal proceedings, you agree to attempt informal resolution by contacting info@invoicor.com. We will make reasonable efforts to resolve matters within 30 days.</P>
        </S>

        <S n="14" t="Severability">
          <P>If any provision is found unenforceable, the remaining provisions continue in full force. The unenforceable provision shall be modified to the minimum extent necessary to preserve its intent.</P>
        </S>

        <S n="15" t="Entire Agreement">
          <P>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Invoicor regarding the Service.</P>
        </S>

        <S n="16" t="Contact">
          <P>Questions about these Terms? Contact us at <a href="mailto:info@invoicor.com" style={{ color: '#818cf8', textDecoration: 'none' }}>info@invoicor.com</a>.</P>
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