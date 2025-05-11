import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../utils/AuthContext';
export default function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { user, isAuthenticated, logout, loading } = useAuth();
    // Navigation items - conditionally include based on auth state
    const navigation = [
        { name: 'Home', href: '/' },
        ...(isAuthenticated ? [{ name: 'Chats', href: '/chats' }] : []),
    ];
    return (_jsxs("div", { className: "min-h-screen bg-white dark:bg-gray-900", children: [_jsxs("nav", { className: "bg-white dark:bg-gray-800 shadow-sm", children: [_jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex h-16 justify-between", children: [_jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex flex-shrink-0 items-center", children: _jsx(Link, { to: "/", className: "text-xl font-bold text-primary-600 dark:text-white", children: "ChatLogger" }) }), _jsx("div", { className: "hidden sm:ml-6 sm:flex sm:space-x-8", children: navigation.map((item) => (_jsx(Link, { to: item.href, className: `inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${location.pathname === item.href ?
                                                    'border-primary-500 text-gray-900 dark:text-white'
                                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'}`, children: item.name }, item.name))) })] }), _jsx("div", { className: "hidden sm:ml-6 sm:flex sm:items-center", children: loading ?
                                        _jsx("div", { className: "h-5 w-20 bg-gray-200 animate-pulse rounded" })
                                        : isAuthenticated ?
                                            _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Link, { to: "/profile", className: `flex items-center text-sm ${location.pathname === '/profile' ?
                                                            'text-primary-600 dark:text-primary-300'
                                                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-300'}`, children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 mr-2", children: user?.username?.charAt(0)?.toUpperCase() ||
                                                                    user?.email?.charAt(0)?.toUpperCase() ||
                                                                    'U' }), _jsx("span", { className: "text-gray-700 dark:text-gray-300", children: user?.username || user?.email })] }), _jsx("button", { onClick: logout, className: "rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600", children: "Sign out" })] })
                                            : _jsx(Link, { to: "/login", className: "rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600", children: "Sign in" }) }), _jsx("div", { className: "-mr-2 flex items-center sm:hidden", children: _jsxs("button", { type: "button", className: "inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-gray-200 dark:hover:bg-gray-700", onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: [_jsx("span", { className: "sr-only", children: "Open main menu" }), mobileMenuOpen ?
                                                _jsx(XMarkIcon, { className: "block h-6 w-6", "aria-hidden": "true" })
                                                : _jsx(Bars3Icon, { className: "block h-6 w-6", "aria-hidden": "true" })] }) })] }) }), _jsxs("div", { className: `sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`, children: [_jsx("div", { className: "space-y-1 pb-2 pt-1", children: navigation.map((item) => (_jsx(Link, { to: item.href, className: `block border-l-4 py-1.5 pl-3 pr-4 text-base font-medium ${location.pathname === item.href ?
                                        'border-primary-500 bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-white'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'}`, children: item.name }, item.name))) }), _jsx("div", { className: "border-t border-gray-200 pb-2 pt-2", children: _jsx("div", { className: "space-y-1", children: isAuthenticated ?
                                        _jsxs(_Fragment, { children: [_jsxs(Link, { to: "/profile", className: `flex items-center px-4 py-1.5 text-base font-medium ${location.pathname === '/profile' ?
                                                        'text-primary-700 bg-primary-50 dark:bg-gray-700 dark:text-white'
                                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'}`, children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 mr-2", children: user?.username?.charAt(0)?.toUpperCase() ||
                                                                user?.email?.charAt(0)?.toUpperCase() ||
                                                                'U' }), _jsx("span", { className: "text-gray-700 dark:text-gray-300", children: user?.username || user?.email })] }), _jsx("button", { onClick: logout, className: "block w-full text-left px-4 py-1.5 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white", children: "Sign out" })] })
                                        : _jsx(Link, { to: "/login", className: "block px-4 py-1.5 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white", children: "Sign in" }) }) })] })] }), _jsx("main", { className: "mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6 lg:px-8", children: _jsx(Outlet, {}) })] }));
}
