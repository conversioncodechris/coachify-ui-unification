
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentAsset } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface PromptFormProps {
  onAddPrompt: (asset: ContentAsset) => void;
  aiType?: "content" | "compliance" | "coach";
}

const PromptForm: React.FC<PromptFormProps> = ({ onAddPrompt, aiType = "content" }) => {
  const { toast } = useToast();
  const [selectedEmoji, setSelectedEmoji] = useState<string>("💬");
  const [typedContent, setTypedContent] = useState({
    title: "",
    subtitle: "",
    content: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common emoji options
  const emojiOptions = ["💬", "🗣️", "📝", "📚", "🧠", "💡", "🔍", "📊", "📋", "📈", "🤔", "🎯", "🏆", "✅", "⚠️", "🚨", "🔒", "🛡️", "📑", "📌"];

  const handleAddPrompt = () => {
    if (isSubmitting) return;
    
    if (!typedContent.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your prompt.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create the asset object
      const newPromptAsset: ContentAsset = {
        id: uuidv4(),
        type: 'prompt',
        title: typedContent.title.trim(),
        subtitle: typedContent.subtitle.trim() || "Prompt-based topic",
        icon: selectedEmoji,
        source: "created",
        dateAdded: new Date(),
        content: typedContent.content || "",
        isNew: true,
        aiType: aiType 
      };
      
      console.log(`Creating new ${aiType} prompt asset:`, newPromptAsset);
      
      // Save to localStorage
      const storageKey = `${aiType}Assets`;
      let existingAssets = [];
      
      const storedAssets = localStorage.getItem(storageKey);
      if (storedAssets) {
        try {
          existingAssets = JSON.parse(storedAssets);
        } catch (error) {
          console.error(`Error parsing ${storageKey}:`, error);
        }
      }
      
      existingAssets.push(newPromptAsset);
      localStorage.setItem(storageKey, JSON.stringify(existingAssets));
      
      // Dispatch custom event to update UI
      const customEvent = new Event('contentAssetsUpdated');
      window.dispatchEvent(customEvent);
      
      // Reset form
      setTypedContent({
        title: "",
        subtitle: "",
        content: ""
      });
      setSelectedEmoji("💬");
      
      // Call parent handler
      onAddPrompt(newPromptAsset);
      
      toast({
        title: "Prompt Created",
        description: `This prompt will appear as a topic card in the ${aiType} AI.`,
      });
      
    } catch (error) {
      console.error("Error creating prompt:", error);
      toast({
        title: "Error",
        description: "Failed to create prompt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 border rounded-md p-4">
      <h3 className="font-medium text-center">Create New Content Topic for {aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI</h3>
      <div className="space-y-4">
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
            value={typedContent.title}
            onChange={(e) => {
              const value = e.target.value.replace(/[\r\n]/g, '');
              setTypedContent(prev => ({ ...prev, title: value }));
            }}
            placeholder="Enter topic title"
            maxLength={40}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="prompt-description">Description</Label>
          <Input
            id="prompt-description"
            value={typedContent.subtitle}
            onChange={(e) => {
              const value = e.target.value.replace(/[\r\n]/g, '');
              setTypedContent(prev => ({ ...prev, subtitle: value }));
            }}
            placeholder="Brief description (one line)"
            maxLength={60}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="prompt-content">Prompt Content (Optional)</Label>
          <Textarea
            id="prompt-content"
            value={typedContent.content}
            onChange={(e) => setTypedContent(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Additional details for the AI (optional)"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setTypedContent({ title: "", subtitle: "", content: "" });
              setSelectedEmoji("💬");
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddPrompt}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Topic"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptForm;
