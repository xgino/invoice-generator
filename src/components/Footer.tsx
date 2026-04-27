import React from 'react';
import { Link } from 'react-router-dom';
import { APP_STORE_URL } from './Navbar';
import logo from '../assets/icon.png';

export default function Footer() {
  const track = (label) => {
    if (window.posthog) window.posthog.capture('footer_click', { link: label });
  };

  return (
    <footer style={{
      background: '#06060a',
      borderTop: '1px solid rgba(255,255,255,.04)',
      padding: '64px 24px 32px',
      fontFamily: "'Satoshi', 'DM Sans', -apple-system, sans-serif",
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>

        {/* Top row — logo, links, download */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 48,
          justifyContent: 'space-between', alignItems: 'flex-start',
          paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,.04)',
        }}>

          {/* Brand */}
          <div style={{ flex: '1 1 240px', maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <img src={logo} alt="Invoicor" style={{ width: 28, height: 28, borderRadius: 7, objectFit: 'cover' }} />
              <span style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 17, fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.02em',
              }}>Invoicor</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4b5563', margin: 0 }}>
              Professional invoicing for freelancers and small businesses. Create, send, and track PDF invoices from your iPhone.
            </p>
          </div>

          {/* Link columns */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
            {/* Support */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.06em', margin: '0 0 14px' }}>Support</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link to="/help" onClick={() => track('help')} style={linkStyle}>Help &amp; FAQ</Link>
                <a href="mailto:info@invoicor.com" onClick={() => track('email')} style={linkStyle}>info@invoicor.com</a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.06em', margin: '0 0 14px' }}>Legal</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link to="/privacy" onClick={() => track('privacy')} style={linkStyle}>Privacy Policy</Link>
                <Link to="/terms" onClick={() => track('terms')} style={linkStyle}>Terms of Service</Link>
              </div>
            </div>
          </div>

          {/* Download */}
          <div style={{ flex: '0 0 auto' }}>
            <a href={APP_STORE_URL} onClick={() => track('app_store')} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 14, padding: '14px 20px', textDecoration: 'none',
              transition: 'background .2s, border-color .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; }}>
              <svg viewBox="0 0 384 512" style={{ width: 22, height: 22, fill: '#f5f5f5' }}>
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <div>
                <p style={{ fontSize: 10, color: '#64748b', margin: '0 0 1px', fontWeight: 500 }}>Download on the</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#f5f5f5', margin: 0, letterSpacing: '-0.01em' }}>App Store</p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
          gap: 12, paddingTop: 24,
        }}>
          <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>
            &copy; {new Date().getFullYear()} Invoicor. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: '#1f2937', margin: 0 }}>
            Made in the Netherlands
            <span style={{ margin: '0 6px', color: '#374151' }}>·</span>
            Hosted in Germany
          </p>
        </div>
      </div>
    </footer>
  );
}

const linkStyle = {
  fontSize: 14, fontWeight: 500, color: '#4b5563', textDecoration: 'none',
  transition: 'color .2s',
};

// Add hover via CSS since inline onMouseEnter on Link/a would be verbose
// The links will brighten on hover via the global CSS below — add to your App or index:
// a:hover { color: #94a3b8 !important; }