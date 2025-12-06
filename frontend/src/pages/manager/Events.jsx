import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar } from 'lucide-react';
import { listEvents } from '../../api/events';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        published: '',
        orderBy: 'createdAt',
        order: 'desc'
    });

    useEffect(() => {
        fetchEvents();
    }, [page, filters]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await listEvents({
                page,
                limit: 10,
                ...filters
            });
            // Backend returns { count, results }
            setEvents(data.results || data.events || []);
            // Calculate totalPages from count and limit
            const totalCount = data.count || 0;
            setTotalPages(Math.ceil(totalCount / 10) || 1);
        } catch (err) {
            setError(err.message || 'Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    if (loading && events.length === 0) {
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
                    <h1 className="text-3xl font-bold text-white mb-2">Events Management</h1>
                    <p className="text-slate-400">Create and manage campus events</p>
                </div>
                <Link
                    to="/manager/events/new"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Create Event
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                        <select
                            value={filters.published}
                            onChange={(e) => setFilters({ ...filters, published: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All</option>
                            <option value="true">Published</option>
                            <option value="false">Draft</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
                        <select
                            value={filters.orderBy}
                            onChange={(e) => setFilters({ ...filters, orderBy: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="startTime">Event Date</option>
                            <option value="createdAt">Date Created</option>
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

            {/* Events List */}
            {events.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <Calendar size={48} className="mx-auto text-slate-600 mb-4" />
                    <p className="text-slate-400 mb-4">No events yet</p>
                    <Link
                        to="/manager/events/new"
                        className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                    >
                        Create First Event
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {events.map((event) => (
                            <Link
                                key={event.id}
                                to={`/manager/events/${event.id}`}
                                className="block bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                                        <p className="text-slate-400 text-sm mb-3">{event.description}</p>
                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <span className="text-slate-400">
                                                📍 {event.location}
                                            </span>
                                            <span className="text-slate-400">
                                                📅 {new Date(event.startTime).toLocaleDateString()}
                                            </span>
                                            <span className="text-slate-400">
                                                ⏰ {new Date(event.startTime).toLocaleTimeString()}
                                            </span>
                                            <span className="text-slate-400">
                                                👥 {event.numGuests || 0}/{event.capacity || '∞'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 ml-4">
                                        <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold">
                                            +{event.pointsRemain} pts
                                        </span>
                                        {event.published ? (
                                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/20">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-semibold border border-orange-500/20">
                                                Draft
                                            </span>
                                        )}
                                    </div>
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

export default Events;
