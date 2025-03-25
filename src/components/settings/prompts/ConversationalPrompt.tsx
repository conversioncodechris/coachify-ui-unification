
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ContentAsset } from '@/types/contentAssets';

// Sample conversational prompt
const conversationalPrompt = {
  id: 'conv-interview-1',
  type: 'prompt',
  title: 'Conversational Interview → Multi-Platform Output',
  subtitle: 'Turn a casual conversation into content for multiple platforms',
  icon: '🎙️',
  source: 'created',
  dateAdded: new Date(),
  content: "Hey! Let's turn your expertise into 🔥 content. Pretend I'm a friend asking this:\n'My sister wants to buy a house but needs to sell hers first—what should I tell her?'\nJust answer like you would in real life, and I'll turn it into magic for Facebook, Instagram, and an email follow-up. Ready?",
  aiType: 'content',
  conversational: true
};

interface ConversationalPromptProps {
  onAddPrompt: (prompt: ContentAsset) => void;
}

const ConversationalPrompt: React.FC<ConversationalPromptProps> = ({ onAddPrompt }) => {
  const { toast } = useToast();

  const addConversationalPrompt = () => {
    try {
      // Assign a new ID to make it unique
      const newPrompt = {
        ...conversationalPrompt,
        id: uuidv4()
      };
      
      // Save to localStorage
      const storageKey = 'contentAssets';
      let existingAssets = [];
      
      const storedAssets = localStorage.getItem(storageKey);
      if (storedAssets) {
        try {
          existingAssets = JSON.parse(storedAssets);
        } catch (error) {
          console.error(`Error parsing ${storageKey}:`, error);
        }
      }
      
      // Check if a prompt with this title already exists
      const existingPromptIndex = existingAssets.findIndex(
        (asset: ContentAsset) => 
          asset.type === 'prompt' && 
          asset.title === newPrompt.title
      );
      
      if (existingPromptIndex >= 0) {
        toast({
          title: "Prompt Already Exists",
          description: "This conversational prompt is already in your collection.",
        });
        return;
      }
      
      existingAssets.push(newPrompt);
      localStorage.setItem(storageKey, JSON.stringify(existingAssets));
      
      // Dispatch custom event to update UI
      const customEvent = new Event('contentAssetsUpdated');
      window.dispatchEvent(customEvent);
      
      // Call parent handler
      onAddPrompt(newPrompt as ContentAsset);
      
      toast({
        title: "Conversational Prompt Added",
        description: "Your new conversational prompt is ready to use.",
      });
    } catch (error) {
      console.error("Error adding conversational prompt:", error);
      toast({
        title: "Error",
        description: "Failed to add conversational prompt. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={addConversationalPrompt}
      className="w-full flex items-center justify-center gap-2 border-dashed border-2 h-auto py-3"
    >
      <MessageSquare className="h-5 w-5" />
      <div className="text-left">
        <div className="font-medium">Add Conversational Interview Prompt</div>
        <div className="text-sm text-muted-foreground">Create multi-platform content from natural conversations</div>
      </div>
    </Button>
  );
};

export default ConversationalPrompt;
