
import React, { useState, useEffect } from 'react';
import { Send, FileText } from 'lucide-react';
import { enhancePrompt, EnhancedPrompt } from '@/utils/promptEnhancer';
import { useToast } from '@/hooks/use-toast';
import ChatEnhancementSuggestion from '../content/ChatEnhancementSuggestion';

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
  const [enhancedPromptSuggestion, setEnhancedPromptSuggestion] = useState<EnhancedPrompt | null>(null);
  const [showEnhancement, setShowEnhancement] = useState(false);
  const { toast } = useToast();

  // Generate enhanced prompt suggestion when input message changes
  useEffect(() => {
    // Only suggest enhancement if message is substantial (over 15 chars)
    if (inputMessage.trim().length > 15) {
      const enhancedPrompt = enhancePrompt(inputMessage);
      setEnhancedPromptSuggestion(enhancedPrompt);
      setShowEnhancement(true);
    } else {
      setEnhancedPromptSuggestion(null);
      setShowEnhancement(false);
    }
  }, [inputMessage]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage('');
    setShowEnhancement(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const acceptEnhancedPrompt = (enhancedText: string) => {
    setInputMessage(enhancedText);
    setShowEnhancement(false);
    
    toast({
      title: "Prompt Enhanced",
      description: "We've applied an AI-optimized version of your prompt",
    });
  };

  const rejectEnhancedPrompt = () => {
    setShowEnhancement(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-border bg-white">
      <div className="max-w-3xl mx-auto relative">
        {showEnhancement && enhancedPromptSuggestion && (
          <ChatEnhancementSuggestion
            enhancedPrompt={enhancedPromptSuggestion}
            onAccept={acceptEnhancedPrompt}
            onReject={rejectEnhancedPrompt}
          />
        )}
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask about ${topic}...`}
          className="insta-input pr-12 min-h-[60px] resize-none w-full"
          rows={2}
        />
        <button 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-insta-blue p-2 hover:bg-insta-lightBlue rounded-full"
          onClick={handleSendMessage}
        >
          <Send size={20} />
        </button>
      </div>
      <div className="max-w-3xl mx-auto mt-2 text-xs text-insta-lightText flex items-center">
        <FileText size={14} className="mr-1" />
        Sources used by our AI will display in the right-hand column after each response.
        {allSourcesLength > 0 && (
          <button 
            className="ml-2 text-insta-blue hover:underline"
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
