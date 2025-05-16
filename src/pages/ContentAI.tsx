
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentSidebar from '../components/sidebar/ContentSidebar';
import ListingInputForm from '../components/content/ListingInputForm';
import ContentTypeSelector, { ContentType } from '../components/content/ContentTypeSelector';
import GeneratedContent from '../components/content/GeneratedContent';
import { generateAllContent } from '../utils/contentGenerator';
import { useToast } from '../hooks/use-toast';

const ContentAI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState<'input' | 'select' | 'results'>('input');
  const [listingDetails, setListingDetails] = useState<any>(null);
  const [selectedContentTypes, setSelectedContentTypes] = useState<ContentType[]>([]);
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});
  
  const handleListingSubmit = (details: any) => {
    // Preserve any images from the listing details
    setListingDetails(details);
    setStep('select');
    
    // Scroll to top for best UX
    window.scrollTo(0, 0);
  };
  
  const handleContentTypesSubmit = (contentTypes: ContentType[]) => {
    setSelectedContentTypes(contentTypes);
    setStep('results');
    
    toast({
      title: "Generating content",
      description: `Creating ${contentTypes.length} items for your listing...`,
    });
    
    // Simulate API call delay - would be replaced with actual API call
    setTimeout(() => {
      // Generate content that includes image references where applicable
      const generatedItems = generateAllContent(contentTypes, listingDetails);
      setGeneratedContent(generatedItems);
      
      toast({
        title: "Content ready!",
        description: `Successfully generated ${contentTypes.length} content items.`,
      });
    }, 3000);
    
    // Scroll to top for best UX
    window.scrollTo(0, 0);
  };
  
  const handleNewListing = () => {
    setStep('input');
    setListingDetails(null);
    setSelectedContentTypes([]);
    setGeneratedContent({});
    
    // Navigate back to main content page
    navigate('/content');
    
    toast({
      title: "Ready for a new listing",
      description: "Start by entering your listing details or URL.",
    });
  };
  
  const renderCurrentStep = () => {
    switch (step) {
      case 'input':
        return <ListingInputForm onListingSubmit={handleListingSubmit} />;
      case 'select':
        return (
          <ContentTypeSelector 
            listingDetails={listingDetails}
            onContentTypesSubmit={handleContentTypesSubmit}
            onBack={() => setStep('input')}
          />
        );
      case 'results':
        return (
          <GeneratedContent 
            listingDetails={listingDetails}
            selectedContentTypes={selectedContentTypes}
            generatedContent={generatedContent}
            onNewListing={handleNewListing}
          />
        );
      default:
        return <ListingInputForm onListingSubmit={handleListingSubmit} />;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <ContentSidebar />
        
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="py-8 px-4 md:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold mb-2">Listing Content Creator</h1>
                <p className="text-muted-foreground">
                  Transform your listing into multiple pieces of marketing content with just a few clicks
                </p>
              </div>
              
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentAI;
