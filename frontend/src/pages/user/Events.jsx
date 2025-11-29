import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';

const Events = () => {
    // Mock data based on the inspiration image
    const events = [
        {
            id: 1,
            title: "Hackathon Night",
            location: "BA 2250",
            date: "Nov 10, 2025",
            time: "9:00 AM",
            guests: 45,
            maxGuests: 200,
            points: 50,
            status: "open", // open, confirmed
            image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "Exam Destress",
            location: "Student Commons",
            date: "Dec 5, 2025",
            time: "2:00 PM",
            guests: 50,
            maxGuests: 50,
            points: 100,
            status: "confirmed",
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            title: "Career Fair 2025",
            location: "Main Hall",
            date: "Jan 15, 2026",
            time: "10:00 AM",
            guests: 120,
            maxGuests: 500,
            points: 75,
            status: "open",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Events</h1>
                <div className="bg-slate-800 p-1 rounded-lg flex">
                    <button className="px-4 py-1.5 rounded-md bg-slate-700 text-white text-sm font-medium shadow-sm">All</button>
                    <button className="px-4 py-1.5 rounded-md text-slate-400 text-sm font-medium hover:text-white transition-colors">Joined</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="relative bg-slate-900 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col h-full border-l-4 border-indigo-500 border-y border-r border-slate-800">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                <div className="flex items-center text-slate-400 mt-1 text-sm">
                                    <MapPin size={16} className="mr-1" />
                                    {event.location}
                                </div>
                            </div>
                            <div className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20">
                                +{event.points} Pts
                            </div>
                        </div>

                        {/* Date & Time Blocks */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-800 rounded-xl p-3 flex items-center border border-slate-700">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mr-3">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</div>
                                    <div className="text-sm font-semibold text-slate-200">{event.date}</div>
                                </div>
                            </div>
                            <div className="bg-slate-800 rounded-xl p-3 flex items-center border border-slate-700">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mr-3">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Time</div>
                                    <div className="text-sm font-semibold text-slate-200">{event.time}</div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
                            <div className="flex items-center text-slate-400 text-sm">
                                <Users size={18} className="mr-2" />
                                <span className="font-medium text-slate-300">{event.guests}</span>
                                <span className="mx-1">/</span>
                                <span>{event.maxGuests} Guests</span>
                            </div>

                            {event.status === 'confirmed' ? (
                                <button className="bg-green-500/10 text-green-400 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center cursor-default border border-green-500/20">
                                    Confirmed
                                </button>
                            ) : (
                                <button className="bg-white hover:bg-slate-200 text-slate-900 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-white/5">
                                    RSVP Now
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
