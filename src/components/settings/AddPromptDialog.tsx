
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ContentAsset } from '@/types/contentAssets';

interface AddPromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  aiType: "content" | "compliance" | "coach";
  onPromptAdded: (prompt: ContentAsset) => void;
}

const AddPromptDialog: React.FC<AddPromptDialogProps> = ({
  isOpen,
  onOpenChange,
  aiType,
  onPromptAdded
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState("💬");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emojiOptions = [
    "💬", "🗣️", "📝", "📚", "🧠", "💡", "🔍", "📊", "📋", "📈",
    "🤔", "🎯", "🏆", "✅", "⚠️", "🚨", "🔒", "🛡️", "📑", "📌"
  ];

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const resetForm = () => {
    setSelectedEmoji("💬");
    setTitle("");
    setSubtitle("");
    setContent("");
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    
    if (!title.trim()) {
      return; // Validation error - title is required
    }
    
    setIsSubmitting(true);
    
    try {
      // Create new prompt asset
      const newPrompt: ContentAsset = {
        id: uuidv4(),
        type: 'prompt',
        title: title.trim(),
        subtitle: subtitle.trim() || "Prompt-based topic",
        icon: selectedEmoji,
        source: "created",
        dateAdded: new Date(),
        content: content || "",
        isNew: true,
        aiType: aiType
      };
      
      // Pass to parent handler
      onPromptAdded(newPrompt);
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error creating prompt:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Prompt for {aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="icon">Icon</Label>
            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
              {emojiOptions.map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  className={`p-2 text-xl rounded hover:bg-gray-100 ${selectedEmoji === emoji ? 'bg-gray-200' : ''}`}
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
              value={title}
              onChange={(e) => {
                const value = e.target.value.replace(/[\r\n]/g, '');
                setTitle(value);
              }}
              placeholder="Enter topic title"
              maxLength={40}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={subtitle}
              onChange={(e) => {
                const value = e.target.value.replace(/[\r\n]/g, '');
                setSubtitle(value);
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
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? "Adding..." : "Add Prompt"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPromptDialog;
