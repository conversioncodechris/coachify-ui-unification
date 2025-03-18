
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, FileText } from "lucide-react";
import { ContentAsset, AssetType, AssetSource } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "./EmojiPicker";

interface FileUploadTabProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
}

const FileUploadTab: React.FC<FileUploadTabProps> = ({ assetType, onAssetAdded }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [newAssets, setNewAssets] = useState<Partial<ContentAsset>[]>([]);
  const [emojiPicker, setEmojiPicker] = useState<string>("📄");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      const prelimAssets = newFiles.map(file => ({
        id: uuidv4(),
        type: assetType,
        title: file.name.split('.')[0],
        subtitle: "",
        icon: emojiPicker,
        source: "upload" as AssetSource,
        fileName: file.name,
        dateAdded: new Date(),
        size: file.size,
      }));
      
      setNewAssets(prelimAssets);
    }
  };

  const handleAssetTitleChange = (index: number, value: string) => {
    setNewAssets(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], title: value };
      return updated;
    });
  };

  const handleAssetSubtitleChange = (index: number, value: string) => {
    setNewAssets(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], subtitle: value };
      return updated;
    });
  };

  const handleAssetIconChange = (index: number, value: string) => {
    setNewAssets(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], icon: value };
      return updated;
    });
  };

  const handleSubmitAssets = () => {
    setIsUploading(true);
    
    setTimeout(() => {
      const completeAssets = newAssets.map(asset => ({
        ...asset,
        id: asset.id || uuidv4(),
        dateAdded: asset.dateAdded || new Date()
      })) as ContentAsset[];
      
      onAssetAdded(completeAssets);
      setFiles([]);
      setNewAssets([]);
      setIsUploading(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-2">
          Drag and drop files or click to browse
        </p>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          Select Files
        </Button>
      </div>

      {newAssets.length > 0 && (
        <div className="space-y-4 mt-4">
          <h3 className="font-medium">Files Ready for Upload</h3>
          
          <div className="space-y-4">
            {newAssets.map((asset, index) => (
              <div key={index} className="border rounded-md p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{files[index]?.name}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <EmojiPicker
                      assetType={assetType}
                      selectedEmoji={asset.icon || "📄"}
                      onSelectEmoji={(emoji) => handleAssetIconChange(index, emoji)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-3">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${index}`}>Title</Label>
                      <Input
                        id={`title-${index}`}
                        value={asset.title || ""}
                        onChange={(e) => handleAssetTitleChange(index, e.target.value)}
                        maxLength={40}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`subtitle-${index}`}>Description</Label>
                      <Input
                        id={`subtitle-${index}`}
                        value={asset.subtitle || ""}
                        onChange={(e) => handleAssetSubtitleChange(index, e.target.value)}
                        maxLength={60}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitAssets}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload All Files"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadTab;
