import React from 'react';
import { useParams } from 'react-router-dom';

const TransactionDetails = () => {
    const { transactionId } = useParams();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Transaction Details</h1>
                <p className="text-slate-600">Viewing transaction #{transactionId}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-2xl">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-sm text-slate-500 uppercase tracking-wide">Transaction ID</p>
                        <p className="text-xl font-bold text-slate-900">#{1000 + parseInt(transactionId)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500 uppercase tracking-wide">Date</p>
                        <p className="text-lg font-medium text-slate-900">Nov 26, 2025</p>
                    </div>
                </div>

                <div className="border-t border-b border-slate-100 py-6 my-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="text-slate-600">User</span>
                        <span className="font-medium text-slate-900">John Doe</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600">Type</span>
                        <span className="font-medium text-slate-900">Purchase</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600">Status</span>
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">Completed</span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount</span>
                    <span>$25.00</span>
                </div>
                <div className="flex justify-between items-center text-sm text-indigo-600 mt-2">
                    <span>Points Earned</span>
                    <span>+250 pts</span>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
