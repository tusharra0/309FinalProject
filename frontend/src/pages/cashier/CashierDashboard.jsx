import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, ShoppingCart, Award } from 'lucide-react';

const CashierDashboard = () => {
    const [stats, setStats] = React.useState({ sales: 0, redemptions: 0 });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await import('../../api/transactions').then(m => m.getTransactionStats());
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Cashier Dashboard</h1>
                <p className="text-slate-400">Process transactions and redemptions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-400">Today's Sales</h3>
                    <p className="text-3xl font-bold text-indigo-400 mt-2">
                        {loading ? '...' : `$${stats.sales.toFixed(2)}`}
                    </p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-400">Redemptions Processed</h3>
                    <p className="text-3xl font-bold text-emerald-400 mt-2">
                        {loading ? '...' : stats.redemptions}
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        to="/cashier/register-customer"
                        className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group"
                    >
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                            <UserPlus size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Register Customer</h3>
                        <p className="text-slate-400 text-sm">Create a new account for a customer at the point of sale.</p>
                    </Link>

                    <Link
                        to="/cashier/purchase"
                        className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
                    >
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <ShoppingCart size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Create Purchase</h3>
                        <p className="text-slate-400 text-sm">Process a new purchase and award points to customer.</p>
                    </Link>

                    <Link
                        to="/cashier/redemptions/process"
                        className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all group"
                    >
                        <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-400 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Award size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Process Redemption</h3>
                        <p className="text-slate-400 text-sm">Verify and process customer point redemptions.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CashierDashboard;
