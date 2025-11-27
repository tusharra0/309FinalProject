import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">My Events</h1>
                    <p className="text-slate-400">Events you are organizing.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((item) => (
                    <div key={item} className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
                        <h3 className="text-xl font-bold text-white mb-2">Workshop {item}</h3>
                        <p className="text-slate-400 mb-4">Dec {15 + item}, 2025 • Room 101</p>
                        <Link to={`/organizer/events/${item}`} className="text-indigo-400 hover:text-indigo-300 font-medium">Manage Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
