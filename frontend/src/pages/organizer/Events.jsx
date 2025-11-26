import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Events</h1>
                    <p className="text-slate-600">Events you are organizing.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((item) => (
                    <div key={item} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Workshop {item}</h3>
                        <p className="text-slate-600 mb-4">Dec {15 + item}, 2025 • Room 101</p>
                        <Link to={`/organizer/events/${item}`} className="text-indigo-600 hover:text-indigo-800 font-medium">Manage Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
