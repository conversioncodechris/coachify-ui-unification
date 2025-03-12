
import React from 'react';
import { Message } from './ContentTypes';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';

interface ChatMessagesAreaProps {
  messages: Message[];
  topic: string;
  showSuggestions: boolean;
  suggestedQuestions: string[];
  toggleSourcesPanel: () => void;
  onSuggestedQuestionSelect: (question: string) => void;
}

const ChatMessagesArea: React.FC<ChatMessagesAreaProps> = ({
  messages,
  topic,
  showSuggestions,
  suggestedQuestions,
  toggleSourcesPanel,
  onSuggestedQuestionSelect
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 pt-[64px] pb-32">
      <div className="max-w-3xl mx-auto space-y-6 mt-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            content={message.content}
            sender={message.sender}
            sources={message.sources}
            timestamp={message.timestamp}
            toggleSourcesPanel={toggleSourcesPanel}
          />
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
