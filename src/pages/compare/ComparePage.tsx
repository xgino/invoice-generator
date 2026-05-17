import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowRight,
  XCircle,
  TrendingUp,
  CheckCircle,
  HelpCircle,
  X,
  Check,
  UserCheck,
  Link as LinkIcon
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import comparisonsData from '../../data/comparisons.json';

const API_URL = import.meta.env.VITE_API_URL || 'https://invoicor.com';

function has(v: any): boolean {
  return v !== null && v !== undefined && v !== '';
}

export const ComparePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const d = (comparisonsData as any[]).find(c => c.slug === slug);

  // Active section state for TOC highlighting (must be declared before any early return)
  const [activeSection, setActiveSection] = useState<string>('');

  // Build TOC sections list — only includes sections that have content
  // (must be declared before useEffect, and computed safely even if d is missing)
  const tocSections = d ? [
    { id: 'pain-points', label: `Why ${d.competitor} slows you down`, show: has(d.mistake_1_title) },
    { id: 'features', label: 'Feature comparison', show: has(d.feature_compare_1_name) },
    { id: 'audience', label: 'Who it\'s for', show: has(d.target_audience_title) },
    { id: 'philosophy', label: 'The Invoicor approach', show: has(d.policy_h2) },
    { id: 'pricing', label: 'Pricing comparison', show: has(d.pricing_us) },
    { id: 'steps', label: 'How switching works', show: has(d.step_1_title) },
    { id: 'faqs', label: 'FAQs', show: d.faqs && d.faqs.length > 0 },
  ].filter(s => s.show) : [];

  // IntersectionObserver to track which section is currently in view
  useEffect(() => {
    if (tocSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section closest to the top of the viewport that's still visible
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        // Trigger when section is in the top 40% of viewport
        rootMargin: '-10% 0px -50% 0px',
        threshold: 0,
      }
    );

    tocSections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocSections.length, slug]);

  if (!d) return <div className="py-32 text-center text-2xl font-bold">Comparison Not Found</div>;

  // SEO Schema Injection
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${API_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Compare", "item": `${API_URL}/compare` },
      { "@type": "ListItem", "position": 3, "name": `Invoicor vs ${d.competitor}` }
    ]
  };

  const faqSchema = d.faqs && d.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": d.faqs.map((f: any) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  } : null;

  // Helper: copy anchor link to clipboard
  const copyAnchor = (anchorId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    navigator.clipboard?.writeText(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <SEO title={d.title} description={d.meta_description} canonical={d.canonical} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* ── STICKY DESKTOP TOC (hidden on mobile/tablet) ── */}
      {tocSections.length > 0 && (
        <aside
          className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-30 w-56"
          aria-label="Page sections"
        >
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              On this page
            </div>
            <nav className="flex flex-col gap-1">
              {tocSections.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`text-sm font-medium leading-snug py-1.5 px-2 rounded-lg transition-colors ${
                    activeSection === s.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}

      <main>
        {/* ── BREADCRUMBS ── */}
        <nav className="max-w-6xl mx-auto px-6 pt-28 pb-4 text-sm font-medium text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> <ChevronRight className="w-4 h-4 opacity-50" />
          <Link to="/compare" className="hover:text-blue-600 transition-colors">Compare</Link> <ChevronRight className="w-4 h-4 opacity-50" />
          <span className="text-slate-900 font-semibold">vs {d.competitor}</span>
        </nav>

        {/* ── HERO ── */}
        <section className="py-16 text-center max-w-4xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
            {d.badge_text || "Software Comparison"}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">{d.h1}</h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 leading-relaxed">{d.subtitle}</p>
          <a href={`${API_URL}/register`} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </a>
        </section>

        {/* ── PAIN POINTS ── */}
        {has(d.mistake_1_title) && (
          <section id="pain-points" className="py-20 bg-white border-y border-slate-200 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold text-center mb-12">Why {d.competitor} slows you down.</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map(num => has(d[`mistake_${num}_title`]) && (
                  <div key={num} className="bg-rose-50/50 border border-rose-100 p-8 rounded-3xl">
                    <XCircle className="w-10 h-10 text-rose-500 mb-6" />
                    <h3 className="text-xl font-bold mb-3">{d[`mistake_${num}_title`]}</h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">{d[`mistake_${num}_text`]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SIDE-BY-SIDE FEATURE MATRIX ── */}
        {has(d.feature_compare_1_name) && (
          <section id="features" className="py-24 bg-slate-50 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Invoicor vs {d.competitor} Features</h2>
                <p className="text-slate-500 font-medium text-lg">A clear breakdown of what you actually get.</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200 p-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                  <div>Feature</div>
                  <div className="text-center text-blue-600">Invoicor</div>
                  <div className="text-center">{d.competitor}</div>
                </div>
                <div className="divide-y divide-slate-100">
                  {[1, 2, 3, 4, 5].map(num => {
                    const featureName = d[`feature_compare_${num}_name`];
                    const hasUs = d[`feature_compare_${num}_us`];
                    const hasThem = d[`feature_compare_${num}_them`];
                    if (!has(featureName)) return null;
                    return (
                      <div key={num} className="grid grid-cols-3 p-6 items-center hover:bg-slate-50 transition-colors">
                        <div className="font-semibold text-slate-900">{featureName}</div>
                        <div className="flex justify-center">
                          {hasUs ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <X className="w-6 h-6 text-slate-300" />}
                        </div>
                        <div className="flex justify-center">
                          {hasThem ? <Check className="w-6 h-6 text-slate-800" /> : <X className="w-6 h-6 text-rose-400" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── AUDIENCE SPLIT SECTION ── */}
        {has(d.target_audience_title) && (
          <section id="audience" className="py-20 bg-white border-b border-slate-200 scroll-mt-24">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold text-center mb-12 text-slate-900">{d.target_audience_title}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-4 text-blue-700 font-bold text-lg">
                    <UserCheck className="w-6 h-6" /> Ideal for Invoicor
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">{d.target_audience_us}</p>
                </div>
                <div className="p-8 bg-slate-100/70 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-4 text-slate-700 font-bold text-lg">
                    <UserCheck className="w-6 h-6" /> Better Fit for {d.competitor}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">{d.target_audience_them}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── PHILOSOPHY & METRICS ── */}
        {has(d.policy_h2) && (
          <section id="philosophy" className="py-24 bg-slate-950 text-white scroll-mt-24">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-extrabold mb-6">{d.policy_h2}</h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">{d.policy_text}</p>
                <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">{d.solution_h2}</h3>
                  <p className="text-blue-200/80 leading-relaxed text-lg">{d.solution_text}</p>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><TrendingUp className="text-emerald-400"/> Invoicor Impact</h3>
                {[1, 2].map(num => has(d[`stat_${num}_value`]) && (
                  <div key={num} className="border-b border-slate-800 pb-8 mb-8 last:border-0 last:pb-0">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-emerald-400 mb-3">{d[`stat_${num}_value`]}</div>
                    <p className="text-slate-400 font-medium text-lg">{d[`stat_${num}_desc`]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── PRICING COMPARISON ── */}
        {has(d.pricing_us) && (
          <section id="pricing" className="py-24 bg-white border-b border-slate-200 text-center scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-12">Honest Pricing Comparison</h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 w-full md:w-1/2">
                  <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wider mb-4">{d.competitor}</h3>
                  <div className="text-4xl font-bold text-slate-400 line-through mb-4">{d.pricing_them}</div>
                  <p className="text-slate-500 text-[15px] leading-relaxed">{d.pricing_them_subtext}</p>
                </div>
                <div className="bg-blue-600 p-8 rounded-3xl border border-blue-700 shadow-2xl w-full md:w-1/2 transform md:scale-105">
                  <h3 className="text-lg font-bold text-blue-200 uppercase tracking-wider mb-4">Invoicor</h3>
                  <div className="text-5xl font-black text-white mb-4">{d.pricing_us}</div>
                  <p className="text-blue-100 text-[15px] leading-relaxed">{d.pricing_us_subtext}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── HOW IT WORKS STEPS ── */}
        {has(d.step_1_title) && (
          <section id="steps" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold text-center mb-16">Switching is Easy</h2>
              <div className="grid md:grid-cols-3 gap-8 relative">
                {[1, 2, 3].map(num => has(d[`step_${num}_title`]) && (
                  <div key={num} className="bg-white p-8 rounded-2xl border border-slate-200 relative shadow-sm">
                    <span className="absolute -top-6 left-6 w-12 h-12 rounded-xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                      {num}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-3 text-slate-900">{d[`step_${num}_title`]}</h3>
                    <p className="text-slate-600 text-[15px] leading-relaxed">{d[`step_${num}_text`]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQs ── */}
        {d.faqs && d.faqs.length > 0 && (
          <section id="faqs" className="py-24 bg-slate-50 border-b border-slate-200 scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
              <div className="flex items-center justify-center gap-3 mb-8">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-extrabold text-slate-900 text-center">Switching from {d.competitor}</h2>
              </div>
              <div className="space-y-6">
                {d.faqs.map((faq: any, i: number) => {
                  const anchorId = `faq-${d.slug}-${i + 1}`;
                  return (
                    <div
                      key={i}
                      id={anchorId}
                      className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm scroll-mt-24 group"
                    >
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                        <span className="text-blue-600 font-mono text-xl flex-shrink-0">Q.</span>
                        <span className="flex-1">{faq.question}</span>
                        <button
                          onClick={() => copyAnchor(anchorId)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-600 flex-shrink-0"
                          aria-label="Copy link to this question"
                          title="Copy link to this question"
                        >
                          <LinkIcon className="w-4 h-4" />
                        </button>
                      </h3>
                      <div className="text-slate-600 font-medium leading-relaxed text-[15px] pl-7 border-l-2 border-slate-100">
                        {faq.answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── INTERNAL LINKING WEB ── */}
        {d.related_comparisons && d.related_comparisons.length > 0 && (
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 text-center md:text-left">
                Compare More Invoicing Software
              </h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/compare" className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors shadow-sm">
                  All Comparisons
                </Link>
                {d.related_comparisons.map((rc: any, i: number) => (
                  <Link key={i} to={`/compare/${rc.slug}`} className="px-5 py-2.5 bg-white border border-slate-200 hover:border-blue-400 text-blue-600 hover:text-blue-700 font-semibold rounded-xl text-sm transition-all shadow-sm">
                    Invoicor vs {rc.name} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};