import React from 'react';

const Purchase = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">New Purchase</h1>
                <p className="text-slate-400">Record a customer purchase to award points.</p>
            </div>

            <div className="max-w-md bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Customer ID / Email</label>
                        <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500" placeholder="Scan QR or enter ID" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Transaction Amount ($)</label>
                        <input type="number" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500" placeholder="0.00" />
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-500 transition-colors">
                        Process Purchase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Purchase;
