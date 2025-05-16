import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentType } from './ContentTypeSelector';
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { Image, Eye, Copy, FileEdit } from 'lucide-react';
import SocialMediaMockup from './SocialMediaMockup';

interface GeneratedContentProps {
  listingDetails: any;
  selectedContentTypes: ContentType[];
  generatedContent: Record<string, string>;
  onNewListing: () => void;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ 
  listingDetails,
  selectedContentTypes,
  generatedContent,
  onNewListing
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('preview'); // Changed default from 'edit' to 'preview'
  const platforms = Array.from(new Set(selectedContentTypes.map(type => type.platform)));
  const hasImages = listingDetails.images && listingDetails.images.length > 0;
  
  const filteredContent = activeTab === 'all' 
    ? selectedContentTypes
    : selectedContentTypes.filter(type => type.platform === activeTab);

  const handleCopyContent = (contentId: string) => {
    const contentText = generatedContent[contentId] || '';
    navigator.clipboard.writeText(contentText).then(() => {
      toast({
        title: "Content copied!",
        description: "The content has been copied to your clipboard.",
      });
    });
  };

  const handleCopyAll = () => {
    const allContent = selectedContentTypes
      .map(type => `${type.title}\n\n${generatedContent[type.id] || ''}\n\n---\n`)
      .join('\n');
    
    navigator.clipboard.writeText(allContent).then(() => {
      toast({
        title: "All content copied!",
        description: "All generated content has been copied to your clipboard.",
      });
    });
  };
  
  // Determine if content should display images
  const shouldShowImages = (contentType: ContentType) => {
    return hasImages && ['instagram', 'facebook'].includes(contentType.platform);
  };

  // Toggle between edit and preview modes
  const toggleViewMode = () => {
    setViewMode(viewMode === 'edit' ? 'preview' : 'edit');
  };

  return (
    <div className="mx-auto max-w-5xl w-full">
      <Card className="p-6 bg-white shadow-sm border border-border rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Generated Content</h2>
            <p className="text-muted-foreground">
              {selectedContentTypes.length} items created for{' '}
              <span className="font-medium text-black">
                {listingDetails.address || 'your listing'}
              </span>
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleCopyAll}>
              <Copy className="mr-2 h-4 w-4" />
              Copy All
            </Button>
            <Button variant="outline" onClick={toggleViewMode}>
              {viewMode === 'edit' ? (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </>
              ) : (
                <>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onNewListing}>
              New Listing
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              All ({selectedContentTypes.length})
            </TabsTrigger>
            {platforms.map(platform => (
              <TabsTrigger key={platform} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)} ({
                  selectedContentTypes.filter(type => type.platform === platform).length
                })
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-6">
            {filteredContent.map((contentType) => (
              <Card key={contentType.id} className="p-4 border">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{contentType.icon}</div>
                    <div>
                      <h3 className="font-medium">{contentType.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {contentType.platform}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {contentType.category.replace('-', ' ')}
                        </Badge>
                        {shouldShowImages(contentType) && (
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            <Image className="w-3 h-3" />
                            <span>With Images</span>
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleCopyContent(contentType.id)}
                  >
                    Copy
                  </Button>
                </div>
                
                {viewMode === 'edit' ? (
                  <>
                    {shouldShowImages(contentType) && (
                      <div className="mb-3 flex gap-2 overflow-x-auto py-2">
                        {listingDetails.images.slice(0, 3).map((image: any, index: number) => (
                          <img
                            key={`${image.id}-${index}`}
                            src={image.src}
                            alt={image.alt || `Listing image ${index + 1}`}
                            className="h-20 w-24 object-cover rounded-md border border-border"
                          />
                        ))}
                      </div>
                    )}
                    
                    <Textarea 
                      value={generatedContent[contentType.id] || 'Content generation in progress...'}
                      className="min-h-[120px] text-sm"
                      readOnly
                    />
                    
                    {shouldShowImages(contentType) && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Image className="w-3 h-3" />
                          <span>Images will be included when posting</span>
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  // Show platform-specific mockup
                  ['facebook', 'instagram', 'twitter'].includes(contentType.platform) && (
                    <SocialMediaMockup
                      platform={contentType.platform}
                      content={generatedContent[contentType.id] || ''}
                      listingDetails={listingDetails}
                      contentType={contentType}
                    />
                  )
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default GeneratedContent;
