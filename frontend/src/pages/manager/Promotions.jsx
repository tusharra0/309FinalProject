import React from 'react';
import { Link } from 'react-router-dom';

const Promotions = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Promotions</h1>
                    <p className="text-slate-400">Manage marketing campaigns.</p>
                </div>
                <Link to="/manager/promotions/new" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors">
                    Create Promotion
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-white">Summer Sale {item}</h3>
                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">Active</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">Double points on all summer items.</p>
                        <div className="flex justify-between items-center text-sm">
                            <Link to={`/manager/promotions/${item}`} className="text-indigo-400 hover:text-indigo-300 font-medium">Edit</Link>
                            <span className="text-slate-500">Ends Dec 31</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Promotions;
