import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from 'date-fns';
export default function MessageBubble({ message }) {
    const isUser = message.role === 'user';
    return (_jsx("div", { className: `flex ${isUser ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-2xl rounded-lg px-4 py-2 ${isUser ?
                'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`, children: [_jsx("p", { className: "text-sm whitespace-pre-wrap", children: message.content }), _jsx("p", { className: "text-xs mt-1 opacity-70", children: format(new Date(message.createdAt), 'MMM d, yyyy HH:mm') }), message.metadata && Object.keys(message.metadata).length > 0 && (_jsxs("div", { className: "mt-2 border-t border-gray-200 dark:border-gray-600 pt-1 text-xs opacity-70", children: [_jsx("div", { className: "font-medium", children: "Metadata:" }), _jsx("ul", { className: "list-disc list-inside", children: Object.entries(message.metadata).map(([key, value]) => (_jsxs("li", { className: "truncate", children: [key, ":", ' ', typeof value === 'object' ?
                                        JSON.stringify(value)
                                        : String(value)] }, key))) })] }))] }) }));
}
