import React from 'react';

const ManagerDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Manager Dashboard</h1>
                <p className="text-slate-400">Overview of system performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase">Total Users</h3>
                    <p className="text-3xl font-bold text-white mt-2">1,240</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase">Total Transactions</h3>
                    <p className="text-3xl font-bold text-white mt-2">8,543</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase">Points Issued</h3>
                    <p className="text-3xl font-bold text-indigo-400 mt-2">1.2M</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase">Points Redeemed</h3>
                    <p className="text-3xl font-bold text-emerald-400 mt-2">450K</p>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
