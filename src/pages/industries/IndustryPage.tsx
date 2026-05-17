import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowRight,
  XCircle,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Receipt,
  TrendingUp,
  Scale,
  PlayCircle,
  Link as LinkIcon
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import industriesData from '../../data/industries.json';

const API_URL = import.meta.env.VITE_API_URL || 'https://invoicor.com';

function has(v: any): boolean {
  return v !== null && v !== undefined && v !== '';
}

export const IndustryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const d = (industriesData as any[]).find(c => c.slug === slug);

  const [activeSection, setActiveSection] = useState<string>('');

  // Build TOC sections list — only sections with content
  const tocSections = d ? [
    { id: 'stats', label: 'Industry snapshot', show: Array.isArray(d.industry_stats) && d.industry_stats.length > 0 },
    { id: 'mistakes', label: 'Billing mistakes', show: has(d.industry_mistake_1_title) },
    { id: 'features', label: 'Key features', show: has(d.feature_1_title) },
    { id: 'scenario', label: 'Real scenario', show: has(d.real_scenario_text) },
    { id: 'tip', label: 'Pro tip', show: has(d.expert_tip_text) },
    { id: 'line-items', label: 'Common line items', show: Array.isArray(d.common_line_items) && d.common_line_items.length > 0 },
    { id: 'glossary', label: 'Glossary', show: Array.isArray(d.industry_glossary) && d.industry_glossary.length > 0 },
    { id: 'tax', label: 'Tax & compliance', show: has(d.tax_or_compliance_text) },
    { id: 'faqs', label: 'FAQs', show: d.faqs && d.faqs.length > 0 },
  ].filter(s => s.show) : [];

  useEffect(() => {
    if (tocSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
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

  if (!d) return <div className="py-32 text-center text-2xl font-bold">Industry Not Found</div>;

  // SEO Schema Injection
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${API_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Industries", "item": `${API_URL}/industries` },
      { "@type": "ListItem", "position": 3, "name": d.industry }
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

  // DefinedTerm schema for the glossary — helps Google understand the entity definitions
  const glossarySchema = Array.isArray(d.industry_glossary) && d.industry_glossary.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": d.industry_glossary_title || `${d.industry} billing terms`,
    "hasDefinedTerm": d.industry_glossary.map((g: any) => ({
      "@type": "DefinedTerm",
      "name": g.term,
      "description": g.definition
    }))
  } : null;

  const copyAnchor = (anchorId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    navigator.clipboard?.writeText(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <SEO title={d.title} description={d.meta_description} canonical={d.canonical || `${API_URL}/industries/${d.slug}`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {glossarySchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }} />}

      {/* ── STICKY DESKTOP TOC ── */}
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
          <Link to="/industries" className="hover:text-blue-600 transition-colors">Industries</Link> <ChevronRight className="w-4 h-4 opacity-50" />
          <span className="text-slate-900 font-semibold">{d.industry}</span>
        </nav>

        {/* ── HERO ── */}
        <section className="py-16 text-center max-w-4xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
            {d.badge_text || "Industry Invoicing"}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">{d.h1}</h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 leading-relaxed">{d.subtitle}</p>
          <a href={`${API_URL}/register`} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </a>
        </section>

        {/* ── INDUSTRY STATS ── */}
        {Array.isArray(d.industry_stats) && d.industry_stats.length > 0 && (
          <section id="stats" className="py-16 bg-white border-y border-slate-200 scroll-mt-24">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-6">
                {d.industry_stats.map((s: any, i: number) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">{s.label}</div>
                    <div className="text-2xl md:text-3xl font-extrabold text-slate-900">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── INDUSTRY MISTAKES ── */}
        {has(d.industry_mistake_1_title) && (
          <section id="mistakes" className="py-20 bg-white border-b border-slate-200 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold text-center mb-12">
                {d.industry_mistakes_title || `Billing mistakes that cost ${d.industry} money`}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map(num => has(d[`industry_mistake_${num}_title`]) && (
                  <div key={num} className="bg-rose-50/50 border border-rose-100 p-8 rounded-3xl">
                    <XCircle className="w-10 h-10 text-rose-500 mb-6" />
                    <h3 className="text-xl font-bold mb-3">{d[`industry_mistake_${num}_title`]}</h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">{d[`industry_mistake_${num}_text`]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FEATURES ── */}
        {has(d.feature_1_title) && (
          <section id="features" className="py-24 bg-slate-50 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Built for how {d.industry.toLowerCase()} actually bill</h2>
                <p className="text-slate-500 font-medium text-lg">Every feature is designed around the realities of your day.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map(num => has(d[`feature_${num}_title`]) && (
                  <div key={num} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 font-black text-xl">
                      {num}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{d[`feature_${num}_title`]}</h3>
                    <p className="text-slate-600 text-[15px] leading-relaxed">{d[`feature_${num}_text`]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── REAL SCENARIO ── */}
        {has(d.real_scenario_text) && (
          <section id="scenario" className="py-24 bg-white border-y border-slate-200 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-6 text-blue-600">
                <PlayCircle className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Walkthrough</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                {d.real_scenario_title || `A real billing scenario`}
              </h2>
              <div className="bg-slate-50 border-l-4 border-blue-600 p-8 rounded-r-2xl">
                <p className="text-slate-700 leading-relaxed text-[17px]">{d.real_scenario_text}</p>
              </div>
            </div>
          </section>
        )}

        {/* ── EXPERT TIP ── */}
        {has(d.expert_tip_text) && (
          <section id="tip" className="py-20 bg-amber-50/50 border-b border-amber-100 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white border border-amber-200 p-10 rounded-3xl shadow-sm">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">Pro Tip</div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{d.expert_tip_title}</h2>
                    <p className="text-slate-700 leading-relaxed text-[16px]">{d.expert_tip_text}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── COMMON LINE ITEMS ── */}
        {Array.isArray(d.common_line_items) && d.common_line_items.length > 0 && (
          <section id="line-items" className="py-24 bg-slate-50 border-b border-slate-200 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-6 text-slate-500">
                <Receipt className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Reference</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Common {d.industry.toLowerCase()} line items</h2>
              <p className="text-slate-500 font-medium mb-10">Save these as reusable items in your Invoicor library for one-tap invoicing.</p>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {d.common_line_items.map((item: any, i: number) => (
                    <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
                        <p className="text-slate-500 text-[15px] leading-relaxed">{item.desc}</p>
                      </div>
                      <span className="flex-shrink-0 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── GLOSSARY ── */}
        {Array.isArray(d.industry_glossary) && d.industry_glossary.length > 0 && (
          <section id="glossary" className="py-24 bg-white border-b border-slate-200 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-6 text-slate-500">
                <BookOpen className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Glossary</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-10">
                {d.industry_glossary_title || `${d.industry} billing terms`}
              </h2>

              <dl className="space-y-6">
                {d.industry_glossary.map((g: any, i: number) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <dt className="font-bold text-slate-900 text-lg mb-2">{g.term}</dt>
                    <dd className="text-slate-600 leading-relaxed text-[15px]">{g.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* ── TAX / COMPLIANCE ── */}
        {has(d.tax_or_compliance_text) && (
          <section id="tax" className="py-24 bg-slate-950 text-white scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-6 text-emerald-400">
                <Scale className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Tax & Compliance</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-6">
                {d.tax_or_compliance_title || `Tax considerations for ${d.industry.toLowerCase()}`}
              </h2>
              <p className="text-slate-300 leading-relaxed text-[17px]">{d.tax_or_compliance_text}</p>
              <p className="text-slate-500 leading-relaxed text-sm mt-6 italic">
                This is general information, not tax advice. Confirm specifics with a licensed accountant in your jurisdiction.
              </p>
            </div>
          </section>
        )}

        {/* ── FAQs ── */}
        {d.faqs && d.faqs.length > 0 && (
          <section id="faqs" className="py-24 bg-slate-50 border-b border-slate-200 scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
              <div className="flex items-center justify-center gap-3 mb-8">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-extrabold text-slate-900 text-center">Questions from {d.industry.toLowerCase()}</h2>
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

        {/* ── CLOSING CTA ── */}
        <section className="py-20 bg-blue-600 text-center text-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Built for {d.industry.toLowerCase()}. Try it free.</h2>
            <p className="text-blue-100 text-lg mb-8 font-medium">No credit card required. Send your first invoice in 60 seconds.</p>
            <a href={`${API_URL}/register`} className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* ── INTERNAL LINKING ── */}
        {d.related && d.related.length > 0 && (
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 text-center md:text-left">
                More industries we support
              </h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/industries" className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors shadow-sm">
                  All Industries
                </Link>
                {d.related.map((r: any, i: number) => (
                  <Link key={i} to={`/industries/${r.slug}`} className="px-5 py-2.5 bg-white border border-slate-200 hover:border-blue-400 text-blue-600 hover:text-blue-700 font-semibold rounded-xl text-sm transition-all shadow-sm">
                    Invoicing for {r.name} &rarr;
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