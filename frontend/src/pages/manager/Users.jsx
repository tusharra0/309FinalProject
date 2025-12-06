import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users as UsersIcon, Search } from 'lucide-react';
import { getAllUsers } from '../../api/users';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        role: '',
        verified: '',
        search: ''
    });

    useEffect(() => {
        fetchUsers();
    }, [page, filters]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers({
                page,
                limit: 15,
                ...filters,
                orderBy: 'createdAt',
                order: 'desc'
            });
            setUsers(data.results || data.users || []);
            setTotalPages(Math.max(1, Math.ceil((data.count || 0) / 15)));
        } catch (err) {
            setError(err.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const getRoleBadgeColor = (role) => {
        const colors = {
            regular: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
            cashier: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            manager: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            organizer: 'bg-green-500/10 text-green-400 border-green-500/20',
            superuser: 'bg-red-500/10 text-red-400 border-red-500/20'
        };
        return colors[role] || colors.regular;
    };

    if (loading && users.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                <p className="text-slate-400">View and manage all users</p>
            </div>

            {/* Filters */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <Search size={14} className="inline mr-1" />
                            Search
                        </label>
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search by UTORid or email..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                        <select
                            value={filters.role}
                            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Roles</option>
                            <option value="regular">Regular</option>
                            <option value="cashier">Cashier</option>
                            <option value="manager">Manager</option>
                            <option value="organizer">Organizer</option>
                            <option value="superuser">Superuser</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                        <select
                            value={filters.verified}
                            onChange={(e) => setFilters({ ...filters, verified: e.target.value })}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All</option>
                            <option value="true">Verified</option>
                            <option value="false">Unverified</option>
                        </select>
                    </div>
                </div>
            </div>

            <ErrorMessage message={error} onClose={() => setError('')} />

            {/* Users Table */}
            {users.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                    <p className="text-slate-400">No users found</p>
                </div>
            ) : (
                <>
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-800 border-b border-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Role</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Points</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Status</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-white font-medium">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-slate-400 text-sm">{user.utorid}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold border capitalize ${getRoleBadgeColor(user.role)}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-indigo-400 font-semibold">{user.points}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.verified ? (
                                                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/20">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-semibold border border-orange-500/20">
                                                        Unverified
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    to={`/manager/users/${user.id}`}
                                                    className="text-indigo-400 hover:text-indigo-300 font-medium text-sm"
                                                >
                                                    View Details →
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
};

export default Users;
