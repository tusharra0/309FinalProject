import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users as UsersIcon, CheckCircle } from 'lucide-react';
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
    const [filter, setFilter] = useState('all'); // all, joined

    useEffect(() => {
        fetchEvents();
    }, [page, filter]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: 6,
                published: true,
                orderBy: 'eventDate',
                order: 'asc'
            };

            const data = await listEvents(params);
            setEvents(data.events || []);
            setTotalPages(data.pagination?.totalPages || 1);
        } catch (err) {
            setError(err.message || 'Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    if (loading && events.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
                    <p className="text-slate-400">Discover and RSVP to campus events</p>
                </div>
                <div className="bg-slate-800 p-1 rounded-lg flex gap-1">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all'
                                ? 'bg-slate-700 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('joined')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'joined'
                                ? 'bg-slate-700 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Joined
                    </button>
                </div>
            </div>

            <ErrorMessage message={error} onClose={() => setError('')} />

            {events.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <p className="text-slate-400">No events available</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {events.map((event) => (
                            <Link
                                key={event.id}
                                to={`/user/events/${event.id}`}
                                className="relative bg-slate-900 rounded-2xl p-6 shadow-sm border-l-4 border-indigo-500 border-y border-r border-slate-800 hover:border-indigo-400 transition-colors"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{event.name}</h3>
                                        <div className="flex items-center text-slate-400 text-sm">
                                            <MapPin size={16} className="mr-1" />
                                            {event.location}
                                        </div>
                                    </div>
                                    <div className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20">
                                        +{event.pointsReward} Pts
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-800 rounded-xl p-3 flex items-center border border-slate-700">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mr-3">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</div>
                                            <div className="text-sm font-semibold text-slate-200">{formatDate(event.eventDate)}</div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800 rounded-xl p-3 flex items-center border border-slate-700">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mr-3">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Time</div>
                                            <div className="text-sm font-semibold text-slate-200">{formatTime(event.eventDate)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                    <div className="flex items-center text-slate-400 text-sm">
                                        <UsersIcon size={18} className="mr-2" />
                                        <span className="font-medium text-slate-300">{event.currentGuests || 0}</span>
                                        <span className="mx-1">/</span>
                                        <span>{event.maxGuests} Guests</span>
                                    </div>

                                    {event.isGuest ? (
                                        <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg text-sm font-bold flex items-center border border-green-500/20">
                                            <CheckCircle size={16} className="mr-1" />
                                            Confirmed
                                        </div>
                                    ) : (
                                        <div className="bg-white hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                                            RSVP Now
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </div>
    );
};

export default Events;
