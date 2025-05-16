
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Facebook, Instagram, Twitter, Linkedin, MessageSquare, Mail, Video, FileText, X } from 'lucide-react';
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

  // Format email content with special handling
  const formatEmailContent = (text: string) => {
    // Extract subject if it exists
    const subjectMatch = text.match(/Subject:(.+?)(\n|$)/);
    const subject = subjectMatch ? subjectMatch[1].trim() : '';
    
    // Remove subject line from body
    let body = text.replace(/Subject:(.+?)(\n|$)/, '');
    
    return {
      subject,
      body: body
        .replace(/\[Image will be attached when posting\]\n\n/g, '')
        .split('\n')
        .map((line, i) => <p key={i} className="mb-1">{line}</p>)
    };
  };

  // Get platform-specific elements
  const getPlatformIcon = () => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'twitter':
      case 'twitter/x':
      case 'x':
        return <X className="h-5 w-5 text-black" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      case 'tiktok':
        return <div className="h-5 w-5 flex items-center justify-center">
          <span className="text-xs font-bold">TT</span>
        </div>;
      case 'email':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'sms message':
      case 'smsmessage':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'video script':
      case 'videoscript':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'blog post':
      case 'blogpost':
      case 'press release':
      case 'pressrelease':
        return <FileText className="h-5 w-5 text-gray-700" />;
      default:
        return null;
    }
  };

  // Determine if this content type should show images
  const shouldShowImages = () => {
    const hasImages = listingDetails.images && listingDetails.images.length > 0;
    return hasImages && ['instagram', 'facebook', 'linkedin', 'x', 'twitter', 'twitter/x', 'tiktok'].includes(platform.toLowerCase());
  };

  // Render different mockups based on platform
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
    case 'twitter/x':
    case 'x':
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
          
          {shouldShowImages() && (
            <div className="rounded-md overflow-hidden mb-3">
              <img
                src={listingDetails.images[0].src}
                alt="Listing main image"
                className="h-48 w-full object-cover"
              />
            </div>
          )}
          
          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
            <span>💬 12</span>
            <span>🔄 24</span>
            <span>❤️ 48</span>
            <span>📤</span>
          </div>
        </Card>
      );

    case 'linkedin':
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="flex mb-3">
            <Avatar className="h-10 w-10 border">
              <div className="bg-blue-700 w-full h-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">RA</span>
              </div>
            </Avatar>
            <div className="ml-2">
              <p className="font-medium text-sm">Real Estate Agent</p>
              <p className="text-xs text-gray-500">Real Estate Professional • 2h</p>
            </div>
          </div>
          
          <div className="text-sm mb-4">
            {formatContent(content)}
          </div>
          
          {shouldShowImages() && (
            <div className="rounded-md overflow-hidden mb-3">
              <img
                src={listingDetails.images[0].src}
                alt="Listing main image"
                className="h-48 w-full object-cover"
              />
            </div>
          )}
          
          <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t">
            <span>👍 Like</span>
            <span>💬 Comment</span>
            <span>🔄 Share</span>
            <span>📤 Send</span>
          </div>
        </Card>
      );

    case 'tiktok':
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 border">
                  <div className="bg-black w-full h-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">RA</span>
                  </div>
                </Avatar>
                <div className="ml-2">
                  <p className="font-medium text-sm">@realestate_pro</p>
                  <p className="text-xs text-gray-500">Real Estate Agent</p>
                </div>
              </div>
              <span className="text-lg">+</span>
            </div>
            
            <div className="flex h-96 bg-gray-100 rounded-md overflow-hidden">
              <div className="w-3/4 bg-gray-800 relative">
                {shouldShowImages() ? (
                  <img
                    src={listingDetails.images[0].src}
                    alt="TikTok Video Thumbnail"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-white">Video Preview</p>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium bg-black bg-opacity-50 p-2 rounded">
                  {content.split('\n')[0]}
                </div>
              </div>
              
              <div className="w-1/4 flex flex-col items-center justify-end p-2">
                <div className="flex flex-col items-center my-1">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1">❤️</div>
                  <span className="text-xs">123.4K</span>
                </div>
                <div className="flex flex-col items-center my-1">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1">💬</div>
                  <span className="text-xs">1.2K</span>
                </div>
                <div className="flex flex-col items-center my-1">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1">🔖</div>
                  <span className="text-xs">5.4K</span>
                </div>
                <div className="flex flex-col items-center my-1">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1">📤</div>
                  <span className="text-xs">Share</span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 text-sm">
              <p className="line-clamp-2">{content.split('\n').slice(1, 3).join(' ')}</p>
              <p className="text-gray-500 text-xs mt-1">#RealEstate #PropertyTour #ForSale</p>
            </div>
          </div>
        </Card>
      );

    case 'email':
      const emailContent = formatEmailContent(content);
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3 border-b flex items-center">
              <Mail className="h-5 w-5 text-gray-600 mr-2" />
              <div>
                <p className="font-medium">{emailContent.subject || "Real Estate Opportunity"}</p>
                <p className="text-xs text-gray-500">From: Real Estate Agent &lt;agent@realestate.com&gt;</p>
                <p className="text-xs text-gray-500">To: Client &lt;client@example.com&gt;</p>
              </div>
            </div>
            
            <div className="p-4 bg-white text-sm">
              {emailContent.body}
              
              {shouldShowImages() && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Attached Images:</p>
                  <div className="flex gap-2 mt-2">
                    {listingDetails.images.slice(0, 3).map((image: any, index: number) => (
                      <img
                        key={index}
                        src={image.src}
                        alt={`Listing image ${index + 1}`}
                        className="h-20 w-24 object-cover rounded-md border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      );
      
    case 'sms message':
    case 'smsmessage':
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="max-w-xs mx-auto border border-gray-200 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
            <div className="bg-gray-200 p-2 text-center text-sm font-medium border-b">
              Messages
            </div>
            <div className="p-3">
              <div className="flex flex-col space-y-2">
                <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tl-sm self-end max-w-[85%]">
                  <p className="text-sm">Hi, I'm interested in properties in the area. Can you help?</p>
                  <p className="text-[10px] text-blue-100 text-right mt-1">10:31 AM</p>
                </div>
                
                <div className="bg-white border p-3 rounded-2xl rounded-tr-sm self-start max-w-[85%]">
                  <p className="text-sm">{content}</p>
                  <p className="text-[10px] text-gray-400 text-right mt-1">10:45 AM</p>
                </div>
                
                {shouldShowImages() && (
                  <div className="bg-white border p-2 rounded-2xl rounded-tr-sm self-start max-w-[85%]">
                    <img
                      src={listingDetails.images[0].src}
                      alt="Listing image"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <p className="text-[10px] text-gray-400 text-right mt-1">10:46 AM</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center mt-3 bg-white rounded-full border overflow-hidden">
                <div className="flex-1 px-3">
                  <p className="text-xs text-gray-400">Message</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-full mx-1">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
      
    case 'video script':
    case 'videoscript':
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-red-600 text-white p-3 flex items-center">
              <Video className="h-5 w-5 mr-2" />
              <span className="font-medium">Video Script</span>
            </div>
            
            <div className="p-4">
              {shouldShowImages() && (
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={listingDetails.images[0].src}
                    alt="Video thumbnail"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 rounded-full p-3">
                      <div className="w-0 h-0 ml-1 border-t-8 border-t-transparent border-l-12 border-l-red-600 border-b-8 border-b-transparent" />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border-l-4 border-red-600 pl-3">
                <h3 className="font-medium text-sm mb-2">Property Showcase Script</h3>
                <div className="text-sm text-gray-700 whitespace-pre-line">
                  {formatContent(content)}
                </div>
              </div>
            </div>
          </div>
        </Card>
      );

    case 'blog post':
    case 'blogpost':
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-6">
              {shouldShowImages() && (
                <div className="mb-4">
                  <img
                    src={listingDetails.images[0].src}
                    alt="Blog feature image"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
              
              <h1 className="text-xl font-bold mb-2">
                {content.split('\n')[0].replace(/^#\s+/, '')}
              </h1>
              
              <div className="flex items-center mb-4">
                <Avatar className="h-8 w-8">
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">RA</span>
                  </div>
                </Avatar>
                <div className="ml-2">
                  <p className="text-sm font-medium">Real Estate Agent</p>
                  <p className="text-xs text-gray-500">Published May 16, 2025 • 5 min read</p>
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none">
                {content.split('\n').slice(1).map((line, i) => {
                  // Handle headings
                  if (line.startsWith('##')) {
                    return <h2 key={i} className="text-lg font-semibold mt-4 mb-2">{line.replace(/^##\s+/, '')}</h2>;
                  }
                  // Handle lists
                  if (line.startsWith('- ') || line.startsWith('* ')) {
                    return <li key={i} className="ml-4">{line.substring(2)}</li>;
                  }
                  // Handle empty lines
                  if (line.trim() === '') {
                    return <br key={i} />;
                  }
                  // Regular paragraphs
                  return <p key={i} className="mb-3">{line}</p>;
                })}
              </div>
            </div>
          </div>
        </Card>
      );
      
    case 'press release':
    case 'pressrelease':
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="border border-gray-200 rounded-lg p-6 font-serif">
            <div className="border-b pb-4 mb-4">
              <h3 className="text-sm font-bold text-gray-500 mb-1">FOR IMMEDIATE RELEASE</h3>
              <h1 className="text-xl font-bold mb-2">
                {content.split('\n')[1] || "REAL ESTATE COMPANY ANNOUNCES NEW PROPERTY LISTING"}
              </h1>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>{content.split('\n')[2]?.match(/\[(.*?)\]/)?.[1] || "May 16, 2025"}</span>
              </div>
            </div>
            
            <div className="text-sm space-y-3">
              {content.split('\n').slice(3).map((line, i) => {
                if (line === '###') return <hr key={i} className="my-4" />;
                if (line.trim() === '') return <br key={i} />;
                if (line.startsWith('Contact:')) {
                  return (
                    <div key={i} className="mt-6 pt-4 border-t border-gray-200">
                      <h3 className="font-bold">Contact:</h3>
                      {content.split('\n').slice(content.split('\n').indexOf('Contact:') + 1).map((contactLine, j) => (
                        <p key={`contact-${j}`} className="text-sm">{contactLine}</p>
                      ))}
                    </div>
                  );
                }
                return <p key={i}>{line}</p>;
              })}
            </div>
            
            {shouldShowImages() && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex gap-2 mt-2">
                  {listingDetails.images.slice(0, 2).map((image: any, index: number) => (
                    <div key={index} className="relative">
                      <img
                        src={image.src}
                        alt={`Property image ${index + 1}`}
                        className="h-24 w-32 object-cover"
                      />
                      <p className="text-xs text-gray-500 mt-1">Image {index + 1}: Property view</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      );
      
    default:
      return (
        <Card className="p-4 border shadow-sm bg-white mb-4">
          <div className="flex items-center mb-3">
            {getPlatformIcon()}
            <span className="ml-2 font-medium capitalize">{platform} Preview</span>
          </div>
          <div className="text-sm mb-4 whitespace-pre-wrap">
            {formatContent(content)}
          </div>
          {shouldShowImages() && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-medium mb-2">Attached Images:</p>
              <div className="flex gap-2">
                {listingDetails.images.slice(0, 3).map((image: any, index: number) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={`Listing image ${index + 1}`}
                    className="h-20 w-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            </div>
          )}
        </Card>
      );
  }
};

export default SocialMediaMockup;
