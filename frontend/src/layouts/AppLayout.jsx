import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LogOut,
    User,
    Menu,
    X,
    LayoutDashboard,
    QrCode,
    ArrowRightLeft,
    Gift,
    Calendar,
    CreditCard,
    Users,
    Tag,
    Shield
} from 'lucide-react';

import logo from '../assets/logo.png';

const AppLayout = () => {
    const { role, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const getNavLinks = () => {
        const normalizedRole = (role || '').toLowerCase();
        switch (normalizedRole) {
            case 'regular':
            case 'user':
                return [
                    { to: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { to: '/user/my-qr', label: 'My QR', icon: QrCode },
                    { to: '/user/transfer', label: 'Transfer Points', icon: ArrowRightLeft },
                    { to: '/user/redeem', label: 'Redeem', icon: Gift },
                    { to: '/user/redemption-qr', label: 'Redemption QR', icon: QrCode },
                    { to: '/user/promotions', label: 'Promotions', icon: Tag },
                    { to: '/user/events', label: 'Events', icon: Calendar },
                    { to: '/user/transactions', label: 'Transactions', icon: CreditCard },
                ];
            case 'cashier':
                return [
                    { to: '/cashier/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { to: '/cashier/purchase', label: 'Purchase', icon: CreditCard },
                    { to: '/cashier/redemptions/process', label: 'Process Redemption', icon: Gift },
                ];
            case 'manager':
                return [
                    { to: '/manager/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { to: '/manager/users', label: 'Users', icon: Users },
                    { to: '/manager/transactions', label: 'Transactions', icon: CreditCard },
                    { to: '/manager/promotions', label: 'Promotions', icon: Tag },
                    { to: '/manager/events', label: 'Events', icon: Calendar },
                ];
            case 'organizer':
                return [
                    { to: '/organizer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { to: '/organizer/events', label: 'Events', icon: Calendar },
                ];
            case 'superuser':
                return [
                    { to: '/superuser/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { to: '/superuser/roles', label: 'Roles', icon: Shield },
                ];
            default:
                return [];
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg border border-slate-800 shadow-lg"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 
                transform transition-transform duration-300 ease-in-out 
                lg:translate-x-0 lg:static flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo Section */}
                <div className="p-8 flex flex-col items-center border-b border-slate-800">
                    <Link to="/" className="flex flex-col items-center gap-4">
                        <img src={logo} alt="Logo" className="h-24 w-auto object-contain drop-shadow-lg" />
                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full uppercase tracking-widest border border-slate-700">
                            {role}
                        </span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <div className="space-y-2">
                        {getNavLinks().map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-200 font-medium group"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <link.icon size={22} className="group-hover:scale-110 transition-transform duration-200" />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* User Profile / Logout Section */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 mb-2 hover:bg-slate-800 rounded-xl transition-colors"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <div className="w-10 h-10 bg-slate-800 text-purple-400 rounded-full flex items-center justify-center border border-slate-700">
                            <User size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">My Profile</p>
                            <p className="text-xs text-slate-500 truncate capitalize">{role}</p>
                        </div>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors text-sm font-medium"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 bg-slate-950">
                <div className="p-4 lg:p-8 pt-20 lg:pt-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AppLayout;
