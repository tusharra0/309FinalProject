import { get, post, patch } from './api';

/**
 * Get current user's information
 */
export const getMyInfo = () => get('/users/me');

/**
 * Update current user's profile
 * @param {FormData|Object} data - Profile data (can include avatar file)
 */
export const updateMyInfo = (data) => patch('/users/me', data);

/**
 * Update current user's password
 */
export const updateMyPassword = (currentPassword, newPassword) =>
    patch('/users/me/password', { currentPassword, newPassword });

/**
 * Get all users with filters and pagination
 * @param {Object} params - Query parameters (page, limit, orderBy, order, role, verified, active)
 */
export const getAllUsers = (params = {}) => get('/users', params);

/**
 * Get a specific user by ID
 */
export const getUserById = (id) => get(`/users/${id}`);

/**
 * Update a specific user (manager/superuser only)
 */
export const updateUserById = (id, data) => patch(`/users/${id}`, data);

/**
 * Create a new user (cashier/manager/superuser only)
 */
export const createUser = (data) => post('/users', data);
