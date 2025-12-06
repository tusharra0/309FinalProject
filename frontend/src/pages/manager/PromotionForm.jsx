import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';
import { getPromotion, createPromotion, updatePromotion, deletePromotion } from '../../api/promotions';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const PromotionForm = () => {
    const { promotionId } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(promotionId);

    const [form, setForm] = useState({
        name: '',
        description: '',
        type: 'automatic',
        startTime: '',
        endTime: '',
        minSpending: '0',
        rate: '0',
        points: '0'
    });

    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (isEdit) {
            fetchPromotion();
        }
    }, [promotionId]);

    const fetchPromotion = async () => {
        try {
            setLoading(true);
            const data = await getPromotion(promotionId);
            setForm({
                name: data.name,
                description: data.description || '',
                type: data.type || 'automatic',
                startTime: new Date(data.startTime).toISOString().slice(0, 16),
                endTime: new Date(data.endTime).toISOString().slice(0, 16),
                minSpending: data.minSpending?.toString() || '0',
                rate: data.rate?.toString() || '0',
                points: data.points?.toString() || '0'
            });
        } catch (err) {
            setError(err.message || 'Failed to load promotion');
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
        const now = new Date();

        if (startTime <= now && !isEdit) {
            setError('Start time must be in the future');
            return;
        }

        if (startTime >= endTime) {
            setError('End time must be after start time');
            return;
        }

        try {
            setSaving(true);
            const data = {
                name: form.name,
                description: form.description || null,
                type: form.type,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                minSpending: form.minSpending ? parseFloat(form.minSpending) : 0,
                rate: form.rate ? parseFloat(form.rate) : 0,
                points: form.points ? parseInt(form.points) : 0
            };

            if (isEdit) {
                await updatePromotion(promotionId, data);
                setSuccess('Promotion updated successfully!');
            } else {
                await createPromotion(data);
                setSuccess('Promotion created successfully!');
                setTimeout(() => navigate('/manager/promotions'), 1500);
            }
        } catch (err) {
            setError(err.message || 'Failed to save promotion');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this promotion?')) return;

        try {
            setError('');
            await deletePromotion(promotionId);
            navigate('/manager/promotions');
        } catch (err) {
            setError(err.message || 'Failed to delete promotion');
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
        <div className="max-w-3xl mx-auto">
            <button
                onClick={() => navigate('/manager/promotions')}
                className="text-indigo-400 hover:text-indigo-300 mb-4 flex items-center gap-2"
            >
                <ArrowLeft size={18} />
                Back to Promotions
            </button>

            <h1 className="text-3xl font-bold text-white mb-2">
                {isEdit ? 'Edit Promotion' : 'Create Promotion'}
            </h1>
            <p className="text-slate-400 mb-8">
                {isEdit ? 'Update promotion details' : 'Create a new reward promotion'}
            </p>

            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8">
                <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />
                <SuccessMessage message={success} className="mb-4" />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Promotion Name *
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., Free Coffee"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Describe what this promotion offers..."
                            rows="4"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Type *
                            </label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="automatic">Automatic</option>
                                <option value="onetime">One Time</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Min Spending ($)
                            </label>
                            <input
                                type="number"
                                value={form.minSpending}
                                onChange={(e) => setForm({ ...form, minSpending: e.target.value })}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="0"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Bonus Rate (%)
                            </label>
                            <input
                                type="number"
                                value={form.rate}
                                onChange={(e) => setForm({ ...form, rate: e.target.value })}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="0"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Fixed Points Bonus
                            </label>
                            <input
                                type="number"
                                value={form.points}
                                onChange={(e) => setForm({ ...form, points: e.target.value })}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="0"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {saving && <LoadingSpinner size="sm" />}
                            <Save size={18} />
                            {saving ? 'Saving...' : (isEdit ? 'Update Promotion' : 'Create Promotion')}
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
        </div>
    );
};

export default PromotionForm;
