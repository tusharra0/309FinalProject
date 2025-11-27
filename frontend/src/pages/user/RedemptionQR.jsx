import React from 'react';

const RedemptionQR = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Redemption QR</h1>
                <p className="text-slate-400">Show this code to a cashier to redeem your reward.</p>
            </div>

            <div className="flex justify-center py-12">
                <div className="bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800 text-center">
                    <div className="w-64 h-64 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center text-slate-900 font-bold">
                        QR Code Placeholder
                    </div>
                    <p className="text-lg font-bold text-white">Coffee Voucher</p>
                    <p className="text-sm text-slate-400">Expires in 24 hours</p>
                </div>
            </div>
        </div>
    );
};

export default RedemptionQR;
