import React from 'react';
import { Zap } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-slate-900 font-bold text-lg tracking-tight">
            CAMPUS LOYALTY
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-slate-900 bg-white rounded-full shadow-sm"
          >
            Home
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Services
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            Sign In
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
