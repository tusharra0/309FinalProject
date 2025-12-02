// Base API configuration and utilities

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
    return localStorage.getItem('token');
};

/**
 * Store authentication token in localStorage
 */
export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
};

/**
 * Remove authentication token from localStorage
 */
export const clearAuthToken = () => {
    localStorage.removeItem('token');
};

/**
 * Generic request wrapper with authentication and error handling
 * @param {string} path - API endpoint path
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
const request = async (path, options = {}) => {
    const token = getAuthToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    // Add authorization header if token exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Remove Content-Type for FormData requests
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const payload = isJson ? await response.json() : null;

    if (!response.ok) {
        const message = payload?.message || `Request failed with status ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        error.data = payload;
        throw error;
    }

    return payload;
};

/**
 * Make a GET request
 */
export const get = (path, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${path}?${queryString}` : path;
    return request(url, { method: 'GET' });
};

/**
 * Make a POST request
 */
export const post = (path, data) => {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return request(path, {
        method: 'POST',
        body,
    });
};

/**
 * Make a PATCH request
 */
export const patch = (path, data) => {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return request(path, {
        method: 'PATCH',
        body,
    });
};

/**
 * Make a DELETE request
 */
export const del = (path) => {
    return request(path, { method: 'DELETE' });
};

export default {
    get,
    post,
    patch,
    delete: del,
    setAuthToken,
    clearAuthToken,
};
