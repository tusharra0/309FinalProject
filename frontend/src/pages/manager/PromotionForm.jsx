import React from 'react';
import { useParams } from 'react-router-dom';

const PromotionForm = () => {
    const { promoId } = useParams();
    const isEdit = !!promoId;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">{isEdit ? 'Edit Promotion' : 'New Promotion'}</h1>
                <p className="text-slate-400">{isEdit ? `Editing promotion #${promoId}` : 'Create a new marketing campaign.'}</p>
            </div>

            <div className="max-w-2xl bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Campaign Name</label>
                        <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500" placeholder="e.g. Summer Sale" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Start Date</label>
                            <input type="date" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">End Date</label>
                            <input type="date" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                        <textarea className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500" rows="4" placeholder="Campaign details..."></textarea>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" className="px-6 py-2 border border-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors">
                            {isEdit ? 'Update Promotion' : 'Create Promotion'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PromotionForm;
