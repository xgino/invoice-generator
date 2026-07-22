import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

// ============================================================
// CONFIG - Edit these
// ============================================================
const AFFILIATE_SIGNUP_URL = 'https://gomarketme.net/m/invoicor/c/b80f3289-edcb-4fb5-8548-4328a404d519/signup';
const COMMISSION_PERCENT = 20;
const APP_STORE_URL = 'https://apps.apple.com/us/app/invoicor-invoice-maker-app/id6761840276';

// Invoicor subscription prices (monthly, EUR)
const PLANS = [
  { name: 'Starter', price: 4.99 },
  { name: 'Pro', price: 9.99 },
];

// ============================================================
// STYLES
// ============================================================
const font = "'Satoshi', 'DM Sans', -apple-system, sans-serif";
const headingFont = "'Cabinet Grotesk', 'Satoshi', sans-serif";
const accent = '#3b82f6';
const accentLight = '#eff6ff';
const green = '#10b981';
const greenLight = '#ecfdf5';
const greenBorder = '#d1fae5';
const bg = '#fafafa';
const cardBg = '#ffffff';
const dark = '#0f172a';
const text1 = '#1e293b';
const text2 = '#475569';
const text3 = '#94a3b8';
const border = '#e2e8f0';

// ============================================================
// PAGE
// ============================================================
export default function AffiliatePage() {
  const [referrals, setReferrals] = useState(500);
  const [selectedPlan, setSelectedPlan] = useState(1);

  const plan = PLANS[selectedPlan];
  const perSub = +(plan.price * COMMISSION_PERCENT / 100).toFixed(2);
  const monthly = +(perSub * referrals).toFixed(2);
  const yearly = +(monthly * 12).toFixed(2);

  return (
    <div style={{ fontFamily: font, color: text1, background: bg, minHeight: '100vh' }}>
      <Helmet>
        <title>{`Affiliate Program | Invoicor - Earn ${COMMISSION_PERCENT}% Recurring`}</title>
        <meta name="description" content={`Join the Invoicor Affiliate Program. Earn ${COMMISSION_PERCENT}% lifetime recurring commission promoting the fastest invoice app for freelancers. Free to join, auto-approved.`} />
    </Helmet>

      {/* ── HERO ── */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: greenLight, color: '#059669', fontSize: 12, fontWeight: 700,
          padding: '8px 16px', borderRadius: 100, marginBottom: 24,
          border: `1px solid ${greenBorder}`, letterSpacing: '0.05em',
        }}>
          AFFILIATE PROGRAM
        </div>

        <h1 style={{
          fontFamily: headingFont, fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 800, lineHeight: 1.1, color: dark,
          margin: '0 0 20px', letterSpacing: '-0.03em',
        }}>
          Your audience sends invoices.
          <br />
          <span style={{ color: green }}>Get paid when they do.</span>
        </h1>

        <p style={{ fontSize: 18, color: text2, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 32px' }}>
          Recommend Invoicor to freelancers and small business owners. Earn {COMMISSION_PERCENT}% of
          every subscription. Not once. <strong>Every single month.</strong> For as long as they stay.
        </p>

        <a href={AFFILIATE_SIGNUP_URL} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: green, color: '#fff', fontSize: 17, fontWeight: 700,
          padding: '16px 36px', borderRadius: 16, textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(16,185,129,0.25)', transition: 'transform 0.15s, box-shadow 0.15s',
        }}>
          Start Earning Today
          <span style={{ fontSize: 20 }}>&#8594;</span>
        </a>

        <p style={{ fontSize: 13, color: text3, marginTop: 16 }}>
          Free to join. Auto-approved. Takes 60 seconds.
        </p>
      </section>

      {/* ── PASSIVE INCOME STRIP ── */}
      <section style={{ padding: '0 24px 48px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {[
            { emoji: '🌙', title: 'Earn while you sleep', sub: 'Commissions run 24/7' },
            { emoji: '🔄', title: 'Paid every month', sub: 'Not a one-time payout' },
            { emoji: '📈', title: 'No earning cap', sub: 'Refer 1 or 1,000' },
            { emoji: '📱', title: 'Easy sell', sub: '3 free invoices, no card' },
          ].map((item) => (
            <div key={item.title} style={{
              background: cardBg, borderRadius: 16, padding: '20px 16px',
              textAlign: 'center', border: `1px solid ${border}`,
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.emoji}</div>
              <p style={{ fontSize: 14, fontWeight: 700, color: text1, margin: '0 0 4px' }}>{item.title}</p>
              <p style={{ fontSize: 12, color: text3, margin: 0 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE CALCULATOR ── */}
      <section style={{ padding: '0 24px 64px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{
          background: cardBg, borderRadius: 24, border: `1px solid ${border}`,
          padding: 'clamp(24px, 4vw, 48px)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 800, textAlign: 'center', margin: '0 0 8px', color: dark }}>
            See what you could earn
          </h2>
          <p style={{ fontSize: 14, color: text3, textAlign: 'center', margin: '0 0 32px' }}>
            Drag the slider. Pick a plan. Watch the numbers grow.
          </p>

          {/* Plan selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
            {PLANS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setSelectedPlan(i)}
                style={{
                  padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700,
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                  background: selectedPlan === i ? green : '#f1f5f9',
                  color: selectedPlan === i ? '#fff' : text2,
                  boxShadow: selectedPlan === i ? '0 2px 8px rgba(16,185,129,0.3)' : 'none',
                }}
              >
                {p.name} - EUR {p.price}/mo
              </button>
            ))}
          </div>

          {/* Slider */}
          <div style={{ maxWidth: 420, margin: '0 auto 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: text2 }}>Referred subscribers</label>
              <span style={{
                background: greenLight, color: '#059669', fontWeight: 700,
                fontSize: 18, padding: '4px 16px', borderRadius: 10,
                border: `1px solid ${greenBorder}`,
              }}>
                {referrals}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10000}
              value={referrals}
              onChange={(e) => setReferrals(Number(e.target.value))}
              style={{
                width: '100%', height: 8, borderRadius: 4,
                appearance: 'none' as any, cursor: 'pointer',
                background: `linear-gradient(to right, ${green} 0%, ${green} ${referrals}%, #e2e8f0 ${referrals}%, #e2e8f0 100%)`,
                outline: 'none',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: text3, marginTop: 4 }}>
              <span>1</span><span>2500</span><span>5000</span><span>7500</span><span>10000</span>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div style={{ background: '#f8fafc', borderRadius: 16, padding: 20, textAlign: 'center', border: `1px solid ${border}` }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: text3, margin: '0 0 6px' }}>Per subscriber</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: green, margin: '0 0 4px' }}>EUR {perSub}</p>
              <p style={{ fontSize: 11, color: text3, margin: 0 }}>every month</p>
            </div>
            <div style={{
              background: greenLight, borderRadius: 16, padding: 20, textAlign: 'center',
              border: `2px solid ${green}20`,
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#059669', margin: '0 0 6px' }}>Monthly income</p>
              <p style={{ fontSize: 32, fontWeight: 800, color: '#047857', margin: '0 0 4px' }}>EUR {monthly.toLocaleString()}</p>
              <p style={{ fontSize: 11, color: '#059669', margin: 0 }}>from {referrals} subscribers</p>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 16, padding: 20, textAlign: 'center', border: `1px solid ${border}` }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: text3, margin: '0 0 6px' }}>Yearly income</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: dark, margin: '0 0 4px' }}>EUR {yearly.toLocaleString()}</p>
              <p style={{ fontSize: 11, color: text3, margin: 0 }}>passive recurring</p>
            </div>
          </div>

          {/* Summary */}
          <div style={{
            background: dark, borderRadius: 14, padding: 20, textAlign: 'center',
          }}>
            <p style={{ fontSize: 14, color: '#cbd5e1', margin: 0 }}>
              That is <strong style={{ color: '#fff', fontSize: 18 }}>EUR {yearly.toLocaleString()}/year</strong> from
              just <strong style={{ color: '#34d399' }}>{referrals} subscribers</strong> on the {plan.name} plan.
              All passive. All recurring.
            </p>
          </div>

          <p style={{ fontSize: 11, color: text3, textAlign: 'center', marginTop: 12 }}>
            Commission is {COMMISSION_PERCENT}% of the subscription price excluding applicable taxes. Actual amounts may vary.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '64px 24px', background: cardBg, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 800, textAlign: 'center', color: dark, margin: '0 0 8px' }}>
            How it works
          </h2>
          <p style={{ fontSize: 16, color: text3, textAlign: 'center', margin: '0 0 48px' }}>
            Three steps. Five minutes. Start earning today.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {[
              { emoji: '✍️', title: 'Sign up free', desc: 'Create your affiliate account in 60 seconds. No approval wait. You get your unique tracking link instantly.' },
              { emoji: '📣', title: 'Share with your audience', desc: 'Blog post, YouTube video, newsletter, tweet, TikTok. Your link works everywhere. Share however you want.' },
              { emoji: '💰', title: 'Get paid monthly', desc: `When someone subscribes through your link, you earn ${COMMISSION_PERCENT}% of their plan. Every month. Automatically. While you sleep.` },
            ].map((step) => (
              <div key={step.title} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{step.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: dark, margin: '0 0 8px' }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: text2, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PROMOTE INVOICOR ── */}
      <section style={{ padding: '64px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 800, textAlign: 'center', color: dark, margin: '0 0 8px' }}>
          Why promote Invoicor
        </h2>
        <p style={{ fontSize: 16, color: text3, textAlign: 'center', margin: '0 0 48px' }}>
          Most affiliate programs pay you once and forget about you. We don't.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { emoji: '💵', title: `${COMMISSION_PERCENT}% lifetime recurring`, desc: `Every month your referral stays subscribed, you earn. A single Pro subscriber at EUR ${PLANS[1].price}/month pays you EUR ${(PLANS[1].price * COMMISSION_PERCENT / 100).toFixed(2)} every month. That is EUR ${(PLANS[1].price * COMMISSION_PERCENT / 100 * 12).toFixed(2)}/year from one referral.` },
            { emoji: '📊', title: 'Real-time dashboard', desc: 'Track clicks, signups, and earnings live. See exactly which content drives results. No guessing.' },
            { emoji: '💸', title: 'Monthly payouts', desc: 'Commissions paid on the 30th of each month via PayPal or Wise. Minimum EUR 25. No chasing invoices.' },
            { emoji: '🎯', title: 'Easy product to recommend', desc: 'Invoicor has a free tier. 3 free invoices, no card needed. Your audience tries it risk-free. You earn when they upgrade.' },
            { emoji: '🌍', title: '100M+ freelancers worldwide', desc: 'Every freelancer, contractor, and small business owner sends invoices. The audience is massive and growing every year.' },
          ].map((reason) => (
            <div key={reason.title} style={{
              background: cardBg, borderRadius: 16, padding: 24,
              border: `1px solid ${border}`, transition: 'box-shadow 0.2s',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{reason.emoji}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: dark, margin: '0 0 8px' }}>{reason.title}</h3>
              <p style={{ fontSize: 13, color: text2, lineHeight: 1.6, margin: 0 }}>{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PERFECT FOR ── */}
      <section style={{ padding: '64px 24px', background: cardBg, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 800, color: dark, margin: '0 0 8px' }}>
            Perfect for
          </h2>
          <p style={{ fontSize: 16, color: text3, margin: '0 0 32px' }}>
            If your audience includes anyone who sends invoices, Invoicor is a natural fit.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {[
              'Freelance YouTubers', 'Business bloggers', 'Side hustle creators',
              'Bookkeeping TikTokers', 'Self-employed coaches', 'Small business podcasters',
              'Finance content creators', 'Contractor community leaders', 'Digital nomad influencers',
              'Web designers', 'VA agencies', 'Accountants',
            ].map((tag) => (
              <span key={tag} style={{
                background: '#f1f5f9', color: text2, fontSize: 13, fontWeight: 600,
                padding: '8px 16px', borderRadius: 100, border: `1px solid ${border}`,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '64px 24px', maxWidth: 680, margin: '0 auto' }}>
        <h2 style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 800, textAlign: 'center', color: dark, margin: '0 0 40px' }}>
          Common questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            {
              q: 'What does recurring commission mean?',
              a: `You get paid every single month your referral stays subscribed. Refer one Pro user (EUR ${PLANS[1].price}/mo) and earn EUR ${(PLANS[1].price * COMMISSION_PERCENT / 100).toFixed(2)} every month. After 12 months, that one referral earned you EUR ${(PLANS[1].price * COMMISSION_PERCENT / 100 * 12).toFixed(2)}. It keeps going as long as they stay.`,
            },
            {
              q: 'How is commission calculated?',
              a: `You earn ${COMMISSION_PERCENT}% of the App Store subscription price excluding applicable taxes. Apple processes the payment, we track the attribution, and you get paid monthly.`,
            },
            {
              q: 'How and when do I get paid?',
              a: 'Commissions are paid on the 30th of each month via PayPal or Wise. Minimum payout is EUR 25. Balances below the threshold roll over.',
            },
            {
              q: 'What if someone cancels or refunds?',
              a: 'If a subscriber cancels, your recurring commission stops from that point. Refunds reverse the commission for that period. You only earn on active, paying subscribers.',
            },
            {
              q: 'Can I run paid ads?',
              a: 'Yes. Any channel works. The only rule is no bidding on "Invoicor" as a keyword in search ads (Google, Bing, Apple Search Ads).',
            },
          ].map((faq) => (
            <div key={faq.q} style={{
              background: cardBg, borderRadius: 16, padding: 24,
              border: `1px solid ${border}`,
            }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: dark, margin: '0 0 10px' }}>{faq.q}</h4>
              <p style={{ fontSize: 14, color: text2, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: 'clamp(64px, 8vw, 96px) 24px', background: dark,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 600, height: 300, background: 'rgba(16,185,129,0.08)',
          borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: headingFont, fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}>
            Your audience invoices every week.
            <br />
            <span style={{ color: '#34d399' }}>You should earn from it.</span>
          </h2>

          <p style={{ fontSize: 17, color: '#94a3b8', margin: '0 0 36px', lineHeight: 1.6 }}>
            Join the Invoicor affiliate program. {COMMISSION_PERCENT}% recurring, no cap, no expiry. Start today.
          </p>

          <a href={AFFILIATE_SIGNUP_URL} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: `linear-gradient(135deg, ${green}, #0d9488)`,
            color: '#fff', fontSize: 18, fontWeight: 700,
            padding: '18px 40px', borderRadius: 16, textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
            transition: 'transform 0.15s',
          }}>
            Start Earning Today
            <span style={{ fontSize: 22 }}>&#8594;</span>
          </a>

          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: 16, marginTop: 24,
          }}>
            {[
              `Free to join`,
              `Auto-approved`,
              `${COMMISSION_PERCENT}% recurring`,
            ].map((item) => (
              <span key={item} style={{ fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: green }}>&#10003;</span> {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}