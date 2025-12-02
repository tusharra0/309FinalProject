import { get, post, patch, del } from './api';

/**
 * List all events with filters and pagination
 * @param {Object} params - Query parameters (page, limit, orderBy, order, published, organizerId, upcoming)
 */
export const listEvents = (params = {}) => get('/events', params);

/**
 * Get a specific event by ID
 */
export const getEvent = (id) => get(`/events/${id}`);

/**
 * Create a new event
 */
export const createEvent = (data) => post('/events', data);

/**
 * Update an event
 */
export const updateEvent = (id, data) => patch(`/events/${id}`, data);

/**
 * Delete an event
 */
export const deleteEvent = (id) => del(`/events/${id}`);

/**
 * RSVP to an event (current user)
 */
export const rsvpToEvent = (id) => post(`/events/${id}/guests/me`, {});

/**
 * Cancel RSVP to an event (current user)
 */
export const cancelRsvp = (id) => del(`/events/${id}/guests/me`);

/**
 * Add a guest to an event
 */
export const addGuest = (eventId, utorid) =>
    post(`/events/${eventId}/guests`, { utorid });

/**
 * Remove a guest from an event
 */
export const removeGuest = (eventId, userId) =>
    del(`/events/${eventId}/guests/${userId}`);

/**
 * Add an organizer to an event
 */
export const addOrganizer = (eventId, utorid) =>
    post(`/events/${eventId}/organizers`, { utorid });

/**
 * Remove an organizer from an event
 */
export const removeOrganizer = (eventId, userId) =>
    del(`/events/${eventId}/organizers/${userId}`);

/**
 * Award points to event guests
 * @param {number} eventId - Event ID
 * @param {Object} data - { allGuests: boolean, userId?: number, pointChange: number, description: string }
 */
export const awardPoints = (eventId, data) =>
    post(`/events/${eventId}/transactions`, data);
