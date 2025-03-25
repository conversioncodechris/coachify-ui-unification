
import { ContentAsset } from '@/types/contentAssets';
import { v4 as uuidv4 } from 'uuid';

export interface PromptPack {
  id: string;
  name: string;
  description: string;
  icon: string;
  prompts: ContentAsset[];
}

export const contentPromptPacks: PromptPack[] = [
  {
    id: 'lets-make-magic',
    name: "Let's Make Magic",
    description: "Content Creation Prompts",
    icon: "✨",
    prompts: [
      {
        id: uuidv4(),
        type: 'prompt',
        title: "Captivating Property Description",
        subtitle: "Create an engaging property listing that sells",
        icon: "🏠",
        content: "Write a captivating property description for a [PROPERTY TYPE] with [BEDROOMS] bedrooms and [BATHROOMS] bathrooms. Include key features like [FEATURE 1], [FEATURE 2], and [FEATURE 3]. The property is located in [NEIGHBORHOOD], known for [NEIGHBORHOOD FEATURE]. Target buyers who value [VALUE PROPOSITION].",
        source: "created",
        dateAdded: new Date(),
        aiType: "content",
        metadata: {
          purpose: "New Listing",
          platforms: ["Facebook", "Instagram", "Email"]
        }
      },
      {
        id: uuidv4(),
        type: 'prompt',
        title: "Neighborhood Spotlight",
        subtitle: "Highlight the best aspects of a neighborhood",
        icon: "🏙️",
        content: "Create a neighborhood spotlight for [NEIGHBORHOOD NAME] that showcases its unique appeal. Highlight the [TOP AMENITIES], local [RESTAURANTS/SHOPS], and [COMMUNITY FEATURES]. Include statistics about [PROPERTY VALUES/SCHOOLS/SAFETY]. End with a call to action for potential buyers or sellers in this area.",
        source: "created",
        dateAdded: new Date(),
        aiType: "content",
        metadata: {
          purpose: "Neighborhood Highlight",
          platforms: ["Facebook", "Instagram", "Blog Post"]
        }
      },
      {
        id: uuidv4(),
        type: 'prompt',
        title: "Success Story Testimonial",
        subtitle: "Craft compelling client success stories",
        icon: "⭐",
        content: "Develop a client testimonial post based on the following details: Client [NAME] was looking to [CLIENT GOAL]. They faced challenges like [CHALLENGE 1] and [CHALLENGE 2]. Describe how you helped them overcome these obstacles through [SOLUTION/APPROACH]. Highlight the results: [POSITIVE OUTCOME 1] and [POSITIVE OUTCOME 2]. End with a direct quote from the client expressing their satisfaction.",
        source: "created",
        dateAdded: new Date(),
        aiType: "content",
        metadata: {
          purpose: "Testimonial",
          platforms: ["Facebook", "Instagram", "LinkedIn"]
        }
      },
      {
        id: uuidv4(),
        type: 'prompt',
        title: "Market Update Post",
        subtitle: "Create data-driven market analyses",
        icon: "📊",
        content: "Create a market update post for [CITY/AREA] real estate. Include current trends: [TREND 1] and [TREND 2]. Share key statistics: average home price of [PRICE], [PERCENTAGE]% change in inventory, and average days on market is [NUMBER]. Explain what these numbers mean for [BUYERS/SELLERS]. End with your professional recommendation for those looking to [BUY/SELL] in this market.",
        source: "created",
        dateAdded: new Date(),
        aiType: "content",
        metadata: {
          purpose: "Market Report",
          platforms: ["LinkedIn", "Email", "Blog Post"]
        }
      },
      {
        id: uuidv4(),
        type: 'prompt',
        title: "Open House Announcement",
        subtitle: "Drive attendance to your next open house",
        icon: "🔑",
        content: "Create an exciting open house announcement for [PROPERTY ADDRESS]. The event will be held on [DATE] from [START TIME] to [END TIME]. Highlight [TOP 3 FEATURES] that make this property special. Mention neighborhood perks like [NEIGHBORHOOD BENEFITS]. Include special elements of the open house such as [REFRESHMENTS/TOURS/GIVEAWAYS]. End with clear directions on how to RSVP or register.",
        source: "created",
        dateAdded: new Date(),
        aiType: "content",
        metadata: {
          purpose: "Open House",
          platforms: ["Facebook", "Instagram", "Email", "SMS Message"]
        }
      }
    ]
  }
];
