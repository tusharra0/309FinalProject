import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const { eventId } = useParams();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Event Management</h1>
                <p className="text-slate-400">Managing Workshop #{eventId}</p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800">
                <h2 className="text-xl font-bold text-white mb-4">Attendee List</h2>
                <div className="space-y-2">
                    {[1, 2, 3].map((attendee) => (
                        <div key={attendee} className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="font-medium text-slate-300">Attendee {attendee}</span>
                            <span className="text-sm text-emerald-400 font-medium">Confirmed</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
