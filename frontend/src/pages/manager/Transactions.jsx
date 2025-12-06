import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, AlertTriangle } from 'lucide-react';
import { getTransactions } from '../../api/transactions';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        type: '',
        suspicious: '',
        processed: '',
        orderBy: 'createdAt',
        order: 'desc'
    });

    useEffect(() => {
        fetchTransactions();
    }, [page, filters]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await getTransactions({
                page,
                limit: 20,
                ...filters
            });
            // Backend returns { count, results }
            const results = data.results || data.transactions || [];
            setTransactions(results);
            const count = data.count ?? data.total ?? 0;
            setTotalPages(Math.max(1, Math.ceil(count / 20)));
        } catch (err) {
            setError(err.message || 'Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    const getTypeBadge = (type) => {
        const colors = {
            purchase: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            transfer: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            redemption: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
            event: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            adjustment: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        };
        return colors[type] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    };

    if (loading && transactions.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">All Transactions</h1>
                <p className="text-slate-400">Monitor and manage all system transactions</p>
            </div>

            {/* Filters */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <Filter size={14} className="inline mr-1" />
                            Type
                        </label>
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Types</option>
                            <option value="purchase">Purchase</option>
                            <option value="transfer">Transfer</option>
                            <option value="redemption">Redemption</option>
                            <option value="event">Event</option>
                            <option value="adjustment">Adjustment</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Suspicious</label>
                        <select
                            value={filters.suspicious}
                            onChange={(e) => setFilters({ ...filters, suspicious: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All</option>
                            <option value="true">Flagged</option>
                            <option value="false">Not Flagged</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Processed</label>
                        <select
                            value={filters.processed}
                            onChange={(e) => setFilters({ ...filters, processed: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All</option>
                            <option value="true">Processed</option>
                            <option value="false">Pending</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
                        <select
                            value={filters.orderBy}
                            onChange={(e) => setFilters({ ...filters, orderBy: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="createdAt">Date</option>
                            <option value="pointChange">Amount</option>
                            <option value="pointsDelta">Amount</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Order</label>
                        <select
                            value={filters.order}
                            onChange={(e) => setFilters({ ...filters, order: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            <ErrorMessage message={error} onClose={() => setError('')} />

            {/* Transactions Table */}
            {transactions.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <p className="text-slate-400">No transactions found</p>
                </div>
            ) : (
                <>
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-800 border-b border-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Status</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-300">#{tx.id}</td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-white font-medium">{tx.user?.utorid ?? tx.utorid ?? tx.sender ?? tx.recipient ?? 'N/A'}</p>
                                                    <p className="text-slate-400 text-sm">{tx.user?.email ?? tx.email ?? ''}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold border capitalize ${getTypeBadge(tx.type)}`}>
                                                    {tx.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {(() => {
                                                    const val = tx.sent ?? tx.awarded ?? tx.amount ?? tx.pointsDelta ?? 0;
                                                    const positive = Number(val) > 0;
                                                    return (
                                                        <span className={`font-bold ${positive ? 'text-emerald-400' : 'text-slate-300'}`}>
                                                            {positive ? '+' : ''}{val}
                                                        </span>
                                                    );
                                                })()}
                                            </td>
                                            <td className="px-6 py-4 text-slate-300 text-sm">
                                                {(() => {
                                                    const d = tx.createdAt ?? tx.created ?? tx.transaction?.createdAt;
                                                    return d ? new Date(d).toLocaleDateString() : '';
                                                })()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {tx.suspicious && (
                                                        <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-semibold border border-red-500/20 inline-flex items-center gap-1 w-fit">
                                                            <AlertTriangle size={12} />
                                                            Suspicious
                                                        </span>
                                                    )}
                                                    {tx.type === 'redemption' ? (
                                                        tx.processed ? (
                                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/20 w-fit">
                                                                Processed
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-semibold border border-orange-500/20 w-fit">
                                                                Pending
                                                            </span>
                                                        )
                                                    ) : (
                                                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/20 w-fit">
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    to={`/manager/transactions/${tx.id}`}
                                                    className="text-indigo-400 hover:text-indigo-300 font-medium text-sm"
                                                >
                                                    View Details →
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
};

export default Transactions;
