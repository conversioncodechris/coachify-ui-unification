
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "./EmojiPicker";

interface CreateAssetTabProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
}

const CreateAssetTab: React.FC<CreateAssetTabProps> = ({ assetType, onAssetAdded }) => {
  const [emojiPicker, setEmojiPicker] = useState<string>("📄");

  const handleCreateAsset = () => {
    const newAsset: ContentAsset = {
      id: uuidv4(),
      type: assetType,
      title: "New " + assetType.charAt(0).toUpperCase() + assetType.slice(1),
      subtitle: "Click to edit",
      icon: emojiPicker,
      source: "created",
      dateAdded: new Date()
    };
    
    onAssetAdded([newAsset]);
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
      
      <Button onClick={handleCreateAsset}>
        Create New {assetType.charAt(0).toUpperCase() + assetType.slice(1)}
      </Button>
    </div>
  );
};

export default CreateAssetTab;
