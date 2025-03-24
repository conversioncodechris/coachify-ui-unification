
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import AITypeSelector from './AITypeSelector';
import EmojiSelector from './EmojiSelector';
import { PromptPurpose, PromptPlatform } from './useAddPromptForm';

interface PromptFormFieldsProps {
  selectedEmoji: string;
  emojiOptions: string[];
  title: string;
  subtitle: string;
  content: string;
  selectedAiType: "content" | "compliance" | "coach";
  selectedPurpose?: PromptPurpose;
  selectedPlatforms?: PromptPlatform[];
  selectAllPlatforms?: boolean;
  onSelectEmoji: (emoji: string) => void;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onAiTypeChange: (value: "content" | "compliance" | "coach") => void;
  onPurposeChange?: (value: PromptPurpose) => void;
  onPlatformToggle?: (platform: PromptPlatform) => void;
  onSelectAllPlatforms?: (checked: boolean) => void;
}

const PURPOSES: PromptPurpose[] = [
  "Open House",
  "Price Reduction",
  "Market Report",
  "New Listing",
  "Just Sold",
  "Testimonial",
  "Neighborhood Highlight",
  "Home Improvement Tips",
  "Other"
];

const PLATFORMS: PromptPlatform[] = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Twitter/X",
  "Email",
  "Video Script",
  "SMS Message",
  "Press Release",
  "Blog Post"
];

const PromptFormFields: React.FC<PromptFormFieldsProps> = ({
  selectedEmoji,
  emojiOptions,
  title,
  subtitle,
  content,
  selectedAiType,
  selectedPurpose = "Open House",
  selectedPlatforms = [],
  selectAllPlatforms = false,
  onSelectEmoji,
  onTitleChange,
  onSubtitleChange,
  onContentChange,
  onAiTypeChange,
  onPurposeChange,
  onPlatformToggle,
  onSelectAllPlatforms
}) => {
  return (
    <div className="grid gap-4 py-4">
      <AITypeSelector 
        selectedAiType={selectedAiType} 
        onAiTypeChange={onAiTypeChange} 
      />
      
      <EmojiSelector 
        selectedEmoji={selectedEmoji} 
        emojiOptions={emojiOptions} 
        onSelectEmoji={onSelectEmoji} 
      />
      
      <div className="grid gap-2">
        <Label htmlFor="title">Topic Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            const value = e.target.value.replace(/[\r\n]/g, '');
            onTitleChange(value);
          }}
          placeholder="Enter topic title"
          maxLength={40}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={subtitle}
          onChange={(e) => {
            const value = e.target.value.replace(/[\r\n]/g, '');
            onSubtitleChange(value);
          }}
          placeholder="Brief description (one line)"
          maxLength={60}
        />
      </div>
      
      {onPurposeChange && (
        <div className="grid gap-2">
          <Label htmlFor="purpose">Purpose</Label>
          <Select 
            value={selectedPurpose} 
            onValueChange={(value) => onPurposeChange(value as PromptPurpose)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              {PURPOSES.map((purpose) => (
                <SelectItem key={purpose} value={purpose}>
                  {purpose}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {onPlatformToggle && onSelectAllPlatforms && (
        <div className="grid gap-2">
          <Label>Platforms</Label>
          <div className="grid gap-2 border rounded-md p-3">
            <div className="flex items-center space-x-2 border-b pb-2 mb-2">
              <Checkbox 
                id="select-all-platforms"
                checked={selectAllPlatforms}
                onCheckedChange={(checked) => onSelectAllPlatforms(checked as boolean)}
              />
              <Label 
                htmlFor="select-all-platforms"
                className="cursor-pointer text-sm font-medium"
              >
                Select All Platforms
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`platform-${platform}`} 
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={() => onPlatformToggle(platform)}
                  />
                  <Label 
                    htmlFor={`platform-${platform}`}
                    className="cursor-pointer text-sm"
                  >
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="grid gap-2">
        <Label htmlFor="content">Prompt Content (Optional)</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Additional details for the AI (optional)"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default PromptFormFields;
