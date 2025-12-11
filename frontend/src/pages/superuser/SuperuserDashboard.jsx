import React from 'react';

const SuperuserDashboard = () => {
    const [stats, setStats] = React.useState({
        totalUsers: 0,
        totalTransactions: 0,
        pointsIssued: 0,
        pointsRedeemed: 0
    });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:3000/manager/stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                } else {
                    console.error('Failed to fetch stats');
                }
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toLocaleString();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">System Administration</h1>
                <p className="text-slate-600">Global system overview and configuration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase">System Status</h3>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">Operational</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase">Total Users</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{loading ? '...' : formatNumber(stats.totalUsers)}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase">Total Transactions</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{loading ? '...' : formatNumber(stats.totalTransactions)}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase">Points Circulating</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">{loading ? '...' : formatNumber(stats.pointsIssued - stats.pointsRedeemed)}</p>
                </div>
            </div>
        </div>
    );
};

export default SuperuserDashboard;
