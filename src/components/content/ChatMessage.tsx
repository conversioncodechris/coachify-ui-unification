
import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, FileText } from 'lucide-react';
import { Source } from './ContentTypes';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'ai';
  sources?: Source[];
  timestamp: Date;
  toggleSourcesPanel: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  sender,
  sources,
  toggleSourcesPanel
}) => {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-4 ${
          sender === 'user' 
            ? 'bg-insta-blue text-white' 
            : 'bg-white border border-border'
        }`}
      >
        <div className="flex items-center mb-2">
          {sender === 'ai' && (
            <div className="mr-2 bg-insta-gray p-1 rounded-full">
              <MessageSquare size={16} className="text-insta-blue" />
            </div>
          )}
          <span className="font-medium">
            {sender === 'user' ? 'You' : 'Content AI'}
          </span>
        </div>
        <p>{content}</p>
        {sender === 'ai' && (
          <div className="flex items-center mt-2 space-x-2 text-insta-lightText">
            <button className="p-1 hover:bg-insta-gray rounded">
              <ThumbsUp size={16} />
            </button>
            <button className="p-1 hover:bg-insta-gray rounded">
              <ThumbsDown size={16} />
            </button>
            {sources && sources.length > 0 && (
              <div className="ml-auto flex items-center">
                <button 
                  onClick={toggleSourcesPanel}
                  className="flex items-center text-insta-blue hover:underline"
                >
                  <FileText size={14} className="mr-1" />
                  <span className="text-xs">{sources.length} sources</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
