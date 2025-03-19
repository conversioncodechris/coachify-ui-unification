
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface CloudResourceFormProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
  aiType: "compliance" | "coach" | "content";
}

const CloudResourceForm: React.FC<CloudResourceFormProps> = ({
  assetType,
  onAssetAdded,
  aiType
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !url) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Default icons based on asset type
    const defaultIcon = assetType === 'pdf' ? '📄' : 
                       assetType === 'guidelines' ? '📘' : 
                       assetType === 'roleplay' ? '🎭' : 
                       assetType === 'video' ? '🎥' : '📄';
    
    setTimeout(() => {
      const asset: ContentAsset = {
        id: uuidv4(),
        type: assetType,
        title,
        subtitle: description,
        icon: defaultIcon,
        source: "google-drive",
        url,
        dateAdded: new Date(),
        aiType: aiType,
      };
      
      onAssetAdded([asset]);
      setTitle("");
      setDescription("");
      setUrl("");
      setIsProcessing(false);
      
      toast({
        title: "File link processed",
        description: `Your cloud file link has been added to ${aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI successfully`
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={40}
          placeholder="Enter a title for this resource"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
          placeholder="Enter a brief description"
          className="min-h-[80px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="url">
          {assetType === 'video' ? 'Direct Video URL' : 'Resource URL'}
        </Label>
        <Input
          id="url"
          value={url}
          onChange={handleUrlChange}
          placeholder={`Enter ${assetType === 'video' ? 'direct video URL' : 'URL'}`}
        />
      </div>
      
      <Button type="submit" disabled={isProcessing} className="w-full">
        {isProcessing ? "Processing..." : "Add Cloud Resource"}
      </Button>
    </form>
  );
};

export default CloudResourceForm;
