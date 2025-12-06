import React, { useState, useEffect } from 'react';
import { QRCodeCanvas as QRCodeComponent } from 'qrcode.react';
import { RefreshCw } from 'lucide-react';
import { getMyTransactions } from '../../api/transactions';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const RedemptionQR = () => {
    const [redemptions, setRedemptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const formatDate = (dateString) => {
        try {
            if (!dateString) return new Date().toLocaleDateString();
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return new Date().toLocaleDateString();
            }
            return date.toLocaleDateString();
        } catch (err) {
            return new Date().toLocaleDateString();
        }
    };

    useEffect(() => {
        fetchRedemptions();
        // Poll every 10 seconds to check for processed redemptions
        const interval = setInterval(fetchRedemptions, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchRedemptions = async () => {
        try {
            setLoading(true);
            const data = await getMyTransactions({
                type: 'redemption',
                processed: false,
                limit: 10,
                orderBy: 'createdAt',
                order: 'desc'
            });
            setRedemptions(data.results || data.transactions || []);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to load redemptions');
        } finally {
            setLoading(false);
        }
    };

    if (loading && redemptions.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Redemption QR Codes</h1>
                    <p className="text-slate-400">Show these codes to cashier to complete redemption</p>
                </div>
                <button
                    onClick={fetchRedemptions}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />

            {redemptions.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <p className="text-slate-400 mb-2">No pending redemptions</p>
                    <p className="text-slate-500 text-sm">Create a redemption request to see QR codes here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {redemptions.map((redemption) => (
                        <div
                            key={redemption.id}
                            className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col items-center"
                        >
                            <div className="bg-white p-4 rounded-xl mb-4">
                                <QRCodeComponent
                                    value={JSON.stringify({ transactionId: redemption.id })}
                                    size={200}
                                    level="H"
                                />
                            </div>

                            <div className="text-center w-full">
                                <p className="text-white font-semibold mb-1">
                                    {redemption.remark || 'Redemption Request'}
                                </p>
                                <p className="text-red-400 font-bold text-lg mb-2">
                                    {Math.abs(redemption.amount || redemption.pointsDelta || 0)} points
                                </p>
                                <p className="text-slate-500 text-xs mb-1">
                                    Transaction ID: #{redemption.id}
                                </p>
                                <p className="text-slate-500 text-xs">
                                    Date: {formatDate(redemption.createdAt)}
                                </p>
                                <div className="mt-3 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full inline-block">
                                    <span className="text-orange-400 text-xs font-semibold">Pending</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                <p className="text-slate-400 text-sm">
                    💡 <strong>Tip:</strong> Show this QR code to a cashier to complete your redemption.
                    The code will disappear once processed.
                </p>
            </div>
        </div>
    );
};

export default RedemptionQR;
