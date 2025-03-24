
import { ContentAsset } from '@/types/contentAssets';

export type PromptPurpose = 
  | "Open House"
  | "Price Reduction"
  | "Market Report"
  | "New Listing"
  | "Just Sold"
  | "Testimonial" 
  | "Neighborhood Highlight"
  | "Home Improvement Tips"
  | "Other";

export type PromptPlatform = 
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "Twitter/X"
  | "Email"
  | "Video Script"
  | "SMS Message"
  | "Press Release"
  | "Blog Post";

export interface UseAddPromptFormProps {
  defaultAiType: "content" | "compliance" | "coach";
  onPromptAdded: (prompt: ContentAsset) => void;
  onClose: () => void;
}

export interface EnhancedPrompt {
  original: string;
  enhanced: string;
  category: string;
}
