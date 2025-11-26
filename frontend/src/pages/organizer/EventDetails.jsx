import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const { eventId } = useParams();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Event Management</h1>
                <p className="text-slate-600">Managing Workshop #{eventId}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Attendee List</h2>
                <div className="space-y-2">
                    {[1, 2, 3].map((attendee) => (
                        <div key={attendee} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="font-medium text-slate-700">Attendee {attendee}</span>
                            <span className="text-sm text-emerald-600 font-medium">Confirmed</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
