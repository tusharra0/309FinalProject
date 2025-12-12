import React, { useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { loginWithGoogle, loginWithPassword } from '../api/auth';
import { setAuthToken as apiSetAuthToken } from '../api/api';
import useUserStore from '../store/userStore';
import { redirectPathForRole } from '../utils/auth';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const initialState = {
  utorid: '',
  password: ''
};



const Login = () => {
  const navigate = useNavigate();
  const { setUser, fetchUser } = useUserStore();
  const { login: authLogin } = useAuth();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      // Ensure API helper has the token immediately so subsequent requests
      // include Authorization header (AuthContext updates localStorage via
      // useEffect which may run after this function returns).
      apiSetAuthToken(result.token);
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
      apiSetAuthToken(result.token);
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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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


      </div>
    </div>
  );
};

export default Login;
