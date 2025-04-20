import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authApi, LoginRequest } from '../utils/api'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../utils/AuthContext'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRequest>()

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            if (data.token) {
                login(data.token)
                navigate('/chats')
            } else {
                setError('Invalid response from server')
            }
        },
        onError: (error: any) => {
            console.error('Login error:', error)
            setError(error?.response?.data?.message || 'Invalid email or password')
        }
    })

    const onSubmit = (data: LoginRequest) => {
        setError('')
        loginMutation.mutate(data)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                </div>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Sign in to ChatLogger
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-semibold text-primary-600 hover:text-primary-500">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting || loginMutation.isPending}
                            className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-70"
                        >
                            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/register" className="font-semibold leading-6 text-primary-600 hover:text-primary-500">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
} 
