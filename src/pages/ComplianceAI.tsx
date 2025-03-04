
import React, { useState } from 'react';
import AppHeader from '../components/AppHeader';
import Sidebar from '../components/Sidebar';
import { MessageSquare, Send } from 'lucide-react';
import ComplianceChatInterface from '../components/ComplianceChatInterface';

interface ComplianceTopic {
  icon: string;
  title: string;
  description: string;
}

const ComplianceAI = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  const complianceTopics: ComplianceTopic[] = [
    {
      icon: '🏠',
      title: 'Fair Housing Laws',
      description: 'Anti-discrimination requirements'
    },
    {
      icon: '📝',
      title: 'Disclosure Requirements',
      description: 'Property condition and material facts'
    },
    {
      icon: '⚖️',
      title: 'License Law',
      description: 'State licensing requirements'
    },
    {
      icon: '🤝',
      title: 'Agency Relationships',
      description: 'Fiduciary duties and client representation'
    },
    {
      icon: '💰',
      title: 'Commissions & Compensation',
      description: 'Regulatory guidelines on fees'
    },
    {
      icon: '📱',
      title: 'Digital Marketing Compliance',
      description: 'Online advertising rules'
    },
    {
      icon: '🔒',
      title: 'Data Privacy',
      description: 'Client information protection'
    },
    {
      icon: '🌎',
      title: 'Environmental Regulations',
      description: 'Hazards and property conditions'
    },
    {
      icon: '📊',
      title: 'Antitrust Compliance',
      description: 'Competition and price-fixing issues'
    },
    {
      icon: '📋',
      title: 'Contracts & Forms',
      description: 'Legal document requirements'
    }
  ];

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar type="compliance" />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          {selectedTopic ? (
            <ComplianceChatInterface 
              topic={selectedTopic} 
              onBackToTopics={handleBackToTopics} 
            />
          ) : (
            <>
              <div className="flex p-4 bg-white border-b border-border items-center space-x-4">
                <div className="bg-insta-gray p-2 rounded-md">
                  <MessageSquare size={20} className="text-insta-blue" />
                </div>
                <h2 className="text-lg font-medium">New Chat</h2>
              </div>
              
              <div className="flex-1 overflow-auto p-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-border p-6">
                  <h2 className="text-2xl font-semibold text-insta-text mb-6">Real Estate Compliance Topics</h2>
                  
                  <div className="mt-8">
                    <h3 className="font-medium text-lg mb-4">Popular Real Estate Compliance Topics:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {complianceTopics.map((topic, index) => (
                        <div 
                          key={index} 
                          className="insta-card cursor-pointer hover:border-insta-blue transition-colors"
                          onClick={() => handleTopicClick(topic.title)}
                        >
                          <div className="flex items-start">
                            <span className="text-xl mr-2">{topic.icon}</span>
                            <div>
                              <div className="font-medium">{topic.title}</div>
                              <div className="text-sm text-insta-lightText">{topic.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-border bg-white">
                <div className="max-w-3xl mx-auto relative">
                  <input 
                    type="text" 
                    placeholder="Ask about real estate compliance topics..." 
                    className="insta-input pr-12"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-insta-blue">
                    <Send size={20} />
                  </button>
                </div>
                <div className="max-w-3xl mx-auto mt-2 text-center text-xs text-insta-lightText">
                  Sources used by our AI will display here after each response. Start chatting to see references.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceAI;
