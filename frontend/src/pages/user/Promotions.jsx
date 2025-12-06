import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users as UsersIcon } from 'lucide-react';
import { listPromotions } from '../../api/promotions';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const Promotions = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            const data = await listPromotions();
            setPromotions(data.results || data.promotions || []);
        } catch (err) {
            setError(err.message || 'Failed to load promotions');
        } finally {
            setLoading(false);
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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Promotions</h1>
                <p className="text-slate-400">Available reward promotions</p>
            </div>

            <ErrorMessage message={error} onClose={() => setError('')} />

            {promotions.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <p className="text-slate-400">No active promotions available</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promotions.map((promo) => (
                        <div
                            key={promo.id}
                            className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800 hover:border-indigo-500/50 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white">{promo.name}</h3>
                                <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                                    <span className="text-indigo-400 text-sm font-bold">{promo.points ?? promo.pointCost ?? 0} pts</span>
                                </div>
                            </div>

                            <p className="text-slate-300 text-sm mb-4">{promo.description}</p>

                            <div className="pt-4 border-t border-slate-800">
                                <span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold">
                                    Active
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Promotions;
