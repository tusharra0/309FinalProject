import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const PasswordReset = () => {
    const [form, setForm] = useState({ utorid: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleRequestReset = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!form.utorid.trim()) {
            setError('Please enter your UTORid');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/auth/resets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ utorid: form.utorid.trim() })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to request password reset');
            }

            setSuccess('If an account with that UTORid exists, a password reset email has been sent. Please check your inbox.');
        } catch (err) {
            setError(err.message || 'Failed to request password reset');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-slate-900/50 shadow-xl rounded-2xl p-8 border border-slate-800">
                <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                <p className="text-slate-400 mb-6">
                    Enter your UTORid to receive a password reset link via email.
                </p>

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

                <form className="space-y-4" onSubmit={handleRequestReset}>
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
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-white text-slate-900 py-3 font-bold hover:bg-slate-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending...' : 'Send Reset Email'}
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

export default PasswordReset;
