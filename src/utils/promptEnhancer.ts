
type PromptCategory = 'social-media' | 'email' | 'sales' | 'content' | 'seo' | 'general';

interface DetectionRule {
  keywords: string[];
  category: PromptCategory;
}

interface EnhancementTemplate {
  prefix: string;
  structure: string[];
  examples?: string[];
  suffix?: string;
}

export interface EnhancedPrompt {
  original: string;
  enhanced: string;
  category: PromptCategory;
}

// Detection rules to categorize prompts
const detectionRules: DetectionRule[] = [
  {
    keywords: ['social', 'post', 'facebook', 'instagram', 'twitter', 'linkedin', 'promote'],
    category: 'social-media'
  },
  {
    keywords: ['email', 'newsletter', 'subject line', 'campaign', 'outreach'],
    category: 'email'
  },
  {
    keywords: ['sell', 'offer', 'discount', 'deal', 'promotion', 'sales pitch'],
    category: 'sales'
  },
  {
    keywords: ['blog', 'article', 'content', 'write', 'create', 'generate', 'writing'],
    category: 'content'
  },
  {
    keywords: ['seo', 'search engine', 'keyword', 'meta description', 'title tag'],
    category: 'seo'
  }
];

// Templates for enhancing prompts by category
const enhancementTemplates: Record<PromptCategory, EnhancementTemplate> = {
  'social-media': {
    prefix: "Your task is to create engaging social media posts",
    structure: [
      "Ensure the post is concise and appropriate for each platform's character limits.",
      "Highlight the unique features and key selling points.",
      "Use a friendly, enthusiastic tone to attract the target audience.",
      "Include relevant hashtags or emojis where appropriate.",
      "End with a compelling call to action."
    ],
    suffix: 'Please generate the social media post according to the guidelines above.'
  },
  'email': {
    prefix: "Your task is to write an effective email",
    structure: [
      "Create a compelling subject line that encourages opens.",
      "Start with a personalized greeting.",
      "Keep paragraphs short and focused on one idea each.",
      "Clearly communicate the value proposition and main message.",
      "Include a clear call to action.",
      "End with a professional sign-off."
    ],
    suffix: 'Please generate the email according to the guidelines above.'
  },
  'sales': {
    prefix: "Your task is to create a persuasive sales message",
    structure: [
      "Start by identifying the customer's pain point or need.",
      "Present your solution clearly and concisely.",
      "Highlight key benefits, not just features.",
      "Include social proof or testimonials if available.",
      "Address potential objections preemptively.",
      "Create urgency and include a specific call to action."
    ],
    suffix: 'Please generate the sales message according to the guidelines above.'
  },
  'content': {
    prefix: "Your task is to create high-quality written content",
    structure: [
      "Start with an engaging headline that captures attention.",
      "Include an introduction that clearly states the purpose and value of the content.",
      "Structure the main body with logical headings and subheadings.",
      "Support main points with data, examples, or stories where appropriate.",
      "Use a tone and language style appropriate for the target audience.",
      "End with a conclusion that summarizes key points and includes a call to action if appropriate."
    ],
    suffix: 'Please generate the content according to the guidelines above.'
  },
  'seo': {
    prefix: "Your task is to create SEO-optimized content",
    structure: [
      "Include the primary keyword in the title, introduction, and conclusion.",
      "Use related keywords and semantic variations throughout the content.",
      "Structure content with H2 and H3 headings containing relevant keywords.",
      "Write meta descriptions that encourage clicks while including the primary keyword.",
      "Ensure readability with short paragraphs and bulleted lists where appropriate.",
      "Include internal and external links to authoritative sources."
    ],
    suffix: 'Please generate the SEO-optimized content according to the guidelines above.'
  },
  'general': {
    prefix: "Your task is to create a well-structured response",
    structure: [
      "Start by clearly stating the objective or purpose.",
      "Provide necessary context or background information.",
      "Present information in a logical, organized manner.",
      "Use clear, concise language appropriate for the audience.",
      "Include specific details, examples, or data where helpful.",
      "End with a clear conclusion or next steps."
    ],
    suffix: 'Please generate a response according to the guidelines above.'
  }
};

/**
 * Detects the category of a prompt based on keywords
 */
function detectCategory(prompt: string): PromptCategory {
  const normalizedPrompt = prompt.toLowerCase();
  
  for (const rule of detectionRules) {
    if (rule.keywords.some(keyword => normalizedPrompt.includes(keyword.toLowerCase()))) {
      return rule.category;
    }
  }
  
  return 'general';
}

/**
 * Creates an enhanced version of the prompt
 */
export function enhancePrompt(originalPrompt: string): EnhancedPrompt {
  const category = detectCategory(originalPrompt);
  const template = enhancementTemplates[category];
  
  let enhanced = `${template.prefix} to ${originalPrompt}.\n\n`;
  enhanced += "Please follow these guidelines:\n\n";
  
  template.structure.forEach(item => {
    enhanced += `- ${item}\n`;
  });
  
  if (template.examples && template.examples.length) {
    enhanced += "\nHere's an example for reference:\n";
    template.examples.forEach(example => {
      enhanced += `${example}\n`;
    });
  }
  
  if (template.suffix) {
    enhanced += `\n${template.suffix}`;
  }
  
  return {
    original: originalPrompt,
    enhanced,
    category
  };
}
