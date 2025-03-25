
import React, { useState } from 'react';
import { contentPromptPacks } from '@/data/promptPacks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

const PromptPackBanner: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  // Just show the first pack for now
  const pack = contentPromptPacks[0];

  if (!pack) return null;

  const handleCopyPrompt = () => {
    const promptText = "💬 Prompt Format #1: Conversational Interview → Multi-Platform Output\n\"Hey! Let's turn your expertise into 🔥 content. Pretend I'm a friend asking this:\n'My sister wants to buy a house but needs to sell hers first—what should I tell her?'\nJust answer like you would in real life, and I'll turn it into magic for Facebook, Instagram, and an email follow-up. Ready?\"";
    
    navigator.clipboard.writeText(promptText)
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
              {pack.prompts.slice(0, 3).map((prompt) => (
                <Badge 
                  key={prompt.id} 
                  variant="outline" 
                  className="whitespace-nowrap flex items-center gap-1 bg-white/70"
                >
                  <span>{prompt.icon}</span>
                  <span className="max-w-28 truncate">{prompt.title}</span>
                </Badge>
              ))}
              {pack.prompts.length > 3 && (
                <Badge variant="outline" className="whitespace-nowrap bg-white/70">
                  +{pack.prompts.length - 3} more
                </Badge>
              )}
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
        
        <CollapsibleContent className="mt-2 space-y-2">
          <div className="bg-white rounded-lg p-3 border">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💬</span>
                <h3 className="font-medium text-sm">Conversational Interview → Multi-Platform Output</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-7 text-blue-600"
                onClick={handleCopyPrompt}
              >
                Copy
              </Button>
            </div>
            <p className="text-sm text-gray-700 mb-2 ml-8">
              "Hey! Let's turn your expertise into 🔥 content. Pretend I'm a friend asking this:
              'My sister wants to buy a house but needs to sell hers first—what should I tell her?'
              Just answer like you would in real life, and I'll turn it into magic for Facebook, Instagram, and an email follow-up. Ready?"
            </p>
            <div className="flex justify-end">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                Quick Content Kickstart
              </Badge>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default PromptPackBanner;
