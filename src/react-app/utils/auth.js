/**
 * Auth utility functions for token management
 */
const TOKEN_KEY = 'token';
/**
 * Store authentication token in localStorage
 */
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};
/**
 * Get authentication token from localStorage
 */
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};
/**
 * Remove authentication token from localStorage
 */
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};
/**
 * Check if user is currently authenticated (has a token)
 */
export const isAuthenticated = () => {
    return !!getToken();
};
