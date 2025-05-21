
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
  | "X"
  | "TikTok"
  | "Email"
  | "Video Script"
  | "SMS Message"
  | "Press Release"
  | "Blog Post"
  | "Coming Soon"
  | "Just Listed"
  | "Marketing Breakdown"
  | "Behind The Scenes"
  | "Neighborhood Spotlight"
  | "Property Quiz"
  | "Market Update"
  | "Walk Score"
  | "Seller Story"
  | "Hero Feature"
  | "Email Newsletter"
  | "Testimonial"
  | "Just Sold"
  | "Google Business Profile"
  | "YouTube Walkthrough"
  | "Buyer Feedback"
  | "Offer Story"
  | "CMA Mailing"
  | "Live Open House"
  | "Story Poll"
  | "Marketing Case Study";

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
