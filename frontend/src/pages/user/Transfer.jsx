import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, User } from 'lucide-react';
import { createTransfer } from '../../api/transactions';
import { searchUser } from '../../api/users';
import useUserStore from '../../store/userStore';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

const Transfer = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useUserStore();
    const [recipientId, setRecipientId] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSearchRecipient = async () => {
        if (!recipientId.trim()) {
            setError('Please enter  a recipient ID');
            return;
        }

        try {
            setSearchLoading(true);
            setError('');
            // Try searching by ID first, if not a number, search by utorid
            const query = isNaN(recipientId) ? { utorid: recipientId } : { id: recipientId };
            const foundUser = await searchUser(query);
            setRecipient(foundUser);
        } catch (err) {
            setError(err.message || 'User not found');
            setRecipient(null);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!recipient) {
            setError('Please search for a recipient first');
            return;
        }

        const points = parseInt(amount);
        if (isNaN(points) || points <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        if (points > user?.points) {
            setError('Insufficient points');
            return;
        }

        try {
            setLoading(true);
            await createTransfer(recipient.id, {
                amount: points,
                remark: description || `Transfer to ${recipient.utorid}`
            });

            // Update local points balance
            updateUser({ points: user.points - points });

            setSuccess(`Successfully transferred ${points} points to ${recipient.utorid}`);
            setTimeout(() => navigate('/user/transactions'), 2000);
        } catch (err) {
            setError(err.message || 'Transfer failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Transfer Points</h1>
            <p className="text-slate-400 mb-8">Send points to another user</p>

            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8">
                <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />
                <SuccessMessage message={success} className="mb-4" />

                {/* Recipient Search */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Recipient User ID or UTORid
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={recipientId}
                            onChange={(e) => setRecipientId(e.target.value)}
                            className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter user ID or utorid"
                            onKeyPress={(e) => e.key === 'Enter' && handleSearchRecipient()}
                        />
                        <button
                            onClick={handleSearchRecipient}
                            disabled={searchLoading}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {searchLoading && <LoadingSpinner size="sm" />}
                            Search
                        </button>
                    </div>
                </div>

                {/* Recipient Info */}
                {recipient && (
                    <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                                <User className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-white font-semibold">
                                    {recipient.firstName} {recipient.lastName}
                                </p>
                                <p className="text-slate-400 text-sm">UTORid: {recipient.utorid}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transfer Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter amount"
                            min="1"
                            required
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            Your balance: {user?.points || 0} points
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Add a note..."
                            rows="3"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!recipient || loading}
                        className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading && <LoadingSpinner size="sm" />}
                        <Send size={18} />
                        {loading ? 'Transferring...' : 'Transfer Points'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Transfer;
