import React, { useState } from 'react';
import { ShoppingCart, User, Plus } from 'lucide-react';
import { createTransaction } from '../../api/transactions';
import { getUserById } from '../../api/users';
import { listPromotions } from '../../api/promotions';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

const Purchase = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [points, setPoints] = useState('');
    const [description, setDescription] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSearchUser = async () => {
        if (!userId.trim()) {
            setError('Please enter a user ID');
            return;
        }

        try {
            setSearchLoading(true);
            setError('');
            const foundUser = await getUserById(userId);
            setUser(foundUser);
        } catch (err) {
            setError(err.message || 'User not found');
            setUser(null);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!user) {
            setError('Please search for a user first');
            return;
        }

        const pointChange = parseInt(points);
        if (isNaN(pointChange) || pointChange <= 0) {
            setError('Please enter a valid points amount');
            return;
        }

        try {
            setLoading(true);
            await createTransaction({
                type: 'purchase',
                userId: user.id,
                pointChange: pointChange,
                description: description || `Purchase at store`
            });

            setSuccess(`Successfully awarded ${pointChange} points to ${user.utorid}`);

            // Reset form
            setUser(null);
            setUserId('');
            setPoints('');
            setDescription('');
        } catch (err) {
            setError(err.message || 'Transaction failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Create Purchase</h1>
            <p className="text-slate-400 mb-8">Award points for customer purchase</p>

            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8">
                <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />
                <SuccessMessage message={success} className="mb-4" />

                {/* User Search */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Customer User ID or UTORid
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter user ID or utorid"
                            onKeyPress={(e) => e.key === 'Enter' && handleSearchUser()}
                        />
                        <button
                            onClick={handleSearchUser}
                            disabled={searchLoading}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {searchLoading && <LoadingSpinner size="sm" />}
                            Search
                        </button>
                    </div>
                </div>

                {/* User Info */}
                {user && (
                    <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                                <User className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-white font-semibold">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-slate-400 text-sm">UTORid: {user.utorid}</p>
                                <p className="text-indigo-400 text-sm font-semibold">
                                    Current Balance: {user.points} pts
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transaction Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Points to Award
                        </label>
                        <input
                            type="number"
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter points amount"
                            min="1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Purchase description..."
                            rows="3"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!user || loading}
                        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading && <LoadingSpinner size="sm" />}
                        <ShoppingCart size={18} />
                        {loading ? 'Processing...' : 'Award Points'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Purchase;
