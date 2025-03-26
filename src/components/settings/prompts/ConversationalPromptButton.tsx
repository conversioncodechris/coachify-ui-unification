
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addConversationalPrompt } from './addConversationalPrompt';
import { useNavigate } from 'react-router-dom';

interface ConversationalPromptButtonProps {
  onSuccess?: () => void;
  openChat?: boolean;
}

const ConversationalPromptButton: React.FC<ConversationalPromptButtonProps> = ({ 
  onSuccess, 
  openChat = false 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddConversationalPrompt = () => {
    try {
      const prompt = addConversationalPrompt();
      
      if (prompt) {
        toast({
          title: "Success",
          description: "Conversational Interview prompt has been added to your content.",
        });
        
        if (onSuccess) onSuccess();

        // Navigate to chat if openChat is true
        if (openChat) {
          // Create a new chat session with the prompt title
          const createChatSession = () => {
            const promptTitle = "Conversational Interview";
            const newChatId = Date.now().toString();
            const chatPath = `/content/chat/${newChatId}`;
            
            // Get existing active chats from localStorage
            const savedChats = localStorage.getItem('contentActiveChats');
            let activeChats = [];
            
            if (savedChats) {
              try {
                activeChats = JSON.parse(savedChats);
              } catch (e) {
                console.error('Error parsing active chats:', e);
              }
            }
            
            // Add new chat to active chats
            const updatedChats = [
              ...activeChats,
              {
                title: promptTitle,
                path: chatPath,
                skipSuggestions: true,  // Flag to skip suggestions
                isConversational: true  // Flag to indicate conversational flow
              }
            ];
            
            localStorage.setItem('contentActiveChats', JSON.stringify(updatedChats));
            
            // Navigate to the new chat
            navigate(chatPath);
          };
          
          createChatSession();
        }
      } else {
        toast({
          title: "Already exists",
          description: "This conversational prompt is already in your collection.",
        });
        
        if (openChat) {
          // Find an existing chat with "Conversational Interview" title or create a new one
          const savedChats = localStorage.getItem('contentActiveChats');
          let activeChats = [];
          
          if (savedChats) {
            try {
              activeChats = JSON.parse(savedChats);
              const existingChat = activeChats.find(
                (chat: any) => chat.title === "Conversational Interview" && !chat.hidden
              );
              
              if (existingChat) {
                // Update the chat to skip suggestions if it doesn't have that flag
                if (!existingChat.skipSuggestions || !existingChat.isConversational) {
                  const updatedChats = activeChats.map((chat: any) => 
                    chat.title === "Conversational Interview" && !chat.hidden
                      ? { ...chat, skipSuggestions: true, isConversational: true }
                      : chat
                  );
                  localStorage.setItem('contentActiveChats', JSON.stringify(updatedChats));
                }
                navigate(existingChat.path);
                return;
              }
            } catch (e) {
              console.error('Error parsing active chats:', e);
            }
          }
          
          // No existing chat found, create a new one
          const newChatId = Date.now().toString();
          const chatPath = `/content/chat/${newChatId}`;
          
          const updatedChats = [
            ...activeChats,
            {
              title: "Conversational Interview",
              path: chatPath,
              skipSuggestions: true,
              isConversational: true
            }
          ];
          
          localStorage.setItem('contentActiveChats', JSON.stringify(updatedChats));
          navigate(chatPath);
        }
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
