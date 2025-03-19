
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AITypeSelector from './AITypeSelector';
import EmojiSelector from './EmojiSelector';

interface PromptFormFieldsProps {
  selectedEmoji: string;
  emojiOptions: string[];
  title: string;
  subtitle: string;
  content: string;
  selectedAiType: "content" | "compliance" | "coach";
  onSelectEmoji: (emoji: string) => void;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onAiTypeChange: (value: "content" | "compliance" | "coach") => void;
}

const PromptFormFields: React.FC<PromptFormFieldsProps> = ({
  selectedEmoji,
  emojiOptions,
  title,
  subtitle,
  content,
  selectedAiType,
  onSelectEmoji,
  onTitleChange,
  onSubtitleChange,
  onContentChange,
  onAiTypeChange
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
