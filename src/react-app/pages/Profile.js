import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../utils/api';
export default function Profile() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            return authApi.getCurrentUser();
        },
    });
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm({
        defaultValues: {
            name: '',
            email: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });
    useEffect(() => {
        if (user) {
            reset({
                name: user.username || '',
                email: user.email || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
    }, [user, reset]);
    const newPassword = watch('newPassword');
    const updateProfileMutation = useMutation({
        mutationFn: async (_) => {
            // In a real implementation, we would use the data to update the user profile
            return authApi.getCurrentUser();
        },
        onSuccess: () => {
            setSuccess('Profile updated successfully');
            setError('');
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: () => {
            setError('Failed to update profile');
            setSuccess('');
        },
    });
    const onSubmit = (data) => {
        updateProfileMutation.mutate(data);
    };
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" }) }));
    }
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-8", children: "Profile Settings" }), error && (_jsx("div", { className: "rounded-md bg-red-50 p-4 mb-6", children: _jsx("div", { className: "flex", children: _jsx("div", { className: "ml-3", children: _jsx("h3", { className: "text-sm font-medium text-red-800", children: error }) }) }) })), success && (_jsx("div", { className: "rounded-md bg-green-50 p-4 mb-6", children: _jsx("div", { className: "flex", children: _jsx("div", { className: "ml-3", children: _jsx("h3", { className: "text-sm font-medium text-green-800", children: success }) }) }) })), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Username" }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "name", type: "text", autoComplete: "username", className: "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('name', { required: 'Username is required' }) }), errors.name && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.name.message }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Email address" }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "email", type: "email", autoComplete: "email", className: "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        }) }), errors.email && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.email.message }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "currentPassword", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Current password" }), _jsx("div", { className: "mt-2", children: _jsx("input", { id: "currentPassword", type: "password", autoComplete: "current-password", className: "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('currentPassword') }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "newPassword", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "New password" }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "newPassword", type: "password", autoComplete: "new-password", className: "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('newPassword', {
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters',
                                            },
                                        }) }), errors.newPassword && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.newPassword.message }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium leading-6 text-gray-900 dark:text-white", children: "Confirm new password" }), _jsxs("div", { className: "mt-2", children: [_jsx("input", { id: "confirmPassword", type: "password", autoComplete: "new-password", className: "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", ...register('confirmPassword', {
                                            validate: (value) => value === newPassword || 'Passwords do not match',
                                        }) }), errors.confirmPassword && (_jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.confirmPassword.message }))] })] }), _jsx("div", { children: _jsx("button", { type: "submit", disabled: updateProfileMutation.isPending, className: "flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed", children: updateProfileMutation.isPending ? 'Updating...' : 'Update Profile' }) })] })] }));
}
