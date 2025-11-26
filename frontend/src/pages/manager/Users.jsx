import React from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                    <p className="text-slate-600">View and manage registered users.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Add User
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Role</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">User Name {item}</td>
                                <td className="px-6 py-4 text-slate-600">user{item}@example.com</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">User</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">Active</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/manager/users/${item}`} className="text-indigo-600 hover:text-indigo-800 font-medium">View</Link>
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
