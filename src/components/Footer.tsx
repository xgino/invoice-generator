import React from 'react';
import { Link } from 'react-router-dom';
import { APP_STORE_URL } from './Navbar'; // Adjust if needed
import logo from '../assets/icon.jpg';

// Import your data files safely
import comparisonsData from '../data/comparisons.json';
import industriesData from '../data/industries.json';
import templatesData from '../data/templates.json';

export default function Footer() {
  const track = (label: string) => {
    if (window.posthog) window.posthog.capture('footer_click', { link: label });
  };

  // Safely grab only the first 4 items for the footer to prevent link spam
  const topComparisons = (comparisonsData || []).slice(0, 4);
  const topIndustries = (industriesData || []).slice(0, 4);
  const topTemplates = (templatesData || []).slice(0, 4);

  const columnHeaderStyle = { fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '.06em', margin: '0 0 14px' };
  const linkStyle = { fontSize: 14, fontWeight: 500, color: '#4b5563', textDecoration: 'none', transition: 'color .2s' };
  const viewAllStyle = { fontSize: 14, fontWeight: 600, color: '#3b82f6', textDecoration: 'none', marginTop: '6px', display: 'inline-block' };

  return (
    <footer style={{
      background: '#06060a', borderTop: '1px solid rgba(255,255,255,.04)',
      padding: '64px 24px 32px', fontFamily: "'Satoshi', 'DM Sans', -apple-system, sans-serif",
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 48,
          justifyContent: 'space-between', alignItems: 'flex-start',
          paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,.04)',
        }}>

          {/* Brand */}
          <div style={{ flex: '1 1 240px', maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <img src={logo} alt="Invoicor" style={{ width: 28, height: 28, borderRadius: 7, objectFit: 'cover' }} />
              <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 17, fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.02em' }}>Invoicor</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4b5563', margin: 0 }}>
              Professional invoicing for freelancers and small businesses. Create, send, and track PDF invoices from your iPhone.
            </p>
          </div>

          {/* DYNAMIC SEO LINK COLUMNS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, flex: '1 1 auto' }}>
            
            {/* Compare */}
            <div style={{ minWidth: '140px' }}>
              <p style={columnHeaderStyle}>Compare</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {topComparisons.map((item, i) => (
                  <Link key={i} to={`/compare/${item.slug}`} style={linkStyle}>vs {item.competitor}</Link>
                ))}
                <Link to="/compare" style={viewAllStyle}>All Alternatives &rarr;</Link>
              </div>
            </div>

            {/* Industries */}
            <div style={{ minWidth: '140px' }}>
              <p style={columnHeaderStyle}>Industries</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {topIndustries.map((item, i) => (
                  <Link key={i} to={`/industries/${item.slug}`} style={linkStyle}>{item.industry}</Link>
                ))}
                <Link to="/industries" style={viewAllStyle}>All Industries &rarr;</Link>
              </div>
            </div>

            {/* Templates */}
            <div style={{ minWidth: '140px' }}>
              <p style={columnHeaderStyle}>Free Templates</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {topTemplates.map((item, i) => (
                  <Link key={i} to={`/templates/${item.slug}`} style={linkStyle}>{item.niche} Invoice</Link>
                ))}
                <Link to="/templates" style={viewAllStyle}>All Templates &rarr;</Link>
              </div>
            </div>

            {/* Legal & Support */}
            <div style={{ minWidth: '140px' }}>
              <p style={columnHeaderStyle}>Company</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link to="/help" onClick={() => track('help')} style={linkStyle}>Help &amp; FAQ</Link>
                <Link to="/privacy" onClick={() => track('privacy')} style={linkStyle}>Privacy</Link>
                <Link to="/terms" onClick={() => track('terms')} style={linkStyle}>Terms</Link>
                <Link to="/affiliate" onClick={() => track('affiliate')} style={linkStyle}>Affiliate Program (20%)</Link>
                <a href="mailto:info@invoicor.com" onClick={() => track('email')} style={linkStyle}>info@invoicor.com</a>
              </div>
            </div>
          </div>

          {/* Download Button Stays Here... (Keeping your existing App Store button) */}
           <div style={{ flex: '0 0 auto' }}>
            <a href={APP_STORE_URL} onClick={() => track('app_store')} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 14, padding: '14px 20px', textDecoration: 'none',
              transition: 'background .2s, border-color .2s',
            }}>
               {/* Note: I omitted the raw SVG code here just to keep the snippet clean, paste your original SVG back in! */}
              <div>
                <p style={{ fontSize: 10, color: '#64748b', margin: '0 0 1px', fontWeight: 500 }}>Download on the</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#f5f5f5', margin: 0, letterSpacing: '-0.01em' }}>App Store</p>
              </div>
            </a>
          </div>

        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingTop: 24 }}>
          <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>&copy; {new Date().getFullYear()} Invoicor. All rights reserved.</p>
          <p style={{ fontSize: 12, color: '#1f2937', margin: 0 }}>Made in the Netherlands <span style={{ margin: '0 6px', color: '#374151' }}>·</span> Hosted in Germany</p>
        </div>
      </div>
    </footer>
  );
}