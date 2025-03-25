
import React, { useState } from 'react';
import { contentPromptPacks, PromptPack } from '@/data/promptPacks';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Plus, Check, Copy } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { ContentAsset } from '@/types/contentAssets';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PromptPacksImporterProps {
  onImportPrompts: (prompts: ContentAsset[]) => void;
}

const PromptPacksImporter: React.FC<PromptPacksImporterProps> = ({ onImportPrompts }) => {
  const { toast } = useToast();
  const [importedPacks, setImportedPacks] = useState<Record<string, boolean>>({});
  const [expandedPack, setExpandedPack] = useState<string | null>(null);

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

  const handleCopyPrompt = (content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast({
          title: "Prompt Copied!",
          description: "Copied to clipboard"
        });
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Please try again or copy manually",
          variant: "destructive"
        });
      });
  };

  const togglePackExpansion = (packId: string) => {
    if (expandedPack === packId) {
      setExpandedPack(null);
    } else {
      setExpandedPack(packId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-primary" />
        <h3 className="text-lg font-medium">Prompt Packs</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
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
              <p className="text-sm text-muted-foreground mb-2">
                Contains {pack.prompts.length} prompts for content creation
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {pack.prompts.slice(0, 5).map((prompt) => (
                  <Badge key={prompt.id} variant="outline" className="bg-gray-50">
                    {prompt.icon} {prompt.title}
                  </Badge>
                ))}
                {pack.prompts.length > 5 && (
                  <Badge variant="outline" className="bg-gray-50">
                    +{pack.prompts.length - 5} more
                  </Badge>
                )}
              </div>
              
              <Collapsible open={expandedPack === pack.id}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-sm" 
                    onClick={() => togglePackExpansion(pack.id)}
                  >
                    {expandedPack === pack.id ? "Hide Details" : "View Prompt Details"}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-3">
                  {pack.prompts.slice(0, 5).map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-md p-3 border">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <span className="text-xl mt-1 mr-2">{prompt.icon}</span>
                          <div>
                            <h4 className="font-medium text-sm">{prompt.title}</h4>
                            <p className="text-xs text-gray-500">{prompt.subtitle}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-blue-600"
                          onClick={() => handleCopyPrompt(prompt.content)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-gray-700 mt-2 ml-7 line-clamp-2">
                        {prompt.content.substring(0, 100)}...
                      </p>
                      <div className="flex mt-2 justify-end">
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-100">
                          {prompt.metadata?.purpose || "Content Prompt"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
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
