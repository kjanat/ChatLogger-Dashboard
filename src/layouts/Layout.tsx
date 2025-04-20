import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../utils/AuthContext'

export default function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()
    const { user, isAuthenticated, logout, loading } = useAuth()

    // Navigation items - conditionally include based on auth state
    const navigation = [
        { name: 'Home', href: '/' },
        ...(isAuthenticated 
            ? [
                { name: 'Chats', href: '/chats' }
              ] 
            : [])
    ]

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <Link to="/" className="text-xl font-bold text-primary-600 dark:text-white">
                                    ChatLogger
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${location.pathname === item.href
                                            ? 'border-primary-500 text-gray-900 dark:text-white'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            {loading ? (
                                <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
                            ) : isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <Link 
                                        to="/profile"
                                        className={`flex items-center text-sm ${
                                            location.pathname === '/profile'
                                            ? 'text-primary-600 dark:text-primary-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-300'
                                        }`}
                                    >
                                        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 mr-2">
                                            {user?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">
                                            {user?.username || user?.email}
                                        </span>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                >
                                    Sign in
                                </Link>
                            )}
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-gray-200 dark:hover:bg-gray-700"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                {mobileMenuOpen ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="space-y-1 pb-2 pt-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`block border-l-4 py-1.5 pl-3 pr-4 text-base font-medium ${location.pathname === item.href
                                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-white'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pb-2 pt-2">
                        <div className="space-y-1">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className={`flex items-center px-4 py-1.5 text-base font-medium ${
                                            location.pathname === '/profile'
                                            ? 'text-primary-700 bg-primary-50 dark:bg-gray-700 dark:text-white'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                        }`}
                                    >
                                        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 mr-2">
                                            {user?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">
                                            {user?.username || user?.email}
                                        </span>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-1.5 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block px-4 py-1.5 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Sign in
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    )
} 
