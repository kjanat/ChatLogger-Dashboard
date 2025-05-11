/**
 * Auth utility functions for token management
 */
/**
 * Store authentication token in localStorage
 */
export declare const setToken: (token: string) => void;
/**
 * Get authentication token from localStorage
 */
export declare const getToken: () => string | null;
/**
 * Remove authentication token from localStorage
 */
export declare const removeToken: () => void;
/**
 * Check if user is currently authenticated (has a token)
 */
export declare const isAuthenticated: () => boolean;
