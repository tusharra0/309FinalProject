import React, { useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { loginWithGoogle, loginWithPassword } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { redirectPathForRole } from '../utils/auth';

const initialState = {
  utorid: '',
  password: ''
};

// Helper to create a dummy JWT for dev/testing
const createMockJwt = (role, userId = '123') => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    role,
    userId,
    exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
  }));
  const signature = 'dummy_signature';
  return `${header}.${payload}.${signature}`;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const canSubmit = useMemo(() => form.utorid.trim() && form.password.trim(), [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const result = await loginWithPassword({
        utorid: form.utorid.trim(),
        password: form.password
      });
      login(result.token);
      const decoded = jwtDecode(result.token);
      const target = redirectPathForRole(decoded.role);
      navigate(target, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = async (credential) => {
    if (!credential) return;
    setError('');
    setGoogleLoading(true);
    try {
      const result = await loginWithGoogle(credential);
      login(result.token);
      const decoded = jwtDecode(result.token);
      const target = redirectPathForRole(decoded.role);
      navigate(target, { replace: true });
    } catch (err) {
      setError(err.message || 'Google login failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleMockLogin = (role) => {
    const token = createMockJwt(role);
    login(token);
    const target = redirectPathForRole(role);
    navigate(target, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
        <p className="text-slate-500 mb-6">Login to continue earning loyalty rewards.</p>

        {error ? (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">UTORid</label>
            <input
              type="text"
              name="utorid"
              value={form.utorid}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="e.g. abc12345"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full rounded-lg bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Or</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        <div className="flex justify-center mb-4">
          <GoogleAuthButton onCredential={handleGoogleCredential} />
        </div>
        {googleLoading && (
          <p className="text-center text-sm text-slate-500 mb-2">Processing Google login…</p>
        )}

        <p className="text-sm text-slate-600 text-center mb-8">
          No account yet?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>

        {/* Dev Login Section */}
        <div className="pt-6 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Dev / Mock Login</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleMockLogin('user')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors">
              User
            </button>
            <button onClick={() => handleMockLogin('cashier')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors">
              Cashier
            </button>
            <button onClick={() => handleMockLogin('manager')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors">
              Manager
            </button>
            <button onClick={() => handleMockLogin('organizer')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors">
              Organizer
            </button>
            <button onClick={() => handleMockLogin('superuser')} className="col-span-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors">
              Superuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
