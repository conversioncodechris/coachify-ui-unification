
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, MessageSquare, Sparkles } from "lucide-react";
import PromptsManager from '@/components/settings/PromptsManager';
import PromptsTab from '@/components/settings/PromptsTab';
import AssetManagementDialog from "@/components/settings/AssetManagementDialog";
import { useAssetManagement } from '@/hooks/useAssetManagement';

const CustomizeAIRE = () => {
  const { 
    assetDialogOpen,
    selectedAiType, 
    setAssetDialogOpen,
    handleOpenAssetDialog
  } = useAssetManagement();

  return (
    <div className="container mx-auto pt-24 pb-12 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Customize AIRE</h1>
      </div>
      
      <Tabs defaultValue="training" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="training" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Training</span>
          </TabsTrigger>
          <TabsTrigger value="prompts" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Prompts</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="training">
          <PromptsManager onOpenAssetDialog={handleOpenAssetDialog} />
        </TabsContent>
        
        <TabsContent value="prompts">
          <PromptsTab />
        </TabsContent>
      </Tabs>

      <AssetManagementDialog 
        isOpen={assetDialogOpen}
        onOpenChange={setAssetDialogOpen}
        aiType={selectedAiType}
      />
    </div>
  );
};

export default CustomizeAIRE;
