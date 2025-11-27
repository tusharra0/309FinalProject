import React from 'react';

const OrganizerDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Organizer Dashboard</h1>
                <p className="text-slate-400">Manage your events and attendees.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-300">Upcoming Events</h3>
                    <p className="text-3xl font-bold text-indigo-400 mt-2">4</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-300">Total Attendees</h3>
                    <p className="text-3xl font-bold text-emerald-400 mt-2">156</p>
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;
