
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

export interface ContentType {
  id: string;
  title: string;
  description: string;
  category: 'coming-soon' | 'just-listed' | 'open-house' | 'price-change' | 'just-sold';
  platform: 'facebook' | 'instagram' | 'twitter' | 'email' | 'website' | 'video' | 'text';
  icon: string;
  estimatedTime: number;
}

interface ContentTypeSelectorProps {
  listingDetails: any;
  onContentTypesSubmit: (selectedTypes: ContentType[]) => void;
  onBack: () => void;
}

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({ 
  listingDetails, 
  onContentTypesSubmit,
  onBack
}) => {
  const [selectedContentTypes, setSelectedContentTypes] = useState<ContentType[]>([]);
  const [activeTab, setActiveTab] = useState(
    listingDetails.source === 'manual' ? 'coming-soon' : 'just-listed'
  );

  // Predefined content types
  const contentTypes: ContentType[] = [
    // Coming Soon
    {
      id: 'coming-soon-facebook',
      title: 'Coming Soon Facebook Post',
      description: 'Teaser post creating excitement for your upcoming listing',
      category: 'coming-soon',
      platform: 'facebook',
      icon: '📱',
      estimatedTime: 5
    },
    {
      id: 'coming-soon-instagram',
      title: 'Coming Soon Instagram Post',
      description: 'Visual teaser with caption for Instagram',
      category: 'coming-soon',
      platform: 'instagram',
      icon: '📸',
      estimatedTime: 5
    },
    {
      id: 'coming-soon-email',
      title: 'Coming Soon Email Campaign',
      description: 'Email blast announcing your upcoming listing',
      category: 'coming-soon',
      platform: 'email',
      icon: '✉️',
      estimatedTime: 8
    },
    {
      id: 'property-teaser-video-script',
      title: 'Property Teaser Video Script',
      description: 'Script for creating a short teaser video',
      category: 'coming-soon',
      platform: 'video',
      icon: '🎬',
      estimatedTime: 10
    },
    {
      id: 'coming-soon-flyer',
      title: 'Coming Soon Flyer',
      description: 'Printable flyer to distribute in the neighborhood',
      category: 'coming-soon',
      platform: 'website',
      icon: '📄',
      estimatedTime: 7
    },
    
    // Just Listed
    {
      id: 'just-listed-facebook',
      title: 'Just Listed Facebook Post',
      description: 'Announcement post with key property details',
      category: 'just-listed',
      platform: 'facebook',
      icon: '📱',
      estimatedTime: 5
    },
    {
      id: 'just-listed-instagram',
      title: 'Just Listed Instagram Post',
      description: 'Visual announcement for Instagram',
      category: 'just-listed',
      platform: 'instagram',
      icon: '📸',
      estimatedTime: 5
    },
    {
      id: 'property-description',
      title: 'Property Description',
      description: 'Compelling MLS/website property description',
      category: 'just-listed',
      platform: 'website',
      icon: '📝',
      estimatedTime: 8
    },
    {
      id: 'neighborhood-highlights',
      title: 'Neighborhood Highlights',
      description: 'Content highlighting the best features of the area',
      category: 'just-listed',
      platform: 'website',
      icon: '🏙️',
      estimatedTime: 7
    },
    {
      id: 'just-listed-email',
      title: 'Just Listed Email Campaign',
      description: 'Email blast announcing your new listing',
      category: 'just-listed',
      platform: 'email',
      icon: '✉️',
      estimatedTime: 8
    },
    {
      id: 'virtual-tour-script',
      title: 'Virtual Tour Script',
      description: 'Script for narrating a virtual property tour',
      category: 'just-listed',
      platform: 'video',
      icon: '🎥',
      estimatedTime: 10
    },
    {
      id: 'property-features-list',
      title: 'Property Features List',
      description: 'Comprehensive list of property highlights and features',
      category: 'just-listed',
      platform: 'text',
      icon: '📋',
      estimatedTime: 6
    },
    {
      id: 'google-business-profile',
      title: 'Google Business Profile Post',
      description: 'Post for your Google Business Profile',
      category: 'just-listed',
      platform: 'website',
      icon: '🌐',
      estimatedTime: 5
    },
    {
      id: 'youtube-walkthrough',
      title: 'YouTube Walkthrough Script',
      description: 'Script for a comprehensive YouTube property tour',
      category: 'just-listed',
      platform: 'video',
      icon: '🎥',
      estimatedTime: 15
    },
    {
      id: 'seller-story',
      title: 'Seller\'s Story',
      description: 'Content focused on the seller\'s experience in the home',
      category: 'just-listed',
      platform: 'website',
      icon: '📖',
      estimatedTime: 8
    },
    {
      id: 'hero-feature',
      title: 'Hero Feature Highlight',
      description: 'Content focusing on one standout feature of the property',
      category: 'just-listed',
      platform: 'instagram',
      icon: '✨',
      estimatedTime: 5
    },
    
    // Open House
    {
      id: 'open-house-facebook',
      title: 'Open House Facebook Post',
      description: 'Announcement post for your upcoming open house',
      category: 'open-house',
      platform: 'facebook',
      icon: '📱',
      estimatedTime: 5
    },
    {
      id: 'open-house-instagram',
      title: 'Open House Instagram Post',
      description: 'Visual announcement for Instagram',
      category: 'open-house',
      platform: 'instagram',
      icon: '📸',
      estimatedTime: 5
    },
    {
      id: 'open-house-email',
      title: 'Open House Email Invitation',
      description: 'Email invitation to your open house',
      category: 'open-house',
      platform: 'email',
      icon: '✉️',
      estimatedTime: 7
    },
    {
      id: 'open-house-flyer',
      title: 'Open House Flyer',
      description: 'Printable flyer with open house details',
      category: 'open-house',
      platform: 'website',
      icon: '📄',
      estimatedTime: 6
    },
    {
      id: 'live-open-house',
      title: 'Live Open House Script',
      description: 'Script for hosting a live social media open house',
      category: 'open-house',
      platform: 'video',
      icon: '🔴',
      estimatedTime: 10
    },
    {
      id: 'open-house-story-poll',
      title: 'Open House Story Poll',
      description: 'Interactive poll to drive engagement before open house',
      category: 'open-house',
      platform: 'instagram',
      icon: '📊',
      estimatedTime: 3
    },
    
    // Price Change
    {
      id: 'price-change-facebook',
      title: 'Price Change Facebook Post',
      description: 'Announcement post for your listing\'s price change',
      category: 'price-change',
      platform: 'facebook',
      icon: '📱',
      estimatedTime: 5
    },
    {
      id: 'price-change-instagram',
      title: 'Price Change Instagram Post',
      description: 'Visual announcement for Instagram',
      category: 'price-change',
      platform: 'instagram',
      icon: '📸',
      estimatedTime: 5
    },
    {
      id: 'price-change-email',
      title: 'Price Change Email Campaign',
      description: 'Email blast announcing the new price',
      category: 'price-change',
      platform: 'email',
      icon: '✉️',
      estimatedTime: 7
    },
    {
      id: 'offer-story',
      title: 'Offer Story Post',
      description: 'Post about a recent offer without revealing confidential details',
      category: 'price-change',
      platform: 'facebook',
      icon: '🎯',
      estimatedTime: 5
    },
    
    // Just Sold
    {
      id: 'just-sold-facebook',
      title: 'Just Sold Facebook Post',
      description: 'Success announcement post for your sold listing',
      category: 'just-sold',
      platform: 'facebook',
      icon: '📱',
      estimatedTime: 5
    },
    {
      id: 'just-sold-instagram',
      title: 'Just Sold Instagram Post',
      description: 'Visual success announcement for Instagram',
      category: 'just-sold',
      platform: 'instagram',
      icon: '📸',
      estimatedTime: 5
    },
    {
      id: 'just-sold-email',
      title: 'Just Sold Email Campaign',
      description: 'Email blast announcing your successful sale',
      category: 'just-sold',
      platform: 'email',
      icon: '✉️',
      estimatedTime: 7
    },
    {
      id: 'testimonial-request',
      title: 'Testimonial Request',
      description: 'Template for requesting testimonials from buyers/sellers',
      category: 'just-sold',
      platform: 'email',
      icon: '🌟',
      estimatedTime: 5
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      description: 'Analysis of how your listing compares to the market',
      category: 'just-sold',
      platform: 'text',
      icon: '📊',
      estimatedTime: 10
    },
    {
      id: 'buyer-feedback',
      title: 'Buyer Feedback Highlights',
      description: 'Compilation of buyer feedback from showings',
      category: 'just-sold',
      platform: 'facebook',
      icon: '💬',
      estimatedTime: 7
    },
    {
      id: 'cma-mailing',
      title: 'CMA Neighborhood Mailing',
      description: 'Template for circle prospecting with comparable home values',
      category: 'just-sold',
      platform: 'email',
      icon: '📧',
      estimatedTime: 10
    },
    {
      id: 'marketing-case-study',
      title: 'Marketing Case Study',
      description: 'Detailed breakdown of your marketing strategy for the listing',
      category: 'just-sold',
      platform: 'linkedin',
      icon: '📈',
      estimatedTime: 15
    },
    {
      id: 'behind-the-scenes',
      title: 'Behind The Scenes Post',
      description: 'Content showing the work that went into selling the property',
      category: 'just-sold',
      platform: 'instagram',
      icon: '🎬',
      estimatedTime: 8
    },
    {
      id: 'walk-score-highlight',
      title: 'Walk Score Highlight',
      description: 'Content highlighting the property\'s walkability score',
      category: 'just-sold',
      platform: 'facebook',
      icon: '🚶',
      estimatedTime: 6
    },
    {
      id: 'property-quiz',
      title: 'Property Feature Quiz',
      description: 'Interactive quiz about the property\'s features',
      category: 'just-sold',
      platform: 'instagram',
      icon: '🤔',
      estimatedTime: 5
    },
    {
      id: 'email-newsletter',
      title: 'Email Newsletter Feature',
      description: 'Feature in your regular email newsletter',
      category: 'just-sold',
      platform: 'email',
      icon: '📰',
      estimatedTime: 10
    }
  ];
  
  const filteredContentTypes = contentTypes.filter(type => type.category === activeTab);
  
  const toggleContentType = (contentType: ContentType) => {
    if (selectedContentTypes.some(type => type.id === contentType.id)) {
      setSelectedContentTypes(selectedContentTypes.filter(type => type.id !== contentType.id));
    } else {
      setSelectedContentTypes([...selectedContentTypes, contentType]);
    }
  };

  const selectAll = () => {
    setSelectedContentTypes([...selectedContentTypes, ...filteredContentTypes.filter(
      type => !selectedContentTypes.some(selected => selected.id === type.id)
    )]);
  };

  const clearAll = () => {
    setSelectedContentTypes(selectedContentTypes.filter(
      type => type.category !== activeTab
    ));
  };

  const handleSubmit = () => {
    onContentTypesSubmit(selectedContentTypes);
  };

  // Calculate total estimated time
  const totalEstimatedTime = selectedContentTypes.reduce((total, type) => total + type.estimatedTime, 0);

  return (
    <div className="mx-auto max-w-4xl w-full">
      <Card className="p-6 bg-white shadow-sm border border-border rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Step 2: Choose Content Types</h2>
          <Badge variant="outline" className="text-sm">
            {selectedContentTypes.length} selected
          </Badge>
        </div>
        
        <div className="mb-4">
          <p className="text-muted-foreground">
            Select the types of content you'd like to create for{' '}
            <span className="font-medium text-black">
              {listingDetails.address || 'your listing'}
            </span>
          </p>
        </div>
        
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="coming-soon" disabled={listingDetails.source !== 'manual'}>
              Coming Soon
            </TabsTrigger>
            <TabsTrigger value="just-listed">Just Listed</TabsTrigger>
            <TabsTrigger value="open-house">Open House</TabsTrigger>
            <TabsTrigger value="price-change">Price Change</TabsTrigger>
            <TabsTrigger value="just-sold">Just Sold</TabsTrigger>
          </TabsList>
          
          {['coming-soon', 'just-listed', 'open-house', 'price-change', 'just-sold'].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {category === 'coming-soon' ? 'Coming Soon' : 
                   category === 'just-listed' ? 'Just Listed' : 
                   category === 'open-house' ? 'Open House' : 
                   category === 'price-change' ? 'Price Change' : 
                   'Just Sold'} Content
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    Clear
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContentTypes.map((contentType) => {
                  const isSelected = selectedContentTypes.some(type => type.id === contentType.id);
                  return (
                    <div
                      key={contentType.id}
                      className={`border rounded-md p-4 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleContentType(contentType)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl">{contentType.icon}</div>
                          <h4 className="font-medium">{contentType.title}</h4>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-primary border-primary' : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {contentType.description}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {contentType.platform}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ~{contentType.estimatedTime} min
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-8 border-t pt-6 flex justify-between items-center">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Estimated generation time: ~{totalEstimatedTime} minutes
          </div>
          
          <Button 
            onClick={handleSubmit}
            disabled={selectedContentTypes.length === 0}
          >
            Generate {selectedContentTypes.length} Items
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContentTypeSelector;
