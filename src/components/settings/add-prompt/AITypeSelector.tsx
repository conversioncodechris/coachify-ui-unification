
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AITypeSelectorProps {
  selectedAiType: "content" | "compliance" | "coach";
  onAiTypeChange: (value: "content" | "compliance" | "coach") => void;
}

const AITypeSelector: React.FC<AITypeSelectorProps> = ({
  selectedAiType,
  onAiTypeChange
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="aiType">AI Type</Label>
      <Select 
        value={selectedAiType} 
        onValueChange={(value) => onAiTypeChange(value as "content" | "compliance" | "coach")}
      >
        <SelectTrigger id="aiType">
          <SelectValue placeholder="Select AI Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="content">Content AI</SelectItem>
          <SelectItem value="compliance">Compliance AI</SelectItem>
          <SelectItem value="coach">Coach AI</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AITypeSelector;
