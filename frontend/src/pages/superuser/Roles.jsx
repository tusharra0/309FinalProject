import React from 'react';

const Roles = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Role Management</h1>
                <p className="text-slate-400">Configure user roles and permissions.</p>
            </div>

            <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-300">Role Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Users</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Permissions</th>
                            <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {['User', 'Cashier', 'Manager', 'Organizer', 'Superuser'].map((role) => (
                            <tr key={role} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-medium text-white">{role}</td>
                                <td className="px-6 py-4 text-slate-400">--</td>
                                <td className="px-6 py-4 text-slate-400">View, Edit</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-indigo-400 hover:text-indigo-300 font-medium">Configure</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Roles;
