import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authApi } from '../utils/api';
import { useMutation } from '@tanstack/react-query';
export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, } = useForm();
    const password = watch('password');
    const registerMutation = useMutation({
        mutationFn: async (data) => {
            console.log('Register data being sent:', data);
            return authApi.register({
                ...data,
                // Using a default organization ID since it's required by API but may not be needed in the UI
                organizationId: 'default',
            });
        },
        onSuccess: (data) => {
            console.log('Registration successful:', data);
            navigate('/login');
        },
        onError: (error) => {
            console.error('Registration error:', error);
            const errorMessage = error?.response?.data?.message ||
                'Registration failed. Please try again.';
            setError(errorMessage);
        },
    });
    const onSubmit = (data) => {
        const { confirmPassword, ...registerData } = data;
        registerMutation.mutate(registerData);
    };
    return (_jsxs("div", { className: "flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8", children: [_jsx("div", { className: "sm:mx-auto sm:w-full sm:max-w-sm", children: _jsx("h2", { className: "mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white", children: "Create your account" }) }), _jsxs("div", { className: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm", children: [_jsxs("form", { className: "space-y-6", onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Username" }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "username", type: "text", autoComplete: "username", className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('username', { required: 'Username is required' }) }), errors.username && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.username.message }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Email address" }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "email", type: "email", autoComplete: "email", className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address',
                                                    },
                                                }) }), errors.email && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.email.message }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Password" }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "password", type: "password", autoComplete: "new-password", className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('password', {
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Password must be at least 8 characters',
                                                    },
                                                }) }), errors.password && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.password.message }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Confirm password" }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "confirmPassword", type: "password", autoComplete: "new-password", className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('confirmPassword', {
                                                    required: 'Please confirm your password',
                                                    validate: (value) => value === password || 'Passwords do not match',
                                                }) }), errors.confirmPassword && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.confirmPassword.message }))] })] }), error && (_jsx("div", { className: "rounded-md bg-red-50 p-4", children: _jsx("div", { className: "flex", children: _jsx("div", { className: "ml-3", children: _jsx("h3", { className: "text-sm font-medium text-red-800", children: error }) }) }) })), _jsx("div", { children: _jsx("button", { type: "submit", disabled: isSubmitting || registerMutation.isPending, className: "flex w-full justify-center rounded-md bg-primary-600 px-3.5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-70", children: registerMutation.isPending ? 'Signing up...' : 'Sign up' }) })] }), _jsxs("p", { className: "mt-10 text-center text-sm text-gray-500", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "font-semibold leading-6 text-primary-600 hover:text-primary-500", children: "Sign in" })] })] })] }));
}
