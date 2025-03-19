
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Lock, MessageSquare } from "lucide-react";
import AccountTab from '@/components/settings/AccountTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import SecurityTab from '@/components/settings/SecurityTab';
import PromptsManager from '@/components/settings/PromptsManager';
import AssetManagementDialog from "@/components/settings/AssetManagementDialog";
import { useAssetManagement } from '@/hooks/useAssetManagement';

const Settings = () => {
  const { 
    assetDialogOpen,
    selectedAiType, 
    setAssetDialogOpen,
    handleOpenAssetDialog
  } = useAssetManagement();

  return (
    <div className="container mx-auto pt-24 pb-12 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
        
        <TabsContent value="content">
          <PromptsManager onOpenAssetDialog={handleOpenAssetDialog} />
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

export default Settings;
