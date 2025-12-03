import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useUserStore from '../store/userStore';
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
    const { token, role, logout } = useAuth();
    const { user, fetchUser } = useUserStore();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Fetch user data if token exists but user data is not loaded
    useEffect(() => {
        if (token && !user) {
            fetchUser().catch(console.error);
        }
    }, [token, user, fetchUser]);

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
                fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 
                transform transition-transform duration-300 ease-in-out 
                lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo Section */}
                <div className="p-4 flex flex-col items-center border-b border-slate-800 shrink-0">
                    <Link to="/" className="flex flex-col items-center gap-2">
                        <img src={logo} alt="Logo" className="h-12 w-auto object-contain drop-shadow-lg" />
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-full uppercase tracking-widest border border-slate-700">
                            {role}
                        </span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
                    <div className="space-y-1">
                        {getNavLinks().map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-all duration-200 font-medium group text-sm"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <link.icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* User Profile / Logout Section */}
                <div className="p-3 border-t border-slate-800 bg-slate-900/50 shrink-0">
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2 mb-1 hover:bg-slate-800 rounded-lg transition-colors"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <div className="w-8 h-8 bg-slate-800 text-purple-400 rounded-full flex items-center justify-center border border-slate-700">
                            <User size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">My Profile</p>
                            <p className="text-[10px] text-slate-500 truncate capitalize">{role}</p>
                        </div>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors text-xs font-medium"
                    >
                        <LogOut size={16} />
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
