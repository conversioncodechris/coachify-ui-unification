
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
import { CoachTopic } from './CoachTypes';

export interface NewScenarioData {
  icon: string;
  title: string;
  description: string;
  content?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  scenarioType?: 'roleplay' | 'practice' | 'skill-building' | 'client-interaction';
  timeEstimate?: string;
}

interface AddScenarioDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newScenario: Partial<CoachTopic> & NewScenarioData;
  setNewScenario: React.Dispatch<React.SetStateAction<Partial<CoachTopic> & NewScenarioData>>;
  onSubmit: () => void;
  emojiOptions: string[];
}

const AddScenarioDialog: React.FC<AddScenarioDialogProps> = ({
  isOpen,
  onOpenChange,
  newScenario,
  setNewScenario,
  onSubmit,
  emojiOptions
}) => {
  const { toast } = useToast();
  const [content, setContent] = React.useState("");

  const handleSelectEmoji = (emoji: string) => {
    setNewScenario(prev => ({ ...prev, icon: emoji }));
  };

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner - Basic scenarios' },
    { value: 'intermediate', label: 'Intermediate - Some experience needed' },
    { value: 'advanced', label: 'Advanced - Complex scenarios' },
    { value: 'expert', label: 'Expert - Challenging edge cases' }
  ];

  const scenarioTypeOptions = [
    { value: 'roleplay', label: 'Role-Play Scenario' },
    { value: 'practice', label: 'Practice Exercise' },
    { value: 'skill-building', label: 'Skill Building Activity' },
    { value: 'client-interaction', label: 'Client Interaction' }
  ];

  const timeEstimateOptions = [
    '5 minutes',
    '10 minutes',
    '15 minutes',
    '20 minutes',
    '30 minutes',
    '45 minutes',
    '1 hour+'
  ];

  const handleSubmitWithContent = () => {
    if (!newScenario.title?.trim() || !newScenario.description?.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description.",
      });
      return;
    }
    
    // Update the newScenario with content before submitting
    setNewScenario(prev => ({ ...prev, content }));
    setTimeout(onSubmit, 0); // Use setTimeout to ensure state is updated before submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Coaching Scenario</DialogTitle>
          <DialogDescription>
            Create a new coaching scenario for real estate professional development
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="icon">Scenario Icon</Label>
              <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
                {emojiOptions.map((emoji, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`p-2 text-xl rounded hover:bg-gray-100 ${newScenario.icon === emoji ? 'bg-gray-200' : ''}`}
                    onClick={() => handleSelectEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Scenario Title</Label>
              <Input 
                id="title"
                value={newScenario.title || ''} 
                onChange={(e) => {
                  const value = e.target.value.replace(/[\r\n]/g, '');
                  setNewScenario(prev => ({ ...prev, title: value }))
                }}
                placeholder="E.g., Handling Multiple Offer Situations"
                maxLength={40}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Brief Description</Label>
              <Input
                id="description"
                value={newScenario.description || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/[\r\n]/g, '');
                  setNewScenario(prev => ({ ...prev, description: value }))
                }}
                placeholder="One-line summary of what the scenario covers"
                maxLength={60}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scenarioType">Scenario Type</Label>
              <select 
                id="scenarioType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={newScenario.scenarioType || ''}
                onChange={(e) => setNewScenario(prev => ({ ...prev, scenarioType: e.target.value as 'roleplay' | 'practice' | 'skill-building' | 'client-interaction' }))}
              >
                <option value="">Select scenario type</option>
                {scenarioTypeOptions.map((option, i) => (
                  <option key={i} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <select 
                id="difficulty"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={newScenario.difficulty || ''}
                onChange={(e) => setNewScenario(prev => ({ ...prev, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' | 'expert' }))}
              >
                <option value="">Select difficulty level</option>
                {difficultyOptions.map((option, i) => (
                  <option key={i} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeEstimate">Estimated Time</Label>
              <select 
                id="timeEstimate"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={newScenario.timeEstimate || ''}
                onChange={(e) => setNewScenario(prev => ({ ...prev, timeEstimate: e.target.value }))}
              >
                <option value="">Select time estimate</option>
                {timeEstimateOptions.map((time, i) => (
                  <option key={i} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="content">Scenario Details</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the scenario in detail, including setup instructions, roles involved, specific challenges, and coaching objectives"
              className="min-h-[250px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmitWithContent}>Add Coaching Scenario</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddScenarioDialog;
