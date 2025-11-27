import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Events</h1>
                    <p className="text-slate-400">Manage community events.</p>
                </div>
                <Link to="/manager/events/new" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors">
                    Create Event
                </Link>
            </div>

            <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-300">Event Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Location</th>
                            <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {[1, 2, 3].map((item) => (
                            <tr key={item} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-medium text-white">Community Meetup {item}</td>
                                <td className="px-6 py-4 text-slate-400">Dec {10 + item}, 2025</td>
                                <td className="px-6 py-4 text-slate-400">Main Hall</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium border border-indigo-500/20">Upcoming</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/manager/events/${item}`} className="text-indigo-400 hover:text-indigo-300 font-medium">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Events;
