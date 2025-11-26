import React from 'react';

const CashierDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Cashier Dashboard</h1>
                <p className="text-slate-600">Process transactions and redemptions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700">Today's Sales</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">$1,240.50</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700">Redemptions Processed</h3>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">15</p>
                </div>
            </div>
        </div>
    );
};

export default CashierDashboard;
