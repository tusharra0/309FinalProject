import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { createRedemptionRequest } from '../../api/transactions';
import { listPromotions } from '../../api/promotions';
import useUserStore from '../../store/userStore';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

const Redeem = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useUserStore();
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            const data = await listPromotions({ active: true });
            setPromotions(data.promotions || []);
        } catch (err) {
            setError(err.message || 'Failed to load promotions');
        } finally {
            setLoading(false);
        }
    };

    const handleRedeem = async () => {
        if (!selectedPromotion) {
            setError('Please select a promotion');
            return;
        }

        if (user?.points < selectedPromotion.pointCost) {
            setError('Insufficient points for this promotion');
            return;
        }

        try {
            setSubmitting(true);
            setError('');
            const transaction = await createRedemptionRequest({
                pointChange: -selectedPromotion.pointCost,
                description: `Redeem: ${selectedPromotion.name}`,
                promotionId: selectedPromotion.id
            });

            // Update local balance
            updateUser({ points: user.points - selectedPromotion.pointCost });

            setSuccess('Redemption request created successfully!');
            setTimeout(() => {
                navigate(`/user/redemption-qr`);
            }, 1500);
        } catch (err) {
            setError(err.message || 'Redemption failed');
        } finally {
            setSubmitting(false);
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
            <h1 className="text-3xl font-bold text-white mb-2">Redeem Points</h1>
            <p className="text-slate-400 mb-2">Choose a promotion to redeem your points</p>
            <p className="text-indigo-400 font-semibold mb-8">Your balance: {user?.points || 0} points</p>

            <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />
            <SuccessMessage message={success} className="mb-4" />

            {promotions.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <p className="text-slate-400">No active promotions available at the moment.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {promotions.map((promo) => (
                            <div
                                key={promo.id}
                                onClick={() => setSelectedPromotion(promo)}
                                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedPromotion?.id === promo.id
                                        ? 'border-indigo-500 bg-indigo-500/10'
                                        : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-bold text-white">{promo.name}</h3>
                                    <div className="px-3 py-1 bg-indigo-600 rounded-full">
                                        <span className="text-white text-sm font-bold">{promo.pointCost} pts</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm">{promo.description}</p>
                                {user?.points < promo.pointCost && (
                                    <p className="text-red-400 text-xs mt-2">Insufficient points</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                        <button
                            onClick={handleRedeem}
                            disabled={!selectedPromotion || submitting || (user?.points < selectedPromotion?.pointCost)}
                            className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting && <LoadingSpinner size="sm" />}
                            <Gift size={20} />
                            {submitting ? 'Processing...' : 'Redeem Selected Promotion'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Redeem;
