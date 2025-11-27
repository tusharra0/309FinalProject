import React from 'react';

const RedemptionsProcess = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Process Redemption</h1>
                <p className="text-slate-400">Scan customer QR code to redeem rewards.</p>
            </div>

            <div className="max-w-md bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800 text-center">
                <div className="w-full h-64 bg-slate-800 rounded-lg mb-4 flex items-center justify-center text-slate-500">
                    Camera / Scanner View
                </div>
                <p className="text-sm text-slate-400 mb-4">Align QR code within the frame</p>
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-500 transition-colors">
                    Verify Code
                </button>
            </div>
        </div>
    );
};

export default RedemptionsProcess;
