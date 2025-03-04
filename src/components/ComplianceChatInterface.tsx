
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Send } from 'lucide-react';

interface ComplianceChatInterfaceProps {
  topic: string;
  onBackToTopics: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ComplianceChatInterface: React.FC<ComplianceChatInterfaceProps> = ({ topic, onBackToTopics }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      content: `Welcome to the ${topic} topic! How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate AI response (in real app, would call an API)
    setTimeout(() => {
      const aiResponse: Message = {
        sender: 'ai',
        content: `Thank you for your question about ${topic}. This is a simulated response that would typically come from the AI assistant with helpful information about this real estate compliance topic.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex p-4 bg-white border-b border-border items-center">
        <button 
          onClick={onBackToTopics}
          className="mr-3 text-insta-blue hover:text-insta-blue/80"
        >
          ← Back
        </button>
        <div className="bg-insta-gray p-2 rounded-md">
          <MessageSquare size={20} className="text-insta-blue" />
        </div>
        <h2 className="text-lg font-medium ml-4">{topic}</h2>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user' 
                    ? 'bg-insta-blue text-white' 
                    : 'bg-white border border-border'
                }`}
              >
                <div className="flex items-center mb-2">
                  {message.sender === 'ai' && (
                    <div className="mr-2 bg-insta-gray p-1 rounded-full">
                      <MessageSquare size={16} className="text-insta-blue" />
                    </div>
                  )}
                  <span className="font-medium">
                    {message.sender === 'user' ? 'You' : 'Compliance AI'}
                  </span>
                </div>
                <p>{message.content}</p>
                {message.sender === 'ai' && (
                  <div className="flex items-center mt-2 space-x-2 text-insta-lightText">
                    <button className="p-1 hover:bg-insta-gray rounded">
                      <ThumbsUp size={16} />
                    </button>
                    <button className="p-1 hover:bg-insta-gray rounded">
                      <ThumbsDown size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border bg-white">
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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-insta-blue p-2 hover:bg-insta-lightBlue rounded-full"
            onClick={handleSendMessage}
          >
            <Send size={20} />
          </button>
        </div>
        <div className="max-w-3xl mx-auto mt-2 text-xs text-insta-lightText">
          Sources used by our AI will display here after each response.
        </div>
      </div>
    </div>
  );
};

export default ComplianceChatInterface;
