import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import comparisonsData from '../../data/comparisons.json';

export const CompareHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <SEO 
        title="Compare Invoicing Software Alternatives | Invoicor" 
        description="See how Invoicor stacks up against QuickBooks, FreshBooks, and Invoice2go. Find the best invoicing app for your small business." 
      />

      <main className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto pt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6 shadow-sm">
            <ArrowLeftRight className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Find your perfect alternative.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Stop paying for bloated accounting software. See how Invoicor compares to the biggest names in the industry and why freelancers are making the switch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(comparisonsData || []).map((item: any, i: number) => (
            <Link 
              key={i} 
              to={`/compare/${item.slug}`} 
              className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
                  {item.badge_text || "Comparison"}
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Invoicor vs {item.competitor}
                </h2>
                <p className="text-slate-600 font-medium mb-8 line-clamp-3 flex-grow">
                  {item.subtitle}
                </p>
                
                <div className="flex items-center text-blue-600 font-bold text-sm group-hover:text-blue-700 transition-colors mt-auto">
                  Read the breakdown <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
};