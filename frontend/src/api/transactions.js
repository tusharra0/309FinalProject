import { get, post, patch } from './api';

/**
 * Create a transfer transaction to another user
 */
export const createTransfer = (recipientId, data) =>
    post(`/users/${recipientId}/transactions`, data);

/**
 * Create a redemption request
 */
export const createRedemptionRequest = (data) =>
    post('/users/me/transactions', data);

/**
 * Get current user's transactions
 * @param {Object} params - Query parameters (page, limit, orderBy, order, type, processed)
 */
export const getMyTransactions = (params = {}) =>
    get('/users/me/transactions', params);

/**
 * Get all transactions (manager only)
 * @param {Object} params - Query parameters (page, limit, orderBy, order, type, userId, suspicious, processed, startDate, endDate)
 */
export const getTransactions = (params = {}) =>
    get('/transactions', params);

/**
 * Get a specific transaction by ID
 */
export const getTransactionById = (id) =>
    get(`/transactions/${id}`);

/**
 * Create a purchase or adjustment transaction (cashier/manager)
 */
export const createTransaction = (data) =>
    post('/transactions', data);

/**
 * Mark a transaction as suspicious
 */
export const markTransactionSuspicious = (id, suspicious) =>
    patch(`/transactions/${id}/suspicious`, { suspicious });

/**
 * Process a redemption transaction
 */
export const processRedemption = (id) =>
    patch(`/transactions/${id}/processed`, {});
