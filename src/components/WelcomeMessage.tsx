
import React from 'react';

interface WelcomeMessageProps {
  name?: string;
  type: 'mortgage' | 'content' | 'coach';
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ name, type }) => {
  const getTitle = () => {
    if (type === 'mortgage') return `Welcome to Insta AI!`;
    if (type === 'content') return `Welcome to Content AI!`;
    if (type === 'coach') return name ? `Welcome back, ${name} 👋` : `Welcome to Coach AI!`;
  };

  const getContent = () => {
    if (type === 'mortgage') {
      return (
        <div>
          <h3 className="font-medium text-lg mb-4">Start a New Chat 🚀</h3>
          <ol className="text-left space-y-2">
            <li>1. Type Your Question: Enter your query in the chat box below</li>
            <li>2. Mention a Topic: For best results, provide more context</li>
            <li>3. Get Expert Guidance: Our AI will assist based on your query</li>
          </ol>
        </div>
      );
    }
    
    if (type === 'content') {
      return (
        <div>
          <div className="mb-4">To start crafting your content:</div>
          <ol className="text-left space-y-2">
            <li>1. Enter your details such as topic, keywords, and target audience.</li>
            <li>2. Hit 'Suggest' to get some creative input or 'Generate' when you're ready.</li>
          </ol>
          <div className="mt-4">
            Your personalized content will appear here, ready for review and refinement. Whether you're looking to engage, inform, or convert - your tailored masterpiece awaits your final touch.
          </div>
        </div>
      );
    }
    
    if (type === 'coach') {
      return (
        <div className="mt-4 text-lg">Continue chatting</div>
      );
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-insta-text mb-2">{getTitle()}</h2>
      {getContent()}
    </div>
  );
};

export default WelcomeMessage;
