import React from 'react';

const FeatureCard = ({ Icon, title, description, gradientClasses }) => (
  <div className="group bg-white rounded-2xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2">
    <div
      className={`w-14 h-14 ${gradientClasses} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
    >
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

export default FeatureCard;
