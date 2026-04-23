import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/icon.png';

// You can edit this URL to point to your actual App Store page
export const APP_STORE_URL = "https://apps.apple.com/us/app/invoicor-invoice-maker/id6761840276";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tight">
              <img 
                src={logo} 
                alt="Invoicor logo" 
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span>Invoicor</span>
            </Link>
          </div>
          <div className="flex items-center">
            <a 
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 text-white hover:bg-slate-800 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-sm"
            >
              <svg viewBox="0 0 384 512" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <span className="hidden sm:inline">Download on the App Store</span>
              <span className="sm:hidden">Get App</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
