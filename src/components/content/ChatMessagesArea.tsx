
import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import { Message } from './ContentTypes';

interface ChatMessagesAreaProps {
  messages: Message[];
  topic: string;
  showSuggestions: boolean;
  suggestedQuestions: string[];
  toggleSourcesPanel: () => void;
  onSuggestedQuestionSelect: (question: string) => void;
  onEditMessage: (id: string, content: string) => void;
  onDeleteMessage: (id: string) => void;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto pt-16 pb-[140px] px-4 bg-white">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            id={message.id}
            content={message.content}
            sender={message.sender}
            sources={message.sources}
            timestamp={message.timestamp}
            toggleSourcesPanel={toggleSourcesPanel}
            onEdit={(content) => onEditMessage(message.id, content)}
            onDelete={() => onDeleteMessage(message.id)}
          />
        ))}
        
        {showSuggestions && suggestedQuestions.length > 0 && (
          <SuggestedQuestions
            topic={topic}
            questions={suggestedQuestions}
            onSelectQuestion={onSuggestedQuestionSelect}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessagesArea;
