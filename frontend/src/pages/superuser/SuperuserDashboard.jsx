import React from 'react';

const SuperuserDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">System Administration</h1>
                <p className="text-slate-600">Global system overview and configuration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700">System Status</h3>
                    <p className="text-lg font-bold text-emerald-600 mt-2">Operational</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700">Total Users</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">1,500+</p>
                </div>
            </div>
        </div>
    );
};

export default SuperuserDashboard;
