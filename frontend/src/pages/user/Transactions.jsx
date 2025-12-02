import React, { useState, useEffect } from 'react';
import { Plus, Minus, Filter, Download } from 'lucide-react';
import { getMyTransactions } from '../../api/transactions';
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
        orderBy: 'createdAt',
        order: 'desc'
    });

    useEffect(() => {
        fetchTransactions();
    }, [page, filters]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await getMyTransactions({
                page,
                limit: 20,
                ...filters
            });
            setTransactions(data.transactions || []);
            setTotalPages(data.pagination?.totalPages || 1);
        } catch (err) {
            setError(err.message || 'Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    const getTransactionColor = (type) => {
        const colors = {
            purchase: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            transfer: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            redemption: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
            event: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            adjustment: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        };
        return colors[type] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    };

    const isPositive = (transaction) => transaction.pointChange > 0;

    if (loading && transactions.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
                    <p className="text-slate-400">View all your point transactions</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <Filter size={14} className="inline mr-1" />
                            Transaction Type
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
                        <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
                        <select
                            value={filters.orderBy}
                            onChange={(e) => setFilters({ ...filters, orderBy: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="createdAt">Date</option>
                            <option value="pointChange">Amount</option>
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

            {/* Transactions List */}
            {transactions.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <p className="text-slate-400">No transactions found</p>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="bg-slate-900 rounded-xl border border-slate-800 p-4 hover:border-slate-700 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1">
                                        {/* Icon */}
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center ${isPositive(transaction)
                                                    ? 'bg-emerald-500/10 text-emerald-400'
                                                    : 'bg-orange-500/10 text-orange-400'
                                                }`}
                                        >
                                            {isPositive(transaction) ? <Plus size={20} /> : <Minus size={20} />}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-white font-semibold capitalize">
                                                    {transaction.type}
                                                </h3>
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getTransactionColor(
                                                        transaction.type
                                                    )}`}
                                                >
                                                    {transaction.type}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 text-sm">{transaction.description}</p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <p className="text-slate-500 text-xs">
                                                    {new Date(transaction.createdAt).toLocaleString()}
                                                </p>
                                                {transaction.relatedUser && (
                                                    <p className="text-slate-500 text-xs">
                                                        {isPositive(transaction) ? 'From' : 'To'}:{' '}
                                                        <span className="text-slate-400">{transaction.relatedUser.utorid}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Amount */}
                                        <div className="text-right">
                                            <p
                                                className={`text-2xl font-bold ${isPositive(transaction) ? 'text-emerald-400' : 'text-slate-300'
                                                    }`}
                                            >
                                                {isPositive(transaction) ? '+' : ''}
                                                {transaction.pointChange}
                                            </p>
                                            <p className="text-slate-500 text-xs">pts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
};

export default Transactions;
