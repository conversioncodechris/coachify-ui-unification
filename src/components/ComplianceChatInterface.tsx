import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Send, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getQuestionsForTopic } from '@/data/complianceQuestions';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ComplianceChatInterfaceProps {
  topic: string;
  onBackToTopics: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: Source[];
}

interface Source {
  title: string;
  content: string;
  url?: string;
}

const ComplianceChatInterface: React.FC<ComplianceChatInterfaceProps> = ({ topic, onBackToTopics }) => {
  const navigate = useNavigate();
  const topicQuestions = getQuestionsForTopic(topic);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      content: `Welcome to the ${topic} topic! Here are some common questions you might have:`,
      timestamp: new Date(),
      sources: [
        {
          title: 'Fair Housing Act',
          content: 'The Fair Housing Act is a federal law that prohibits discrimination in housing based on race, color, national origin, religion, sex, familial status, or disability.',
          url: 'https://www.hud.gov/program_offices/fair_housing_equal_opp/fair_housing_act_overview'
        },
        {
          title: 'Recent Legal Precedents',
          content: 'This fictitious source contains information about recent court cases affecting real estate compliance requirements and best practices for agents.',
          url: 'https://example.com/legal-precedents'
        }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(0);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (topic) {
      const savedChats = localStorage.getItem('complianceActiveChats');
      let activeChats = savedChats ? JSON.parse(savedChats) : [];
      
      const chatExists = activeChats.some((chat: {title: string, path: string}) => 
        chat.title === topic
      );
      
      if (!chatExists) {
        const chatId = Date.now().toString();
        const chatPath = `/compliance/chat/${chatId}`;
        
        activeChats.push({
          title: topic,
          path: chatPath
        });
        
        localStorage.setItem('complianceActiveChats', JSON.stringify(activeChats));
        
        navigate(chatPath, { replace: true });
      }
    }
  }, [topic, navigate]);

  const mockSources: Source[] = [
    {
      title: 'Fair Housing Act',
      content: 'The Fair Housing Act is a federal law that prohibits discrimination in housing based on race, color, national origin, religion, sex, familial status, or disability.',
      url: 'https://www.hud.gov/program_offices/fair_housing_equal_opp/fair_housing_act_overview'
    },
    {
      title: 'NAR Code of Ethics',
      content: 'The National Association of REALTORS® Code of Ethics establishes standards of ethical conduct for real estate professionals.',
      url: 'https://www.nar.realtor/about-nar/governing-documents/code-of-ethics/2022-code-of-ethics-standards-of-practice'
    },
    {
      title: 'State Real Estate Commission',
      content: 'State licensing laws and regulations govern real estate practice within each jurisdiction.',
      url: 'https://www.arello.org/regulatory-agencies/'
    },
    {
      title: 'Recent Legal Precedents',
      content: 'This fictitious source contains information about recent court cases affecting real estate compliance requirements and best practices for agents.',
      url: 'https://example.com/legal-precedents'
    }
  ];

  const handleSendMessage = (message: string = inputMessage) => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      sender: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowSuggestions(false);
    
    setTimeout(() => {
      const aiResponse: Message = {
        sender: 'ai',
        content: `Thank you for your question about ${topic}. This is a simulated response that would typically come from the AI assistant with helpful information about this real estate compliance topic.`,
        timestamp: new Date(),
        sources: mockSources
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

  const toggleSourcesPanel = () => {
    setIsSourcesPanelOpen(!isSourcesPanelOpen);
    if (!isSourcesPanelOpen) {
      setActiveSourceIndex(0);
    }
  };

  const showSourceDetails = (index: number) => {
    setActiveSourceIndex(index === activeSourceIndex ? null : index);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const allSources = messages
    .filter(msg => msg.sender === 'ai' && msg.sources && msg.sources.length > 0)
    .flatMap(msg => msg.sources || []);

  return (
    <div className="flex h-full pt-16 pb-[120px]">
      <div className={cn(
        "flex flex-col flex-1 h-full transition-all duration-300 relative",
        isSourcesPanelOpen ? "mr-72" : ""
      )}>
        <div className="fixed top-16 left-0 right-0 z-40 flex p-4 bg-white border-b border-border items-center">
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
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={cn(
                    "ml-auto p-2 rounded-full hover:bg-insta-gray transition-colors",
                    isSourcesPanelOpen ? "text-insta-blue bg-insta-lightBlue" : "text-insta-lightText"
                  )}
                  onClick={toggleSourcesPanel}
                >
                  <div className="relative">
                    {isSourcesPanelOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {!isSourcesPanelOpen && allSources.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {isSourcesPanelOpen ? "Hide sources" : "Show sources"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex-1 overflow-y-auto p-4 mt-16">
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
                      {message.sources && message.sources.length > 0 && (
                        <div className="ml-auto flex items-center">
                          <FileText size={14} className="mr-1" />
                          <span className="text-xs">{message.sources.length} sources</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {showSuggestions && (
            <div className="max-w-3xl mx-auto mt-6 mb-2">
              <div className="border border-border rounded-lg p-4 bg-white">
                <p className="text-sm font-medium mb-3">Common questions about {topic}:</p>
                <div className="space-y-2">
                  {topicQuestions.map((question, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="bg-insta-lightBlue text-insta-blue w-6 h-6 flex items-center justify-center rounded-full font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <Button 
                        variant="outline" 
                        className="text-left justify-start h-auto py-2 flex-1 border-insta-gray hover:bg-insta-lightBlue hover:text-insta-blue"
                        onClick={() => handleSuggestedQuestion(question)}
                      >
                        {question}
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-insta-lightText mt-3">Or ask your own question below if not listed</p>
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-border bg-white">
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
              onClick={() => handleSendMessage()}
            >
              <Send size={20} />
            </button>
          </div>
          <div className="max-w-3xl mx-auto mt-2 text-xs text-insta-lightText flex items-center">
            <FileText size={14} className="mr-1" />
            Sources used by our AI will display here after each response.
            {allSources.length > 0 && (
              <button 
                className="ml-2 text-insta-blue hover:underline"
                onClick={toggleSourcesPanel}
              >
                {isSourcesPanelOpen ? "Hide" : "View"} sources
              </button>
            )}
          </div>
        </div>
        
        {!isSourcesPanelOpen && allSources.length > 0 && (
          <div 
            className="absolute right-0 top-16 bottom-0 w-1 bg-insta-blue cursor-pointer animate-pulse"
            onClick={toggleSourcesPanel}
          />
        )}
      </div>

      <div className={cn(
        "fixed right-0 top-16 bottom-0 w-72 bg-white border-l border-border transition-transform duration-300 z-10 flex flex-col shadow-lg",
        isSourcesPanelOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-4 border-b border-border flex items-center justify-between bg-insta-gray/30">
          <div className="flex items-center">
            <FileText size={18} className="text-insta-blue mr-2" />
            <h3 className="font-medium">Sources</h3>
            {allSources.length > 0 && (
              <span className="ml-2 text-xs bg-insta-blue text-white rounded-full px-2 py-0.5">
                {allSources.length}
              </span>
            )}
          </div>
          <button 
            className="p-1 hover:bg-insta-gray rounded-full text-insta-blue"
            onClick={toggleSourcesPanel}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3">
          {allSources.length > 0 ? (
            <div className="space-y-3">
              {allSources.map((source, index) => (
                <div 
                  key={index}
                  className="border border-border rounded-md overflow-hidden transition-all duration-200 hover:border-insta-blue/50 hover:shadow-md"
                >
                  <div 
                    className={cn(
                      "p-3 cursor-pointer flex items-center justify-between",
                      activeSourceIndex === index ? "bg-insta-lightBlue" : "bg-insta-gray/30"
                    )}
                    onClick={() => showSourceDetails(index)}
                  >
                    <div className="font-medium text-sm">{source.title}</div>
                    <ChevronRight 
                      size={16} 
                      className={cn(
                        "text-insta-blue transition-transform duration-200",
                        activeSourceIndex === index ? "transform rotate-90" : ""
                      )} 
                    />
                  </div>
                  
                  {activeSourceIndex === index && (
                    <div className="p-3 border-t border-border bg-white">
                      <p className="text-sm text-insta-darkText mb-2">{source.content}</p>
                      {source.url && (
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-insta-blue hover:underline flex items-center"
                        >
                          View source
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-insta-lightText">
              <FileText size={24} className="mb-2 opacity-50" />
              <p className="text-sm">No sources available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceChatInterface;
