import { format } from 'date-fns';
import { Message } from '../utils/api';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-2xl rounded-lg px-4 py-2 ${
          isUser ?
            'bg-primary-600 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs mt-1 opacity-70">
          {format(new Date(message.createdAt), 'MMM d, yyyy HH:mm')}
        </p>

        {/* Display metadata if available */}
        {message.metadata && Object.keys(message.metadata).length > 0 && (
          <div className="mt-2 border-t border-gray-200 dark:border-gray-600 pt-1 text-xs opacity-70">
            <div className="font-medium">Metadata:</div>
            <ul className="list-disc list-inside">
              {Object.entries(message.metadata).map(([key, value]) => (
                <li key={key} className="truncate">
                  {key}:{' '}
                  {typeof value === 'object' ?
                    JSON.stringify(value)
                  : String(value)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
