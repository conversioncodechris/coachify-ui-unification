
import React from 'react';
import { Button } from '@/components/ui/button';

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
    <div className="max-w-3xl mx-auto mt-6 mb-2">
      <div className="border border-border rounded-lg p-4 bg-white">
        <p className="text-sm font-medium mb-3">Common questions about {topic}:</p>
        <div className="space-y-2">
          {questions.map((question, index) => (
            <div key={index} className="flex gap-2">
              <span className="bg-insta-lightBlue text-insta-blue w-6 h-6 flex items-center justify-center rounded-full font-medium flex-shrink-0">
                {index + 1}
              </span>
              <Button 
                variant="outline" 
                className="text-left justify-start h-auto py-2 flex-1 border-insta-gray hover:bg-insta-lightBlue hover:text-insta-blue"
                onClick={() => onSelectQuestion(question)}
              >
                {question}
              </Button>
            </div>
          ))}
        </div>
        <p className="text-xs text-insta-lightText mt-3">Or ask your own question below if not listed</p>
      </div>
    </div>
  );
};

export default SuggestedQuestions;
