/**
 * Auth utility functions for token management
 */

const TOKEN_KEY = 'token'

/**
 * Store authentication token in localStorage
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * Get authentication token from localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Remove authentication token from localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Check if user is currently authenticated (has a token)
 */
export const isAuthenticated = (): boolean => {
  return !!getToken()
} 
