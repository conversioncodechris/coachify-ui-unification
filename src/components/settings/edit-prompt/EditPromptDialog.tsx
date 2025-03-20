
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
import { Trash2 } from 'lucide-react';
import PromptEnhancementSuggestion from '../add-prompt/PromptEnhancementSuggestion';

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
    handleSave,
    handleDelete,
    enhancedPromptSuggestion,
    showEnhancement,
    acceptEnhancedPrompt,
    rejectEnhancedPrompt
  } = useEditPromptForm({ 
    prompt, 
    onPromptUpdated, 
    onClose: () => onOpenChange(false) 
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleClose();
      }
      onOpenChange(open);
    }}>
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
        
        {showEnhancement && enhancedPromptSuggestion && (
          <PromptEnhancementSuggestion
            enhancedPrompt={enhancedPromptSuggestion}
            onAccept={acceptEnhancedPrompt}
            onReject={rejectEnhancedPrompt}
          />
        )}
        
        <DialogFooter className="flex items-center justify-between sm:justify-between flex-row">
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleDelete}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          
          <div className="flex gap-2">
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPromptDialog;
