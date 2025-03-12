
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
  onEditMessage?: (id: string, newContent: string) => void;
  onDeleteMessage?: (id: string) => void;
}

const ChatMessagesArea: React.FC<ChatMessagesAreaProps> = ({
  messages,
  topic,
  showSuggestions,
  suggestedQuestions,
  toggleSourcesPanel,
  onSuggestedQuestionSelect,
  onEditMessage,
  onDeleteMessage
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 pt-[64px] pb-32">
      <div className="max-w-3xl mx-auto space-y-6 mt-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id || message.timestamp.toString()}
            id={message.id}
            content={message.content}
            sender={message.sender}
            sources={message.sources}
            timestamp={message.timestamp}
            toggleSourcesPanel={toggleSourcesPanel}
            onEdit={onEditMessage}
            onDelete={onDeleteMessage}
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
