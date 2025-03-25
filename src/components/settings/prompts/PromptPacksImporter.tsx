
import React, { useState } from 'react';
import { contentPromptPacks, PromptPack } from '@/data/promptPacks';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Plus, Check } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { ContentAsset } from '@/types/contentAssets';

interface PromptPacksImporterProps {
  onImportPrompts: (prompts: ContentAsset[]) => void;
}

const PromptPacksImporter: React.FC<PromptPacksImporterProps> = ({ onImportPrompts }) => {
  const { toast } = useToast();
  const [importedPacks, setImportedPacks] = useState<Record<string, boolean>>({});

  const handleImportPack = (pack: PromptPack) => {
    if (importedPacks[pack.id]) {
      toast({
        title: "Already Imported",
        description: `You've already imported "${pack.name}" pack.`,
      });
      return;
    }

    // Import all prompts from the pack
    onImportPrompts(pack.prompts);
    
    // Mark this pack as imported
    setImportedPacks(prev => ({
      ...prev,
      [pack.id]: true
    }));
    
    toast({
      title: "Prompt Pack Imported",
      description: `Successfully imported ${pack.prompts.length} prompts from "${pack.name}".`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-primary" />
        <h3 className="text-lg font-medium">Prompt Packs</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contentPromptPacks.map((pack) => (
          <Card key={pack.id} className="border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{pack.icon}</span>
                  <CardTitle>{pack.name}</CardTitle>
                </div>
                {importedPacks[pack.id] && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Imported
                  </span>
                )}
              </div>
              <CardDescription>{pack.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">
                Contains {pack.prompts.length} prompts for content creation
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {pack.prompts.slice(0, 3).map((prompt) => (
                  <span key={prompt.id} className="inline-flex items-center bg-muted px-2 py-1 rounded text-xs">
                    {prompt.icon} {prompt.title}
                  </span>
                ))}
                {pack.prompts.length > 3 && (
                  <span className="inline-flex items-center bg-muted px-2 py-1 rounded text-xs">
                    +{pack.prompts.length - 3} more
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={importedPacks[pack.id] ? "outline" : "default"}
                size="sm" 
                className="w-full"
                onClick={() => handleImportPack(pack)}
                disabled={importedPacks[pack.id]}
              >
                {importedPacks[pack.id] ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                {importedPacks[pack.id] ? "Imported" : "Import Pack"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromptPacksImporter;
