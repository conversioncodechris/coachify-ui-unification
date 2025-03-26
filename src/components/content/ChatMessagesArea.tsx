
import React from 'react';
import { Message } from './ContentTypes';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
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

const INTERVIEW_TOPICS = [
  "Recent Property Transaction",
  "Client Success Story",
  "Neighborhood Market Update",
  "Challenging Deal Overcome",
  "Unique Property Feature",
  "First-time Buyer Experience",
  "Luxury Property Sale",
  "Commercial Property Deal",
  "Investment Property Analysis",
  "Property Staging Success"
];

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
      
      {/* Display interview topics for conversational interviews */}
      {isConversationalInterview && messages.length > 0 && (
        <div className="max-w-3xl mx-auto mt-6 mb-2">
          <div className="border border-border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">Interview topics you can discuss:</p>
              {onNewQuestion && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onNewQuestion}
                  className="text-xs border-insta-gray hover:bg-insta-lightBlue hover:text-insta-blue flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  New Question
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {INTERVIEW_TOPICS.map((topic, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="bg-insta-lightBlue text-insta-blue w-6 h-6 flex items-center justify-center rounded-full font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm">{topic}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-insta-lightText mt-3">Share your experience on any of these topics or your own</p>
          </div>
        </div>
      )}
      
      {showSuggestions && !isConversationalInterview && (
        <SuggestedQuestions
          topic={topic}
          questions={suggestedQuestions}
          onSelectQuestion={onSuggestedQuestionSelect}
          onNewQuestion={onNewQuestion}
        />
      )}
    </div>
  );
};

export default ChatMessagesArea;
