import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const ResetPasswordWithToken = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        utorid: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.utorid.trim() || !form.password.trim()) {
            setError('All fields are required');
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/auth/resets/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    utorid: form.utorid.trim(),
                    password: form.password
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to reset password');
            }

            // Show success message and redirect
            alert('Password reset successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            setError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-slate-900/50 shadow-xl rounded-2xl p-8 border border-slate-800">
                <h1 className="text-3xl font-bold text-white mb-2">Reset Your Password</h1>
                <p className="text-slate-400 mb-6">Enter your UTORid and new password.</p>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">UTORid</label>
                        <input
                            type="text"
                            name="utorid"
                            value={form.utorid}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g. abc12345"
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            autoComplete="new-password"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            Must be 8-64 characters with uppercase, lowercase, number, and special character (!@#$%^&*)
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            autoComplete="new-password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-white text-slate-900 py-3 font-bold hover:bg-slate-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <p className="text-sm text-slate-400 text-center mt-6">
                    Remember your password?{' '}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPasswordWithToken;
