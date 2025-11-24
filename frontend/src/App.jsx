import React from 'react';
import { Zap, Gift, QrCode, Calendar } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-900 font-bold text-lg tracking-tight">
                CAMPUS LOYALTY
              </span>
            </div>

            {/* Center Links */}
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

            {/* Right Actions */}
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full max-w-4xl">
            {/* Pink Blob */}
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"
            ></div>
            {/* Purple Blob */}
            <div
              className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"
            ></div>
            {/* Blue Blob */}
            <div
              className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"
            ></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-slate-900">Awesome Loyalty </span>
            <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
              Program for Students
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Earn points on purchases, enjoy VIP experiences, and redeem exclusive rewards.
            Simple, fast, and designed for campus life.
          </p>
          <button className="px-8 py-4 bg-slate-900 text-white text-lg font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] hover:scale-105 transform duration-200">
            Get Started
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Earn Rewards
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Every coffee and textbook earns you points. Stack up rewards with every purchase you make on campus.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Digital ID
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Scan your student ID at checkout. No extra cards. Everything you need is right in your pocket.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Exclusive Events
              </h3>
              <p className="text-slate-500 leading-relaxed">
                VIP access to campus hackathons and socials. Connect with peers and unlock premium experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-20"></div>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default App;
