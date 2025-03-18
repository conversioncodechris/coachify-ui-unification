
export type AssetType = "prompt" | "pdf" | "guidelines" | "roleplay" | "video" | "other";

export interface ContentAsset {
  id: string;
  type: AssetType;
  title: string;
  subtitle: string;
  icon: string;
  content?: string;
  url?: string;
  fileExtension?: string;
  size?: number;
  source: string;
  dateAdded: Date;
  isNew?: boolean;
}
