
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RoleplayScenario } from './CoachTypes';
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface RoleplayScenarioFormProps {
  scenario: Partial<RoleplayScenario>;
  onChange: (scenario: Partial<RoleplayScenario>) => void;
}

const RoleplayScenarioForm: React.FC<RoleplayScenarioFormProps> = ({
  scenario,
  onChange
}) => {
  const handleChange = (field: keyof RoleplayScenario, value: string) => {
    onChange({
      ...scenario,
      [field]: value
    });
  };

  const handleObjectiveAdd = () => {
    const objectives = [...(scenario.objectives || []), ''];
    onChange({ ...scenario, objectives });
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const objectives = [...(scenario.objectives || [])];
    objectives[index] = value;
    onChange({ ...scenario, objectives });
  };

  const handleObjectiveRemove = (index: number) => {
    const objectives = [...(scenario.objectives || [])];
    objectives.splice(index, 1);
    onChange({ ...scenario, objectives });
  };

  const handleKeyPointAdd = () => {
    const keyPoints = [...(scenario.keyPoints || []), ''];
    onChange({ ...scenario, keyPoints });
  };

  const handleKeyPointChange = (index: number, value: string) => {
    const keyPoints = [...(scenario.keyPoints || [])];
    keyPoints[index] = value;
    onChange({ ...scenario, keyPoints });
  };

  const handleKeyPointRemove = (index: number) => {
    const keyPoints = [...(scenario.keyPoints || [])];
    keyPoints.splice(index, 1);
    onChange({ ...scenario, keyPoints });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="agent-role">Your Role (as Coach AI)</Label>
          <Input
            id="agent-role"
            value={scenario.agentRole || ''}
            onChange={(e) => handleChange('agentRole', e.target.value)}
            placeholder="e.g., Real estate agent, Financial advisor, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client-profile">Client Profile</Label>
          <Input
            id="client-profile"
            value={scenario.clientProfile || ''}
            onChange={(e) => handleChange('clientProfile', e.target.value)}
            placeholder="e.g., First-time homebuyer, Retiree looking to downsize, etc."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="setting">Setting/Context</Label>
        <Input
          id="setting"
          value={scenario.setting || ''}
          onChange={(e) => handleChange('setting', e.target.value)}
          placeholder="e.g., Initial consultation, Property viewing, etc."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="background-info">Background Information</Label>
        <Textarea
          id="background-info"
          value={scenario.backgroundInfo || ''}
          onChange={(e) => handleChange('backgroundInfo', e.target.value)}
          placeholder="Provide relevant background details for this scenario..."
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Objectives</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleObjectiveAdd}
            className="h-8 px-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Objective
          </Button>
        </div>
        {(scenario.objectives || []).map((objective, index) => (
          <div key={`objective-${index}`} className="flex gap-2">
            <Input
              value={objective}
              onChange={(e) => handleObjectiveChange(index, e.target.value)}
              placeholder={`Objective ${index + 1}`}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleObjectiveRemove(index)}
              className="h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Key Talking Points</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleKeyPointAdd}
            className="h-8 px-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Point
          </Button>
        </div>
        {(scenario.keyPoints || []).map((point, index) => (
          <div key={`point-${index}`} className="flex gap-2">
            <Input
              value={point}
              onChange={(e) => handleKeyPointChange(index, e.target.value)}
              placeholder={`Key point ${index + 1}`}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleKeyPointRemove(index)}
              className="h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleplayScenarioForm;
