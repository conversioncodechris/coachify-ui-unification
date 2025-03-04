import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { MessageSquare, Send, EyeOff, Pin, PinOff, Plus } from 'lucide-react';
import ComplianceChatInterface from '../components/ComplianceChatInterface';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { useToast } from "../hooks/use-toast";

interface ComplianceTopic {
  icon: string;
  title: string;
  description: string;
  hidden?: boolean;
  pinned?: boolean;
}

const ComplianceAI = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { toast } = useToast();
  const [topics, setTopics] = useState<ComplianceTopic[]>([
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
    },
    {
      icon: '🔍',
      title: 'RESPA Compliance',
      description: 'Real Estate Settlement Procedures Act rules'
    },
    {
      icon: '💼',
      title: 'Broker Supervision',
      description: 'Requirements for managing agents'
    },
    {
      icon: '🏘️',
      title: 'Property Management Laws',
      description: 'Landlord-tenant regulations'
    },
    {
      icon: '🧾',
      title: 'Tax Compliance',
      description: 'Real estate tax reporting requirements'
    },
    {
      icon: '🔐',
      title: 'Wire Fraud Prevention',
      description: 'Security protocols for transactions'
    },
    {
      icon: '📣',
      title: 'Advertising Regulations',
      description: 'Truth in advertising requirements'
    }
  ]);

  const [newTopic, setNewTopic] = useState({
    icon: '📝',
    title: '',
    description: ''
  });

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  const handleHideTopic = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      const updatedTopics = [...prevTopics];
      updatedTopics[index].hidden = true;
      return updatedTopics;
    });
  };

  const handleTogglePin = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      const updatedTopics = [...prevTopics];
      updatedTopics[index].pinned = !updatedTopics[index].pinned;
      return updatedTopics;
    });
  };

  const handleAddTopicClick = () => {
    toast({
      title: "Coming Soon",
      description: "The ability to add custom topics will be available soon.",
    });
  };

  const sortedTopics = [...topics].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  }).filter(topic => !topic.hidden);

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16"> {/* Add padding for fixed header */}
        <Sidebar type="compliance" />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          {selectedTopic ? (
            <ComplianceChatInterface 
              topic={selectedTopic} 
              onBackToTopics={handleBackToTopics} 
            />
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 pt-4 pb-24"> {/* Adjusted top padding since header is removed */}
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-border p-6">
                  <h2 className="text-2xl font-semibold text-insta-text mb-6">Real Estate Compliance Topics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sortedTopics.map((topic, index) => (
                      <div 
                        key={index} 
                        className="insta-card cursor-pointer hover:border-insta-blue transition-colors relative group"
                        onClick={() => handleTopicClick(topic.title)}
                      >
                        <div className="flex items-start">
                          <span className="text-xl mr-2">{topic.icon}</span>
                          <div>
                            <div className="font-medium">{topic.title}</div>
                            <div className="text-sm text-insta-lightText line-clamp-1">{topic.description}</div>
                          </div>
                        </div>
                        
                        {/* Action buttons on hover */}
                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  className="text-insta-lightText hover:text-insta-text bg-white rounded-full p-1 shadow-sm"
                                  onClick={(e) => handleHideTopic(topics.findIndex(t => t.title === topic.title), e)}
                                >
                                  <EyeOff size={16} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>Hide this topic</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  className={`text-insta-lightText hover:text-insta-text bg-white rounded-full p-1 shadow-sm ${topic.pinned ? 'text-insta-blue' : ''}`}
                                  onClick={(e) => handleTogglePin(topics.findIndex(t => t.title === topic.title), e)}
                                >
                                  {topic.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>{topic.pinned ? 'Unpin this topic' : 'Pin this topic'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        
                        {/* Pin indicator */}
                        {topic.pinned && (
                          <div className="absolute top-0 left-0 bg-insta-blue text-white p-1 text-xs rounded-tl-md rounded-br-md">
                            <Pin size={12} />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Add Topic Card */}
                    <div 
                      className="insta-card cursor-pointer hover:border-insta-blue transition-colors relative group border-dashed border-2"
                      onClick={handleAddTopicClick}
                    >
                      <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center text-insta-lightText">
                          <Plus size={24} className="mb-2" />
                          <span className="font-medium">Add New Topic</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-border bg-white">
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
