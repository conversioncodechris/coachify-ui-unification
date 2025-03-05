import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ComplianceChatInterface from '../components/ComplianceChatInterface';
import { useToast } from "../hooks/use-toast";
import TopicsGrid from '../components/compliance/TopicsGrid';
import AddTopicDialog from '../components/compliance/AddTopicDialog';
import ComplianceFooter from '../components/compliance/ComplianceFooter';
import { ComplianceTopic } from '../components/compliance/TopicCard';

const EMOJI_OPTIONS = [
  '📝', '🏠', '⚖️', '🤝', '💰', '📱', '🔒', '🌎', '📊', '📋', 
  '🔍', '💼', '🏘️', '🧾', '🔐', '📣', '🔔', '💡', '📚', '🛡️'
];

const ComplianceAI = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  
  const chatMatch = location.pathname.match(/\/compliance\/chat\/(\d+)/);
  const chatId = chatMatch ? chatMatch[1] : null;
  
  useEffect(() => {
    if (chatId) {
      const savedChats = localStorage.getItem('complianceActiveChats');
      if (savedChats) {
        const activeChats = JSON.parse(savedChats);
        const currentChat = activeChats.find((chat: {title: string, path: string}) => 
          chat.path.includes(chatId)
        );
        
        if (currentChat) {
          setSelectedTopic(currentChat.title);
        }
      }
    }
  }, [chatId, location.pathname]);

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
  
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);

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
    setNewTopic({
      icon: '📝',
      title: '',
      description: ''
    });
    setIsAddTopicOpen(true);
  };
  
  const handleAddTopicSubmit = () => {
    if (!newTopic.title.trim() || !newTopic.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description.",
      });
      return;
    }
    
    if (newTopic.title.includes('\n') || newTopic.description.includes('\n')) {
      toast({
        title: "Invalid format",
        description: "Title and description must be single line text.",
      });
      return;
    }

    setTopics(prevTopics => [...prevTopics, { 
      ...newTopic,
      title: newTopic.title.trim(),
      description: newTopic.description.trim()
    }]);
    
    setIsAddTopicOpen(false);
    
    toast({
      title: "Topic Added",
      description: `"${newTopic.title}" has been added to your topics.`,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar type="compliance" />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          {selectedTopic ? (
            <ComplianceChatInterface 
              topic={selectedTopic} 
              onBackToTopics={handleBackToTopics} 
            />
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 pt-4 pb-24">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-border p-6">
                  <h2 className="text-2xl font-semibold text-insta-text mb-6">Real Estate Compliance Topics</h2>
                  
                  <TopicsGrid 
                    topics={topics}
                    onTopicClick={handleTopicClick}
                    onHideTopic={handleHideTopic}
                    onTogglePin={handleTogglePin}
                    onAddTopicClick={handleAddTopicClick}
                  />
                </div>
              </div>
              
              <ComplianceFooter placeholder="Ask about real estate compliance topics..." />
            </>
          )}
        </div>
      </div>
      
      <AddTopicDialog 
        isOpen={isAddTopicOpen}
        onOpenChange={setIsAddTopicOpen}
        newTopic={newTopic}
        setNewTopic={setNewTopic}
        onSubmit={handleAddTopicSubmit}
        emojiOptions={EMOJI_OPTIONS}
      />
    </div>
  );
};

export default ComplianceAI;
