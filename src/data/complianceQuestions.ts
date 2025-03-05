
export interface TopicQuestions {
  [key: string]: string[];
}

export const commonQuestions: TopicQuestions = {
  "Fair Housing Laws": [
    "What are the protected classes under the Fair Housing Act?",
    "How can I avoid steering when showing properties?",
    "What language should I avoid in listings to comply with Fair Housing?",
    "Are there exemptions to Fair Housing Laws?",
    "What are the penalties for Fair Housing violations?"
  ],
  "Disclosure Requirements": [
    "What property defects must be disclosed to buyers?",
    "When is a seller required to complete a property disclosure form?",
    "How should I handle disclosures about deaths on the property?",
    "What environmental hazards require disclosure?",
    "Can I be held liable for not disclosing information I didn't know about?"
  ],
  "License Law": [
    "What continuing education is required to maintain my license?",
    "What activities require a real estate license?",
    "What are the requirements for displaying my license information?",
    "Can I operate my business across multiple states?",
    "What are common license law violations to avoid?"
  ],
  "Agency Relationships": [
    "What's the difference between a buyer's agent and seller's agent?",
    "How should I explain agency relationships to clients?",
    "What are my fiduciary duties as an agent?",
    "How do I handle dual agency situations?",
    "When should agency disclosures be signed?"
  ],
  "Commissions & Compensation": [
    "Can I negotiate my commission rate with clients?",
    "How should I handle commission splits with other agents?",
    "Are there regulations on advertising my commission rates?",
    "Can I offer commission rebates to clients?",
    "What are the tax implications for commission income?"
  ],
  // Default questions for any topic not specifically defined
  "default": [
    "What are the basic compliance requirements for this topic?",
    "What are common violations to avoid in this area?",
    "Are there recent regulatory changes affecting this topic?",
    "What documentation is required for compliance?",
    "What are the potential penalties for non-compliance?"
  ]
};

export const getQuestionsForTopic = (topic: string): string[] => {
  return commonQuestions[topic] || commonQuestions["default"];
};
