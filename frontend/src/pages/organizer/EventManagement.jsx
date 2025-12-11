import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Plus, Trash2 } from 'lucide-react';
import { getEvent, addGuest, removeGuest, awardPoints } from '../../api/events';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const EventManagement = ({ basePath = '/organizer' }) => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newGuestId, setNewGuestId] = useState('');
    const [pointsToAward, setPointsToAward] = useState('');
    const [awardDescription, setAwardDescription] = useState('');
    const [selectedGuest, setSelectedGuest] = useState(null);

    useEffect(() => {
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

    const handleAddGuest = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await addGuest(eventId, newGuestId);
            setSuccess(`Guest added successfully`);
            setNewGuestId('');
            fetchEvent();
        } catch (err) {
            setError(err.message || 'Failed to add guest');
        }
    };

    const handleRemoveGuest = async (userId) => {
        if (!window.confirm('Remove this guest?')) return;
        try {
            setError('');
            await removeGuest(eventId, userId);
            setSuccess('Guest removed');
            fetchEvent();
        } catch (err) {
            setError(err.message || 'Failed to remove guest');
        }
    };

    const handleAwardPoints = async (e) => {
        e.preventDefault();
        try {
            setError('');
            const points = parseInt(pointsToAward);

            const payload = {
                pointChange: points,
                description: awardDescription || `Event attendance: ${event.name}`
            };

            if (selectedGuest) {
                payload.userId = selectedGuest;
            } else {
                payload.allGuests = true;
            }

            await awardPoints(eventId, payload);
            setSuccess(selectedGuest ? 'Points awarded to guest' : 'Points awarded to all guests!');
            setPointsToAward('');
            setAwardDescription('');
            setSelectedGuest(null);
        } catch (err) {
            setError(err.message || 'Failed to award points');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    if (!event) {
        return <div className="text-center py-12"><p className="text-slate-400">Event not found</p></div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate(`${basePath}/events`)}
                className="text-indigo-400 hover:text-indigo-300 mb-4 flex items-center gap-2"
            >
                <ArrowLeft size={18} />
                Back to My Events
            </button>

            <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
            <p className="text-slate-400 mb-8">Manage guests and award points</p>

            <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />
            <SuccessMessage message={success} onClose={() => setSuccess('')} className="mb-4" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Guest List */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Guest List ({event.guests?.length || 0}/{event.maxGuests})
                    </h3>

                    {/* Add Guest Form */}
                    <form onSubmit={handleAddGuest} className="mb-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newGuestId}
                                onChange={(e) => setNewGuestId(e.target.value)}
                                className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                placeholder="UTORid"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <Plus size={16} />
                                Add
                            </button>
                        </div>
                    </form>

                    {/* Guests */}
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {event.guests?.map((guest) => (
                            <div key={guest.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                <div>
                                    <p className="text-white text-sm font-medium">{guest.utorid}</p>
                                    <p className="text-slate-400 text-xs">{guest.email}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveGuest(guest.id)}
                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {(!event.guests || event.guests.length === 0) && (
                            <p className="text-slate-500 text-sm text-center py-8">No guests yet</p>
                        )}
                    </div>
                </div>

                {/* Award Points */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Gift size={20} className="text-indigo-400" />
                        Award Points
                    </h3>

                    <form onSubmit={handleAwardPoints} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Award To
                            </label>
                            <select
                                value={selectedGuest || ''}
                                onChange={(e) => setSelectedGuest(e.target.value || null)}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">All Guests</option>
                                {event.guests?.map((guest) => (
                                    <option key={guest.id} value={guest.id}>
                                        {guest.utorid} - {guest.email}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Points Amount
                            </label>
                            <input
                                type="number"
                                value={pointsToAward}
                                onChange={(e) => setPointsToAward(e.target.value)}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g. 100"
                                required
                                min="1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                value={awardDescription}
                                onChange={(e) => setAwardDescription(e.target.value)}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                rows="2"
                                placeholder="Reason for award..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!event.guests || event.guests.length === 0}
                            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Gift size={18} />
                            Award Points
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventManagement;
