
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "./EmojiPicker";

interface CloudUploadTabProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
}

const CloudUploadTab: React.FC<CloudUploadTabProps> = ({ assetType, onAssetAdded }) => {
  const [emojiPicker, setEmojiPicker] = useState<string>("📄");

  const handleConnectCloud = (provider: "google-drive" | "dropbox") => {
    alert(`Connecting to ${provider}. This would open the authentication flow.`);
    
    const mockCloudAsset: ContentAsset = {
      id: uuidv4(),
      type: assetType,
      title: `${provider} ${assetType}`,
      subtitle: `Imported from ${provider}`,
      icon: emojiPicker,
      source: provider === "google-drive" ? "google-drive" : "dropbox",
      fileName: `cloud-file-${Date.now()}.pdf`,
      dateAdded: new Date(),
      url: `https://example.com/${provider}/file`,
      size: 1024 * 1024 * 2
    };
    
    onAssetAdded([mockCloudAsset]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="p-6 cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center text-center"
          onClick={() => handleConnectCloud("google-drive")}
        >
          <div className="rounded-full bg-blue-100 p-4 mb-3">
            <svg className="h-8 w-8 text-blue-500" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
              <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
              <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
              <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
              <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
              <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
              <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
            </svg>
          </div>
          <h3 className="font-medium mb-1">Connect to Google Drive</h3>
          <p className="text-sm text-muted-foreground">Import files from your Google Drive</p>
        </Card>
        
        <Card 
          className="p-6 cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center text-center"
          onClick={() => handleConnectCloud("dropbox")}
        >
          <div className="rounded-full bg-blue-100 p-4 mb-3">
            <svg className="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L6 7l6 5-6 5 6 5 6-5-6-5 6-5z"/>
              <path d="M18 7l-6 5 6 5 6-5z"/>
              <path d="M0 12l6 5 6-5-6-5z"/>
            </svg>
          </div>
          <h3 className="font-medium mb-1">Connect to Dropbox</h3>
          <p className="text-sm text-muted-foreground">Import files from your Dropbox</p>
        </Card>
      </div>
      
      <div className="mt-4 space-y-2">
        <EmojiPicker
          assetType={assetType}
          selectedEmoji={emojiPicker}
          onSelectEmoji={setEmojiPicker}
          label="Select Icon for Cloud Assets"
        />
      </div>
    </div>
  );
};

export default CloudUploadTab;
