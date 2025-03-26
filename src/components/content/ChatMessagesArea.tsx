
import React, { useState } from 'react';
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

// Set of common interview questions for realtors - set 1
const INTERVIEW_QUESTIONS_SET_1 = [
  "What's your approach to pricing a home in today's market?",
  "How do you handle multiple offers on a property?",
  "What strategies do you use to market a difficult property?",
  "Tell me about a challenging transaction and how you overcame it",
  "How do you stay informed about the local real estate market?"
];

// Set of common interview questions for realtors - set 2
const INTERVIEW_QUESTIONS_SET_2 = [
  "What's your process for qualifying potential buyers?",
  "How do you handle client objections during negotiations?",
  "What differentiates you from other real estate agents?",
  "How do you maintain relationships with past clients?",
  "What technology tools do you use to improve your business?"
];

// Set of common interview questions for realtors - set 3
const INTERVIEW_QUESTIONS_SET_3 = [
  "How do you prepare sellers for the home inspection process?",
  "What's your strategy for pricing in a competitive market?",
  "How do you handle a property that isn't selling?",
  "What's your approach to winning listings in your area?",
  "How do you help first-time homebuyers through the process?"
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
  const [currentQuestionSet, setCurrentQuestionSet] = useState<number>(1);
  
  const interviewQuestions = currentQuestionSet === 1 ? INTERVIEW_QUESTIONS_SET_1 : 
                             currentQuestionSet === 2 ? INTERVIEW_QUESTIONS_SET_2 : 
                             INTERVIEW_QUESTIONS_SET_3;
  
  const handleNewQuestions = () => {
    // Cycle through the question sets
    setCurrentQuestionSet(prev => prev === 3 ? 1 : prev + 1);
    
    // Also call the original onNewQuestion if it exists
    if (onNewQuestion) {
      onNewQuestion();
    }
  };
  
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
      
      {/* Display interview questions for conversational interviews */}
      {isConversationalInterview && messages.length > 0 && (
        <div className="max-w-3xl mx-auto mt-6 mb-2">
          <div className="border border-border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">Common questions I can ask you:</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNewQuestions}
                className="text-xs border-insta-gray hover:bg-insta-lightBlue hover:text-insta-blue flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                New Questions
              </Button>
            </div>
            <div className="space-y-2">
              {interviewQuestions.map((question, index) => (
                <div key={index} className="flex gap-2">
                  <span className="bg-insta-lightBlue text-insta-blue w-6 h-6 flex items-center justify-center rounded-full font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <Button 
                    variant="outline" 
                    className="text-left justify-start h-auto py-2 flex-1 border-insta-gray hover:bg-insta-lightBlue hover:text-insta-blue"
                    onClick={() => onSuggestedQuestionSelect && onSuggestedQuestionSelect(question)}
                  >
                    {question}
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-insta-lightText mt-3">Click on any question or type your own below</p>
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
