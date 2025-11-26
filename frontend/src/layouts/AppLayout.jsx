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
        switch (role) {
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
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <Link to="/" className="text-xl font-bold text-slate-900 tracking-tight">
                            Rewards App
                        </Link>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full uppercase tracking-wider">
                            {role}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <button className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                    <User size={18} />
                                </div>
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 hidden group-hover:block">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex flex-1 max-w-7xl mx-auto w-full">
                {/* Sidebar */}
                <aside className={`
          fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
                    <div className="h-full overflow-y-auto p-4">
                        <div className="flex justify-end lg:hidden mb-4">
                            <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-1">
                            {getNavLinks().map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-medium"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <link.icon size={20} />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-10 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AppLayout;
