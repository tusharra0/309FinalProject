import React from 'react';

const MyQR = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">My QR Code</h1>
                <p className="text-slate-400">Scan this code to earn points.</p>
            </div>

            <div className="flex justify-center py-12">
                <div className="bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800 text-center">
                    <div className="w-64 h-64 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center text-slate-900 font-bold">
                        QR Code Placeholder
                    </div>
                    <p className="text-sm text-slate-400">Member ID: 1234-5678</p>
                </div>
            </div>
        </div>
    );
};

export default MyQR;
