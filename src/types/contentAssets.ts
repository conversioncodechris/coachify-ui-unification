
export type AssetType = "prompt" | "pdf" | "guidelines" | "roleplay" | "video" | "other";
export type AssetSource = "upload" | "google-drive" | "dropbox" | "created";

export interface ContentAsset {
  id: string;
  type: AssetType;
  title: string;
  subtitle: string;
  icon: string;
  content?: string;
  url?: string;
  fileExtension?: string;
  fileName?: string; 
  size?: number;
  source: AssetSource; 
  dateAdded: Date;
  isNew?: boolean;
  aiType?: "compliance" | "coach" | "content";
  pinned?: boolean;
  hidden?: boolean;
  conversational?: boolean;
  description?: string; // Adding description as an optional property
  metadata?: {
    purpose?: string;
    platforms?: string[];
    [key: string]: any;
  };
}
