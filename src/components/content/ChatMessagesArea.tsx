
import React from 'react';
import { Message } from './ContentTypes';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from '../compliance/SuggestedQuestions';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ChatMessagesAreaProps {
  messages: Message[];
  topic: string;
  showSuggestions: boolean;
  suggestedQuestions: string[];
  toggleSourcesPanel: () => void;
  onSuggestedQuestionSelect: (question: string) => void;
  onNewQuestion?: () => void;
  isConversationalInterview?: boolean;
}

const ChatMessagesArea: React.FC<ChatMessagesAreaProps> = ({
  messages,
  topic,
  showSuggestions,
  suggestedQuestions,
  toggleSourcesPanel,
  onSuggestedQuestionSelect,
  onNewQuestion,
  isConversationalInterview
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 pt-[64px] pb-32">
      <div className="max-w-3xl mx-auto space-y-6 mt-4">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage
              content={message.content}
              sender={message.sender}
              sources={message.sources}
              timestamp={message.timestamp}
              toggleSourcesPanel={toggleSourcesPanel}
            />
            
            {/* Show New Question button for first AI message in conversational interviews */}
            {isConversationalInterview && 
             message.sender === 'ai' && 
             index === 0 && 
             onNewQuestion && (
              <div className="flex justify-end mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onNewQuestion}
                  className="text-xs border-insta-gray hover:bg-insta-lightBlue hover:text-insta-blue flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  New Question
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {showSuggestions && (
        <SuggestedQuestions
          topic={topic}
          questions={suggestedQuestions}
          onSelectQuestion={onSuggestedQuestionSelect}
        />
      )}
    </div>
  );
};

export default ChatMessagesArea;
