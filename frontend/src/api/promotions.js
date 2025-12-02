import { get, post, patch, del } from './api';

/**
 * List all promotions with filters and pagination
 * @param {Object} params - Query parameters (page, limit, orderBy, order, active)
 */
export const listPromotions = (params = {}) => get('/promotions', params);

/**
 * Get a specific promotion by ID
 */
export const getPromotion = (id) => get(`/promotions/${id}`);

/**
 * Create a new promotion
 */
export const createPromotion = (data) => post('/promotions', data);

/**
 * Update a promotion
 */
export const updatePromotion = (id, data) => patch(`/promotions/${id}`, data);

/**
 * Delete a promotion
 */
export const deletePromotion = (id) => del(`/promotions/${id}`);
