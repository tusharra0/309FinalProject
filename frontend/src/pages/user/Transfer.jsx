import React from 'react';

const Transfer = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Transfer Points</h1>
                <p className="text-slate-600">Send points to friends or family.</p>
            </div>

            <div className="max-w-md bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Recipient Email</label>
                        <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="friend@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                        <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="0" />
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Send Points
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
