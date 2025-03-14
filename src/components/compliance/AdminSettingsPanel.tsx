
import React, { useState } from 'react';
import { Settings, UserPlus, FileText, Bell } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface AdminSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSettingsPanel: React.FC<AdminSettingsPanelProps> = ({
  isOpen,
  onClose
}) => {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableNewTopics, setEnableNewTopics] = useState(true);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-insta-blue" />
              <CardTitle>Admin Settings</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
          <CardDescription>
            Configure compliance topics and user permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">User Management</Label>
                <p className="text-sm text-muted-foreground">Add or remove users from your organization</p>
              </div>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Content Management</Label>
                <p className="text-sm text-muted-foreground">Enable users to create new compliance topics</p>
              </div>
              <Switch 
                checked={enableNewTopics}
                onCheckedChange={setEnableNewTopics}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notifications</Label>
                <p className="text-sm text-muted-foreground">Send updates when compliance information changes</p>
              </div>
              <Switch 
                checked={enableNotifications}
                onCheckedChange={setEnableNotifications}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Manage Default Content
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Configure Notification Settings
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSettingsPanel;
