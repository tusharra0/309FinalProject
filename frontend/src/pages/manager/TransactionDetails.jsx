import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, DollarSign } from 'lucide-react';
import { getTransactionById, markTransactionSuspicious, createTransaction } from '../../api/transactions';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const TransactionDetails = () => {
    const { transactionId } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [adjustmentAmount, setAdjustmentAmount] = useState('');
    const [adjustmentDescription, setAdjustmentDescription] = useState('');
    const [adjustmentLoading, setAdjustmentLoading] = useState(false);

    useEffect(() => {
        fetchTransaction();
    }, [transactionId]);

    const fetchTransaction = async () => {
        try {
            setLoading(true);
            const data = await getTransactionById(transactionId);
            setTransaction(data);
        } catch (err) {
            setError(err.message || 'Failed to load transaction');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleSuspicious = async () => {
        try {
            setError('');
            await markTransactionSuspicious(transactionId, !transaction.suspicious);
            setSuccess(`Transaction ${!transaction.suspicious ? 'flagged as' : 'unflagged from'} suspicious`);
            fetchTransaction();
        } catch (err) {
            setError(err.message || 'Failed to update transaction');
        }
    };

    const handleCreateAdjustment = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            setAdjustmentLoading(true);
            await createTransaction({
                type: 'adjustment',
                userId: transaction.user.id,
                pointChange: parseInt(adjustmentAmount),
                description: adjustmentDescription || `Adjustment for transaction #${transactionId}`
            });

            setSuccess('Adjustment transaction created successfully!');
            setAdjustmentAmount('');
            setAdjustmentDescription('');
        } catch (err) {
            setError(err.message || 'Failed to create adjustment');
        } finally {
            setAdjustmentLoading(false);
        }
    };

    const getTypeBadge = (type) => {
        const colors = {
            purchase: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            transfer: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            redemption: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
            event: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            adjustment: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        };
        return colors[type] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    if (!transaction) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-400">Transaction not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/manager/transactions')}
                className="text-indigo-400 hover:text-indigo-300 mb-4 flex items-center gap-2"
            >
                <ArrowLeft size={18} />
                Back to Transactions
            </button>

            <h1 className="text-3xl font-bold text-white mb-2">Transaction Details</h1>
            <p className="text-slate-400 mb-8">Transaction #{transactionId}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Transaction Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8">
                        <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />
                        <SuccessMessage message={success} className="mb-4" />

                        {/* Main Info */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold border capitalize ${getTypeBadge(transaction.type)}`}>
                                    {transaction.type}
                                </span>
                                {(() => {
                                    const val = transaction.amount ?? transaction.sent ?? transaction.awarded ?? transaction.pointChange ?? 0;
                                    const positive = Number(val) > 0;
                                    return (
                                        <p className={`text-3xl font-bold ${positive ? 'text-emerald-400' : 'text-slate-300'}`}>
                                            {positive ? '+' : ''}{val} pts
                                        </p>
                                    );
                                })()}
                            </div>

                            <p className="text-slate-300 text-lg">{transaction.description}</p>
                        </div>

                        {/* User Details */}
                        <div className="grid grid-cols-2 gap-4 p-6 bg-slate-800 rounded-xl border border-slate-700 mb-6">
                            <div>
                                <p className="text-slate-500 text-xs mb-1">User</p>
                                <p className="text-white font-semibold">{transaction.user?.utorid || 'N/A'}</p>
                                <p className="text-slate-400 text-sm">{transaction.user?.email || ''}</p>
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs mb-1">Date</p>
                                <p className="text-white font-semibold">
                                    {new Date(transaction.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-slate-400 text-sm">
                                    {new Date(transaction.createdAt).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>

                        {/* Related User (for transfers) */}
                        {transaction.relatedUser && (
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
                                <p className="text-blue-400 text-xs font-semibold mb-1">
                                    {transaction.pointChange > 0 ? 'FROM' : 'TO'}
                                </p>
                                <p className="text-white font-medium">{transaction.relatedUser.utorid}</p>
                                <p className="text-slate-300 text-sm">{transaction.relatedUser.email}</p>
                            </div>
                        )}

                        {/* Status Flags */}
                        <div className="space-y-3">
                            {transaction.type === 'redemption' && (
                                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                                    <span className="text-white font-medium">Processed</span>
                                    {transaction.processed ? (
                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/20">
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-semibold border border-orange-500/20">
                                            Pending
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-red-400" />
                                    <span className="text-white font-medium">Suspicious</span>
                                </div>
                                <button
                                    onClick={handleToggleSuspicious}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${transaction.suspicious
                                        ? 'bg-red-600 hover:bg-red-500 text-white'
                                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                                        }`}
                                >
                                    {transaction.suspicious ? 'Unflag' : 'Flag as Suspicious'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Adjustment Panel */}
                <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <DollarSign size={20} className="text-yellow-400" />
                        Create Adjustment
                    </h3>

                    <form onSubmit={handleCreateAdjustment} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Amount *
                            </label>
                            <input
                                type="number"
                                value={adjustmentAmount}
                                onChange={(e) => setAdjustmentAmount(e.target.value)}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g., -50 or 100"
                                required
                            />
                            <p className="text-slate-500 text-xs mt-1">
                                Use negative for deduction, positive for addition
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Reason
                            </label>
                            <textarea
                                value={adjustmentDescription}
                                onChange={(e) => setAdjustmentDescription(e.target.value)}
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                rows="3"
                                placeholder="Reason for adjustment..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={adjustmentLoading}
                            className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {adjustmentLoading && <LoadingSpinner size="sm" />}
                            Create Adjustment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
