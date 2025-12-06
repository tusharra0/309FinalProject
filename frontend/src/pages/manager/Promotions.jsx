import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Gift } from 'lucide-react';
import { listPromotions } from '../../api/promotions';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';

const Promotions = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        active: '',
        orderBy: 'createdAt',
        order: 'desc'
    });

    useEffect(() => {
        fetchPromotions();
    }, [page, filters]);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            const data = await listPromotions({
                page,
                limit: 12,
                ...filters
            });
            // Backend returns { results, count }
            setPromotions(data.results || data.promotions || []);
            // Calculate totalPages from count and limit
            const totalCount = data.count || 0;
            setTotalPages(Math.ceil(totalCount / 12) || 1);
        } catch (err) {
            setError(err.message || 'Failed to load promotions');
        } finally {
            setLoading(false);
        }
    };

    if (loading && promotions.length === 0) {
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
                    <h1 className="text-3xl font-bold text-white mb-2">Promotions Management</h1>
                    <p className="text-slate-400">Create and manage reward promotions</p>
                </div>
                <Link
                    to="/manager/promotions/new"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Create Promotion
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                        <select
                            value={filters.active}
                            onChange={(e) => setFilters({ ...filters, active: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
                        <select
                            value={filters.orderBy}
                            onChange={(e) => setFilters({ ...filters, orderBy: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="createdAt">Date Created</option>
                            <option value="pointCost">Point Cost</option>
                            <option value="name">Name</option>
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

            {/* Promotions Grid */}
            {promotions.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <Gift size={48} className="mx-auto text-slate-600 mb-4" />
                    <p className="text-slate-400 mb-4">No promotions yet</p>
                    <Link
                        to="/manager/promotions/new"
                        className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                    >
                        Create First Promotion
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promotions.map((promo) => (
                            <Link
                                key={promo.id}
                                to={`/manager/promotions/${promo.id}`}
                                className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800 hover:border-indigo-500/50 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white">{promo.name}</h3>
                                    <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                                        <span className="text-indigo-400 text-sm font-bold">{promo.type}</span>
                                    </div>
                                </div>

                                <p className="text-slate-300 text-sm mb-4 line-clamp-2">{promo.description}</p>

                                <div className="space-y-2 text-sm text-slate-400 mb-4">
                                    {promo.minSpending > 0 && (
                                        <p>Min Spending: ${promo.minSpending.toFixed(2)}</p>
                                    )}
                                    {promo.rate > 0 && (
                                        <p>Bonus Rate: {promo.rate.toFixed(2)}%</p>
                                    )}
                                    {promo.points > 0 && (
                                        <p>Bonus Points: +{promo.points}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                    <span className="text-slate-400 text-xs">
                                        {new Date(promo.startTime).toLocaleDateString()} - {new Date(promo.endTime).toLocaleDateString()}
                                    </span>
                                    <span className="text-indigo-400 text-sm font-medium">Edit →</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
};

export default Promotions;
