
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube } from "lucide-react";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import YouTubeLinksQueue from "./YouTubeLinksQueue";
import { validateYouTubeUrl } from "@/lib/utils";

interface YouTubeLinksManagerProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
  aiType: "compliance" | "coach" | "content";
}

const YouTubeLinksManager: React.FC<YouTubeLinksManagerProps> = ({
  assetType,
  onAssetAdded,
  aiType
}) => {
  const [url, setUrl] = useState("");
  const [isYouTubeLink, setIsYouTubeLink] = useState(false);
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    setIsYouTubeLink(validateYouTubeUrl(inputUrl));
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
    
    // Default icon based on asset type
    const defaultIcon = '🎥';
    
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
        subtitle: `YouTube video for ${aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI`,
        icon: defaultIcon,
        source: "google-drive",
        url: link,
        dateAdded: new Date(),
        aiType: aiType,
      } as ContentAsset;
    });
    
    setTimeout(() => {
      onAssetAdded(assets);
      setYoutubeLinks([]);
      setIsProcessing(false);
      
      toast({
        title: "YouTube links processed",
        description: `Added ${assets.length} YouTube video${assets.length > 1 ? 's' : ''} to ${aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI`
      });
    }, 1000);
  };

  return (
    <div className="space-y-4 bg-muted/30 p-4 rounded-lg border">
      <div className="flex items-center gap-2">
        <Youtube className="h-5 w-5 text-red-600" />
        <h3 className="font-medium">YouTube Videos for {aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI</h3>
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
        <YouTubeLinksQueue 
          links={youtubeLinks} 
          onRemoveLink={handleRemoveYoutubeLink} 
          onClearAll={() => setYoutubeLinks([])}
          onProcessLinks={handleProcessYoutubeLinks}
          isProcessing={isProcessing}
        />
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
  );
};

export default YouTubeLinksManager;
