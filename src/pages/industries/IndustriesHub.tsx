import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';
import { SEO } from '../../components/SEO';
import industriesData from '../../data/industries.json';

export const IndustriesHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <SEO 
        title="Invoicing Software by Industry | Invoicor" 
        description="Whether you are a plumber, freelance designer, or consultant, see how Invoicor's mobile app speeds up your billing process." 
      />

      <main className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto pt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-6 shadow-sm">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Built for how you work.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Every profession bills differently. Find out how Invoicor solves the specific invoicing and cash flow headaches in your industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(industriesData || []).map((item: any, i: number) => (
            <Link 
              key={i} 
              to={`/industries/${item.slug}`} 
              className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">
                  {item.badge_text || "Industry Solution"}
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {item.industry}
                </h2>
                <p className="text-slate-600 font-medium mb-8 line-clamp-3 flex-grow">
                  {item.subtitle}
                </p>
                
                <div className="flex items-center text-slate-900 font-bold text-sm group-hover:text-emerald-600 transition-colors mt-auto">
                  View workflow <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
};