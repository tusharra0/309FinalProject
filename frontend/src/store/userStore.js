import { create } from 'zustand';
import { getMyInfo } from '../api/users';
import { setAuthToken, clearAuthToken } from '../api/api';

/**
 * Zustand store for user authentication and profile state
 */
const useUserStore = create((set, get) => ({
    // State
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    // Actions

    /**
     * Set user data and authentication status
     */
    setUser: (user, token) => {
        if (token) {
            setAuthToken(token);
        }
        set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
            error: null
        });
    },

    /**
     * Fetch current user's information
     */
    fetchUser: async () => {
        try {
            set({ isLoading: true, error: null });
            const user = await getMyInfo();
            set({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });
            return user;
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: error.message
            });
            throw error;
        }
    },

    /**
     * Update user data (for profile updates)
     */
    updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
            set({
                user: { ...currentUser, ...updates },
                error: null
            });
        }
    },

    /**
     * Logout user and clear authentication
     */
    logout: () => {
        clearAuthToken();
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
        });
    },

    /**
     * Clear error
     */
    clearError: () => {
        set({ error: null });
    },

    /**
     * Check if user has specific role
     */
    hasRole: (role) => {
        const user = get().user;
        if (!user) return false;

        // Role hierarchy
        const roles = {
            regular: ['regular'],
            cashier: ['cashier', 'manager', 'superuser'],
            manager: ['manager', 'superuser'],
            superuser: ['superuser'],
            organizer: ['organizer', 'manager', 'superuser']
        };

        const allowedRoles = roles[role] || [role];
        return allowedRoles.includes(user.role);
    },

    /**
     * Get current user's role
     */
    getRole: () => {
        const user = get().user;
        return user?.role || null;
    },

    /**
     * Get current user's points balance
     */
    getPoints: () => {
        const user = get().user;
        return user?.points || 0;
    },

    /**
     * Refresh user data from server (recalculates points, etc)
     */
    refreshUser: async () => {
        try {
            set({ isLoading: true, error: null });
            const user = await getMyInfo();
            set({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });
            return user;
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: error.message
            });
            throw error;
        }
    },
}));

export default useUserStore;
