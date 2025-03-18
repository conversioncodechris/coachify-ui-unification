
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
  fileName?: string; // Added fileName property
  size?: number;
  source: AssetSource; // Changed to use AssetSource type
  dateAdded: Date;
  isNew?: boolean;
}
