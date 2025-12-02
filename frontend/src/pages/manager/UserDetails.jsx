import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { getUserById, updateUserById } from '../../api/users';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const UserDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        role: '',
        verified: false,
        active: true
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getUserById(userId);
            setUser(data);
            setForm({
                role: data.role,
                verified: data.verified,
                active: data.active
            });
        } catch (err) {
            setError(err.message || 'Failed to load user');
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
            await updateUserById(userId, form);
            setSuccess('User updated successfully!');
            fetchUser();
        } catch (err) {
            setError(err.message || 'Failed to update user');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-400">User not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <button
                onClick={() => navigate('/manager/users')}
                className="text-indigo-400 hover:text-indigo-300 mb-4 flex items-center gap-2"
            >
                <ArrowLeft size={18} />
                Back to Users
            </button>

            <h1 className="text-3xl font-bold text-white mb-2">User Details</h1>
            <p className="text-slate-400 mb-8">View and edit user information</p>

            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8">
                <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />
                <SuccessMessage message={success} className="mb-4" />

                {/* Read-only Info */}
                <div className="mb-8 p-6 bg-slate-800 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-500 text-xs mb-1">User ID</p>
                            <p className="text-white font-medium">#{user.id}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs mb-1">UTORid</p>
                            <p className="text-white font-medium">{user.utorid}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs mb-1">Name</p>
                            <p className="text-white font-medium">{user.firstName} {user.lastName}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs mb-1">Email</p>
                            <p className="text-white font-medium">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs mb-1">Points Balance</p>
                            <p className="text-indigo-400 font-bold text-xl">{user.points}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs mb-1">Created</p>
                            <p className="text-slate-300 text-sm">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Editable Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Role
                        </label>
                        <select
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="regular">Regular User</option>
                            <option value="cashier">Cashier</option>
                            <option value="manager">Manager</option>
                            <option value="organizer">Event Organizer</option>
                            <option value="superuser">Superuser</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div>
                            <p className="text-white font-medium">Email Verified</p>
                            <p className="text-slate-400 text-sm">User has verified their email address</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.verified}
                                onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div>
                            <p className="text-white font-medium">Account Active</p>
                            <p className="text-slate-400 text-sm">User can access the system</p>
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

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {saving && <LoadingSpinner size="sm" />}
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserDetails;
