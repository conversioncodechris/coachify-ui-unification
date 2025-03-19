
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";
import { ContentAsset } from "@/types/contentAssets";

interface FileItemProps {
  file: File;
  asset: Partial<ContentAsset>;
  onRemove: () => void;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  index: number;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  asset,
  onRemove,
  onTitleChange,
  onSubtitleChange,
  index
}) => {
  return (
    <div className="border rounded-md p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={onRemove}
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
            onChange={(e) => onTitleChange(e.target.value)}
            maxLength={40}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`subtitle-${index}`}>Description</Label>
          <Input
            id={`subtitle-${index}`}
            value={asset.subtitle || ""}
            onChange={(e) => onSubtitleChange(e.target.value)}
            maxLength={60}
          />
        </div>
      </div>
    </div>
  );
};

export default FileItem;
