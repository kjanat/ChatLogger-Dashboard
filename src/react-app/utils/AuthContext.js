import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from './api';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser();
        }
        else {
            setLoading(false);
        }
    }, []);
    const fetchUser = async () => {
        setLoading(true);
        try {
            const userData = await authApi.getCurrentUser();
            setUser(userData);
            setError(null);
        }
        catch (err) {
            setError('Failed to fetch user data');
            localStorage.removeItem('token');
        }
        finally {
            setLoading(false);
        }
    };
    const login = (token) => {
        localStorage.setItem('token', token);
        fetchUser();
    };
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };
    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
