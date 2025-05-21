
export interface Message {
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: Source[];
}

export interface Source {
  title: string;
  content: string;
  url?: string;
}

export interface ContentOutput {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  x?: string;
  tiktok?: string;
  email?: string;
  videoScript?: string;
  smsMessage?: string;
  pressRelease?: string;
  blogPost?: string;
  comingSoon?: string;
  justListed?: string;
  neighborhoodHighlight?: string;
  marketUpdate?: string;
  openHouseAnnouncement?: string;
  testimonial?: string;
  sellerStory?: string;
  heroFeature?: string;
  behindTheScenes?: string;
  marketingBreakdown?: string;
  justSold?: string;
  walkScore?: string;
  quizContent?: string;
  emailNewsletter?: string;
  googleBusinessProfile?: string;
  youtubeWalkthrough?: string;
  buyerFeedback?: string;
  offerStory?: string;
  cmaMailing?: string;
  liveOpenHouse?: string;
  storyPoll?: string;
  marketingCaseStudy?: string;
}
