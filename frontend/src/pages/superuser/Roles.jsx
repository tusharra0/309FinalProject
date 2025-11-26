import React from 'react';

const Roles = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Role Management</h1>
                <p className="text-slate-600">Configure user roles and permissions.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Role Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Users</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Permissions</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {['User', 'Cashier', 'Manager', 'Organizer', 'Superuser'].map((role) => (
                            <tr key={role} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{role}</td>
                                <td className="px-6 py-4 text-slate-600">--</td>
                                <td className="px-6 py-4 text-slate-600">View, Edit</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">Configure</button>
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
