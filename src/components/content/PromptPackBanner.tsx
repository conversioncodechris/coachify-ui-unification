
import React, { useState } from 'react';
import { contentPromptPacks } from '@/data/promptPacks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const PromptPackBanner: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  // Just show the first pack for now
  const pack = contentPromptPacks[0];

  if (!pack) return null;

  const prompts = [
    {
      id: "format-1",
      title: "Conversational Interview",
      subtitle: "Multi-Platform Output",
      icon: "💬",
      content: "Hey! Let's turn your expertise into 🔥 content. Pretend I'm a friend asking this:\n'My sister wants to buy a house but needs to sell hers first—what should I tell her?'\nJust answer like you would in real life, and I'll turn it into magic for Facebook, Instagram, and an email follow-up. Ready?",
      badge: "Quick Content Kickstart"
    },
    {
      id: "format-2",
      title: "Testimonial Content Extractor",
      subtitle: "Real Story Builder",
      icon: "💬",
      content: "You ever save a deal that almost blew up? 😅 Walk me through one. What happened, what did you do, and how did it end? I'll spin that into a powerful testimonial + Instagram story.",
      badge: "Real Story Builder"
    },
    {
      id: "format-3",
      title: "Market Update Reflection Prompt",
      subtitle: "Voice of the Expert",
      icon: "💬",
      content: "If you ran into a neighbor and they asked, 'What's happening in the market right now?' — how would you explain it in one minute? I'll package that for LinkedIn, Blog + SMS.",
      badge: "Voice of the Expert"
    },
    {
      id: "format-4",
      title: "Shame-Free Re-engagement",
      subtitle: "Today's Content Spark",
      icon: "💬",
      content: "Hey… haven't posted in a while? No biggie. Let's do one today together. Just answer this:\n'What's the biggest misconception buyers have right now?'\nI'll handle the rest.",
      badge: "Today's Content Spark"
    },
    {
      id: "format-5",
      title: "Carousel Builder",
      subtitle: "Advanced Template",
      icon: "💬",
      content: "Let's build a swipe-through Instagram carousel! 🎠\nFirst—tell me 3 things first-time buyers should never do. I'll guide you through it, one card at a time.",
      badge: "Advanced Template"
    }
  ];

  const activePrompt = prompts[activePromptIndex];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activePrompt.content)
      .then(() => {
        toast({
          title: "Prompt Copied!",
          description: "Paste it in your chat to get started"
        });
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Please try again or copy manually",
          variant: "destructive"
        });
      });
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 border-b">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <Sparkles className="h-4 w-4 text-purple-500 flex-shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">{pack.name} Pack:</span>
            <div className="flex gap-1 overflow-x-auto hide-scrollbar">
              {prompts.map((prompt, index) => (
                <Badge 
                  key={prompt.id} 
                  variant={activePromptIndex === index ? "default" : "outline"}
                  className={`whitespace-nowrap flex items-center gap-1 cursor-pointer ${activePromptIndex === index ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 'bg-white/70'}`}
                  onClick={() => setActivePromptIndex(index)}
                >
                  <span>{prompt.icon}</span>
                  <span className="max-w-28 truncate">{prompt.title}</span>
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/customize-aire')}
              className="text-xs font-medium text-purple-600 hover:text-purple-800 flex-shrink-0"
            >
              Import
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        
        <CollapsibleContent className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            {prompts.map((prompt, index) => (
              <Card 
                key={prompt.id}
                className={`border hover:shadow-md transition-shadow cursor-pointer ${
                  activePromptIndex === index ? 'ring-2 ring-purple-200' : ''
                }`}
                onClick={() => setActivePromptIndex(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{prompt.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{prompt.title}</div>
                      <div className="text-sm text-muted-foreground">{prompt.subtitle}</div>
                      <div className="mt-2 text-xs text-gray-600 line-clamp-2">{prompt.content}</div>
                      <div className="mt-2 flex justify-between items-center">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                          {prompt.badge}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-7 text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(prompt.content);
                            toast({
                              title: "Prompt Copied!",
                              description: "Paste it in your chat to get started"
                            });
                          }}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default PromptPackBanner;
