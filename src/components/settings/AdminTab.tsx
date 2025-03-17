
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { type AssetType, type AssetCounts } from "@/hooks/useAssetManagement";

interface AdminTabProps {
  assetCounts: AssetCounts;
  onOpenAssetDialog: (type: AssetType) => void;
}

const AdminTab: React.FC<AdminTabProps> = ({ assetCounts, onOpenAssetDialog }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
        <CardDescription>
          Manage organization-wide settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Content Management</h3>
          <div className="border rounded-md p-4">
            <p className="text-muted-foreground">
              Create and manage content for Compliance AI, Coach AI, and Content AI.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <Button 
                variant="outline" 
                className="justify-start relative"
                onClick={() => onOpenAssetDialog("compliance")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Compliance AI
                {assetCounts.compliance > 0 && (
                  <Badge variant="secondary" className="absolute -top-2 -right-2 px-1 py-0 min-w-5 h-5 flex items-center justify-center">
                    <Database className="h-3 w-3 mr-0.5" />
                    {assetCounts.compliance}
                  </Badge>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="justify-start relative"
                onClick={() => onOpenAssetDialog("coach")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Coach AI
                {assetCounts.coach > 0 && (
                  <Badge variant="secondary" className="absolute -top-2 -right-2 px-1 py-0 min-w-5 h-5 flex items-center justify-center">
                    <Database className="h-3 w-3 mr-0.5" />
                    {assetCounts.coach}
                  </Badge>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="justify-start relative"
                onClick={() => onOpenAssetDialog("content")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Content AI
                {assetCounts.content > 0 && (
                  <Badge variant="secondary" className="absolute -top-2 -right-2 px-1 py-0 min-w-5 h-5 flex items-center justify-center">
                    <Database className="h-3 w-3 mr-0.5" />
                    {assetCounts.content}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTab;
