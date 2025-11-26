import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="fixed top-6 left-0 right-0 z-50 max-w-2xl mx-auto">
    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-full px-6 py-3 shadow-2xl shadow-slate-900/20 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-lg tracking-tight pl-2">
            Rewards
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 bg-white text-slate-900 text-sm font-bold rounded-full hover:bg-slate-200 transition-all shadow-lg hover:shadow-xl"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
