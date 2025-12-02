import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import useUserStore from '../store/userStore';
import { redirectPathForRole } from '../utils/auth';

import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, isAuthenticated, logout, getRole } = useUserStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const role = getRole();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const getDashboardPath = () => {
    return redirectPathForRole(role);
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 max-w-2xl mx-auto px-4">
      <div className="relative bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-full px-6 py-3 shadow-2xl shadow-slate-900/20 transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center justify-end">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Rewards" className="h-28 w-auto object-contain drop-shadow-lg" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-white capitalize">{role || 'User'}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800">
                      <p className="text-sm font-medium text-white">Signed in as</p>
                      <p className="text-xs text-slate-400 capitalize mt-1">{role || 'User'}</p>
                    </div>

                    <div className="py-2">
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <LayoutDashboard size={18} />
                        <span className="text-sm font-medium">Go to Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <User size={18} />
                        <span className="text-sm font-medium">My Profile</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-800 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
