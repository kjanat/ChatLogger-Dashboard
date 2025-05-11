import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authApi } from '../utils/api';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../utils/AuthContext';
export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm();
    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            if (data.token) {
                login(data.token);
                navigate('/chats');
            }
            else {
                setError('Invalid response from server');
            }
        },
        onError: (error) => {
            console.error('Login error:', error);
            setError(error?.response?.data?.message || 'Invalid email or password');
        },
    });
    const onSubmit = (data) => {
        setError('');
        loginMutation.mutate(data);
    };
    return (_jsxs("div", { className: "flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-sm", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center", children: _jsx("svg", { className: "h-8 w-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) }) }) }), _jsx("h2", { className: "mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white", children: "Sign in to ChatLogger" })] }), _jsxs("div", { className: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm", children: [_jsxs("form", { className: "space-y-6", onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Email address" }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "email", type: "email", autoComplete: "email", className: "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address',
                                                    },
                                                }) }), errors.email && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.email.message }))] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Password" }), _jsx("div", { className: "text-sm", children: _jsx(Link, { to: "/forgot-password", className: "font-semibold text-primary-600 hover:text-primary-500", children: "Forgot password?" }) })] }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "password", type: "password", autoComplete: "current-password", className: "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('password', { required: 'Password is required' }) }), errors.password && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.password.message }))] })] }), error && (_jsx("div", { className: "rounded-md bg-red-50 p-4", children: _jsx("div", { className: "flex", children: _jsx("div", { className: "ml-3", children: _jsx("h3", { className: "text-sm font-medium text-red-800", children: error }) }) }) })), _jsx("div", { children: _jsx("button", { type: "submit", disabled: isSubmitting || loginMutation.isPending, className: "flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-70", children: loginMutation.isPending ? 'Signing in...' : 'Sign in' }) })] }), _jsxs("p", { className: "mt-10 text-center text-sm text-gray-500", children: ["Not a member?", ' ', _jsx(Link, { to: "/register", className: "font-semibold leading-6 text-primary-600 hover:text-primary-500", children: "Create an account" })] })] })] }));
}
