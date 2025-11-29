import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, CreditCard, Plus, Minus } from 'lucide-react';

const UserDashboard = () => {
    // Mock data - in a real app this would come from props or context
    const balance = 1250;
    const recentActivity = [
        { id: 1, type: 'Purchase', date: '2025-10-24', amount: 50, isPositive: true },
        { id: 2, type: 'Redemption', date: '2025-10-25', amount: 500, isPositive: false },
        { id: 3, type: 'Event', date: '2025-10-26', amount: 100, isPositive: true },
    ];

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-6">
            {/* Top Balance Card */}
            <div className="flex-none bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-2xl shadow-lg border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <CreditCard size={100} className="text-white" />
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-1">
                        <h2 className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Current Balance</h2>
                        <span className="px-2 py-0.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[10px] font-medium text-white">
                            GOLD MEMBER
                        </span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-white">{balance.toLocaleString()}</span>
                        <span className="text-slate-400 text-lg">pts</span>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            to="/user/transfer"
                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-900/20"
                        >
                            Transfer Points
                        </Link>
                        <Link
                            to="/user/redeem"
                            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-sm font-medium transition-colors"
                        >
                            Redeem Rewards
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Digital ID Card */}
                <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 flex flex-col items-center justify-center text-center h-full">
                    <h3 className="text-base font-semibold text-white mb-4">Your Digital ID</h3>

                    <div className="bg-white p-3 rounded-xl mb-4 shadow-inner">
                        {/* Placeholder for actual QR Code */}
                        <div className="w-40 h-40 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                            <QrCode size={56} className="text-slate-900" />
                        </div>
                    </div>

                    <p className="text-slate-400 text-xs">Scan at checkout to earn points</p>
                </div>

                {/* Recent Activity Card */}
                <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6 flex-none">
                        <h3 className="text-base font-semibold text-white">Recent Activity</h3>
                        <Link to="/user/transactions" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.isPositive
                                            ? 'bg-emerald-500/10 text-emerald-400'
                                            : 'bg-orange-500/10 text-orange-400'
                                        }`}>
                                        {activity.isPositive ? <Plus size={14} /> : <Minus size={14} />}
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">{activity.type}</p>
                                        <p className="text-slate-500 text-[10px]">{activity.date}</p>
                                    </div>
                                </div>
                                <span className={`text-sm font-bold ${activity.isPositive ? 'text-emerald-400' : 'text-slate-300'
                                    }`}>
                                    {activity.isPositive ? '+' : '-'}{activity.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
