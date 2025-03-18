import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { ContentAsset } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "./EmojiPicker";
import { useToast } from "@/hooks/use-toast";

interface PromptFormProps {
  onAddPrompt: (asset: ContentAsset) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ onAddPrompt }) => {
  const { toast } = useToast();
  const [emojiPicker, setEmojiPicker] = useState<string>("💬");
  const [typedContent, setTypedContent] = useState({
    title: "",
    subtitle: "",
    content: ""
  });

  const handleSelectEmoji = (emoji: string) => {
    setEmojiPicker(emoji);
  };

  const handleAddPrompt = () => {
    if (!typedContent.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your prompt.",
      });
      return;
    }

    const newPromptAsset: ContentAsset = {
      id: uuidv4(),
      type: 'prompt',
      title: typedContent.title.trim(),
      subtitle: typedContent.subtitle.trim() || "Prompt-based topic",
      icon: emojiPicker,
      source: "created",
      dateAdded: new Date(),
      content: typedContent.content || "",
      isNew: true // Explicitly mark as new
    };
    
    console.log("Creating new prompt asset:", newPromptAsset);
    onAddPrompt(newPromptAsset);
    
    setTimeout(() => {
      console.log("Dispatching contentAssetsUpdated event after creating prompt");
      const customEvent = new Event('contentAssetsUpdated');
      window.dispatchEvent(customEvent);
    }, 100);
    
    setTypedContent({
      title: "",
      subtitle: "",
      content: ""
    });
    
    toast({
      title: "Prompt Created",
      description: "This prompt will appear as a topic card in Content AI.",
    });
  };

  return (
    <div className="space-y-4 border rounded-md p-4">
      <h3 className="font-medium text-center">Create New Content Topic</h3>
      <div className="space-y-4">
        <EmojiPicker 
          assetType="prompt" 
          selectedEmoji={emojiPicker} 
          onSelectEmoji={handleSelectEmoji} 
        />
        
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
            onClick={() => setTypedContent({ title: "", subtitle: "", content: "" })}
          >
            Cancel
          </Button>
          <Button onClick={handleAddPrompt}>
            Add Topic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptForm;
