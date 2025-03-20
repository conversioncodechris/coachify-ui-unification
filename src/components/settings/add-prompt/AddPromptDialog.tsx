
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContentAsset } from '@/types/contentAssets';
import { useAddPromptForm } from './useAddPromptForm';
import PromptFormFields from './PromptFormFields';
import PromptEnhancementSuggestion from './PromptEnhancementSuggestion';

interface AddPromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  aiType: "content" | "compliance" | "coach";
  onPromptAdded: (prompt: ContentAsset) => void;
}

const AddPromptDialog: React.FC<AddPromptDialogProps> = ({
  isOpen,
  onOpenChange,
  aiType: defaultAiType,
  onPromptAdded
}) => {
  const {
    selectedEmoji,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    content,
    setContent,
    selectedAiType,
    setSelectedAiType,
    isSubmitting,
    emojiOptions,
    handleSelectEmoji,
    handleClose,
    handleSubmit,
    enhancedPromptSuggestion,
    showEnhancement,
    acceptEnhancedPrompt,
    rejectEnhancedPrompt
  } = useAddPromptForm({ 
    defaultAiType, 
    onPromptAdded, 
    onClose: () => onOpenChange(false) 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Prompt</DialogTitle>
          <DialogDescription>
            Create a new prompt for use in AI conversations
          </DialogDescription>
        </DialogHeader>
        
        <PromptFormFields
          selectedEmoji={selectedEmoji}
          emojiOptions={emojiOptions}
          title={title}
          subtitle={subtitle}
          content={content}
          selectedAiType={selectedAiType}
          onSelectEmoji={handleSelectEmoji}
          onTitleChange={setTitle}
          onSubtitleChange={setSubtitle}
          onContentChange={setContent}
          onAiTypeChange={setSelectedAiType}
        />
        
        {showEnhancement && enhancedPromptSuggestion && (
          <PromptEnhancementSuggestion
            enhancedPrompt={enhancedPromptSuggestion}
            onAccept={(enhancedText) => {
              acceptEnhancedPrompt(enhancedText);
            }}
            onReject={rejectEnhancedPrompt}
          />
        )}
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? "Adding..." : "Add Prompt"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPromptDialog;
