import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { chatApi, Chat } from '../utils/api';
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

export default function Chats() {
  const [search, setSearch] = useState('');
  const apiBaseUrl = import.meta.env.API_URL || 'http://localhost:3000/api/v1';

  const {
    data: chatData = [], // Default to empty array if undefined
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ['chats'],
    queryFn: () => chatApi.getChats(),
    retry: 1,
  });

  // Handle both normal array responses and paginated responses
  const chats = Array.isArray(chatData) ? chatData : chatData?.results || [];

  const filteredChats = chats.filter(
    (chat: Chat) =>
      chat.title?.toLowerCase?.().includes(search.toLowerCase()) || false
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Only show error message if we have an actual error (not just empty results)
  if (isError) {
    // Get HTTP status code if available
    const statusCode = queryError && (queryError as any)?.response?.status;

    let errorTitle = 'Error loading chats';
    let errorMessage = `Make sure your backend API is running at ${apiBaseUrl.replace('/api/v1', '')}`;

    // Customize error message based on status code
    if (statusCode === 401) {
      errorTitle = 'Authentication required';
      errorMessage = 'You need to sign in again to access your chats.';
    } else if (statusCode === 403) {
      errorTitle = 'Access forbidden';
      errorMessage = "You don't have permission to access these chats.";
    } else if (statusCode === 404) {
      errorTitle = 'API endpoint not found';
      errorMessage = 'The chats endpoint does not exist on the server.';
    } else if (statusCode === 500) {
      errorTitle = 'Server error';
      errorMessage = 'The server encountered an error processing your request.';
    } else if (!statusCode) {
      // No status code typically means the server is unreachable
      errorTitle = 'Cannot connect to server';
      errorMessage = `Make sure your backend API is running at ${apiBaseUrl.replace('/api/v1', '')}`;
    }

    return (
      <div className="rounded-md bg-red-50 p-4 my-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{errorTitle}</h3>
            <p className="text-sm text-red-700 mt-2">{errorMessage}</p>
            {statusCode && (
              <p className="text-xs text-red-600 mt-1">
                Status code: {statusCode}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Chats
        </h1>
        <Link
          to="/chats/new"
          className="rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center gap-1"
        >
          <PlusIcon className="h-4 w-4" /> New Chat
        </Link>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full rounded-md border-0 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>

      {filteredChats.length > 0 ?
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredChats.map((chat: Chat) => (
            <Link
              key={chat._id}
              to={`/chats/${chat._id}`}
              className="block rounded-lg border border-gray-200 bg-white p-5 shadow-soft hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {chat.title}
                </h3>
                <ChatBubbleLeftIcon className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(chat.createdAt), 'MMM d, yyyy')}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {chat.metadata?.messageCount || 0} messages
              </p>
            </Link>
          ))}
        </div>
      : <div className="text-center py-12 bg-gray-50 rounded-lg dark:bg-gray-800">
          <ChatBubbleLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No chats found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {search ?
              'Try adjusting your search'
            : 'Start a new chat to get started'}
          </p>
          {!search && (
            <div className="mt-6">
              <Link
                to="/chats/new"
                className="inline-flex items-center rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-primary-500"
              >
                <PlusIcon
                  className="-ml-0.5 mr-1.5 h-4 w-4"
                  aria-hidden="true"
                />
                New Chat
              </Link>
            </div>
          )}
        </div>
      }
    </div>
  );
}
