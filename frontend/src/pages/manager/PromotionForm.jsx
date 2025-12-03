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
        pointCost: '',
        active: true
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
                description: data.description,
                pointCost: data.pointCost,
                active: data.active
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

        try {
            setSaving(true);
            const data = {
                ...form,
                pointCost: parseInt(form.pointCost)
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
                            Description *
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Describe what this promotion offers..."
                            rows="4"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Point Cost *
                        </label>
                        <input
                            type="number"
                            value={form.pointCost}
                            onChange={(e) => setForm({ ...form, pointCost: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., 100"
                            min="1"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div>
                            <p className="text-white font-medium">Active</p>
                            <p className="text-slate-400 text-sm">Make this promotion available to users</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.active}
                                onChange={(e) => setForm({ ...form, active: e.target.checked })}
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
