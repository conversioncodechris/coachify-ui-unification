
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContentAsset } from "@/types/contentAssets";
import { useEditPromptForm } from './useEditPromptForm';
import PromptFormFields from '../add-prompt/PromptFormFields';

interface EditPromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: ContentAsset;
  onPromptUpdated: (updatedPrompt: ContentAsset) => void;
}

const EditPromptDialog: React.FC<EditPromptDialogProps> = ({
  isOpen,
  onOpenChange,
  prompt,
  onPromptUpdated
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
    handleSave
  } = useEditPromptForm({ 
    prompt, 
    onPromptUpdated, 
    onClose: () => onOpenChange(false) 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Prompt</DialogTitle>
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
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPromptDialog;
