import React from 'react';

const ManagerDashboard = () => {
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
                // Assuming you have an axios instance configured with auth headers or use fetch with token
                const token = localStorage.getItem('authToken'); // Simplistic auth handling
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
                <h1 className="text-2xl font-bold text-white">Manager Dashboard</h1>
                <p className="text-slate-400">Overview of system performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase">Total Users</h3>
                    <p className="text-3xl font-bold text-white mt-2">{loading ? '...' : formatNumber(stats.totalUsers)}</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase">Total Transactions</h3>
                    <p className="text-3xl font-bold text-white mt-2">{loading ? '...' : formatNumber(stats.totalTransactions)}</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase">Points Issued</h3>
                    <p className="text-3xl font-bold text-indigo-400 mt-2">{loading ? '...' : formatNumber(stats.pointsIssued)}</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase">Points Redeemed</h3>
                    <p className="text-3xl font-bold text-emerald-400 mt-2">{loading ? '...' : formatNumber(stats.pointsRedeemed)}</p>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
