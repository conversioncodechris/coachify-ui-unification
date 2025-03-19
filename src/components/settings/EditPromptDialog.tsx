
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentAsset } from "@/types/contentAssets";
import EmojiPicker from "./asset-uploader/EmojiPicker";
import { useToast } from "@/hooks/use-toast";

interface EditPromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: ContentAsset;
  onPromptUpdated: (updatedPrompt: ContentAsset) => void;
}

const EditPromptDialog: React.FC<EditPromptDialogProps> = ({
  isOpen,
  onOpenChange,
  prompt,
  onPromptUpdated
}) => {
  const { toast } = useToast();
  const [selectedEmoji, setSelectedEmoji] = useState<string>(prompt.icon);
  const [title, setTitle] = useState<string>(prompt.title);
  const [subtitle, setSubtitle] = useState<string>(prompt.subtitle);
  const [content, setContent] = useState<string>(prompt.content || "");

  useEffect(() => {
    if (isOpen && prompt) {
      setSelectedEmoji(prompt.icon);
      setTitle(prompt.title);
      setSubtitle(prompt.subtitle);
      setContent(prompt.content || "");
    }
  }, [isOpen, prompt]);

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your prompt.",
      });
      return;
    }

    const updatedPrompt: ContentAsset = {
      ...prompt,
      icon: selectedEmoji,
      title: title.trim(),
      subtitle: subtitle.trim() || "Prompt-based topic",
      content: content,
      isNew: false // Mark as not new anymore since it's been edited
    };
    
    onPromptUpdated(updatedPrompt);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Prompt</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <EmojiPicker 
            assetType="prompt" 
            selectedEmoji={selectedEmoji} 
            onSelectEmoji={handleSelectEmoji} 
          />
          
          <div className="space-y-2">
            <Label htmlFor="prompt-title">Topic Title</Label>
            <Input
              id="prompt-title"
              value={title}
              onChange={(e) => {
                const value = e.target.value.replace(/[\r\n]/g, '');
                setTitle(value);
              }}
              placeholder="Enter topic title"
              maxLength={40}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt-description">Description</Label>
            <Input
              id="prompt-description"
              value={subtitle}
              onChange={(e) => {
                const value = e.target.value.replace(/[\r\n]/g, '');
                setSubtitle(value);
              }}
              placeholder="Brief description (one line)"
              maxLength={60}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt-content">Prompt Content (Optional)</Label>
            <Textarea
              id="prompt-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Additional details for the AI (optional)"
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPromptDialog;
