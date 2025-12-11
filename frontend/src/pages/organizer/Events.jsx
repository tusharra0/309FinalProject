import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';
import { listEvents } from '../../api/events';
import useUserStore from '../../store/userStore';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';

const Events = ({ basePath = '/organizer' }) => {
    const { user } = useUserStore();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const data = await listEvents({
                    page,
                    limit: 10,
                    organizerId: user?.id,
                    orderBy: 'eventDate',
                    order: 'desc'
                });
                setEvents(data.events || []);
                setTotalPages(data.pagination?.totalPages || 1);
            } catch (err) {
                setError(err.message || 'Failed to load events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [page]);

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
                    <h1 className="text-3xl font-bold text-white mb-2">My Events</h1>
                    <p className="text-slate-400">Events you're organizing</p>
                </div>
                <Link
                    to={`${basePath}/events/new`}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Create Event
                </Link>
            </div>

            <ErrorMessage message={error} onClose={() => setError('')} />

            {events.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <Calendar size={48} className="mx-auto text-slate-600 mb-4" />
                    <p className="text-slate-400 mb-4">No events yet</p>
                    <Link
                        to={`${basePath}/events/new`}
                        className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                    >
                        Create Your First Event
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4">
                        {events.map((event) => (
                            <Link
                                key={event.id}
                                to={`${basePath}/events/${event.id}`}
                                className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                                        <p className="text-slate-400 text-sm mb-3">{event.description}</p>
                                        <div className="flex gap-4 text-sm">
                                            <span className="text-slate-400">
                                                📍 {event.location}
                                            </span>
                                            <span className="text-slate-400">
                                                📅 {new Date(event.eventDate).toLocaleDateString()}
                                            </span>
                                            <span className="text-slate-400">
                                                👥 {event.currentGuests || 0}/{event.maxGuests}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold">
                                            +{event.pointsReward} pts
                                        </span>
                                        {event.published ? (
                                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xs font-semibold">
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
