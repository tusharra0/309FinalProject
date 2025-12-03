import React, { useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { loginWithGoogle, loginWithPassword } from '../api/auth';
import useUserStore from '../store/userStore';
import { redirectPathForRole } from '../utils/auth';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

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
  const { setUser, fetchUser } = useUserStore();
  const { login: authLogin } = useAuth();
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

      // Set token in auth context
      authLogin(result.token);

      // Fetch and set user data
      await fetchUser();

      // Get user role for redirection
      const { user } = useUserStore.getState();
      const target = redirectPathForRole(user.role);
      navigate(target, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      if (err.status === 403) {
        setError(err.message || 'Please verify your email before logging in.');
      } else {
        setError(err.message || 'Login failed');
      }
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

      // Set token in auth context
      authLogin(result.token);

      // Fetch and set user data
      await fetchUser();

      // Get user role for redirection
      const { user } = useUserStore.getState();
      const target = redirectPathForRole(user.role);
      navigate(target, { replace: true });
    } catch (err) {
      setError(err.message || 'Google login failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleMockLogin = (role) => {
    const token = createMockJwt(role);
    const decoded = jwtDecode(token);

    // Create mock user object
    const mockUser = {
      id: parseInt(decoded.userId),
      utorid: `mock_${role}`,
      role: decoded.role,
      email: `${role}@example.com`,
      firstName: 'Mock',
      lastName: role.charAt(0).toUpperCase() + role.slice(1),
      points: 1000,
      verified: true
    };

    setUser(mockUser, token);
    const target = redirectPathForRole(role);
    navigate(target, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900/50 shadow-xl rounded-2xl p-8 border border-slate-800">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-slate-400 mb-6">Login to continue earning loyalty rewards.</p>

        <ErrorMessage message={error} onClose={() => setError('')} className="mb-4" />

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
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoComplete="current-password"
            />
          </div>
          <div className="flex justify-end">
            <Link
              to="/password-reset"
              className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full rounded-lg bg-white text-slate-900 py-3 font-bold hover:bg-slate-200 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <LoadingSpinner size="sm" />}
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Or</span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="flex justify-center mb-4">
          <GoogleAuthButton onCredential={handleGoogleCredential} />
        </div>
        {googleLoading && (
          <div className="flex justify-center mb-2">
            <LoadingSpinner size="sm" />
            <p className="text-sm text-slate-400 ml-2">Processing Google login…</p>
          </div>
        )}

        <p className="text-sm text-slate-400 text-center mb-8">
          No account yet?{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 hover:underline font-medium">
            Sign up
          </Link>
        </p>

        {/* Dev Login Section */}
        <div className="pt-6 border-t border-slate-800">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">Dev / Mock Login</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleMockLogin('regular')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded transition-colors">
              User
            </button>
            <button onClick={() => handleMockLogin('cashier')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded transition-colors">
              Cashier
            </button>
            <button onClick={() => handleMockLogin('manager')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded transition-colors">
              Manager
            </button>
            <button onClick={() => handleMockLogin('organizer')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded transition-colors">
              Organizer
            </button>
            <button onClick={() => handleMockLogin('superuser')} className="col-span-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded transition-colors">
              Superuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
