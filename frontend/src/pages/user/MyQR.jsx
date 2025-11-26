import React from 'react';

const MyQR = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">My QR Code</h1>
                <p className="text-slate-600">Scan this code to earn points.</p>
            </div>

            <div className="flex justify-center py-12">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
                    <div className="w-64 h-64 bg-slate-100 rounded-lg mx-auto mb-4 flex items-center justify-center text-slate-400">
                        QR Code Placeholder
                    </div>
                    <p className="text-sm text-slate-500">Member ID: 1234-5678</p>
                </div>
            </div>
        </div>
    );
};

export default MyQR;
