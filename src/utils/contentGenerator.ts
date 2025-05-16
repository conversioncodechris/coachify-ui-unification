
import { ContentType } from '../components/content/ContentTypeSelector';

export const generateMockContent = (
  contentType: ContentType,
  listingDetails: any
): string => {
  const { address, price, bedrooms, bathrooms, squareFootage, highlights } = listingDetails;
  const formattedAddress = address || '123 Main Street, Anytown, CA 12345';
  const formattedPrice = price || '$850,000';
  const hasImages = listingDetails.images && listingDetails.images.length > 0;
  
  // Image reference text to include in appropriate content types
  const imageReference = hasImages && ['instagram', 'facebook'].includes(contentType.platform)
    ? "[Image will be attached when posting]\n\n"
    : "";

  // Base templates based on content type
  switch (contentType.id) {
    // Coming Soon
    case 'coming-soon-facebook':
      return `${imageReference}🏡 COMING SOON! 🏡\n\nExcited to announce a beautiful ${bedrooms || '4'} bed, ${bathrooms || '3'} bath home coming to the market next week in the heart of ${formattedAddress.split(',')[1] || 'Anytown'}!\n\n${highlights || 'Features include renovated kitchen, hardwood floors, and a spacious backyard perfect for entertaining.'}\n\nPrice: ${formattedPrice}\n\nContact me for early showings before it hits the market!`;
    
    case 'coming-soon-instagram':
      return `${imageReference}🔑 SNEAK PEEK 🔑\n\nThis gorgeous ${bedrooms || '4'} bedroom home is hitting the market next week! Located in desirable ${formattedAddress.split(',')[1] || 'Anytown'} and priced at ${formattedPrice}.\n\n👀 Early birds get first dibs!\n\n#ComingSoon #RealEstate #NewListing #${formattedAddress.split(',')[1]?.replace(/\s/g, '') || 'Anytown'}RealEstate`;
    
    case 'coming-soon-email':
      return `Subject: Exclusive Preview: Stunning Property Coming to ${formattedAddress.split(',')[1] || 'Anytown'} Next Week\n\nDear [Client Name],\n\nI'm reaching out with an exclusive opportunity to preview a remarkable property before it officially hits the market next week.\n\nProperty Details:\n- ${bedrooms || '4'} bedrooms, ${bathrooms || '3'} bathrooms\n- ${squareFootage || '2,500'} square feet of living space\n- Located at ${formattedAddress}\n- Offered at ${formattedPrice}\n\nKey Features:\n${highlights || '• Completely renovated kitchen with stainless steel appliances\n• Hardwood floors throughout the main level\n• Large primary suite with walk-in closet\n• Spacious backyard with covered patio\n• Excellent school district'}\n\nI have availability for private showings this weekend before the property goes live on the MLS. This gives you a valuable opportunity to see the home without competition from other buyers.\n\nPlease let me know if you'd like to schedule a viewing or if you have any questions about this exciting new listing.\n\nBest regards,\n[Your Name]`;
    
    case 'property-teaser-video-script':
      return `[Opening Shot: Exterior of home with address numbers visible]\n\nVOICEOVER: "Something special is coming to ${formattedAddress.split(',')[1] || 'Anytown'}..."\n\n[Pan to show street view and neighborhood]\n\nVOICEOVER: "Nestled in one of the area's most desirable neighborhoods..."\n\n[Quick cuts of key rooms - kitchen, living room, primary bedroom]\n\nVOICEOVER: "This exceptional ${bedrooms || '4'} bedroom, ${bathrooms || '3'} bathroom home offers ${squareFootage || '2,500'} square feet of thoughtfully designed living space."\n\n[Highlight special feature - backyard, view, etc.]\n\nVOICEOVER: "${highlights?.split('.')[0] || 'Featuring a stunning renovated kitchen and hardwood floors throughout'}..."\n\n[Final exterior shot with agent standing in front]\n\nVOICEOVER: "Coming next week, priced at ${formattedPrice}. Contact me for an exclusive preview before it hits the market!"\n\n[End with agent contact details on screen]`;
    
    case 'coming-soon-flyer':
      return `COMING SOON\n\n${formattedAddress}\n\nPrice: ${formattedPrice}\nBedrooms: ${bedrooms || '4'}\nBathrooms: ${bathrooms || '3'}\nSquare Footage: ${squareFootage || '2,500'} sq ft\n\nProperty Highlights:\n${highlights || '• Completely renovated kitchen with stainless steel appliances\n• Hardwood floors throughout the main level\n• Large primary suite with walk-in closet\n• Spacious backyard with covered patio\n• Excellent school district'}\n\nContact [Your Name] for an exclusive showing before this property hits the market!\nPhone: [Your Phone]\nEmail: [Your Email]\nBroker: [Your Brokerage Information]`;
    
    // Just Listed
    case 'just-listed-facebook':
      return `${imageReference}🏡 JUST LISTED! 🏡\n\nProud to present this beautiful ${bedrooms || '4'} bed, ${bathrooms || '3'} bath home in ${formattedAddress.split(',')[1] || 'Anytown'}!\n\n✅ ${squareFootage || '2,500'} square feet\n✅ ${highlights?.split('.')[0] || 'Gorgeous renovated kitchen'}\n✅ ${highlights?.split('.')[1] || 'Spacious backyard perfect for entertaining'}\n\nOffered at ${formattedPrice} - this won't last long!\n\nDM me for a showing or more information.`;
    
    case 'just-listed-instagram':
      return `${imageReference}💎 NEW LISTING ALERT 💎\n\nSwipe through to see this immaculate ${bedrooms || '4'} bed/${bathrooms || '3'} bath home just listed at ${formattedPrice}!\n\nLocated in the heart of ${formattedAddress.split(',')[1] || 'Anytown'}, this ${squareFootage || '2,500'} sq ft home features ${highlights?.split('.')[0]?.toLowerCase() || 'a gorgeous renovated kitchen'} and ${highlights?.split('.')[1]?.toLowerCase() || 'spacious backyard perfect for entertaining'}.\n\nContact me for a showing before it's gone!\n\n#JustListed #RealEstate #${formattedAddress.split(',')[1]?.replace(/\s/g, '') || 'Anytown'}RealEstate #NewListing #DreamHome`;
    
    case 'property-description':
      return `EXCEPTIONAL ${formattedAddress.split(',')[1] || 'ANYTOWN'} HOME WITH MODERN AMENITIES\n\nWelcome to ${formattedAddress}, a stunning ${bedrooms || '4'} bedroom, ${bathrooms || '3'} bathroom residence offering ${squareFootage || '2,500'} square feet of thoughtfully designed living space.\n\nAs you enter, you'll be impressed by the bright, open floor plan that seamlessly connects the living spaces. The heart of this home is the ${highlights?.includes('kitchen') ? highlights.split('.').find(h => h.includes('kitchen')) || 'gourmet kitchen featuring high-end appliances, custom cabinetry, and stone countertops' : 'gourmet kitchen featuring high-end appliances, custom cabinetry, and stone countertops'}.\n\nThe spacious primary suite serves as a private retreat, complete with a luxurious en-suite bathroom and generous closet space. Additional bedrooms provide comfortable accommodations for family members or guests.\n\nOutdoor living is equally impressive with ${highlights?.includes('yard') || highlights?.includes('backyard') || highlights?.includes('outdoor') ? highlights.split('.').find(h => h.includes('yard') || h.includes('backyard') || h.includes('outdoor')) || 'a beautifully landscaped backyard offering the perfect setting for relaxation and entertainment' : 'a beautifully landscaped backyard offering the perfect setting for relaxation and entertainment'}.\n\nLocated in the highly desirable ${formattedAddress.split(',')[1] || 'Anytown'} neighborhood, this home offers convenient access to top-rated schools, shopping, dining, and recreation.\n\nOffered at ${formattedPrice}, this exceptional property represents the perfect blend of location, space, and modern amenities.`;
    
    // Social media posts
    case 'social-media-carousel':
      return `${imageReference}📸 PROPERTY SPOTLIGHT 📸\n\nTake a visual tour of this incredible ${bedrooms || '4'} bed, ${bathrooms || '3'} bath home in ${formattedAddress.split(',')[1] || 'Anytown'}!\n\nSwipe through to see all the stunning features of this ${formattedPrice} property, from the ${highlights?.split('.')[0]?.toLowerCase() || 'gorgeous renovated kitchen'} to the ${highlights?.split('.')[1]?.toLowerCase() || 'spacious backyard'}.\n\nDM for a private showing!\n\n#PropertyTour #RealEstate #DreamHome #HouseHunting`;
      
    case 'virtual-tour-promo':
      return `${imageReference}🏡 VIRTUAL TOUR AVAILABLE 🏡\n\nCan't make it to a showing? No problem! Experience this ${bedrooms || '4'} bed, ${bathrooms || '3'} bath ${formattedAddress.split(',')[1] || 'Anytown'} home from anywhere!\n\nClick the link in my bio to take a virtual walkthrough of this ${formattedPrice} property.\n\nFeatures include ${highlights?.split('.')[0]?.toLowerCase() || 'a gorgeous renovated kitchen'} and so much more!\n\n#VirtualTour #RealEstate #HouseTour #StayAtHomeShopping`;
    
    // Open House
    case 'open-house-instagram':
      return `${imageReference}🔑 OPEN HOUSE THIS WEEKEND! 🔑\n\nJoin me this Saturday and Sunday from 1-4PM to tour this beautiful ${bedrooms || '4'} bed, ${bathrooms || '3'} bath home at ${formattedAddress}.\n\nPriced at ${formattedPrice}, this won't last long!\n\nHighlights include ${highlights?.split('.').slice(0, 2).join(' and ').toLowerCase() || 'renovated kitchen and hardwood floors'}.\n\nBring your buyers! Refreshments will be served.\n\n#OpenHouse #RealEstate #HouseHunting #WeekendPlans`;
    
    // Default content
    default:
      return `${imageReference}Content for ${contentType.title} targeting the ${contentType.platform} platform.\n\nThis will highlight your ${formattedAddress} property priced at ${formattedPrice} with its ${bedrooms || '4'} bedrooms and ${bathrooms || '3'} bathrooms.\n\nKey features include: ${highlights || 'renovated kitchen, hardwood floors, and spacious backyard'}.`;
  }
};

export const generateAllContent = (
  contentTypes: ContentType[],
  listingDetails: any
): Record<string, string> => {
  const result: Record<string, string> = {};
  
  contentTypes.forEach(type => {
    result[type.id] = generateMockContent(type, listingDetails);
  });
  
  return result;
};
