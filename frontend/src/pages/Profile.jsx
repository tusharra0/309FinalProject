import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Upload, Lock, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const Profile = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [passwordMode, setPasswordMode] = useState(false);

    const [profileForm, setProfileForm] = useState({
        name: '',
        email: '',
        birthday: ''
    });

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            setUser(data);
            setProfileForm({
                name: data.name || '',
                email: data.email || '',
                birthday: data.birthday ? data.birthday.split('T')[0] : ''
            });
        } catch (err) {
            setError(err.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${API_BASE}/users/me`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileForm)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update profile');
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setSuccess('Profile updated successfully!');
            setEditMode(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/users/me/password`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldPassword: passwordForm.oldPassword,
                    newPassword: passwordForm.newPassword
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to change password');
            }

            setSuccess('Password changed successfully!');
            setPasswordMode(false);
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to change password');
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(`${API_BASE}/users/me`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to upload avatar');
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setSuccess('Avatar updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to upload avatar');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-4"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                    <h1 className="text-3xl font-bold text-white">My Profile</h1>
                    <p className="text-slate-400 mt-1">Manage your account settings and personal information</p>
                </div>

                {/* Messages */}
                {error && (
                    <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 text-sm">
                        {success}
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 mb-6">
                    <div className="flex items-start gap-6 mb-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden flex items-center justify-center">
                                {user?.avatarUrl ? (
                                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon size={40} className="text-slate-500" />
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-500 transition">
                                <Upload size={16} className="text-white" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                            <p className="text-slate-400">{user?.email}</p>
                            <div className="flex gap-4 mt-3">
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium capitalize">
                                    {user?.role || 'Regular'}
                                </span>
                                {user?.verified && (
                                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="text-right">
                            <div className="text-3xl font-bold text-purple-400">{user?.points || 0}</div>
                            <div className="text-sm text-slate-400">Points</div>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
                        <div>
                            <label className="text-sm text-slate-500">UTORid</label>
                            <p className="text-white font-medium">{user?.utorid}</p>
                        </div>
                        <div>
                            <label className="text-sm text-slate-500">Member Since</label>
                            <p className="text-white font-medium">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm text-slate-500">Last Login</label>
                            <p className="text-white font-medium">
                                {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm text-slate-500">Birthday</label>
                            <p className="text-white font-medium">
                                {user?.birthday ? new Date(user.birthday).toLocaleDateString() : 'Not set'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Section */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <UserIcon size={20} />
                            Profile Information
                        </h3>
                        {!editMode && (
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition font-medium"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {editMode ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileForm.name}
                                    onChange={handleProfileChange}
                                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileForm.email}
                                    onChange={handleProfileChange}
                                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    disabled
                                />
                                <p className="mt-1 text-xs text-slate-500">Email cannot be changed</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Birthday</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={profileForm.birthday}
                                    onChange={handleProfileChange}
                                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-white text-slate-900 py-3 font-bold hover:bg-slate-200 transition"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditMode(false);
                                        setProfileForm({
                                            name: user?.name || '',
                                            email: user?.email || '',
                                            birthday: user?.birthday ? user.birthday.split('T')[0] : ''
                                        });
                                    }}
                                    className="flex-1 rounded-lg bg-slate-800 text-slate-300 py-3 font-medium hover:bg-slate-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="text-slate-400">Your profile information is displayed above. Click "Edit Profile" to make changes.</p>
                    )}
                </div>

                {/* Change Password Section */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Lock size={20} />
                            Change Password
                        </h3>
                        {!passwordMode && (
                            <button
                                onClick={() => setPasswordMode(true)}
                                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition font-medium"
                            >
                                Change Password
                            </button>
                        )}
                    </div>

                    {passwordMode ? (
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwordForm.oldPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    autoComplete="current-password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    autoComplete="new-password"
                                />
                                <p className="mt-1 text-xs text-slate-500">
                                    Must be 8-64 characters with uppercase, lowercase, number, and special character (!@#$%^&*)
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-white text-slate-900 py-3 font-bold hover:bg-slate-200 transition"
                                >
                                    Update Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPasswordMode(false);
                                        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
                                    }}
                                    className="flex-1 rounded-lg bg-slate-800 text-slate-300 py-3 font-medium hover:bg-slate-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="text-slate-400">Keep your account secure by regularly updating your password.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
