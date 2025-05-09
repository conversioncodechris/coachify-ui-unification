import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import PromptEnhancementSuggestion from '../settings/add-prompt/PromptEnhancementSuggestion';
import { enhancePrompt } from '@/utils/promptEnhancer';
import { useToast } from '@/hooks/use-toast';

export interface NewTopicData {
  icon: string;
  title: string;
  description: string;
  content?: string;
  purpose?: string;
  platforms?: string[];
}

const PURPOSES = [
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

const PLATFORMS = [
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

interface AddTopicDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTopic: NewTopicData;
  setNewTopic: React.Dispatch<React.SetStateAction<NewTopicData>>;
  onSubmit: () => void;
  emojiOptions: string[];
}

const AddTopicDialog: React.FC<AddTopicDialogProps> = ({
  isOpen,
  onOpenChange,
  newTopic,
  setNewTopic,
  onSubmit,
  emojiOptions
}) => {
  const { toast } = useToast();
  const [content, setContent] = React.useState("");
  const [showEnhancement, setShowEnhancement] = React.useState(false);
  const [enhancedPromptSuggestion, setEnhancedPromptSuggestion] = React.useState(null);
  const [selectedPurpose, setSelectedPurpose] = React.useState<string>(PURPOSES[0]);
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);
  const [selectAllPlatforms, setSelectAllPlatforms] = React.useState(false);

  const handleSelectEmoji = (emoji: string) => {
    setNewTopic(prev => ({ ...prev, icon: emoji }));
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const handleSelectAllPlatforms = (checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...PLATFORMS]);
    } else {
      setSelectedPlatforms([]);
    }
    setSelectAllPlatforms(checked);
  };

  React.useEffect(() => {
    setSelectAllPlatforms(selectedPlatforms.length === PLATFORMS.length);
  }, [selectedPlatforms]);

  React.useEffect(() => {
    if (content.trim().length > 15) {
      const enhancedPrompt = enhancePrompt(content);
      setEnhancedPromptSuggestion(enhancedPrompt);
      setShowEnhancement(true);
    } else {
      setEnhancedPromptSuggestion(null);
      setShowEnhancement(false);
    }
  }, [content]);

  const acceptEnhancedPrompt = (enhancedText: string) => {
    setContent(enhancedText);
    setShowEnhancement(false);
    
    toast({
      title: "Enhancement Applied",
      description: "The AI-enhanced prompt has been applied",
    });
  };

  const rejectEnhancedPrompt = () => {
    setShowEnhancement(false);
    
    toast({
      title: "Enhancement Rejected",
      description: "Keeping your original prompt",
    });
  };

  const handleSubmitWithContent = () => {
    if (!newTopic.title.trim() || !newTopic.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description.",
      });
      return;
    }
    
    setNewTopic(prev => ({ 
      ...prev, 
      content,
      purpose: selectedPurpose,
      platforms: selectedPlatforms
    }));
    setTimeout(onSubmit, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] w-full flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add New Prompt</DialogTitle>
          <DialogDescription>
            Create a new prompt for use in Content AI conversations
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2 overflow-y-auto">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="icon">Icon</Label>
              <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
                {emojiOptions.map((emoji, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`p-2 text-xl rounded hover:bg-gray-100 ${newTopic.icon === emoji ? 'bg-gray-200' : ''}`}
                    onClick={() => handleSelectEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input 
                id="title"
                value={newTopic.title} 
                onChange={(e) => {
                  const value = e.target.value.replace(/[\r\n]/g, '');
                  setNewTopic(prev => ({ ...prev, title: value }))
                }}
                placeholder="Enter topic title"
                maxLength={40}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newTopic.description}
                onChange={(e) => {
                  const value = e.target.value.replace(/[\r\n]/g, '');
                  setNewTopic(prev => ({ ...prev, description: value }))
                }}
                placeholder="Brief description (one line)"
                maxLength={60}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Select 
                value={selectedPurpose} 
                onValueChange={setSelectedPurpose}
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
            <div className="grid gap-2">
              <Label>Platforms</Label>
              <div className="grid gap-2 border rounded-md p-3">
                <div className="flex items-center space-x-2 border-b pb-2 mb-2">
                  <Checkbox 
                    id="select-all-platforms"
                    checked={selectAllPlatforms}
                    onCheckedChange={(checked) => handleSelectAllPlatforms(checked as boolean)}
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
                        onCheckedChange={() => togglePlatform(platform)}
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
            <div className="grid gap-2">
              <Label htmlFor="content">Prompt Content (Optional)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Additional details for the AI (optional)"
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <div>
            <PromptEnhancementSuggestion
              enhancedPrompt={showEnhancement ? enhancedPromptSuggestion : null}
              onAccept={acceptEnhancedPrompt}
              onReject={rejectEnhancedPrompt}
            />
          </div>
        </div>
        
        <DialogFooter className="mt-2 pt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmitWithContent}>Add Prompt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicDialog;
