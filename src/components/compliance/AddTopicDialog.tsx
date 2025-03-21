
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
import { useToast } from '@/hooks/use-toast';

export interface NewTopicData {
  icon: string;
  title: string;
  description: string;
  content?: string;
  primaryCategory?: string;
  importance?: 'critical' | 'high' | 'medium' | 'low';
}

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

  const handleSelectEmoji = (emoji: string) => {
    setNewTopic(prev => ({ ...prev, icon: emoji }));
  };

  const importanceOptions = [
    { value: 'critical', label: 'Critical - Legal requirement' },
    { value: 'high', label: 'High - Industry standard' },
    { value: 'medium', label: 'Medium - Best practice' },
    { value: 'low', label: 'Low - Nice to know' }
  ];

  const categoryOptions = [
    'License Requirements',
    'Fair Housing',
    'Disclosure Laws',
    'Agency Relationships',
    'Contracts & Forms',
    'Commission Rules',
    'Advertising Regulations',
    'Data Privacy',
    'Anti-Trust',
    'Other'
  ];

  const handleSubmitWithContent = () => {
    if (!newTopic.title.trim() || !newTopic.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description.",
      });
      return;
    }
    
    // Update the newTopic with content before submitting
    setNewTopic(prev => ({ ...prev, content }));
    setTimeout(onSubmit, 0); // Use setTimeout to ensure state is updated before submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Compliance Topic</DialogTitle>
          <DialogDescription>
            Create a new compliance topic for real estate professionals
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="icon">Topic Icon</Label>
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
                placeholder="E.g., Fair Housing Compliance"
                maxLength={40}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Brief Description</Label>
              <Input
                id="description"
                value={newTopic.description}
                onChange={(e) => {
                  const value = e.target.value.replace(/[\r\n]/g, '');
                  setNewTopic(prev => ({ ...prev, description: value }))
                }}
                placeholder="One-line summary of the compliance topic"
                maxLength={60}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Primary Category</Label>
              <select 
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={newTopic.primaryCategory || ''}
                onChange={(e) => setNewTopic(prev => ({ ...prev, primaryCategory: e.target.value }))}
              >
                <option value="">Select a category</option>
                {categoryOptions.map((category, i) => (
                  <option key={i} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="importance">Importance Level</Label>
              <select 
                id="importance"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={newTopic.importance || ''}
                onChange={(e) => setNewTopic(prev => ({ ...prev, importance: e.target.value as 'critical' | 'high' | 'medium' | 'low' }))}
              >
                <option value="">Select importance level</option>
                {importanceOptions.map((option, i) => (
                  <option key={i} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="content">Detailed Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Include relevant laws, regulations, compliance requirements, best practices, and examples"
              className="min-h-[250px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmitWithContent}>Add Compliance Topic</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicDialog;
