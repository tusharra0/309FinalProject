import React from 'react';

const Transactions = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
                <p className="text-slate-600">View your past earning and spending.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Description</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <tr key={item} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 text-slate-600">Nov {item}, 2025</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">Coffee Purchase</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">Earned</span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-emerald-600">+50</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
