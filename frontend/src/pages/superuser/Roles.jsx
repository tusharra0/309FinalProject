import React, { useState, useEffect } from 'react';
import { Shield, Crown, Search } from 'lucide-react';
import { getAllUsers, updateUserById } from '../../api/users';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import Pagination from '../../components/Pagination';

const Roles = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [page, search]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers({
                page,
                limit: 15,
                search,
                orderBy: 'createdAt',
                order: 'desc'
            });
            setUsers(data.users || []);
            setTotalPages(data.pagination?.totalPages || 1);
        } catch (err) {
            setError(err.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handlePromote = async (userId, newRole) => {
        try {
            setError('');
            setSuccess('');
            await updateUserById(userId, { role: newRole });
            setSuccess(`Successfully promoted user to ${newRole}`);
            fetchUsers();
        } catch (err) {
            setError(err.message || 'Failed to update role');
        }
    };

    const getRoleBadge = (role) => {
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
                <h1 className="text-3xl font-bold text-white mb-2">Role Management</h1>
                <p className="text-slate-400">Promote users to manager or superuser roles</p>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <Search size={14} className="inline mr-1" />
                            Search Users
                        </label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search by UTORid or email..."
                        />
                    </div>
                </div>
            </div>

            <ErrorMessage message={error} onClose={() => setError('')} />
            <SuccessMessage message={success} onClose={() => setSuccess('')} />

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
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Current Role</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-white font-medium">
                                                        {user.firstName} {user.lastName}
                                                    </p>
                                                    <p className="text-slate-400 text-sm">{user.utorid}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getRoleBadge(user.role)}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    {user.role !== 'manager' && user.role !== 'superuser' && (
                                                        <button
                                                            onClick={() => handlePromote(user.id, 'manager')}
                                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                        >
                                                            <Shield size={16} />
                                                            Promote to Manager
                                                        </button>
                                                    )}
                                                    {user.role !== 'superuser' && (
                                                        <button
                                                            onClick={() => handlePromote(user.id, 'superuser')}
                                                            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                        >
                                                            <Crown size={16} />
                                                            Promote to Superuser
                                                        </button>
                                                    )}
                                                    {user.role === 'superuser' && (
                                                        <span className="text-slate-500 text-sm italic">Already superuser</span>
                                                    )}
                                                </div>
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

export default Roles;
