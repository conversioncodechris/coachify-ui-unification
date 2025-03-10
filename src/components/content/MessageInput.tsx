
import React, { useState } from 'react';
import { BookOpen, Send } from 'lucide-react';
import { Button } from '../ui/button';

interface MessageInputProps {
  topic: string;
  onSendMessage: (message: string) => void;
  toggleSourcesPanel: () => void;
  allSourcesLength: number;
  isSourcesPanelOpen: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  topic,
  onSendMessage,
  toggleSourcesPanel,
  allSourcesLength,
  isSourcesPanelOpen
}) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-border bg-white">
      <div className="max-w-3xl mx-auto">
        {allSourcesLength > 0 && !isSourcesPanelOpen && (
          <div className="flex justify-end mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSourcesPanel}
              className="flex items-center gap-1 text-xs py-1 px-2 h-auto"
            >
              <BookOpen size={14} />
              <span>View Sources ({allSourcesLength})</span>
            </Button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Ask about ${topic}...`} 
            className="insta-input pr-12"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-insta-blue"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
