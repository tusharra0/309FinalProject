import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Trash2, Plus, X, Calendar, MapPin, Type, Users, Award, Clock } from 'lucide-react';
import { getEvent, createEvent, updateEvent, deleteEvent, addOrganizer, removeOrganizer } from '../../api/events';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const EventForm = ({ basePath = '/manager' }) => {
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
                setTimeout(() => navigate(`${basePath}/events`), 1500);
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
            navigate(`${basePath}/events`);
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
            <div className="flex items-center justify-center h-screen bg-slate-950">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <button
                        onClick={() => navigate(`${basePath}/events`)}
                        className="text-indigo-400 hover:text-indigo-300 mb-2 flex items-center gap-2 transition-colors duration-200"
                    >
                        <ArrowLeft size={18} />
                        Back to Events
                    </button>
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        {isEdit ? 'Edit Event' : 'Create New Event'}
                    </h1>
                    <p className="text-slate-400 mt-1 text-lg">
                        {isEdit ? 'Update event details and manage organizers' : 'Set up a new campus event'}
                    </p>
                </div>
                {isEdit && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-semibold transition-all border border-red-500/20 flex items-center gap-2 group backdrop-blur-sm"
                    >
                        <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                        Delete Event
                    </button>
                )}
            </div>

            <ErrorMessage message={error} onClose={() => setError('')} className="mb-6 transform hover:scale-[1.01] transition-transform" />
            <SuccessMessage message={success} className="mb-6 transform hover:scale-[1.01] transition-transform" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-xl">
                        <div className="space-y-8">
                            {/* Basic Info Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                        <Type size={20} />
                                    </div>
                                    Basic Information
                                </h3>

                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1 group-focus-within:text-indigo-400 transition-colors">
                                            Event Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-3.5 pl-11 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                                                placeholder="e.g., Tech Talk: AI in Healthcare"
                                                required
                                            />
                                            <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1 group-focus-within:text-indigo-400 transition-colors">
                                            Description
                                        </label>
                                        <textarea
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-y min-h-[120px]"
                                            placeholder="Describe the event, agenda, and what to expect..."
                                            rows="4"
                                            required
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1 group-focus-within:text-indigo-400 transition-colors">
                                            Location
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={form.location}
                                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                                className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-3.5 pl-11 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                                placeholder="e.g., BA 1190 or Zoom Link"
                                                required
                                            />
                                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-800/50" />

                            {/* Schedule Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
                                        <Clock size={20} />
                                    </div>
                                    Schedule & Capacity
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1 group-focus-within:text-pink-400 transition-colors">
                                            Start Time
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="datetime-local"
                                                value={form.startTime}
                                                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                                                className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-3.5 pl-11 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all [color-scheme:dark]"
                                                required
                                            />
                                            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1 group-focus-within:text-pink-400 transition-colors">
                                            End Time
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="datetime-local"
                                                value={form.endTime}
                                                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                                                className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-3.5 pl-11 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all [color-scheme:dark]"
                                                required
                                            />
                                            <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1 group-focus-within:text-pink-400 transition-colors">
                                            Max Capacity
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={form.capacity}
                                                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                                                className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-3.5 pl-11 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
                                                placeholder="e.g., 50"
                                                min="1"
                                                required
                                            />
                                            <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-medium text-slate-300 mb-2 ml-1 group-focus-within:text-emerald-400 transition-colors">
                                            Points Reward
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={form.points}
                                                onChange={(e) => setForm({ ...form, points: e.target.value })}
                                                className="w-full rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-3.5 pl-11 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                                                placeholder="e.g., 100"
                                                min="0"
                                                required
                                            />
                                            <Award size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row gap-6 items-center justify-between">
                            <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800 w-full md:w-auto">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.published}
                                        onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500 hover:bg-slate-600 transition-colors"></div>
                                </label>
                                <div>
                                    <p className="text-white font-medium">Published</p>
                                    <p className="text-slate-400 text-sm">Visible to all users</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                            >
                                {saving ? (
                                    <LoadingSpinner size="sm" />
                                ) : (
                                    <>
                                        <Save size={20} />
                                        {isEdit ? 'Save Changes' : 'Create Event'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sidebar - Organizers */}
                {isEdit && (
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 shadow-xl sticky top-8">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                                    <Users size={20} />
                                </div>
                                Organizers
                            </h3>

                            <form onSubmit={handleAddOrganizer} className="mb-6">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={organizerUtorid}
                                        onChange={(e) => setOrganizerUtorid(e.target.value)}
                                        className="flex-1 rounded-xl bg-slate-950/50 border border-slate-700/50 px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm transition-all"
                                        placeholder="Add UTORid..."
                                    />
                                    <button
                                        type="submit"
                                        className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </form>

                            <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-2 custom-scrollbar">
                                {organizers.map((org) => (
                                    <div key={org.id} className="group flex items-center justify-between p-4 bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all">
                                        <div className="min-w-0">
                                            <p className="text-white text-sm font-semibold truncate">{org.utorid}</p>
                                            <p className="text-slate-400 text-xs truncate">{org.email}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveOrganizer(org.id)}
                                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            title="Remove Organizer"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {organizers.length === 0 && (
                                    <div className="text-center py-8 px-4 border-2 border-dashed border-slate-800 rounded-2xl">
                                        <Users size={32} className="mx-auto text-slate-700 mb-2" />
                                        <p className="text-slate-500 text-sm">No additional organizers</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventForm;
