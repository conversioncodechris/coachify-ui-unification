
import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export interface NewTopicData {
  icon: string;
  title: string;
  description: string;
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
  const handleSelectEmoji = (emoji: string) => {
    setNewTopic(prev => ({ ...prev, icon: emoji }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Compliance Topic</DialogTitle>
        </DialogHeader>
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
                // Prevent newlines from being entered
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
                // Prevent newlines from being entered
                const value = e.target.value.replace(/[\r\n]/g, '');
                setNewTopic(prev => ({ ...prev, description: value }))
              }}
              placeholder="Brief description (one line)"
              maxLength={60}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSubmit}>Add Topic</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicDialog;
