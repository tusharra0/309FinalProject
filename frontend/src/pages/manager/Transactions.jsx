import React from 'react';
import { Link } from 'react-router-dom';

const Transactions = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">All Transactions</h1>
                <p className="text-slate-400">Monitor all system transactions.</p>
            </div>

            <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-300">ID</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">User</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Type</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Amount</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4 text-slate-400">#{1000 + item}</td>
                                <td className="px-6 py-4 font-medium text-white">User {item}</td>
                                <td className="px-6 py-4 text-slate-300">Purchase</td>
                                <td className="px-6 py-4 font-bold text-white">$25.00</td>
                                <td className="px-6 py-4 text-slate-400">Nov {item}, 2025</td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/manager/transactions/${item}`} className="text-indigo-400 hover:text-indigo-300 font-medium">Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
