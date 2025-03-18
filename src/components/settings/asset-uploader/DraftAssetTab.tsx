
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "./EmojiPicker";

interface DraftAssetTabProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
}

const DraftAssetTab: React.FC<DraftAssetTabProps> = ({ assetType, onAssetAdded }) => {
  const [emojiPicker, setEmojiPicker] = useState<string>("📄");
  const [typedContent, setTypedContent] = useState({
    title: "",
    subtitle: "",
    content: ""
  });

  const handleSubmitTypedContent = () => {
    if (!typedContent.title.trim()) return;
    
    const newAsset: ContentAsset = {
      id: uuidv4(),
      type: assetType,
      title: typedContent.title,
      subtitle: typedContent.subtitle || "Manually created content",
      icon: emojiPicker,
      source: "created",
      dateAdded: new Date(),
      url: `data:text/plain;base64,${btoa(typedContent.content || " ")}` // Store content as data URL
    };
    
    onAssetAdded([newAsset]);
    
    setTypedContent({
      title: "",
      subtitle: "",
      content: ""
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <EmojiPicker
          assetType={assetType}
          selectedEmoji={emojiPicker}
          onSelectEmoji={setEmojiPicker}
        />
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="type-title">Title</Label>
          <Input
            id="type-title"
            value={typedContent.title}
            onChange={(e) => setTypedContent(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter title"
            maxLength={40}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type-subtitle">Description</Label>
          <Input
            id="type-subtitle"
            value={typedContent.subtitle}
            onChange={(e) => setTypedContent(prev => ({ ...prev, subtitle: e.target.value }))}
            placeholder="Brief description"
            maxLength={60}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type-content">Content</Label>
          <Textarea
            id="type-content"
            value={typedContent.content}
            onChange={(e) => setTypedContent(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Type your content here..."
            className="min-h-[150px]"
          />
        </div>
      </div>
      
      <Button 
        onClick={handleSubmitTypedContent}
        disabled={!typedContent.title.trim()}
      >
        Create Content
      </Button>
    </div>
  );
};

export default DraftAssetTab;
