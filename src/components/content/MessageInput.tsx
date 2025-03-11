
import React, { useState } from 'react';
import { Send, FileText } from 'lucide-react';

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
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-border bg-white">
      <div className="max-w-3xl mx-auto relative">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask about ${topic}...`}
          className="insta-input pr-12 min-h-[60px] resize-none w-full"
          rows={2}
        />
        <button 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 p-2 hover:bg-gray-100 rounded-full"
          onClick={handleSendMessage}
        >
          <Send size={20} />
        </button>
      </div>
      <div className="max-w-3xl mx-auto mt-2 text-xs text-gray-500 flex items-center">
        <FileText size={14} className="mr-1" />
        Sources used by our AI will display in the right-hand column after each response.
        {allSourcesLength > 0 && (
          <button 
            className="ml-2 text-gray-600 hover:underline"
            onClick={toggleSourcesPanel}
          >
            {isSourcesPanelOpen ? "Hide" : "View"} sources
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
