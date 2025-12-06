import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users as UsersIcon, CheckCircle, X } from 'lucide-react';
import { getEvent, rsvpToEvent, cancelRsvp } from '../../api/events';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const EventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    const fetchEvent = async () => {
        try {
            setLoading(true);
            const data = await getEvent(eventId);
            setEvent(data);
        } catch (err) {
            setError(err.message || 'Failed to load event');
        } finally {
            setLoading(false);
        }
    };

    const handleRSVP = async () => {
        try {
            setActionLoading(true);
            setError('');
            await rsvpToEvent(eventId);
            setSuccess('Successfully RSVPed to event!');
            fetchEvent(); // Refresh event data
        } catch (err) {
            setError(err.message || 'Failed to RSVP');
        } finally {
            setActionLoading(false);
        }
    };

    const handleCancelRSVP = async () => {
        try {
            setActionLoading(true);
            setError('');
            await cancelRsvp(eventId);
            setSuccess('RSVP cancelled successfully');
            fetchEvent(); // Refresh event data
        } catch (err) {
            setError(err.message || 'Failed to cancel RSVP');
        } finally {
            setActionLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-400">Event not found</p>
            </div>
        );
    }

    const isFull = event.currentGuests >= event.maxGuests;
    const canRSVP = !event.isGuest && !isFull;

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/user/events')}
                className="text-indigo-400 hover:text-indigo-300 mb-4 flex items-center gap-2"
            >
                ← Back to Events
            </button>

            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
                {/* Header */}
                <div className="p-8 border-b border-slate-800">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-bold text-white">{event.name}</h1>
                        <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-bold border border-indigo-500/20">
                            +{event.pointsReward} Points
                        </div>
                    </div>
                    <p className="text-slate-300 text-lg">{event.description}</p>
                </div>

                {/* Details */}
                <div className="p-8 space-y-6">
                    <ErrorMessage message={error} onClose={() => setError('')} />
                    <SuccessMessage message={success} onClose={() => setSuccess('')} />

                    {/* Event Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</div>
                                    <div className="text-white font-semibold">{formatDate(event.eventDate)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Time</div>
                                    <div className="text-white font-semibold">{formatTime(event.eventDate)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Location</div>
                                    <div className="text-white font-semibold">{event.location}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                                    <UsersIcon size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Guests</div>
                                    <div className="text-white font-semibold">
                                        {event.currentGuests || 0} / {event.maxGuests}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RSVP Actions */}
                    <div className="pt-6 border-t border-slate-800">
                        {event.isGuest ? (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 bg-emerald-500/20 border-2 border-emerald-400 rounded-lg p-5 flex items-center justify-center">
                                    <CheckCircle className="text-emerald-400 mr-3" size={24} />
                                    <span className="text-emerald-400 font-bold text-lg">RSVPed ✓</span>
                                </div>
                                <button
                                    onClick={handleCancelRSVP}
                                    disabled={actionLoading}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {actionLoading && <LoadingSpinner size="sm" />}
                                    <X size={18} />
                                    Cancel RSVP
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleRSVP}
                                disabled={!canRSVP || actionLoading}
                                className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {actionLoading && <LoadingSpinner size="sm" />}
                                <CheckCircle size={20} />
                                {isFull ? 'Event Full' : actionLoading ? 'Processing...' : 'RSVP Now'}
                            </button>
                        )}
                    </div>

                    {isFull && !event.isGuest && (
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
                            <p className="text-orange-400 text-sm">This event has reached maximum capacity</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
