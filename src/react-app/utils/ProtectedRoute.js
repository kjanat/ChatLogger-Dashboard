import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * To be used in the router configuration
 */
export function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    // While checking authentication status, show nothing
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" }) }));
    }
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    // If authenticated, render the child routes
    return _jsx(Outlet, {});
}
