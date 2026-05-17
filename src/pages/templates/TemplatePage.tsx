import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowRight,
  FileText,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  FileSpreadsheet,
  FileIcon,
  Smartphone,
  XCircle,
  Info,
  PlayCircle,
  Link as LinkIcon
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import templatesData from '../../data/templates.json';

const API_URL = import.meta.env.VITE_API_URL || 'https://invoicor.com';

function has(v: any): boolean {
  return v !== null && v !== undefined && v !== '';
}

export const TemplatePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const d = (templatesData as any[]).find(t => t.slug === slug);

  const [activeSection, setActiveSection] = useState<string>('');

  const tocSections = d ? [
    { id: 'what-to-include', label: 'What to include', show: has(d.what_to_include_intro) },
    { id: 'sample', label: 'Sample breakdown', show: Array.isArray(d.sample_breakdown_rows) && d.sample_breakdown_rows.length > 0 },
    { id: 'notes', label: 'Industry notes', show: Array.isArray(d.industry_notes) && d.industry_notes.length > 0 },
    { id: 'mistakes', label: 'Mistakes to avoid', show: Array.isArray(d.mistakes) && d.mistakes.length > 0 },
    { id: 'formats', label: 'File formats', show: has(d.format_pdf_desc) || has(d.format_word_desc) || has(d.format_excel_desc) },
    { id: 'tip', label: 'Pro tip', show: has(d.pro_tip) },
    { id: 'faqs', label: 'FAQs', show: d.faqs && d.faqs.length > 0 },
  ].filter(s => s.show) : [];

  useEffect(() => {
    if (tocSections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -50% 0px', threshold: 0 }
    );
    tocSections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocSections.length, slug]);

  if (!d) return <div className="py-32 text-center text-2xl font-bold">Template Not Found</div>;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${API_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Invoice Templates", "item": `${API_URL}/templates` },
      { "@type": "ListItem", "position": 3, "name": `${d.niche} Invoice Template` }
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

  // HowTo schema for the "what to include" section — great for rich snippets on template queries
  const howToSchema = has(d.req_1_title) ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `What to include on a ${d.niche.toLowerCase()} invoice`,
    "description": d.what_to_include_intro,
    "step": [1, 2, 3, 4, 5, 6]
      .filter(n => has(d[`req_${n}_title`]))
      .map((n, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": d[`req_${n}_title`],
        "text": d[`req_${n}_text`]
      }))
  } : null;

  const copyAnchor = (anchorId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    navigator.clipboard?.writeText(url);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      <SEO title={d.title} description={d.meta_description} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}

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
          <Link to="/templates" className="hover:text-blue-600 transition-colors">Templates</Link> <ChevronRight className="w-4 h-4 opacity-50" />
          <span className="text-slate-900 font-bold">{d.niche}</span>
        </nav>

        {/* ── HERO ── */}
        <section className="py-12 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center border-b border-slate-100 pb-20">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-100">
              <FileText className="w-4 h-4" /> Free Template & Guide
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              {d.h1}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 leading-relaxed">
              {d.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`${API_URL}/register`} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
                <Smartphone className="w-5 h-5" /> Create yours in the app
              </a>
              <a href="#what-to-include" className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-6 py-4 rounded-xl transition-colors">
                Read the guide <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4 font-medium">Full guide below. Use the app to skip building from scratch.</p>
          </div>

          {/* Visual Invoice Preview Mockup */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-2xl relative">
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-md text-xs font-bold text-slate-400 shadow-sm">PREVIEW</div>
            <div className="bg-white rounded-xl h-[500px] border border-slate-200 p-8 shadow-sm flex flex-col">
              <div className="flex justify-between border-b border-slate-100 pb-6 mb-6">
                <div className="w-16 h-16 bg-slate-100 rounded-lg"></div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-200">INVOICE</div>
                  <div className="text-sm text-slate-400 font-mono">#INV-001</div>
                </div>
              </div>
              <div className="space-y-3 flex-grow">
                <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2 mt-8"></div>
              </div>
              <div className="border-t border-slate-100 pt-6 flex justify-between items-center">
                <div className="h-8 bg-blue-50 rounded w-1/3"></div>
                <div className="h-6 bg-slate-100 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTRO PARAGRAPH ── */}
        {has(d.intro_paragraph) && (
          <section className="py-20 bg-slate-50 border-b border-slate-200">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-lg leading-relaxed text-slate-700 font-medium">{d.intro_paragraph}</p>
            </div>
          </section>
        )}

        {/* ── WHAT TO INCLUDE ── */}
        {has(d.what_to_include_intro) && (
          <section id="what-to-include" className="py-24 bg-white scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
                What to include on a {d.niche.toLowerCase()} invoice
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-12">{d.what_to_include_intro}</p>

              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[1, 2, 3, 4, 5, 6].map(num => has(d[`req_${num}_title`]) && (
                  <div key={num} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{d[`req_${num}_title`]}</span>
                    </h3>
                    <p className="text-[15px] text-slate-600 leading-relaxed pl-7">{d[`req_${num}_text`]}</p>
                  </div>
                ))}
              </div>

              {has(d.what_to_include_outro) && (
                <p className="text-lg text-slate-600 leading-relaxed">{d.what_to_include_outro}</p>
              )}
            </div>
          </section>
        )}

        {/* ── SAMPLE INVOICE BREAKDOWN ── */}
        {Array.isArray(d.sample_breakdown_rows) && d.sample_breakdown_rows.length > 0 && (
          <section id="sample" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-4 text-blue-600">
                <PlayCircle className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Sample</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                {d.sample_breakdown_title || `Sample ${d.niche.toLowerCase()} invoice breakdown`}
              </h2>
              {has(d.sample_breakdown_intro) && (
                <p className="text-slate-600 leading-relaxed mb-10 text-lg">{d.sample_breakdown_intro}</p>
              )}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-12 gap-4 bg-slate-100 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Rate</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>
                {/* Line rows */}
                <div className="divide-y divide-slate-100">
                  {d.sample_breakdown_rows.map((r: any, i: number) => (
                    <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 text-[15px]">
                      <div className="col-span-6 text-slate-900 font-medium">{r.description}</div>
                      <div className="col-span-2 text-center text-slate-600">{r.qty}</div>
                      <div className="col-span-2 text-right text-slate-600 font-mono">{r.rate}</div>
                      <div className="col-span-2 text-right text-slate-900 font-mono font-bold">{r.amount}</div>
                    </div>
                  ))}
                </div>
                {/* Totals */}
                <div className="bg-slate-50 px-6 py-5 space-y-2">
                  {has(d.sample_breakdown_subtotal) && (
                    <div className="flex justify-between text-[15px]">
                      <span className="text-slate-600 font-medium">Subtotal</span>
                      <span className="text-slate-900 font-mono font-bold">{d.sample_breakdown_subtotal}</span>
                    </div>
                  )}
                  {has(d.sample_breakdown_deposit) && (
                    <div className="flex justify-between text-[15px]">
                      <span className="text-slate-600 font-medium">{d.sample_breakdown_deposit_label || 'Deposit paid'}</span>
                      <span className="text-emerald-600 font-mono font-bold">{d.sample_breakdown_deposit}</span>
                    </div>
                  )}
                  {has(d.sample_breakdown_tax) && (
                    <div className="flex justify-between text-[15px]">
                      <span className="text-slate-600 font-medium">{d.sample_breakdown_tax_label || 'Sales tax'}</span>
                      <span className="text-slate-900 font-mono font-bold">{d.sample_breakdown_tax}</span>
                    </div>
                  )}
                  {has(d.sample_breakdown_balance) && (
                    <div className="flex justify-between pt-3 border-t border-slate-200 text-lg">
                      <span className="text-slate-900 font-bold">Balance due</span>
                      <span className="text-blue-600 font-mono font-black">{d.sample_breakdown_balance}</span>
                    </div>
                  )}
                </div>
              </div>

              {has(d.sample_breakdown_notes) && (
                <p className="text-sm text-slate-500 italic mt-6 leading-relaxed">
                  <strong className="not-italic text-slate-700">Invoice notes:</strong> {d.sample_breakdown_notes}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── INDUSTRY-SPECIFIC NOTES ── */}
        {Array.isArray(d.industry_notes) && d.industry_notes.length > 0 && (
          <section id="notes" className="py-24 bg-white border-b border-slate-200 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-4 text-slate-500">
                <Info className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Important Notes</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-10">
                {d.industry_notes_title || `${d.niche}-specific billing notes`}
              </h2>

              <div className="space-y-6">
                {d.industry_notes.map((n: any, i: number) => (
                  <div key={i} className="bg-slate-50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{n.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">{n.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 italic mt-8">
                This is general information, not tax or legal advice. Confirm specifics with a licensed accountant or attorney in your jurisdiction.
              </p>
            </div>
          </section>
        )}

        {/* ── MISTAKES TO AVOID ── */}
        {Array.isArray(d.mistakes) && d.mistakes.length > 0 && (
          <section id="mistakes" className="py-24 bg-rose-50/30 border-b border-rose-100 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">
                {d.mistakes_title || `Common mistakes to avoid`}
              </h2>
              <div className="space-y-6">
                {d.mistakes.map((m: any, i: number) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-start gap-3">
                      <XCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{m.title}</span>
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-[15px] pl-9">{m.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FILE FORMATS ── */}
        {(has(d.format_pdf_desc) || has(d.format_word_desc) || has(d.format_excel_desc)) && (
          <section id="formats" className="py-24 bg-white border-b border-slate-200 scroll-mt-24">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold text-center mb-4 text-slate-900">
                {d.when_to_use_each_format_title || 'Which file format should I use?'}
              </h2>
              <p className="text-slate-500 text-center mb-12 text-lg">Pick the right format for your situation.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {has(d.format_pdf_desc) && (
                  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <FileText className="w-10 h-10 text-rose-500 mb-4" />
                    <h3 className="font-bold text-lg mb-3">Adobe PDF</h3>
                    <p className="text-[15px] text-slate-600 leading-relaxed">{d.format_pdf_desc}</p>
                  </div>
                )}
                {has(d.format_word_desc) && (
                  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <FileIcon className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="font-bold text-lg mb-3">Microsoft Word</h3>
                    <p className="text-[15px] text-slate-600 leading-relaxed">{d.format_word_desc}</p>
                  </div>
                )}
                {has(d.format_excel_desc) && (
                  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <FileSpreadsheet className="w-10 h-10 text-emerald-600 mb-4" />
                    <h3 className="font-bold text-lg mb-3">Microsoft Excel</h3>
                    <p className="text-[15px] text-slate-600 leading-relaxed">{d.format_excel_desc}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── PRO TIP ── */}
        {has(d.pro_tip) && (
          <section id="tip" className="py-20 bg-amber-50/50 border-b border-amber-100 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white border border-amber-200 p-10 rounded-3xl shadow-sm">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">{d.niche} Pro Tip</div>
                    <p className="text-slate-700 leading-relaxed text-[16px]">{d.pro_tip}</p>
                  </div>
                </div>
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
                <h2 className="text-3xl font-extrabold text-slate-900 text-center">{d.niche} Invoicing FAQs</h2>
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

        {/* ── SOFT APP CTA (much lighter than before) ── */}
        <section className="py-20 bg-blue-600 text-center text-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Skip the manual work.</h2>
            <p className="text-blue-100 text-lg mb-8 font-medium">
              Create {d.niche.toLowerCase()} invoices in 60 seconds with Invoicor — no formatting, no formulas, no PDF re-exports. Send via text and get paid by Apple Pay on the spot.
            </p>
            <a href={`${API_URL}/register`} className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
              Try Invoicor Free <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-xs text-blue-200 mt-4">No credit card required for the free tier.</p>
          </div>
        </section>

        {/* ── INTERNAL LINKING ── */}
        {d.related && d.related.length > 0 && (
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 text-center md:text-left">
                More invoice templates
              </h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/templates" className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">
                  All Templates
                </Link>
                {d.related.map((rc: any, i: number) => (
                  <Link key={i} to={`/templates/${rc.slug}`} className="px-5 py-2.5 bg-white border border-slate-200 hover:border-blue-400 text-blue-600 font-semibold rounded-xl text-sm transition-all shadow-sm">
                    {rc.name} Invoice &rarr;
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