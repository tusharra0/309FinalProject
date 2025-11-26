import React from 'react';
import { Link } from 'react-router-dom';

const Transactions = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">All Transactions</h1>
                <p className="text-slate-600">Monitor all system transactions.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">ID</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">User</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Amount</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-slate-600">#{1000 + item}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">User {item}</td>
                                <td className="px-6 py-4">Purchase</td>
                                <td className="px-6 py-4 font-bold text-slate-900">$25.00</td>
                                <td className="px-6 py-4 text-slate-600">Nov {item}, 2025</td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/manager/transactions/${item}`} className="text-indigo-600 hover:text-indigo-800 font-medium">Details</Link>
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
