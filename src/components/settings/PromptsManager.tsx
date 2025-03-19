
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { FileText, Database } from 'lucide-react';
import { useAssetManagement } from '@/hooks/useAssetManagement';
import { Badge } from "@/components/ui/badge";
import { AssetType } from '@/hooks/useAssetManagement';

interface PromptsManagerProps {
  onOpenAssetDialog?: (type: AssetType) => void;
}

const PromptsManager: React.FC<PromptsManagerProps> = ({ onOpenAssetDialog }) => {
  const { loadAssetCounts, assetCounts } = useAssetManagement();

  // Handle asset management dialog opening
  const handleAssetManagement = (type: AssetType) => {
    if (onOpenAssetDialog) {
      onOpenAssetDialog(type);
    }
  };

  return (
    <div className="space-y-8">
      {/* Content Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Training Content Management</CardTitle>
          <CardDescription>
            Manage training assets for Compliance AI, Coach AI, and Content AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="justify-start relative"
              onClick={() => handleAssetManagement("compliance")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Compliance AI Assets
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
              onClick={() => handleAssetManagement("coach")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Coach AI Assets
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
              onClick={() => handleAssetManagement("content")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Content AI Assets
              {assetCounts.content > 0 && (
                <Badge variant="secondary" className="absolute -top-2 -right-2 px-1 py-0 min-w-5 h-5 flex items-center justify-center">
                  <Database className="h-3 w-3 mr-0.5" />
                  {assetCounts.content}
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Asset Types Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Management Guide</CardTitle>
          <CardDescription>
            Learn about the different types of assets you can add to train your AI assistants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 border border-green-100 bg-green-50">
              <div className="flex gap-3">
                <div className="text-2xl">📄</div>
                <div>
                  <h3 className="font-medium mb-1">PDF Documents</h3>
                  <p className="text-sm text-muted-foreground">Upload policy documents, procedures, and reference materials</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border border-blue-100 bg-blue-50">
              <div className="flex gap-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-medium mb-1">Guidelines</h3>
                  <p className="text-sm text-muted-foreground">Add brand guidelines, style guides, and other reference materials</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border border-purple-100 bg-purple-50">
              <div className="flex gap-3">
                <div className="text-2xl">🎭</div>
                <div>
                  <h3 className="font-medium mb-1">Role Play Scenarios</h3>
                  <p className="text-sm text-muted-foreground">Create scenarios for training Coach AI</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border border-amber-100 bg-amber-50">
              <div className="flex gap-3">
                <div className="text-2xl">🎥</div>
                <div>
                  <h3 className="font-medium mb-1">Training Videos</h3>
                  <p className="text-sm text-muted-foreground">Add training videos and presentations for reference</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-6 p-4 border rounded-md bg-gray-50">
            <p className="text-sm text-center text-muted-foreground">
              Click on any of the AI asset buttons above to start managing specific training assets.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptsManager;
