
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addConversationalPrompt } from './addConversationalPrompt';

interface ConversationalPromptButtonProps {
  onSuccess?: () => void;
}

const ConversationalPromptButton: React.FC<ConversationalPromptButtonProps> = ({ onSuccess }) => {
  const { toast } = useToast();

  const handleAddConversationalPrompt = () => {
    try {
      const prompt = addConversationalPrompt();
      
      if (prompt) {
        toast({
          title: "Success",
          description: "Conversational Interview prompt has been added to your content.",
        });
        
        if (onSuccess) onSuccess();
      } else {
        toast({
          title: "Already exists",
          description: "This conversational prompt is already in your collection.",
        });
      }
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
      onClick={handleAddConversationalPrompt}
      className="w-full flex items-center justify-start gap-2 border-dashed border-2 h-auto py-3"
    >
      <MessageSquare className="h-5 w-5 text-purple-500" />
      <div className="text-left">
        <div className="font-medium">Add Conversational Interview Prompt</div>
        <div className="text-sm text-muted-foreground">Turn a casual conversation into content for multiple platforms</div>
      </div>
    </Button>
  );
};

export default ConversationalPromptButton;
