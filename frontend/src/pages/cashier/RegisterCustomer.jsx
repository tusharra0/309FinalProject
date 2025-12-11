import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, User, BookOpen, Key, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { createUser } from '../../api/users';
import LoadingSpinner from '../../components/LoadingSpinner';

const RegisterCustomer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        utorid: '',
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        const { utorid, name, email } = formData;

        if (!/^[a-zA-Z0-9]{7,8}$/.test(utorid)) {
            setError('UTORid must be 7-8 alphanumeric characters');
            return false;
        }

        if (name.length < 1 || name.length > 50) {
            setError('Full Name must be between 1 and 50 characters');
            return false;
        }

        if (!/^[^\s@]+@(utoronto\.ca|mail\.utoronto\.ca)$/.test(email)) {
            setError('Email must be @utoronto.ca or @mail.utoronto.ca');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        try {
            setLoading(true);
            await createUser({ ...formData });
            setSuccess(`Customer ${formData.name} registered successfully!`);
            setFormData({ utorid: '', name: '', email: '' });
        } catch (err) {
            setError(err.message || 'Failed to register customer');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {/* Left Column: Info & Context */}
                <div className="space-y-8 lg:pr-8 lg:pt-8">
                    <div>
                        <button
                            onClick={() => navigate('/cashier/dashboard')}
                            className="text-slate-400 hover:text-white mb-8 flex items-center gap-2 transition-colors group"
                        >
                            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                                <ArrowLeft size={18} />
                            </div>
                            <span className="font-medium">Back to Dashboard</span>
                        </button>

                        <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                            Register New <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                Customer Account
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Create a new student account instantly at the point of sale.
                            Users can immediately start earning points.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/10 rounded-xl">
                                    <Sparkles className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Instant Activation</h3>
                                    <p className="text-slate-400 text-sm">Account is active immediately with 0 points balance.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl">
                                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Secure Setup</h3>
                                    <p className="text-slate-400 text-sm">Password reset token sent directly to student email.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
                        <div className="p-3 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20">
                            <UserPlus className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Registration Form</h2>
                            <p className="text-slate-400 text-sm">Enter student details below</p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 animate-in slide-in-from-top-2">
                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                            {error}
                        </div>
                    )}

                    {success ? (
                        <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Registration Complete!</h3>
                            <p className="text-slate-400 mb-8">{success}</p>
                            <button
                                onClick={() => {
                                    setSuccess('');
                                    setFormData({ utorid: '', name: '', email: '' });
                                }}
                                className="px-6 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 font-medium transition-colors"
                            >
                                Register Another Customer
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        UTORid
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Key className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            name="utorid"
                                            value={formData.utorid}
                                            onChange={handleChange}
                                            placeholder="e.g. jsmith01"
                                            className="block w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono"
                                            maxLength={8}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                                        <span className="w-1 h-1 bg-slate-600 rounded-full" />
                                        7-8 alphanumeric characters
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. John Smith"
                                            className="block w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                                            maxLength={50}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john.smith@mail.utoronto.ca"
                                            className="block w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                                        <span className="w-1 h-1 bg-slate-600 rounded-full" />
                                        Must be a valid UofT email address
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative group overflow-hidden py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {loading ? <LoadingSpinner size="sm" /> : (
                                        <>Create Account <UserPlus size={18} /></>
                                    )}
                                </span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterCustomer;
