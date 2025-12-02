import React, { useState } from 'react';
import QRCodeComponent from 'qrcode.react';
import { Check, QrCode as QrCodeIcon } from 'lucide-react';
import { getTransactionById, processRedemption } from '../../api/transactions';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

const RedemptionsProcess = () => {
    const [transactionId, setTransactionId] = useState('');
    const [transaction, setTransaction] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSearchTransaction = async () => {
        if (!transactionId.trim()) {
            setError('Please enter a transaction ID');
            return;
        }

        try {
            setSearchLoading(true);
            setError('');
            setSuccess('');
            const data = await getTransactionById(transactionId);

            if (data.type !== 'redemption') {
                setError('This is not a redemption transaction');
                setTransaction(null);
                return;
            }

            if (data.processed) {
                setError('This redemption has already been processed');
                setTransaction(null);
                return;
            }

            setTransaction(data);
        } catch (err) {
            setError(err.message || 'Transaction not found');
            setTransaction(null);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleProcess = async () => {
        if (!transaction) return;

        try {
            setProcessing(true);
            setError('');
            await processRedemption(transaction.id);
            setSuccess(`Successfully processed redemption for ${transaction.user?.utorid}`);

            // Reset
            setTransaction(null);
            setTransactionId('');
        } catch (err) {
            setError(err.message || 'Failed to process redemption');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Process Redemption</h1>
            <p className="text-slate-400 mb-8">Complete customer redemption requests</p>

            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8">
                <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />
                <SuccessMessage message={success} className="mb-4" />

                {/* Transaction ID Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        <QrCodeIcon size={16} className="inline mr-1" />
                        Transaction ID (from QR code)
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter transaction ID"
                            onKeyPress={(e) => e.key === 'Enter' && handleSearchTransaction()}
                        />
                        <button
                            onClick={handleSearchTransaction}
                            disabled={searchLoading}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {searchLoading && <LoadingSpinner size="sm" />}
                            Lookup
                        </button>
                    </div>
                    <p className="text-slate-500 text-xs mt-2">
                        Scan customer's redemption QR code to get the transaction ID
                    </p>
                </div>

                {/* Transaction Details */}
                {transaction && (
                    <div className="space-y-6">
                        <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-slate-500 text-xs mb-1">Customer</p>
                                    <p className="text-white font-semibold">
                                        {transaction.user?.firstName} {transaction.user?.lastName}
                                    </p>
                                    <p className="text-slate-400 text-sm">{transaction.user?.utorid}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-500 text-xs mb-1">Redemption Value</p>
                                    <p className="text-red-400 font-bold text-2xl">
                                        {transaction.pointChange} pts
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-700">
                                <p className="text-slate-500 text-xs mb-1">Description</p>
                                <p className="text-white">{transaction.description}</p>
                            </div>

                            <div className="pt-4 border-t border-slate-700 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">Transaction ID</p>
                                        <p className="text-slate-300 text-sm">#{transaction.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-slate-500 text-xs mb-1">Created</p>
                                        <p className="text-slate-300 text-sm">
                                            {new Date(transaction.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleProcess}
                            disabled={processing}
                            className="w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {processing && <LoadingSpinner size="sm" />}
                            <Check size={20} />
                            {processing ? 'Processing...' : 'Complete Redemption'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RedemptionsProcess;
