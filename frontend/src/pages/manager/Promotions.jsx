import React from 'react';
import { Link } from 'react-router-dom';

const Promotions = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Promotions</h1>
                    <p className="text-slate-600">Manage marketing campaigns.</p>
                </div>
                <Link to="/manager/promotions/new" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Create Promotion
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-slate-900">Summer Sale {item}</h3>
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">Active</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Double points on all summer items.</p>
                        <div className="flex justify-between items-center text-sm">
                            <Link to={`/manager/promotions/${item}`} className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</Link>
                            <span className="text-slate-400">Ends Dec 31</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Promotions;
