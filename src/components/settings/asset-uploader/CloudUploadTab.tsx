
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Cloud, Youtube, Link } from "lucide-react";
import { ContentAsset, AssetType, AssetSource } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface CloudUploadTabProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
}

const CloudUploadTab: React.FC<CloudUploadTabProps> = ({ assetType, onAssetAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isYouTubeLink, setIsYouTubeLink] = useState(false);
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([]);
  const [showYouTubeInput, setShowYouTubeInput] = useState(assetType === "video");
  const { toast } = useToast();

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    
    if (assetType === "video") {
      setIsYouTubeLink(validateYouTubeUrl(inputUrl));
    }
  };

  const handleAddYoutubeLink = () => {
    if (!url) {
      toast({
        title: "Empty URL",
        description: "Please enter a YouTube URL",
        variant: "destructive"
      });
      return;
    }

    if (!validateYouTubeUrl(url)) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive"
      });
      return;
    }

    setYoutubeLinks(prev => [...prev, url]);
    setUrl("");
    
    toast({
      title: "YouTube link added",
      description: "Link has been added to the queue"
    });
  };

  const handleRemoveYoutubeLink = (index: number) => {
    setYoutubeLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcessYoutubeLinks = () => {
    if (youtubeLinks.length === 0) {
      toast({
        title: "No links to process",
        description: "Please add at least one YouTube link",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Default icons based on asset type
    const defaultIcon = assetType === 'video' ? '🎥' : '📄';
    
    const assets = youtubeLinks.map(link => {
      // Extract title from URL
      let videoTitle = "";
      try {
        const url = new URL(link);
        if (url.hostname.includes('youtube.com')) {
          videoTitle = url.searchParams.get('v') || "YouTube Video";
        } else if (url.hostname.includes('youtu.be')) {
          videoTitle = url.pathname.substring(1) || "YouTube Video";
        } else {
          videoTitle = "YouTube Video";
        }
      } catch (e) {
        videoTitle = "YouTube Video";
      }
      
      return {
        id: uuidv4(),
        type: assetType,
        title: videoTitle,
        subtitle: "YouTube video",
        icon: defaultIcon,
        source: "google-drive" as AssetSource,
        url: link,
        dateAdded: new Date(),
      } as ContentAsset;
    });
    
    setTimeout(() => {
      onAssetAdded(assets);
      setYoutubeLinks([]);
      setIsProcessing(false);
      
      toast({
        title: "YouTube links processed",
        description: `Added ${assets.length} YouTube video${assets.length > 1 ? 's' : ''}`
      });
    }, 1000);
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
      };
      
      onAssetAdded([asset]);
      setTitle("");
      setDescription("");
      setUrl("");
      setIsProcessing(false);
      
      toast({
        title: "File link processed",
        description: "Your cloud file link has been added successfully"
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {assetType === "video" && (
        <div className="space-y-4 bg-muted/30 p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-600" />
            <h3 className="font-medium">YouTube Videos</h3>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Paste YouTube URL here..."
              value={url}
              onChange={handleUrlChange}
              className="flex-1"
            />
            <Button 
              onClick={handleAddYoutubeLink}
              variant="secondary"
              type="button"
              disabled={!isYouTubeLink}
            >
              Add to Queue
            </Button>
          </div>
          
          {youtubeLinks.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Queue ({youtubeLinks.length})</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setYoutubeLinks([])}
                >
                  Clear All
                </Button>
              </div>
              
              <div className="max-h-[200px] overflow-y-auto space-y-2">
                {youtubeLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Youtube className="h-4 w-4 shrink-0 text-red-600" />
                      <span className="text-sm truncate">{link}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveYoutubeLink(index)}
                      className="h-6 w-6 p-0"
                    >
                      <span className="sr-only">Remove</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={handleProcessYoutubeLinks}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? "Processing..." : `Process ${youtubeLinks.length} YouTube Link${youtubeLinks.length > 1 ? 's' : ''}`}
              </Button>
            </div>
          )}
          
          <div className="pt-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-muted/30 px-2 text-muted-foreground">Or add a direct video URL</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
    </div>
  );
};

export default CloudUploadTab;
