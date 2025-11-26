import React from 'react';
import { Gift, QrCode, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/animations.css';

const features = [
  {
    Icon: Gift,
    title: 'Earn Rewards',
    description:
      'Every coffee and textbook earns you points. Stack up rewards with every purchase you make on campus.',
    gradientClasses: 'bg-gradient-to-br from-pink-500 to-purple-600',
  },
  {
    Icon: QrCode,
    title: 'Digital ID',
    description:
      'Scan your student ID at checkout. No extra cards. Everything you need is right in your pocket.',
    gradientClasses: 'bg-gradient-to-br from-purple-600 to-blue-500',
  },
  {
    Icon: Calendar,
    title: 'Exclusive Events',
    description:
      'VIP access to campus hackathons and socials. Connect with peers and unlock premium experiences.',
    gradientClasses: 'bg-gradient-to-br from-blue-500 to-pink-500',
  },
];

const Home = () => (
  <div className="min-h-screen bg-slate-950 font-sans antialiased selection:bg-purple-500/30">
    <Navbar />

    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950" />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
          <span className="text-white">Earn Points.</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Unlock Experiences.
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          The smartest way to enjoy campus life. Shop, eat, and engage to earn rewards that actually matter.
        </p>
        <button className="px-8 py-4 bg-white text-slate-900 text-lg font-bold rounded-full hover:bg-slate-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] hover:scale-105 transform duration-200">
          Get Started
        </button>
      </div>
    </section>

    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-800/50 transition-colors">
              <div className={`w-12 h-12 rounded-2xl ${feature.gradientClasses} flex items-center justify-center mb-6`}>
                <feature.Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="h-20" />
  </div>
);

export default Home;
