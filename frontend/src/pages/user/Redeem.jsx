import React from 'react';

const Redeem = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Redeem Rewards</h1>
                <p className="text-slate-400">Use your points for exclusive items.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                        <div className="h-48 bg-slate-800 flex items-center justify-center text-slate-500">
                            Reward Image
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-white">Reward Item {item}</h3>
                            <p className="text-indigo-400 font-bold mt-1">500 Points</p>
                            <button className="w-full mt-4 bg-slate-950 border border-indigo-500 text-indigo-400 py-2 rounded-lg font-medium hover:bg-indigo-500/10 transition-colors">
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
