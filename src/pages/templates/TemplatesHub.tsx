import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { SEO } from '../../components/SEO';
import templatesData from '../../data/templates.json';

export const TemplatesHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <SEO 
        title="Free Invoice Templates (PDF, Word, Excel) | Invoicor" 
        description="Download professional, industry-specific PDF invoice templates, or send them instantly with the Invoicor app." 
      />

      <main className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto pt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-6 shadow-sm">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Free Invoice Templates
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Download professional, industry-specific PDF templates, or use our mobile app to automate your billing and accept credit cards instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(templatesData || []).map((item: any, i: number) => (
            <Link 
              key={i} 
              to={`/templates/${item.slug}`}
              className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
                  Free Download
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {item.niche} Invoice
                </h2>
                <p className="text-slate-600 font-medium mb-8 line-clamp-3 flex-grow">
                  {item.subtitle || `Download the free ${item.niche} invoice template.`}
                </p>
                
                <div className="flex items-center text-slate-900 font-bold text-sm group-hover:text-indigo-600 transition-colors mt-auto">
                  View Template <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
};