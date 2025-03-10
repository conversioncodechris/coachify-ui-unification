
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface SuggestedQuestionsProps {
  topic: string;
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  topic,
  questions,
  onSelectQuestion
}) => {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center text-insta-text mb-3">
          <MessageSquare size={18} className="mr-2" />
          <h3 className="font-medium">Suggested Questions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {questions.map((question, index) => (
            <button
              key={index}
              className="text-left p-2 hover:bg-gray-100 rounded-md text-sm"
              onClick={() => onSelectQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedQuestions;
