
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { ContentType } from './ContentTypeSelector';

interface SocialMediaMockupProps {
  platform: string;
  content: string;
  listingDetails: any;
  contentType: ContentType;
}

const SocialMediaMockup: React.FC<SocialMediaMockupProps> = ({
  platform,
  content,
  listingDetails,
  contentType
}) => {
  // Format the content for display
  const formatContent = (text: string) => {
    return text
      .replace(/\[Image will be attached when posting\]\n\n/g, '')
      .split('\n')
      .map((line, i) => <p key={i} className={i === 0 ? 'mb-2' : 'mb-1'}>{line}</p>);
  };

  // Get platform-specific elements
  const getPlatformIcon = () => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getPlatformName = () => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      case 'twitter':
        return 'Twitter';
      default:
        return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  // Determine if this content type should show images
  const shouldShowImages = () => {
    const hasImages = listingDetails.images && listingDetails.images.length > 0;
    return hasImages && ['instagram', 'facebook'].includes(platform.toLowerCase());
  };

  if (!['facebook', 'instagram', 'twitter'].includes(platform.toLowerCase())) {
    return null; // Only show mockups for supported social platforms
  }

  switch (platform.toLowerCase()) {
    case 'facebook':
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 border">
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                <span className="text-lg font-medium text-gray-700">RA</span>
              </div>
            </Avatar>
            <div className="ml-2">
              <p className="font-medium text-sm">Real Estate Agent</p>
              <p className="text-xs text-gray-500">Just now · 🌎</p>
            </div>
          </div>
          
          <div className="text-sm mb-4">
            {formatContent(content)}
          </div>
          
          {shouldShowImages() && (
            <div className="rounded-md overflow-hidden mb-3">
              <div className="flex gap-1">
                {listingDetails.images.slice(0, 3).map((image: any, index: number) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={`Listing image ${index + 1}`}
                    className={`object-cover ${index === 0 ? 'h-48 w-full' : 'h-48 w-1/2'}`}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t mt-2 text-xs text-gray-500">
            <span>Like</span>
            <span>Comment</span>
            <span>Share</span>
          </div>
        </Card>
      );
      
    case 'instagram':
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 border">
                <div className="bg-gradient-to-br from-pink-500 to-orange-400 w-full h-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">RA</span>
                </div>
              </Avatar>
              <p className="font-medium text-sm ml-2">realestate_agent</p>
            </div>
            <span className="text-lg">•••</span>
          </div>
          
          {shouldShowImages() && (
            <div className="rounded-md overflow-hidden mb-3 -mx-4">
              <img
                src={listingDetails.images[0].src}
                alt="Listing main image"
                className="h-72 w-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between my-2">
            <div className="flex gap-4">
              <span>❤️</span>
              <span>💬</span>
              <span>📤</span>
            </div>
            <span>🔖</span>
          </div>
          
          <div className="text-sm">
            <p className="font-medium mb-1">realestate_agent</p>
            {formatContent(content)}
          </div>
          
          <p className="text-gray-500 text-xs mt-2">View all 24 comments</p>
          <p className="text-gray-400 text-xs mt-1">2 HOURS AGO</p>
        </Card>
      );
      
    case 'twitter':
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="flex mb-3">
            <Avatar className="h-10 w-10 border">
              <div className="bg-blue-100 w-full h-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">RA</span>
              </div>
            </Avatar>
            <div className="ml-2">
              <p className="font-medium text-sm">Real Estate Agent <span className="text-gray-500 font-normal">@realestate_pro</span></p>
              <p className="text-xs text-gray-500">2h</p>
            </div>
          </div>
          
          <div className="text-sm mb-4">
            {formatContent(content)}
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
            <span>💬 12</span>
            <span>🔄 24</span>
            <span>❤️ 48</span>
            <span>📤</span>
          </div>
        </Card>
      );
      
    default:
      return null;
  }
};

export default SocialMediaMockup;
