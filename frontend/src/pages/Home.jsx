import React from 'react';
import { Gift, QrCode, Calendar } from 'lucide-react';
import BlobBackground from '../components/BlobBackground';
import FeatureCard from '../components/FeatureCard';
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
  <div className="min-h-screen bg-white font-sans antialiased">
    <Navbar />

    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <BlobBackground />

      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-slate-900">Awesome Loyalty </span>
          <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
            Program for Students
          </span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Earn points on purchases, enjoy VIP experiences, and redeem exclusive rewards. Simple, fast, and designed for
          campus life.
        </p>
        <button className="px-8 py-4 bg-slate-900 text-white text-lg font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] hover:scale-105 transform duration-200">
          Get Started
        </button>
      </div>
    </section>

    <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>

    <div className="h-20" />
  </div>
);

export default Home;
