import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Check } from 'lucide-react';
import { createRedemptionRequest } from '../../api/transactions';
import { listPromotions } from '../../api/promotions';
import useUserStore from '../../store/userStore';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

const Redeem = () => {
    const navigate = useNavigate();
    const { user, refreshUser } = useUserStore();
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedPromos, setSelectedPromos] = useState(new Set());

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            const data = await listPromotions({ active: true });
            setPromotions(data.results || data.promotions || []);
        } catch (err) {
            setError(err.message || 'Failed to load promotions');
        } finally {
            setLoading(false);
        }
    };

    const togglePromotion = (promoId) => {
        const newSelected = new Set(selectedPromos);
        if (newSelected.has(promoId)) {
            newSelected.delete(promoId);
        } else {
            newSelected.add(promoId);
        }
        setSelectedPromos(newSelected);
    };

    const handleRedeemSelected = async () => {
        if (selectedPromos.size === 0) {
            setError('Please select at least one promotion');
            return;
        }

        const selectedPromotionsList = promotions.filter(p => selectedPromos.has(p.id));
        const totalCost = selectedPromotionsList.reduce((sum, p) => sum + (p.points || 0), 0);

        if (user?.points < totalCost) {
            setError('Insufficient points to redeem selected promotions');
            return;
        }

        try {
            setSubmitting(true);
            setError('');

            // Create redemption requests for each selected promotion
            for (const promo of selectedPromotionsList) {
                await createRedemptionRequest({
                    type: 'redemption',
                    amount: promo.points,
                    remark: `Redeem: ${promo.name}`
                });
            }

            // Refresh user data from server to get accurate points balance
            await refreshUser();

            setSuccess(`Successfully redeemed ${selectedPromos.size} promotion(s)!`);
            setSelectedPromos(new Set());
            
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

    const totalCost = Array.from(selectedPromos).reduce((sum, promoId) => {
        const promo = promotions.find(p => p.id === promoId);
        return sum + (promo?.points || 0);
    }, 0);

    const canRedeem = selectedPromos.size > 0 && (user?.points || 0) >= totalCost;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Redeem Points</h1>
                    <p className="text-slate-400">Select promotions to redeem</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-400">Your Balance</p>
                    <p className="text-3xl font-bold text-indigo-400">{user?.points || 0} pts</p>
                </div>
            </div>

            <ErrorMessage message={error} onClose={() => setError('')} />
            <SuccessMessage message={success} onClose={() => setSuccess('')} />

            {promotions.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <p className="text-slate-400">No active promotions available</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promotions.map((promo) => {
                            const isSelected = selectedPromos.has(promo.id);
                            const canAfford = (user?.points || 0) >= (promo.points || 0);

                            return (
                                <div
                                    key={promo.id}
                                    onClick={() => canAfford && togglePromotion(promo.id)}
                                    className={`relative rounded-2xl p-6 shadow-sm border-2 transition-all cursor-pointer ${
                                        isSelected
                                            ? 'border-indigo-500 bg-indigo-500/10'
                                            : canAfford
                                            ? 'border-slate-800 bg-slate-900 hover:border-indigo-500/50'
                                            : 'border-slate-800 bg-slate-900/50 opacity-60 cursor-not-allowed'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                                            <Check size={16} className="text-white" />
                                        </div>
                                    )}

                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-bold text-white pr-6">{promo.name}</h3>
                                        <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full whitespace-nowrap">
                                            <span className="text-indigo-400 text-sm font-bold">
                                                {promo.points || 0} pts
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-slate-300 text-sm mb-4">{promo.description}</p>

                                    <div className="pt-4 border-t border-slate-700">
                                        {!canAfford ? (
                                            <span className="inline-block px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs font-semibold">
                                                Insufficient Points
                                            </span>
                                        ) : (
                                            <span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold">
                                                Available
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {selectedPromos.size > 0 && (
                        <div className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96">
                            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-2xl">
                                <div className="mb-4">
                                    <p className="text-slate-400 text-sm mb-1">Selected Promotions</p>
                                    <p className="text-2xl font-bold text-white">{selectedPromos.size} item(s)</p>
                                    <p className="text-slate-300 text-sm mt-2">
                                        Total Cost: <span className="font-bold text-indigo-400">{totalCost} pts</span>
                                    </p>
                                </div>

                                <button
                                    onClick={handleRedeemSelected}
                                    disabled={!canRedeem || submitting}
                                    className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {submitting && <LoadingSpinner size="sm" />}
                                    <Gift size={20} />
                                    {submitting ? 'Redeeming...' : 'Redeem Selected'}
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Redeem;
