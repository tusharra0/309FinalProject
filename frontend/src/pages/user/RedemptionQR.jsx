import React from 'react';

const RedemptionQR = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Redemption QR</h1>
                <p className="text-slate-600">Show this code to a cashier to redeem your reward.</p>
            </div>

            <div className="flex justify-center py-12">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
                    <div className="w-64 h-64 bg-slate-100 rounded-lg mx-auto mb-4 flex items-center justify-center text-slate-400">
                        QR Code Placeholder
                    </div>
                    <p className="text-lg font-bold text-slate-900">Coffee Voucher</p>
                    <p className="text-sm text-slate-500">Expires in 24 hours</p>
                </div>
            </div>
        </div>
    );
};

export default RedemptionQR;
