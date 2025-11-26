import React from 'react';

const Purchase = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">New Purchase</h1>
                <p className="text-slate-600">Record a customer purchase to award points.</p>
            </div>

            <div className="max-w-md bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Customer ID / Email</label>
                        <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Scan QR or enter ID" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Amount ($)</label>
                        <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="0.00" />
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Process Purchase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Purchase;
