import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi, messageApi } from '../utils/api';
import MessageBubble from '../components/MessageBubble';
export default function ChatDetail() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [newMessage, setNewMessage] = useState('');
    // Fetch chat details
    const { data: chat, isLoading: isChatLoading } = useQuery({
        queryKey: ['chat', id],
        queryFn: () => chatApi.getChat(id),
        enabled: !!id,
    });
    // Fetch messages for this chat
    const { data: messages = [], isLoading: isMessagesLoading } = useQuery({
        queryKey: ['messages', id],
        queryFn: () => messageApi.getMessages(id),
        enabled: !!id,
    });
    const sendMessageMutation = useMutation({
        mutationFn: (content) => {
            // First send user message
            return messageApi.createMessage(id, {
                role: 'user',
                content,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', id] });
            setNewMessage('');
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            sendMessageMutation.mutate(newMessage.trim());
        }
    };
    const isLoading = isChatLoading || isMessagesLoading;
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400" }) }));
    }
    return (_jsxs("div", { className: "flex flex-col h-[calc(100vh-8rem)]", children: [_jsx("div", { className: "mb-4 border-b border-gray-200 pb-4", children: _jsx("h1", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: chat?.title }) }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.map((message) => (_jsx(MessageBubble, { message: message }, message._id))), messages.length === 0 && (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "No messages yet. Start the conversation!" }) }))] }), _jsx("form", { onSubmit: handleSubmit, className: "p-4 border-t border-gray-200 dark:border-gray-700", children: _jsxs("div", { className: "flex space-x-4", children: [_jsx("input", { type: "text", value: newMessage, onChange: (e) => setNewMessage(e.target.value), placeholder: "Type your message...", className: "w-full rounded-md border-0 py-2.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700", disabled: sendMessageMutation.isPending }), _jsx("button", { type: "submit", disabled: !newMessage.trim() || sendMessageMutation.isPending, className: "rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white dark:bg-primary-500 dark:hover:bg-primary-600 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed", children: "Send" })] }) })] }));
}
