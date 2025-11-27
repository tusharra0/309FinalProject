import React from 'react';
import { useParams } from 'react-router-dom';

const TransactionDetails = () => {
    const { transactionId } = useParams();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Transaction Details</h1>
                <p className="text-slate-400">Viewing transaction #{transactionId}</p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800 max-w-2xl">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-sm text-slate-400 uppercase tracking-wide">Transaction ID</p>
                        <p className="text-xl font-bold text-white">#{1000 + parseInt(transactionId)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-400 uppercase tracking-wide">Date</p>
                        <p className="text-lg font-medium text-white">Nov 26, 2025</p>
                    </div>
                </div>

                <div className="border-t border-b border-slate-800 py-6 my-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="text-slate-400">User</span>
                        <span className="font-medium text-white">John Doe</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Type</span>
                        <span className="font-medium text-white">Purchase</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Status</span>
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">Completed</span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total Amount</span>
                    <span className="text-white">$25.00</span>
                </div>
                <div className="flex justify-between items-center text-sm text-indigo-400 mt-2">
                    <span>Points Earned</span>
                    <span>+250 pts</span>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
