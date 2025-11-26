import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Events</h1>
                    <p className="text-slate-600">Manage community events.</p>
                </div>
                <Link to="/manager/events/new" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Create Event
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Event Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Location</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[1, 2, 3].map((item) => (
                            <tr key={item} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">Community Meetup {item}</td>
                                <td className="px-6 py-4 text-slate-600">Dec {10 + item}, 2025</td>
                                <td className="px-6 py-4 text-slate-600">Main Hall</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">Upcoming</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/manager/events/${item}`} className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</Link>
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
