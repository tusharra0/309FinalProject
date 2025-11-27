import React from 'react';

const UserDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400">Welcome back to your rewards dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-300">Points Balance</h3>
                    <p className="text-3xl font-bold text-indigo-400 mt-2">2,450</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-300">Active Coupons</h3>
                    <p className="text-3xl font-bold text-emerald-400 mt-2">3</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-300">Recent Activity</h3>
                    <p className="text-sm text-slate-400 mt-2">Last transaction: 2 days ago</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
