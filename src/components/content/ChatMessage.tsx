
import React from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Source } from './ContentTypes';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sources?: Source[];
  toggleSourcesPanel: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  sender,
  timestamp,
  sources,
  toggleSourcesPanel
}) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      className={cn(
        "flex",
        sender === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-4",
          sender === 'user'
            ? "bg-insta-blue text-white rounded-tr-none"
            : "bg-gray-100 text-insta-text rounded-tl-none"
        )}
      >
        <div className="whitespace-pre-wrap">{content}</div>

        <div className="flex items-center justify-between mt-2 text-xs opacity-70">
          <span>{formattedTime}</span>
          
          {sender === 'ai' && sources && sources.length > 0 && (
            <button
              onClick={toggleSourcesPanel}
              className="flex items-center ml-4 underline"
            >
              <BookOpen size={12} className="mr-1" />
              <span>
                {sources.length} {sources.length === 1 ? 'source' : 'sources'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
