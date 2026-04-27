import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_STORE_URL } from '../components/Navbar';

function Q({ question, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: 'inherit', textAlign: 'left',
      }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#e2e8f0', paddingRight: 16 }}>{question}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round"
          style={{ flexShrink: 0, transition: 'transform .25s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div style={{
        maxHeight: open ? 500 : 0, overflow: 'hidden',
        transition: 'max-height .35s cubic-bezier(.22,1,.36,1)',
      }}>
        <div style={{ paddingBottom: 20, fontSize: 15, lineHeight: 1.7, color: '#94a3b8' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Help() {
  return (
    <div style={{ fontFamily: "'Satoshi', 'DM Sans', -apple-system, sans-serif", background: '#09090b', color: '#e2e8f0', minHeight: '100vh' }}>
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=cabinet-grotesk@700,800&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 80px' }}>

        <p style={{ fontSize: 13, fontWeight: 700, color: '#818cf8', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Support</p>
        <h1 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px', color: '#fff' }}>Help Center</h1>
        <p style={{ fontSize: 16, color: '#64748b', marginBottom: 48, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          Everything you need to know about Invoicor. Can't find what you're looking for? Reach out to us directly.
        </p>

        {/* Getting Started */}
        <SectionTitle>Getting Started</SectionTitle>

        <Q question="How do I create my first invoice?">
          Open Invoicor, tap the + button on the Invoices tab. Select a client (or create a new one), add your items, and tap "Preview Invoice". Your invoice is generated as a PDF that you can share via email, WhatsApp, AirDrop, or any other app.
        </Q>

        <Q question="Do I need to set up a business profile first?">
          Yes. Before creating your first invoice, Invoicor will prompt you to add your business details (company name, address, logo, banking info). This only takes a minute and the information is reused on every invoice you create.
        </Q>

        <Q question="Is Invoicor free to use?">
          Yes. You can create up to 3 invoices for free with no time limit. Free invoices include all features — templates, PDF export, client management, and status tracking. No watermarks on any plan.
        </Q>

        <Q question="Which devices are supported?">
          Invoicor is available for iPhone running iOS 17.6 or later. iPad is supported in compatibility mode. A web version is not currently available — your data is accessed through the iOS app.
        </Q>

        {/* Invoicing */}
        <SectionTitle>Creating Invoices</SectionTitle>

        <Q question="Can I add my company logo to invoices?">
          Yes. Go to your Business Profile and tap "Upload Logo". Invoicor supports PNG, JPG, SVG, and WebP formats. Your logo appears on every invoice you send. PNG transparency is preserved.
        </Q>

        <Q question="How do templates work?">
          Invoicor includes 30+ professionally designed invoice templates. Free users get access to the free collection. Starter and Pro plans unlock additional premium templates. You can set a default template in your Business Profile or choose a different one for each invoice.
        </Q>

        <Q question="Can I invoice in different currencies?">
          Yes. Invoicor supports 20+ currencies including USD, EUR, GBP, JPY, CHF, CAD, AUD, INR, BRL, and many more. Set a default currency in your Business Profile or change it per invoice.
        </Q>

        <Q question="Can I send invoices in my client's language?">
          Yes. Invoicor supports multiple invoice languages. All labels on the invoice (Item, Quantity, Total, etc.) are translated automatically. Set a default language in your Business Profile or choose per invoice.
        </Q>

        <Q question="How does tax calculation work?">
          Set your tax rate in your Business Profile (e.g. 21% for Dutch BTW). Invoicor automatically calculates tax on every invoice. You can choose between tax-inclusive and tax-exclusive pricing. You can also override the tax rate per invoice.
        </Q>

        <Q question="Can I add discounts to an invoice?">
          Yes. You can apply a percentage discount or a fixed amount discount to any invoice. The discount is shown as a separate line in the totals section.
        </Q>

        <Q question="What's the maximum number of items per invoice?">
          Each invoice can have up to 7 line items. This keeps invoices clean and fits on a single A4 page.
        </Q>

        {/* Sending & Tracking */}
        <SectionTitle>Sending & Tracking</SectionTitle>

        <Q question="How do I send an invoice?">
          From the invoice detail screen, tap "Share". Your invoice is generated as a PDF and you can send it via email, WhatsApp, AirDrop, Messages, or any other sharing app on your iPhone.
        </Q>

        <Q question="What do the invoice statuses mean?">
          <strong style={{ color: '#e2e8f0' }}>Draft</strong> — saved but not sent yet, you can still edit it.<br />
          <strong style={{ color: '#e2e8f0' }}>Sent</strong> — shared with your client, locked for editing.<br />
          <strong style={{ color: '#e2e8f0' }}>Paid</strong> — client has paid, marked by you.<br />
          <strong style={{ color: '#e2e8f0' }}>Overdue</strong> — past the due date, still unpaid.<br />
          <strong style={{ color: '#e2e8f0' }}>Cancelled</strong> — voided, no longer active.
        </Q>

        <Q question="Can I edit an invoice after sending it?">
          No. Once an invoice is marked as "Sent", it's locked to preserve the legal record. If you need to make changes, duplicate the invoice, edit the copy, and send the updated version.
        </Q>

        <Q question="Can I duplicate an invoice?">
          Yes. On the invoice detail screen, tap the "Copy" button. This creates a new draft with the same client, items, and settings. Useful for recurring work.
        </Q>

        {/* Account & Billing */}
        <SectionTitle>Account & Billing</SectionTitle>

        <Q question="How do subscriptions work?">
          Invoicor offers Starter and Pro plans, billed monthly or yearly through the Apple App Store. All billing is handled by Apple — we never see or store your payment information. You can manage or cancel your subscription in your iPhone's Settings → Apple ID → Subscriptions.
        </Q>

        <Q question="Can I cancel my subscription?">
          Yes, anytime. Go to your iPhone Settings → Apple ID → Subscriptions → Invoicor → Cancel. Your plan stays active until the end of the current billing period. You won't be charged again.
        </Q>

        <Q question="What happens if I downgrade to Free?">
          Your existing invoices, clients, and data remain intact. You can still view, share, and track all previously created invoices. You just won't be able to create new invoices beyond the free limit until you resubscribe.
        </Q>

        <Q question="How do I delete my account?">
          Go to Settings in the app and tap "Delete Account". This permanently removes your account and all associated data from our servers. This action cannot be undone.
        </Q>

        {/* Multiple Businesses */}
        <SectionTitle>Multiple Businesses</SectionTitle>

        <Q question="Can I manage multiple businesses?">
          Yes. Pro plan users can create up to 3 separate business profiles, each with its own company name, logo, address, and banking details. Switch between them when creating an invoice.
        </Q>

        <Q question="How do I set a default business profile?">
          In the Library tab, go to the Business section. Long-press on a profile and select "Set as Default". The default profile is pre-selected when you create a new invoice.
        </Q>

        {/* Data & Privacy */}
        <SectionTitle>Data & Privacy</SectionTitle>

        <Q question="Where is my data stored?">
          All your data is stored on secure servers in Germany, within the European Union. We are fully GDPR compliant.
        </Q>

        <Q question="Do you sell my data?">
          No. We do not sell, rent, or share your personal data or your clients' data with anyone. Read our full <Link to="/privacy" style={{ color: '#818cf8', textDecoration: 'none' }}>Privacy Policy</Link>.
        </Q>

        <Q question="Can I export my data?">
          You can export individual invoices as PDF at any time. For a full data export, contact us at info@invoicor.com and we'll provide your data in a machine-readable format as required by GDPR.
        </Q>

        {/* Contact */}
        <div style={{ marginTop: 56, padding: '32px 24px', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 16, textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 22, fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>Still have questions?</h3>
          <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 20px' }}>Send us a message directly from the app, or email us. We respond within 24 hours.</p>
          <a href="mailto:info@invoicor.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)',
            color: '#e2e8f0', padding: '12px 24px', borderRadius: 12,
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
            transition: 'background .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}>
            info@invoicor.com
          </a>
        </div>

      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 800,
      color: '#fff', margin: '40px 0 8px', letterSpacing: '-0.01em',
      paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.04)',
    }}>{children}</h2>
  );
}