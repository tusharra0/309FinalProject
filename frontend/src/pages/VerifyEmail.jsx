import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus('error');
                setMessage('No verification token provided');
                return;
            }

            try {
                const response = await fetch(`${API_BASE}/auth/verify-email/${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage(data.message || 'Email verified successfully!');
                    // Redirect to login after 3 seconds
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed');
                }
            } catch (err) {
                setStatus('error');
                setMessage('Failed to verify email. Please try again.');
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-slate-900/50 shadow-xl rounded-2xl p-8 border border-slate-800">
                <div className="text-center">
                    {status === 'verifying' && (
                        <>
                            <div className="mb-6">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Verifying your email...</h1>
                            <p className="text-slate-400">Please wait while we verify your account.</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Email Verified!</h1>
                            <p className="text-slate-400 mb-6">{message}</p>
                            <p className="text-sm text-slate-500">Redirecting to login...</p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
                            <p className="text-red-400 mb-6">{message}</p>
                            <div className="space-y-3">
                                <Link
                                    to="/signup"
                                    className="block w-full rounded-lg bg-purple-600 text-white py-3 font-medium hover:bg-purple-700 transition"
                                >
                                    Sign Up Again
                                </Link>
                                <Link
                                    to="/login"
                                    className="block w-full rounded-lg bg-slate-800 text-slate-300 py-3 font-medium hover:bg-slate-700 transition"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
