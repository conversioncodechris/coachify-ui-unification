
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, FileText } from "lucide-react";
import { ContentAsset, AssetType, AssetSource } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface FileUploadTabProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
  aiType?: "compliance" | "coach" | "content";
}

const FileUploadTab: React.FC<FileUploadTabProps> = ({ 
  assetType, 
  onAssetAdded, 
  aiType = "content" 
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [newAssets, setNewAssets] = useState<Partial<ContentAsset>[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      // Default icons based on asset type
      const defaultIcon = assetType === 'pdf' ? '📄' : 
                         assetType === 'guidelines' ? '📘' : 
                         assetType === 'roleplay' ? '🎭' : 
                         assetType === 'video' ? '🎥' : '📄';
      
      const prelimAssets = newFiles.map(file => ({
        id: uuidv4(),
        type: assetType,
        title: file.name.split('.')[0],
        subtitle: "",
        icon: defaultIcon,
        source: "upload" as AssetSource,
        fileName: file.name,
        dateAdded: new Date(),
        size: file.size,
        aiType: aiType,
      }));
      
      setNewAssets(prev => [...prev, ...prelimAssets]);
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

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setNewAssets(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitAssets = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    setTimeout(() => {
      const completeAssets = newAssets.map(asset => ({
        ...asset,
        id: asset.id || uuidv4(),
        dateAdded: asset.dateAdded || new Date(),
        aiType: aiType,
      })) as ContentAsset[];
      
      onAssetAdded(completeAssets);
      setFiles([]);
      setNewAssets([]);
      setIsUploading(false);
      
      toast({
        title: "Files uploaded successfully",
        description: `Added ${completeAssets.length} file${completeAssets.length > 1 ? 's' : ''} to ${aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI.`
      });
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
          accept={assetType === 'pdf' ? '.pdf' : 
                  assetType === 'video' ? '.mp4,.webm,.mov,.avi' : 
                  undefined}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          Select Multiple Files
        </Button>
      </div>

      {newAssets.length > 0 && (
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Files Ready for Upload ({newAssets.length})</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setFiles([]);
                setNewAssets([]);
              }}
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {newAssets.map((asset, index) => (
              <div key={index} className="border rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium truncate max-w-[200px]">{files[index]?.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <span className="sr-only">Remove</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </Button>
                </div>
                
                <div className="space-y-2">
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
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitAssets}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : `Upload All Files (${newAssets.length})`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadTab;
