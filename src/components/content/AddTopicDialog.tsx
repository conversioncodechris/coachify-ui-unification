
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import PromptEnhancementSuggestion from '../settings/add-prompt/PromptEnhancementSuggestion';
import { enhancePrompt } from '@/utils/promptEnhancer';
import { useToast } from '@/hooks/use-toast';

export interface NewTopicData {
  icon: string;
  title: string;
  description: string;
  content?: string;
}

interface AddTopicDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTopic: NewTopicData;
  setNewTopic: React.Dispatch<React.SetStateAction<NewTopicData>>;
  onSubmit: () => void;
  emojiOptions: string[];
}

const AddTopicDialog: React.FC<AddTopicDialogProps> = ({
  isOpen,
  onOpenChange,
  newTopic,
  setNewTopic,
  onSubmit,
  emojiOptions
}) => {
  const { toast } = useToast();
  const [content, setContent] = React.useState("");
  const [showEnhancement, setShowEnhancement] = React.useState(false);
  const [enhancedPromptSuggestion, setEnhancedPromptSuggestion] = React.useState(null);

  const handleSelectEmoji = (emoji: string) => {
    setNewTopic(prev => ({ ...prev, icon: emoji }));
  };

  React.useEffect(() => {
    if (content.trim().length > 15) {
      const enhancedPrompt = enhancePrompt(content);
      setEnhancedPromptSuggestion(enhancedPrompt);
      setShowEnhancement(true);
    } else {
      setEnhancedPromptSuggestion(null);
      setShowEnhancement(false);
    }
  }, [content]);

  const acceptEnhancedPrompt = (enhancedText: string) => {
    setContent(enhancedText);
    setShowEnhancement(false);
    
    toast({
      title: "Enhancement Applied",
      description: "The AI-enhanced prompt has been applied",
    });
  };

  const rejectEnhancedPrompt = () => {
    setShowEnhancement(false);
    
    toast({
      title: "Enhancement Rejected",
      description: "Keeping your original prompt",
    });
  };

  const handleSubmitWithContent = () => {
    if (!newTopic.title.trim() || !newTopic.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description.",
      });
      return;
    }
    
    // Update the newTopic with content before submitting
    setNewTopic(prev => ({ ...prev, content }));
    setTimeout(onSubmit, 0); // Use setTimeout to ensure state is updated before submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Prompt</DialogTitle>
          <DialogDescription>
            Create a new prompt for use in Content AI conversations
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="icon">Icon</Label>
              <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
                {emojiOptions.map((emoji, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`p-2 text-xl rounded hover:bg-gray-100 ${newTopic.icon === emoji ? 'bg-gray-200' : ''}`}
                    onClick={() => handleSelectEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input 
                id="title"
                value={newTopic.title} 
                onChange={(e) => {
                  // Prevent newlines from being entered
                  const value = e.target.value.replace(/[\r\n]/g, '');
                  setNewTopic(prev => ({ ...prev, title: value }))
                }}
                placeholder="Enter topic title"
                maxLength={40}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newTopic.description}
                onChange={(e) => {
                  // Prevent newlines from being entered
                  const value = e.target.value.replace(/[\r\n]/g, '');
                  setNewTopic(prev => ({ ...prev, description: value }))
                }}
                placeholder="Brief description (one line)"
                maxLength={60}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Prompt Content (Optional)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Additional details for the AI (optional)"
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <div>
            <PromptEnhancementSuggestion
              enhancedPrompt={showEnhancement ? enhancedPromptSuggestion : null}
              onAccept={acceptEnhancedPrompt}
              onReject={rejectEnhancedPrompt}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmitWithContent}>Add Prompt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicDialog;
