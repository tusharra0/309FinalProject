import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Trash2, Plus, X } from 'lucide-react';
import { getEvent, createEvent, updateEvent, deleteEvent, addOrganizer, removeOrganizer } from '../../api/events';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const EventForm = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(eventId);

    const [form, setForm] = useState({
        name: '',
        description: '',
        location: '',
        startTime: '',
        endTime: '',
        capacity: '',
        points: '',
        published: false
    });

    const [organizerUtorid, setOrganizerUtorid] = useState('');
    const [organizers, setOrganizers] = useState([]);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (isEdit) {
            fetchEvent();
        }
    }, [eventId]);

    const fetchEvent = async () => {
        try {
            setLoading(true);
            const data = await getEvent(eventId);
            setForm({
                name: data.name,
                description: data.description,
                location: data.location,
                startTime: new Date(data.startTime).toISOString().slice(0, 16),
                endTime: new Date(data.endTime).toISOString().slice(0, 16),
                capacity: data.capacity || '',
                points: data.pointsTotal || '',
                published: data.published
            });
            setOrganizers(data.organizers || []);
        } catch (err) {
            setError(err.message || 'Failed to load event');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!form.startTime || !form.endTime) {
            setError('Start time and end time are required');
            return;
        }

        const startTime = new Date(form.startTime);
        const endTime = new Date(form.endTime);

        if (startTime >= endTime) {
            setError('End time must be after start time');
            return;
        }

        try {
            setSaving(true);
            const data = {
                name: form.name,
                description: form.description,
                location: form.location,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                capacity: form.capacity ? parseInt(form.capacity) : null,
                points: form.points ? parseInt(form.points) : null,
                published: form.published
            };

            if (isEdit) {
                await updateEvent(eventId, data);
                setSuccess('Event updated successfully!');
            } else {
                await createEvent(data);
                setSuccess('Event created successfully!');
                setTimeout(() => navigate('/manager/events'), 1500);
            }
        } catch (err) {
            setError(err.message || 'Failed to save event');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            setError('');
            await deleteEvent(eventId);
            navigate('/manager/events');
        } catch (err) {
            setError(err.message || 'Failed to delete event');
        }
    };

    const handleAddOrganizer = async (e) => {
        e.preventDefault();
        if (!organizerUtorid.trim()) return;

        try {
            setError('');
            await addOrganizer(eventId, organizerUtorid);
            setSuccess('Organizer added successfully');
            setOrganizerUtorid('');
            fetchEvent();
        } catch (err) {
            setError(err.message || 'Failed to add organizer');
        }
    };

    const handleRemoveOrganizer = async (userId) => {
        try {
            setError('');
            await removeOrganizer(eventId, userId);
            setSuccess('Organizer removed');
            fetchEvent();
        } catch (err) {
            setError(err.message || 'Failed to remove organizer');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/manager/events')}
                className="text-indigo-400 hover:text-indigo-300 mb-4 flex items-center gap-2"
            >
                <ArrowLeft size={18} />
                Back to Events
            </button>

            <h1 className="text-3xl font-bold text-white mb-2">
                {isEdit ? 'Edit Event' : 'Create Event'}
            </h1>
            <p className="text-slate-400 mb-8">
                {isEdit ? 'Update event details' : 'Create a new campus event'}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8">
                    <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />
                    <SuccessMessage message={success} className="mb-4" />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Event Name *
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g., Tech Talk: AI in Healthcare"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Describe the event..."
                                rows="4"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g., BA 1190"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Start Time *
                                </label>
                                <input
                                    type="datetime-local"
                                    value={form.startTime}
                                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                End Time *
                            </label>
                            <input
                                type="datetime-local"
                                value={form.endTime}
                                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Capacity *
                                </label>
                                <input
                                    type="number"
                                    value={form.capacity}
                                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g., 50"
                                    min="1"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Points *
                                </label>
                                <input
                                    type="number"
                                    value={form.points}
                                    onChange={(e) => setForm({ ...form, points: e.target.value })}
                                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g., 100"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                            <div>
                                <p className="text-white font-medium">Published</p>
                                <p className="text-slate-400 text-sm">Make this event visible to users</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.published}
                                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {saving && <LoadingSpinner size="sm" />}
                                <Save size={18} />
                                {saving ? 'Saving...' : (isEdit ? 'Update Event' : 'Create Event')}
                            </button>

                            {isEdit && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                                >
                                    <Trash2 size={18} />
                                    Delete
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Organizers Panel */}
                {isEdit && (
                    <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Organizers</h3>

                        <form onSubmit={handleAddOrganizer} className="mb-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={organizerUtorid}
                                    onChange={(e) => setOrganizerUtorid(e.target.value)}
                                    className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    placeholder="UTORid"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </form>

                        <div className="space-y-2">
                            {organizers.map((org) => (
                                <div key={org.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                    <div>
                                        <p className="text-white text-sm font-medium">{org.utorid}</p>
                                        <p className="text-slate-400 text-xs">{org.email}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveOrganizer(org.id)}
                                        className="p-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                            {organizers.length === 0 && (
                                <p className="text-slate-500 text-sm text-center py-4">No organizers yet</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventForm;
