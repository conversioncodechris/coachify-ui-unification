
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface DraftAssetTabProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
  aiType?: "compliance" | "coach" | "content";
}

const DraftAssetTab: React.FC<DraftAssetTabProps> = ({ 
  assetType, 
  onAssetAdded,
  aiType = "content"
}) => {
  const [typedContent, setTypedContent] = useState({
    title: "",
    subtitle: "",
    content: ""
  });
  const { toast } = useToast();

  // Default icons based on asset type
  const defaultIcon = assetType === 'pdf' ? '📄' : 
                     assetType === 'guidelines' ? '📘' : 
                     assetType === 'roleplay' ? '🎭' : 
                     assetType === 'video' ? '🎥' : '📄';

  const handleSubmitTypedContent = () => {
    if (!typedContent.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your content.",
        variant: "destructive"
      });
      return;
    }
    
    const newAsset: ContentAsset = {
      id: uuidv4(),
      type: assetType,
      title: typedContent.title,
      subtitle: typedContent.subtitle || `Manually created content for ${aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI`,
      icon: defaultIcon,
      source: "created",
      dateAdded: new Date(),
      url: `data:text/plain;base64,${btoa(typedContent.content || " ")}`, // Store content as data URL
      aiType: aiType
    };
    
    onAssetAdded([newAsset]);
    
    toast({
      title: "Content created",
      description: `Content has been added to ${aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI successfully`
    });
    
    setTypedContent({
      title: "",
      subtitle: "",
      content: ""
    });
  };

  return (
    <div className="space-y-4">
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
