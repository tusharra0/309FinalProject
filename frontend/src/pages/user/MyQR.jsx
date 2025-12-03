import React from 'react';
import { QRCodeCanvas as QRCodeComponent } from 'qrcode.react';
import { Download } from 'lucide-react';
import useUserStore from '../../store/userStore';

const MyQR = () => {
    const { user } = useUserStore();

    const downloadQR = () => {
        const canvas = document.getElementById('user-qr-code');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `${user?.utorid || 'user'}-qr-code.png`;
            link.href = url;
            link.click();
        }
    };

    const qrData = JSON.stringify({
        userId: user?.id,
        utorid: user?.utorid
    });

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">My QR Code</h1>
            <p className="text-slate-400 mb-8">Share this QR code for point transactions</p>

            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8">
                <div className="flex flex-col items-center">
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                        <QRCodeComponent
                            id="user-qr-code"
                            value={qrData}
                            size={256}
                            level="H"
                            includeMargin
                        />
                    </div>

                    <div className="text-center mb-6">
                        <p className="text-white font-semibold text-lg mb-1">{user?.firstName} {user?.lastName}</p>
                        <p className="text-slate-400 text-sm">UTORid: {user?.utorid}</p>
                        <p className="text-slate-500 text-xs mt-2">User ID: {user?.id}</p>
                    </div>

                    <button
                        onClick={downloadQR}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <Download size={18} />
                        Download QR Code
                    </button>

                    <p className="text-slate-500 text-sm mt-6 max-w-md text-center">
                        Show this QR code at participating locations to receive or transfer points.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyQR;
