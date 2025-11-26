import React from 'react';

const ManagerDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Manager Dashboard</h1>
                <p className="text-slate-600">Overview of system performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase">Total Users</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">1,240</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase">Total Transactions</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">8,543</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase">Points Issued</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">1.2M</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase">Points Redeemed</h3>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">450K</p>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
