import React from 'react';

const Promotions = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Promotions</h1>
                <p className="text-slate-400">Special offers just for you.</p>
            </div>

            <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800 flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-48 h-32 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0">
                            Promo Image
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-semibold text-white">Double Points Weekend</h3>
                            <p className="text-slate-400 mt-2">Earn 2x points on all purchases this weekend only!</p>
                            <p className="text-sm text-slate-500 mt-2">Valid until Nov 30, 2025</p>
                        </div>
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors">
                            Activate
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Promotions;
