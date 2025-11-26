import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const { userId } = useParams();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">User Details</h1>
                <p className="text-slate-600">Managing user #{userId}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 text-2xl font-bold">
                        U{userId}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">User Name {userId}</h2>
                        <p className="text-slate-500">user{userId}@example.com</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span className="text-slate-600">Phone</span>
                                <span className="font-medium text-slate-900">+1 234 567 8900</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span className="text-slate-600">Joined</span>
                                <span className="font-medium text-slate-900">Jan 15, 2025</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span className="text-slate-600">Status</span>
                                <span className="font-medium text-emerald-600">Active</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Points Summary</h3>
                        <div className="bg-slate-50 p-6 rounded-lg">
                            <div className="text-center">
                                <p className="text-sm text-slate-500 uppercase tracking-wide">Current Balance</p>
                                <p className="text-4xl font-bold text-indigo-600 mt-2">2,450</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
