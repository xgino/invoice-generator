import React, { useState, useEffect, useRef } from 'react';
import { APP_STORE_URL } from '../components/Navbar';

const API = 'https://www.invoicor.com/api';

/* ═══ Intersection reveal ═══ */
function useReveal(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return [ref, v];
}

/* ═══ Animated counter ═══ */
function Counter({ end, suffix = '', prefix = '', duration = 2000, decimals = 0, vis }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!vis || started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * end);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [vis, end, duration]);
  return <>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.floor(val)}{suffix}</>;
}

/* ═══ Floating shapes ═══ */
function Shape({ type, size, color, top, left, delay = 0, dur = 8, drift = 'A' }) {
  const s = { position: 'absolute', top, left, width: size, height: size, opacity: 0.5, pointerEvents: 'none', zIndex: 0, animation: `sf${drift} ${dur}s ${delay}s ease-in-out infinite` };
  if (type === 'circle') return <div style={{ ...s, borderRadius: '50%', background: color }} />;
  if (type === 'ring') return <div style={{ ...s, borderRadius: '50%', border: `2px solid ${color}`, background: 'transparent' }} />;
  if (type === 'square') return <div style={{ ...s, borderRadius: size * 0.18, background: color, transform: 'rotate(15deg)' }} />;
  if (type === 'cross') return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
  if (type === 'dots') return <svg style={{ ...s, opacity: 0.25 }} viewBox="0 0 40 40" fill={color}>{[0, 10, 20, 30].flatMap(x => [0, 10, 20, 30].map(y => <circle key={`${x}-${y}`} cx={x + 5} cy={y + 5} r="1.5" />))}</svg>;
  if (type === 'tri') return <svg style={s} viewBox="0 0 30 30" fill="none" stroke={color} strokeWidth="2"><polygon points="15,4 27,26 3,26" /></svg>;
  return null;
}

/* ═══ CTA — PostHog tracking ═══ */
function CTA({ text, variant = 'dark', id = '', style: sx = {} }) {
  const dark = variant === 'dark';
  const track = () => { if (window.posthog) window.posthog.capture('cta_click', { text, section: id }); };
  return (
    <a href={APP_STORE_URL} onClick={track} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: dark ? '#fff' : '#0a0f1e', color: dark ? '#0a0f1e' : '#fff',
      padding: '17px 36px', borderRadius: 16, fontSize: 16, fontWeight: 700,
      textDecoration: 'none', letterSpacing: '-0.01em',
      boxShadow: dark ? '0 8px 32px rgba(255,255,255,.15)' : '0 8px 32px rgba(10,15,30,.2)',
      transition: 'transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s', ...sx,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
      <svg viewBox="0 0 384 512" style={{ width: 18, height: 18, fill: 'currentColor' }}><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
      {text}
    </a>
  );
}

/* ═══ Anim helpers ═══ */
const rv = (vis, d = 0) => ({
  opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(40px)',
  transition: `opacity .7s ${d}s cubic-bezier(.22,1,.36,1), transform .7s ${d}s cubic-bezier(.22,1,.36,1)`,
});

/* ═══ Template carousel — fetches HTML via srcdoc to avoid CORS ═══ */
function TemplateCarousel() {
  const [templates, setTemplates] = useState([]);
  const [previews, setPreviews] = useState({});

  useEffect(() => {
    fetch(`${API}/invoices/templates/`)
      .then(r => r.json())
      .then(d => {
        if (!Array.isArray(d)) return;
        const list = d.slice(0, 16);
        setTemplates(list);
        // Fetch each preview HTML in parallel
        list.forEach(t => {
          fetch(`${API}/invoices/templates/${t.slug}/preview/`)
            .then(r => r.text())
            .then(html => {
              setPreviews(prev => ({ ...prev, [t.slug]: html }));
            })
            .catch(() => {});
        });
      })
      .catch(() => {});
  }, []);

  if (!templates.length) return null;

  return (
    <div className="tmpl-scroll" style={{ display: 'flex', gap: 18, overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '8px 0 24px' }}>
      {templates.map((t, i) => (
        <div key={t.slug || i} className="tmpl-card" style={{
          flex: '0 0 210px', scrollSnapAlign: 'start', borderRadius: 14, overflow: 'hidden',
          background: '#fff', border: '1px solid rgba(255,255,255,.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,.06)', transition: 'transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,.12)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.06)'; }}>
          <div style={{ width: 210, height: 280, overflow: 'hidden', position: 'relative', background: '#f8f8f8' }}>
            {previews[t.slug] ? (
              <iframe
                srcDoc={previews[t.slug]}
                title={t.name}
                style={{ width: 794, height: 1123, transform: 'scale(0.264)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }}
                sandbox=""
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 20, height: 20, border: '2px solid #ddd', borderTopColor: '#999', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
              </div>
            )}
          </div>
          <div style={{ padding: '10px 14px 12px', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
            <p style={{ fontSize: 12, fontWeight: 700, margin: 0, color: '#1a1a1a' }}>{t.name}</p>
            {t.tier && t.tier !== 'free' && <span style={{ fontSize: 10, fontWeight: 800, color: t.tier === 'pro' ? '#7c3aed' : '#2563eb', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t.tier}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══ iPhone 15 Pro frame ═══ */
function IPhone({ children, style: sx = {} }) {
  return (
    <div style={{ position: 'relative', width: 340, ...sx }}>
      {/* Outer shell */}
      <div style={{
        borderRadius: 52, padding: 4,
        background: 'linear-gradient(145deg, #555 0%, #222 30%, #444 60%, #1a1a1a 100%)',
        boxShadow: '0 60px 120px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.05) inset, inset 0 1px 1px rgba(255,255,255,.1)',
      }}>
        <div style={{ borderRadius: 48, overflow: 'hidden', background: '#000', position: 'relative', aspectRatio: '393/852' }}>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 10 }} />
          {/* Screen content */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: 48, overflow: 'hidden' }}>
            {children}
          </div>
          {/* Home indicator */}
          <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 120, height: 4, background: 'rgba(255,255,255,.2)', borderRadius: 3, zIndex: 10 }} />
        </div>
      </div>
    </div>
  );
}

/* ═══ Currency marquee ═══ */
function Marquee({ items, speed = 25, reverse = false }) {
  return (
    <div style={{ overflow: 'hidden', padding: '14px 0' }}>
      <div style={{ display: 'flex', animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}`, width: 'max-content' }}>
        {[0, 1].map(r => (
          <div key={r} style={{ display: 'flex', gap: 40, paddingRight: 40, alignItems: 'center' }}>
            {items.map((t, i) => (
              <span key={i} style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,.3)', whiteSpace: 'nowrap', letterSpacing: '.04em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />{t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*                           MAIN PAGE                                    */
/* ═══════════════════════════════════════════════════════════════════════ */
export default function Landing() {
  const [yearly, setYearly] = useState(true);
  const [heroRef, heroV] = useReveal(0.05);
  const [statRef, statV] = useReveal(0.15);
  const [templRef, templV] = useReveal();
  const [howRef, howV] = useReveal();
  const [dashRef, dashV] = useReveal();
  const [globalRef, globalV] = useReveal();
  const [secRef, secV] = useReveal();
  const [priceRef, priceV] = useReveal(0.08);
  const [testRef, testV] = useReveal();
  const [ctaRef, ctaV] = useReveal();

  return (
    <div style={{ fontFamily: "'Satoshi', 'DM Sans', -apple-system, sans-serif", color: '#f5f5f5', background: '#09090b', overflowX: 'hidden' }}>
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&f[]=cabinet-grotesk@700,800,900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes sfA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(8deg)}}
        @keyframes sfB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(14px) rotate(-6deg)}}
        @keyframes sfC{0%,100%{transform:translateX(0) rotate(0deg)}50%{transform:translateX(12px) rotate(5deg)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes glow{0%,100%{opacity:.4}50%{opacity:.7}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:.3}100%{transform:scale(1.8);opacity:0}}
        @keyframes bob{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-10px) rotate(1deg)}}
        @keyframes scroll-hint{0%,100%{transform:translateY(0);opacity:.6}50%{transform:translateY(8px);opacity:1}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .tmpl-scroll::-webkit-scrollbar{display:none}
        .tmpl-scroll{scrollbar-width:none}
        .cta-btn:active{transform:scale(.97)!important}
        ::selection{background:rgba(99,102,241,.3);color:#fff}
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,.12) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(124,58,237,.06) 0%, transparent 50%), #09090b',
      }}>
        {/* Shapes */}
        <Shape type="circle" size={140} color="rgba(99,102,241,.08)" top="6%" left="4%" dur={10} drift="A" />
        <Shape type="ring" size={90} color="rgba(37,99,235,.12)" top="15%" left="88%" delay={1.5} dur={8} drift="B" />
        <Shape type="square" size={40} color="rgba(245,158,11,.06)" top="72%" left="6%" delay={0.8} dur={11} drift="C" />
        <Shape type="cross" size={28} color="rgba(124,58,237,.15)" top="80%" left="82%" delay={2} dur={9} drift="A" />
        <Shape type="dots" size={100} color="rgba(37,99,235,.3)" top="38%" left="93%" dur={13} drift="B" />
        <Shape type="tri" size={36} color="rgba(16,185,129,.12)" top="12%" left="60%" delay={1} dur={12} drift="C" />
        <Shape type="ring" size={180} color="rgba(251,191,36,.04)" top="55%" left="85%" delay={0.5} dur={15} drift="A" />
        <Shape type="circle" size={24} color="rgba(239,68,68,.08)" top="88%" left="42%" delay={2.5} dur={7} drift="B" />

        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '-20%', left: '30%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,.07) 0%, transparent 65%)', pointerEvents: 'none', animation: 'glow 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,.05) 0%, transparent 60%)', pointerEvents: 'none', animation: 'glow 8s ease-in-out infinite 2s' }} />

        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '160px 24px 100px', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 72 }}>

            {/* Left — Copy */}
            <div style={{ flex: '1 1 480px', maxWidth: 560, textAlign: 'center', ...rv(heroV) }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.15)', borderRadius: 999,
                padding: '7px 18px', fontSize: 13, fontWeight: 600, color: '#818cf8', marginBottom: 32,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', animation: 'glow 2s ease-in-out infinite' }} />
                Now on the App Store
              </div>

              <h1 style={{
                fontFamily: "'Cabinet Grotesk', 'DM Sans', sans-serif",
                fontSize: 'clamp(48px, 7vw, 82px)', fontWeight: 900,
                lineHeight: 1.0, letterSpacing: '-0.04em', margin: '0 0 24px',
                background: 'linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,.5) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Your next invoice<br />takes 5 seconds.
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#94a3b8', margin: '0 auto 40px', maxWidth: 440 }}>
                Invoicor auto-fills your business details, clients, and prices. Pick a template, tap send. Beautiful PDF — any currency, any language.
              </p>

              <CTA text="Download Free on iOS" variant="dark" id="hero" />

              {/* Social proof */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 44 }}>
                <div style={{ display: 'flex' }}>
                  {['https://i.pravatar.cc/64?img=12', 'https://i.pravatar.cc/64?img=32', 'https://i.pravatar.cc/64?img=47', 'https://i.pravatar.cc/64?img=52', 'https://i.pravatar.cc/64?img=68'].map((src, i) => (
                    <img key={i} src={src} alt="" style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid #18181b', marginLeft: i ? -10 : 0, objectFit: 'cover' }} />
                  ))}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', gap: 1 }}>{[1, 2, 3, 4, 5].map(i => <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)}</div>
                  <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0', fontWeight: 500 }}>Used by businesses worldwide</p>
                </div>
              </div>
            </div>

            {/* Right — iPhone */}
            <div style={{
              flex: '0 0 auto', position: 'relative',
              opacity: heroV ? 1 : 0, transform: heroV ? 'none' : 'translateY(30px) scale(.92)',
              transition: 'opacity .9s .3s ease, transform .9s .3s cubic-bezier(.22,1,.36,1)',
            }}>
              {/* Pulse ring behind phone */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '120%', height: '120%', borderRadius: '50%', border: '1px solid rgba(99,102,241,.08)', animation: 'pulse-ring 4s ease-out infinite' }} />

              <IPhone style={{ animation: 'bob 6s ease-in-out infinite' }}>
                <div style={{ background: '#0f172a', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: 'linear-gradient(160deg, #1e293b, #0f172a)', padding: '52px 18px 20px', borderRadius: '0 0 28px 28px' }}>
                    <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, fontWeight: 500, margin: '0 0 3px' }}>Good morning</p>
                    <p style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: '0 0 14px', letterSpacing: '-0.03em' }}>€4,280<span style={{ fontSize: 16, fontWeight: 400, opacity: 0.4 }}>.00</span></p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[['3', 'Draft', '#94a3b8'], ['5', 'Sent', '#60a5fa'], ['8', 'Paid', '#4ade80']].map(([n, l, c]) => (
                        <div key={l} style={{ flex: 1, background: 'rgba(255,255,255,.05)', borderRadius: 12, padding: '8px 0', textAlign: 'center' }}>
                          <p style={{ color: c, fontSize: 16, fontWeight: 900, margin: 0 }}>{n}</p>
                          <p style={{ color: 'rgba(255,255,255,.35)', fontSize: 8, margin: '2px 0 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '14px 14px 0', flex: 1 }}>
                    <p style={{ fontWeight: 800, fontSize: 11, margin: '0 0 10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.05em', fontSize: 9 }}>Recent invoices</p>
                    {[
                      { c: 'Acme Corp', n: 'INV-0042', a: '€1,200', st: 'Sent', bg: 'rgba(96,165,250,.1)', tc: '#60a5fa' },
                      { c: 'Studio Nova', n: 'INV-0041', a: '€3,080', st: 'Paid', bg: 'rgba(74,222,128,.1)', tc: '#4ade80' },
                      { c: 'Bright Agency', n: 'INV-0040', a: '€750', st: 'Draft', bg: 'rgba(148,163,184,.08)', tc: '#94a3b8' },
                    ].map((inv, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,.03)', borderRadius: 14, padding: '11px 12px', marginBottom: 7, border: '1px solid rgba(255,255,255,.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div><p style={{ fontWeight: 700, fontSize: 11, margin: 0, color: '#e2e8f0' }}>{inv.c}</p><p style={{ fontSize: 9, color: '#475569', margin: '2px 0 0' }}>{inv.n}</p></div>
                        <div style={{ textAlign: 'right' }}><p style={{ fontWeight: 900, fontSize: 11, margin: 0, color: '#f1f5f9' }}>{inv.a}</p>
                          <span style={{ fontSize: 8, fontWeight: 700, color: inv.tc, background: inv.bg, padding: '2px 7px', borderRadius: 5 }}>{inv.st}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </IPhone>

              {/* Floating payment badge */}
              <div style={{
                position: 'absolute', bottom: '18%', right: -32,
                background: 'rgba(22,163,106,.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(74,222,128,.15)',
                borderRadius: 14, padding: '10px 16px',
                boxShadow: '0 8px 24px rgba(0,0,0,.2)',
                animation: 'float 4s ease-in-out infinite',
              }}>
                <p style={{ fontSize: 9, fontWeight: 600, color: '#4ade80', margin: '0 0 1px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Just paid</p>
                <p style={{ fontSize: 17, fontWeight: 900, margin: 0, color: '#4ade80' }}>+€3,080</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ textAlign: 'center', marginTop: 56, animation: 'scroll-hint 2s ease-in-out infinite' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>
      </section>

      {/* ══════════ STATS MARQUEE + COUNTERS ══════════ */}
      <section ref={statRef} style={{ background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,.04)', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
        <Marquee items={['Create in Seconds', '80% Auto-Fill', '30+ Templates', 'Multi-Currency', 'Multi-Language', 'Status Tracking', 'Tax Calculator', 'PDF Export', 'Multiple Profiles', 'Revenue Dashboard']} speed={28} />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 48 }}>
          {[
            { end: 30, suffix: '+', label: 'Invoice templates', color: '#818cf8' },
            { end: 20, suffix: '+', label: 'Currencies', color: '#4ade80' },
            { end: 5, suffix: 's', label: 'To create & send', color: '#fbbf24' },
            { end: 80, suffix: '%', label: 'Auto-filled', color: '#f472b6' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', flex: '0 0 auto', ...rv(statV, 0.08 * i) }}>
              <p style={{
                fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 48, fontWeight: 900,
                margin: '0 0 4px', letterSpacing: '-0.03em', color: s.color,
              }}>
                <Counter end={s.end} suffix={s.suffix} vis={statV} duration={1800} />
              </p>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <Marquee items={['$ USD', '€ EUR', '£ GBP', '¥ JPY', 'CHF', 'CA$ CAD', 'A$ AUD', '₹ INR', 'R$ BRL', 'kr SEK', 'kr NOK', 'zł PLN', '₺ TRY', 'R ZAR', '₩ KRW', 'S$ SGD', 'HK$ HKD', '₪ ILS']} speed={35} reverse />
      </section>

      {/* ══════════ TEMPLATES — live API ══════════ */}
      <section ref={templRef} style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(124,58,237,.06) 0%, transparent 60%), #09090b' }}>
        <Shape type="ring" size={120} color="rgba(124,58,237,.06)" top="5%" left="90%" dur={11} drift="A" />
        <Shape type="circle" size={40} color="rgba(245,158,11,.05)" top="85%" left="5%" dur={9} drift="B" />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={rv(templV)}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>30+ Professional Templates</p>
            <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 12px', letterSpacing: '-0.03em' }}>
              Invoices your clients<br />will take seriously.
            </h2>
            <p style={{ fontSize: 17, color: '#64748b', margin: '0 0 40px', maxWidth: 480 }}>
              Not the spreadsheet-looking invoices other apps give you. Your logo, your brand, designed to impress.
            </p>
          </div>
          <div style={rv(templV, 0.15)}>
            <TemplateCarousel />
          </div>
          <div style={{ marginTop: 32, ...rv(templV, 0.25) }}>
            <CTA text="Browse All Templates" variant="dark" id="templates" />
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section ref={howRef} style={{ padding: '100px 24px', background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,.04)', position: 'relative', overflow: 'hidden' }}>
        <Shape type="dots" size={80} color="rgba(99,102,241,.2)" top="20%" left="3%" dur={14} drift="A" />
        <Shape type="tri" size={32} color="rgba(245,158,11,.08)" top="70%" left="92%" dur={9} drift="B" />
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={rv(howV)}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>How it works</p>
            <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(32px,4vw,50px)', fontWeight: 900, margin: '0 0 48px', letterSpacing: '-0.03em' }}>
              Three taps. Five seconds. <span style={{ color: '#4ade80' }}>Sent.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
            {[
              { n: '01', t: 'Pick your client', d: 'Select from saved or create new. Name, address, email — auto-filled.', c: '#6366f1' },
              { n: '02', t: 'Add items', d: 'Pick saved products or type a line. Tax, discounts, totals calculated live.', c: '#8b5cf6' },
              { n: '03', t: 'Send as PDF', d: 'One tap. Beautiful PDF via email, WhatsApp, AirDrop. Track payment status.', c: '#4ade80' },
            ].map((step, i) => (
              <div key={i} style={{ flex: '1 1 240px', maxWidth: 260, textAlign: 'left', ...rv(howV, 0.1 + i * 0.12) }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, background: `${step.c}15`, border: `1px solid ${step.c}25`,
                  color: step.c, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 900, marginBottom: 18, boxShadow: `0 0 30px ${step.c}12`,
                }}>{step.n}</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 6px' }}>{step.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: '#64748b', margin: 0 }}>{step.d}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 52, ...rv(howV, 0.45) }}>
            <CTA text="Try It Free" variant="dark" id="how" />
          </div>
        </div>
      </section>

      {/* ══════════ DASHBOARD ══════════ */}
      <section ref={dashRef} style={{ padding: '100px 24px', background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(96,165,250,.05) 0%, transparent 50%), #09090b', position: 'relative' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1, ...rv(dashV) }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Revenue Dashboard</p>
          <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Know where your<br />money is. <span style={{ color: '#60a5fa' }}>Always.</span>
          </h2>
          <p style={{ fontSize: 17, color: '#64748b', margin: '0 0 40px', maxWidth: 480 }}>
            Paid vs unpaid. Collection rate. Average days to get paid. Compare this period to the last with one tap.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px,1fr))', gap: 14 }}>
            {[
              { label: 'Paid', end: 12.4, suffix: 'k', prefix: '€', color: '#4ade80', dec: 1 },
              { label: 'Unpaid', end: 2.1, suffix: 'k', prefix: '€', color: '#fb923c', dec: 1 },
              { label: 'Collection', end: 94, suffix: '%', prefix: '', color: '#60a5fa', dec: 0 },
              { label: 'Avg. to paid', end: 8, suffix: ' days', prefix: '', color: '#a78bfa', dec: 0 },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', borderRadius: 16, padding: '22px 18px', transition: 'transform .25s, border-color .25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${s.color}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; }}>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</p>
                <p style={{ fontSize: 28, fontWeight: 900, margin: 0, color: s.color, fontFamily: "'Cabinet Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
                  <Counter end={s.end} suffix={s.suffix} prefix={s.prefix} vis={dashV} duration={2200} decimals={s.dec} />
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <CTA text="See Your Revenue" variant="dark" id="dashboard" />
          </div>
        </div>
      </section>

      {/* ══════════ GLOBAL + SECURITY ══════════ */}
      <section ref={globalRef} style={{ padding: '100px 24px', background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64 }}>
          <div style={{ flex: '1 1 360px', ...rv(globalV) }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#4ade80', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Go Global</p>
            <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Any currency.<br />Any language.</h2>
            <p style={{ fontSize: 16, color: '#64748b', margin: '0 0 20px' }}>Invoice in your client's native language. They pay up to 30% faster.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['English', 'Nederlands', 'Deutsch', 'Français', 'Español', 'Italiano', '+ more'].map((l, i) => (
                <span key={i} style={{ fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 8, background: 'rgba(74,222,128,.06)', color: '#4ade80', border: '1px solid rgba(74,222,128,.1)' }}>{l}</span>
              ))}
            </div>
          </div>
          <div ref={secRef} style={{ flex: '1 1 360px', ...rv(secV, 0.1) }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Privacy First</p>
            <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Your data stays<br />in Europe.</h2>
            <p style={{ fontSize: 16, color: '#64748b', margin: '0 0 20px' }}>Servers in Germany. GDPR compliant. We never sell your data.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['GDPR', 'Germany', 'Encrypted', 'No Ads'].map((t, i) => (
                <span key={i} style={{ fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 8, background: 'rgba(148,163,184,.05)', color: '#94a3b8', border: '1px solid rgba(148,163,184,.08)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section ref={priceRef} style={{ padding: '100px 24px', background: '#09090b', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48, ...rv(priceV) }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#818cf8', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</p>
            <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(32px,4vw,50px)', fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.03em' }}>Start free. Upgrade when you grow.</h2>
            <p style={{ fontSize: 16, color: '#64748b', margin: '0 0 28px' }}>No watermarks. No hidden fees. Cancel anytime.</p>
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,.04)', borderRadius: 12, padding: 3, border: '1px solid rgba(255,255,255,.06)' }}>
              <button onClick={() => setYearly(false)} style={{ padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'inherit', background: !yearly ? 'rgba(255,255,255,.08)' : 'transparent', color: !yearly ? '#fff' : '#64748b', transition: 'all .2s' }}>Monthly</button>
              <button onClick={() => setYearly(true)} style={{ padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'inherit', background: yearly ? 'rgba(255,255,255,.08)' : 'transparent', color: yearly ? '#fff' : '#64748b', transition: 'all .2s' }}>Yearly <span style={{ color: '#4ade80', fontSize: 11, fontWeight: 800, marginLeft: 4 }}>Save 2 months</span></button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, ...rv(priceV, 0.12) }}>
            {[
              { nm: 'Free', desc: 'Try everything', price: '$0', period: '', features: ['3 invoices (lifetime)', 'Unlimited clients', '1 business profile', 'Free templates', 'PDF export'], btn: 'Download Free', bg: '#fff', fg: '#0a0a0a', accent: '#64748b' },
              { nm: 'Starter', desc: 'For side projects', price: yearly ? '$49.99' : '$4.99', period: yearly ? '/year' : '/mo', features: ['10 invoices/month', 'Unlimited clients', '1 business profile', 'All templates', 'Revenue dashboard'], btn: 'Start Free Trial', bg: '#6366f1', fg: '#fff', accent: '#6366f1' },
              { nm: 'Pro', desc: 'For growing businesses', price: yearly ? '$79.99' : '$7.99', period: yearly ? '/year' : '/mo', features: ['50 invoices/month', 'Unlimited clients', '3 business profiles', 'Premium templates', 'Compare mode'], btn: 'Start Free Trial', bg: '#7c3aed', fg: '#fff', accent: '#7c3aed', pop: true },
            ].map((plan, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,.02)', border: plan.pop ? `1.5px solid ${plan.accent}40` : '1px solid rgba(255,255,255,.06)',
                borderRadius: 20, padding: '30px 24px', position: 'relative', display: 'flex', flexDirection: 'column',
                boxShadow: plan.pop ? `0 0 60px ${plan.accent}08` : 'none',
                transition: 'transform .3s, box-shadow .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                {plan.pop && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: plan.accent, color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 16px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '.06em' }}>Most Popular</div>}
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 2px' }}>{plan.nm}</h3>
                <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px' }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 24 }}>
                  <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.03em', fontFamily: "'Cabinet Grotesk', sans-serif" }}>{plan.price}</span>
                  {plan.period && <span style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>{plan.period}</span>}
                </div>
                <div style={{ flex: 1, marginBottom: 24 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 13 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={APP_STORE_URL} onClick={() => { if (window.posthog) window.posthog.capture('pricing_click', { plan: plan.nm }); }} style={{
                  display: 'block', textAlign: 'center', padding: '14px 0', borderRadius: 12,
                  background: plan.bg, color: plan.fg, fontWeight: 700, fontSize: 14,
                  textDecoration: 'none', transition: 'transform .2s', boxShadow: `0 4px 16px ${plan.accent}20`,
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>{plan.btn}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section ref={testRef} style={{ padding: '100px 24px', background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(32px,4vw,46px)', fontWeight: 900, margin: '0 0 48px', textAlign: 'center', letterSpacing: '-0.03em', ...rv(testV) }}>
            Businesses get paid <span style={{ color: '#4ade80' }}>faster.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, ...rv(testV, 0.12) }}>
            {[
              { q: 'I used to spend 20 minutes per invoice in Google Docs. Now I open Invoicor, tap three times, and it is sent before my coffee gets cold.', n: 'Sarah J.', r: 'Freelance Designer', c: '#818cf8' },
              { q: 'My clients actually commented on how professional my invoices look. The templates are better than what my accountant sends.', n: 'Marcus C.', r: 'Software Consultant', c: '#4ade80' },
              { q: 'Had €3,000 in unsent invoices in my notes app. First day with Invoicor, sent them all. Got paid within a week.', n: 'Elena R.', r: 'Photography Studio', c: '#fbbf24' },
            ].map((t, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)',
                borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column',
                transition: 'transform .3s, border-color .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${t.c}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>{[1, 2, 3, 4, 5].map(s => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)}</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#94a3b8', margin: '0 0 24px', flex: 1 }}>"{t.q}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${t.c}15`, border: `1px solid ${t.c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, color: t.c }}>{t.n[0]}</div>
                  <div><p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{t.n}</p><p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{t.r}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section ref={ctaRef} style={{ padding: '120px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,.06) 0%, transparent 60%), #09090b', borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <Shape type="circle" size={20} color="rgba(251,191,36,.15)" top="20%" left="15%" dur={6} drift="A" />
        <Shape type="ring" size={60} color="rgba(99,102,241,.08)" top="65%" left="80%" dur={8} drift="B" />
        <Shape type="cross" size={18} color="rgba(255,255,255,.06)" top="30%" left="85%" dur={7} drift="C" />
        <Shape type="square" size={14} color="rgba(74,222,128,.1)" top="75%" left="20%" dur={9} drift="A" />
        <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 1, ...rv(ctaV) }}>
          <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(36px, 5.5vw, 60px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
            Send your first invoice<br /><span style={{ color: '#818cf8' }}>in 60 seconds.</span>
          </h2>
          <p style={{ fontSize: 17, color: '#64748b', margin: '0 0 40px', lineHeight: 1.6 }}>Free on the App Store. No credit card required.</p>
          <CTA text="Download Invoicor" variant="dark" id="final" />
        </div>
      </section>
    </div>
  );
}