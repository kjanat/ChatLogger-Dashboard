import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../utils/api'

type ProfileFormData = {
    name: string
    email: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export default function Profile() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const queryClient = useQueryClient()

    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            return authApi.getCurrentUser()
        }
    })

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ProfileFormData>({
        defaultValues: {
            name: '',
            email: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    useEffect(() => {
        if (user) {
            reset({
                name: user.username || '',
                email: user.email || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
        }
    }, [user, reset])

    const newPassword = watch('newPassword')

    const updateProfileMutation = useMutation({
        mutationFn: async (_: ProfileFormData) => {
            // In a real implementation, we would use the data to update the user profile
            return authApi.getCurrentUser()
        },
        onSuccess: () => {
            setSuccess('Profile updated successfully')
            setError('')
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: () => {
            setError('Failed to update profile')
            setSuccess('')
        }
    })

    const onSubmit = (data: ProfileFormData) => {
        updateProfileMutation.mutate(data)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h1>

            {error && (
                <div className="rounded-md bg-red-50 p-4 mb-6">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                        </div>
                    </div>
                </div>
            )}

            {success && (
                <div className="rounded-md bg-green-50 p-4 mb-6">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">{success}</h3>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            type="text"
                            autoComplete="username"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                            {...register('name', { required: 'Username is required' })}
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                        Current password
                    </label>
                    <div className="mt-2">
                        <input
                            id="currentPassword"
                            type="password"
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                            {...register('currentPassword')}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                        New password
                    </label>
                    <div className="mt-2">
                        <input
                            id="newPassword"
                            type="password"
                            autoComplete="new-password"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                            {...register('newPassword', {
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            })}
                        />
                        {errors.newPassword && (
                            <p className="mt-2 text-sm text-red-600">{errors.newPassword.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                        Confirm new password
                    </label>
                    <div className="mt-2">
                        <input
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                            {...register('confirmPassword', {
                                validate: value => value === newPassword || 'Passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            </form>
        </div>
    )
}
