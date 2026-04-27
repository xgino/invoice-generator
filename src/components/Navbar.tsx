import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icon.png';

export const APP_STORE_URL = "https://apps.apple.com/us/app/invoicor-invoice-maker/id6761840276";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const track = () => {
    if (window.posthog) window.posthog.capture('cta_click', { text: 'nav_download', section: 'navbar' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(9,9,11,.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,.06)' : '1px solid transparent',
      transition: 'background .3s, border-color .3s, backdrop-filter .3s',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src={logo} alt="Invoicor" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
          <span style={{
            fontFamily: "'Cabinet Grotesk', 'DM Sans', sans-serif",
            fontSize: 18, fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.02em',
          }}>Invoicor</span>
        </Link>

        {/* Nav links + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>

          {/* CTA */}
          <a href={APP_STORE_URL} onClick={track} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#09090b',
            padding: '9px 20px', borderRadius: 12,
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            transition: 'transform .2s, box-shadow .2s',
            boxShadow: '0 2px 12px rgba(255,255,255,.06)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(255,255,255,.06)'; }}>
            <svg viewBox="0 0 384 512" style={{ width: 14, height: 14, fill: '#09090b' }}>
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span className="nav-cta-full">Download on iOS</span>
            <span className="nav-cta-short">Get App</span>
          </a>
        </div>
      </div>

      <style>{`
        .nav-cta-short { display: none; }
        @media (max-width: 640px) {
          .nav-cta-full { display: none; }
          .nav-cta-short { display: inline; }
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}