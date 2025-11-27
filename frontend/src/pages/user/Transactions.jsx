import React from 'react';

const Transactions = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Transaction History</h1>
                <p className="text-slate-400">View your past earning and spending.</p>
            </div>

            <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-300">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-300">Description</th>
                                <th className="px-6 py-4 font-semibold text-slate-300">Type</th>
                                <th className="px-6 py-4 font-semibold text-slate-300 text-right">Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <tr key={item} className="hover:bg-slate-800/50">
                                    <td className="px-6 py-4 text-slate-400">Nov {item}, 2025</td>
                                    <td className="px-6 py-4 font-medium text-white">Coffee Purchase</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">Earned</span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-emerald-400">+50</td>
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
