import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Upcoming Events</h1>
                <p className="text-slate-600">Join us for exclusive community events.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map((item) => (
                    <Link key={item} to={`/user/events/${item}`} className="group block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                            Event Image
                        </div>
                        <div className="p-4">
                            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">Dec 15, 2025</div>
                            <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">Community Meetup</h3>
                            <p className="text-sm text-slate-500 mt-2 line-clamp-2">Join us for a fun evening of networking and games. Refreshments provided!</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Events;
