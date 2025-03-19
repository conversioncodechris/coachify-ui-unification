
import { useState } from "react";
import { ContentAsset, AssetType, AssetSource } from "@/types/contentAssets";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

export const useFileUpload = (
  assetType: AssetType,
  onAssetAdded: (assets: ContentAsset[]) => void,
  aiType: "compliance" | "coach" | "content" = "content"
) => {
  const [files, setFiles] = useState<File[]>([]);
  const [newAssets, setNewAssets] = useState<Partial<ContentAsset>[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFilesAdded = (newFiles: File[]) => {
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

  const handleClearAll = () => {
    setFiles([]);
    setNewAssets([]);
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

  return {
    files,
    newAssets, 
    isUploading,
    handleFilesAdded,
    handleAssetTitleChange,
    handleAssetSubtitleChange,
    handleRemoveFile,
    handleClearAll,
    handleSubmitAssets
  };
};
