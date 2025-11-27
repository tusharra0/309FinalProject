import React from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">User Management</h1>
                    <p className="text-slate-400">View and manage registered users.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors">
                    Add User
                </button>
            </div>

            <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-300">Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Email</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Role</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-medium text-white">User Name {item}</td>
                                <td className="px-6 py-4 text-slate-400">user{item}@example.com</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium border border-slate-700">User</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">Active</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/manager/users/${item}`} className="text-indigo-400 hover:text-indigo-300 font-medium">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
