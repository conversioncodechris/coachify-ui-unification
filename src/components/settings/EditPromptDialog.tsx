
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
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedAiType, setSelectedAiType] = useState<"content" | "compliance" | "coach">(
    prompt.aiType || "content"
  );

  useEffect(() => {
    if (isOpen && prompt) {
      setSelectedEmoji(prompt.icon);
      setTitle(prompt.title);
      setSubtitle(prompt.subtitle);
      setContent(prompt.content || "");
      setSelectedAiType(prompt.aiType || "content");
    }
  }, [isOpen, prompt]);

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
      isNew: false, // Mark as not new anymore since it's been edited
      aiType: selectedAiType
    };
    
    onPromptUpdated(updatedPrompt);
    onOpenChange(false);
    
    toast({
      title: "Prompt Updated",
      description: `The prompt has been updated and assigned to ${selectedAiType.charAt(0).toUpperCase() + selectedAiType.slice(1)} AI.`,
    });
  };

  // Common emoji options
  const emojiOptions = ["💬", "🗣️", "📝", "📚", "🧠", "💡", "🔍", "📊", "📋", "📈", "🤔", "🎯", "🏆", "✅", "⚠️", "🚨", "🔒", "🛡️", "📑", "📌"];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Prompt</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="ai-type">AI Category</Label>
            <Select 
              value={selectedAiType} 
              onValueChange={(value) => setSelectedAiType(value as "content" | "compliance" | "coach")}
            >
              <SelectTrigger id="ai-type">
                <SelectValue placeholder="Select AI Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="content">Content AI</SelectItem>
                <SelectItem value="compliance">Compliance AI</SelectItem>
                <SelectItem value="coach">Coach AI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt-icon">Icon</Label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
              {emojiOptions.map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  className={`p-2 text-xl rounded hover:bg-gray-100 ${selectedEmoji === emoji ? 'bg-gray-200' : ''}`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
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
