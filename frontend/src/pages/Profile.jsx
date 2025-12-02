import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Key, Save } from 'lucide-react';
import { updateMyInfo, updateMyPassword } from '../api/users';
import useUserStore from '../store/userStore';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
    const navigate = useNavigate();
    const { user, updateUser, fetchUser } = useUserStore();
    const [activeTab, setActiveTab] = useState('info');

    // Profile info state
    const [profileForm, setProfileForm] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    // Password state
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [profileError, setProfileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [profileSuccess, setProfileSuccess] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    useEffect(() => {
        if (user) {
            setProfileForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || ''
            });
        }
    }, [user]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileError('');
        setProfileSuccess('');

        try {
            setProfileLoading(true);
            const updated = await updateMyInfo(profileForm);
            updateUser(updated);
            setProfileSuccess('Profile updated successfully!');
        } catch (err) {
            setProfileError(err.message || 'Failed to update profile');
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        try {
            setPasswordLoading(true);
            await updateMyPassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });
            setPasswordSuccess('Password updated successfully!');
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            setPasswordError(err.message || 'Failed to update password');
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-slate-400 mb-8">Manage your account settings</p>

            {/* Tab Navigation */}
            <div className="bg-slate-900 rounded-t-2xl border border-slate-800 border-b-0">
                <div className="flex gap-1 p-2">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'info'
                                ? 'bg-slate-800 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <User size={18} className="inline mr-2" />
                        Profile Information
                    </button>
                    <button
                        onClick={() => setActiveTab('password')}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'password'
                                ? 'bg-slate-800 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <Key size={18} className="inline mr-2" />
                        Change Password
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-slate-900 rounded-b-2xl border border-slate-800 p-8">
                {activeTab === 'info' ? (
                    <div>
                        <ErrorMessage message={profileError} onClose={() => setProfileError('')} className="mb-4" />
                        <SuccessMessage message={profileSuccess} className="mb-4" />

                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            {/* Account Info (Read-only) */}
                            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">UTORid</p>
                                        <p className="text-white font-semibold">{user?.utorid}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">Points Balance</p>
                                        <p className="text-indigo-400 font-bold text-xl">{user?.points}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Editable Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={profileForm.firstName}
                                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                                        className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={profileForm.lastName}
                                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                                        className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profileForm.email}
                                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={profileLoading}
                                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {profileLoading && <LoadingSpinner size="sm" />}
                                <Save size={18} />
                                {profileLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <ErrorMessage message={passwordError} onClose={() => setPasswordError('')} className="mb-4" />
                        <SuccessMessage message={passwordSuccess} className="mb-4" />

                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                                <p className="mt-1 text-xs text-slate-500">
                                    Must be 8-64 characters with uppercase, lowercase, number, and special character
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {passwordLoading && <LoadingSpinner size="sm" />}
                                <Key size={18} />
                                {passwordLoading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
