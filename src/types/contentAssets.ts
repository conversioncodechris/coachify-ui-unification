
export type AssetType = 'prompt' | 'pdf' | 'guidelines' | 'roleplay' | 'video' | 'other';
export type AssetSource = 'upload' | 'google-drive' | 'dropbox' | 'created';

export interface ContentAsset {
  id: string;
  type: AssetType;
  title: string;
  subtitle: string;
  icon: string;
  source: AssetSource;
  url?: string;
  fileName?: string;
  dateAdded: Date;
  size?: number; // in bytes
}
