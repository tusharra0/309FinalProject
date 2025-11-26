import React from 'react';

const Redeem = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Redeem Rewards</h1>
                <p className="text-slate-600">Use your points for exclusive items.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                            Reward Image
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900">Reward Item {item}</h3>
                            <p className="text-indigo-600 font-bold mt-1">500 Points</p>
                            <button className="w-full mt-4 bg-white border border-indigo-600 text-indigo-600 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                                Redeem
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Redeem;
