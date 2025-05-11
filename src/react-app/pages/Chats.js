import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { chatApi } from '../utils/api';
import { MagnifyingGlassIcon, ChatBubbleLeftIcon, PlusIcon, } from '@heroicons/react/24/outline';
export default function Chats() {
    const [search, setSearch] = useState('');
    const apiBaseUrl = import.meta.env.API_URL || 'http://localhost:3000/api/v1';
    const { data: chatData = [], // Default to empty array if undefined
    isLoading, isError, error: queryError, } = useQuery({
        queryKey: ['chats'],
        queryFn: () => chatApi.getChats(),
        retry: 1,
    });
    // Handle both normal array responses and paginated responses
    const chats = Array.isArray(chatData) ? chatData : chatData?.results || [];
    const filteredChats = chats.filter((chat) => chat.title?.toLowerCase?.().includes(search.toLowerCase()) || false);
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" }) }));
    }
    // Only show error message if we have an actual error (not just empty results)
    if (isError) {
        // Get HTTP status code if available
        const statusCode = queryError && queryError?.response?.status;
        let errorTitle = 'Error loading chats';
        let errorMessage = `Make sure your backend API is running at ${apiBaseUrl.replace('/api/v1', '')}`;
        // Customize error message based on status code
        if (statusCode === 401) {
            errorTitle = 'Authentication required';
            errorMessage = 'You need to sign in again to access your chats.';
        }
        else if (statusCode === 403) {
            errorTitle = 'Access forbidden';
            errorMessage = "You don't have permission to access these chats.";
        }
        else if (statusCode === 404) {
            errorTitle = 'API endpoint not found';
            errorMessage = 'The chats endpoint does not exist on the server.';
        }
        else if (statusCode === 500) {
            errorTitle = 'Server error';
            errorMessage = 'The server encountered an error processing your request.';
        }
        else if (!statusCode) {
            // No status code typically means the server is unreachable
            errorTitle = 'Cannot connect to server';
            errorMessage = `Make sure your backend API is running at ${apiBaseUrl.replace('/api/v1', '')}`;
        }
        return (_jsx("div", { className: "rounded-md bg-red-50 p-4 my-4", children: _jsx("div", { className: "flex", children: _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium text-red-800", children: errorTitle }), _jsx("p", { className: "text-sm text-red-700 mt-2", children: errorMessage }), statusCode && (_jsxs("p", { className: "text-xs text-red-600 mt-1", children: ["Status code: ", statusCode] }))] }) }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Your Chats" }), _jsxs(Link, { to: "/chats/new", className: "rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center gap-1", children: [_jsx(PlusIcon, { className: "h-4 w-4" }), " New Chat"] })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "Search chats...", className: "w-full rounded-md border-0 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", value: search, onChange: (e) => setSearch(e.target.value) }), _jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(MagnifyingGlassIcon, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" }) })] }), filteredChats.length > 0 ?
                _jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filteredChats.map((chat) => (_jsxs(Link, { to: `/chats/${chat._id}`, className: "block rounded-lg border border-gray-200 bg-white p-5 shadow-soft hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: chat.title }), _jsx(ChatBubbleLeftIcon, { className: "h-5 w-5 text-gray-400" })] }), _jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: format(new Date(chat.createdAt), 'MMM d, yyyy') }), _jsxs("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: [chat.metadata?.messageCount || 0, " messages"] })] }, chat._id))) })
                : _jsxs("div", { className: "text-center py-12 bg-gray-50 rounded-lg dark:bg-gray-800", children: [_jsx(ChatBubbleLeftIcon, { className: "mx-auto h-12 w-12 text-gray-400" }), _jsx("h3", { className: "mt-2 text-lg font-medium text-gray-900 dark:text-white", children: "No chats found" }), _jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: search ?
                                'Try adjusting your search'
                                : 'Start a new chat to get started' }), !search && (_jsx("div", { className: "mt-6", children: _jsxs(Link, { to: "/chats/new", className: "inline-flex items-center rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-primary-500", children: [_jsx(PlusIcon, { className: "-ml-0.5 mr-1.5 h-4 w-4", "aria-hidden": "true" }), "New Chat"] }) }))] })] }));
}
