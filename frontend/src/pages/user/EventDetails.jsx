import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const { eventId } = useParams();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Event Details</h1>
                <p className="text-slate-600">Viewing event #{eventId}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="h-64 bg-slate-100 rounded-lg mb-6 flex items-center justify-center text-slate-400">
                    Event Banner
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Community Meetup</h2>
                <div className="flex gap-4 text-sm text-slate-500 mb-6">
                    <span>📅 Dec 15, 2025</span>
                    <span>📍 Main Hall</span>
                    <span>👥 50 spots left</span>
                </div>
                <div className="prose max-w-none text-slate-600">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="mt-8">
                    <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">
                        Register for Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
