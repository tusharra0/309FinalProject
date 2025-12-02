import { post } from './api';

/**
 * Login with email and password
 */
export const loginWithPassword = (data) => post('/auth/tokens', data);

/**
 * Sign up a new user
 */
export const signUp = (data) => post('/auth/signup', data);

/**
 * Login with Google OAuth
 */
export const loginWithGoogle = (googleIdToken) =>
  post('/auth/google', { googleIdToken });

/**
 * Request password reset email
 */
export const requestPasswordReset = (email) =>
  post('/auth/resets', { email });

/**
 * Reset password with token
 */
export const resetPasswordWithToken = (resetToken, newPassword) =>
  post(`/auth/resets/${resetToken}`, { newPassword });

/**
 * Verify email with token
 */
export const verifyEmail = (verificationToken) =>
  post(`/auth/verify-email/${verificationToken}`, {});

