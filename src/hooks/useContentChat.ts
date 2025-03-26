
import { useState, useEffect, useCallback } from 'react';
import { Message, Source, ContentOutput } from '../components/content/ContentTypes';

export const useContentChat = (topic: string) => {
  const suggestedQuestions = [
    `What makes a good ${topic}?`,
    `What length should my ${topic} be?`,
    `How can I make my ${topic} stand out?`,
    `Best practices for ${topic} content?`,
    `What should I avoid in my ${topic}?`
  ];

  const mockSources: Source[] = [
    {
      title: 'Content Best Practices',
      content: 'This resource provides guidance on creating engaging and effective content for various platforms.',
      url: 'https://example.com/content-best-practices'
    },
    {
      title: 'Platform-Specific Guidelines',
      content: 'Learn about character limits, image sizes, and other technical requirements for different platforms.',
      url: 'https://example.com/platform-guidelines'
    },
    {
      title: 'Content Strategy Guide',
      content: 'A comprehensive guide to developing a content strategy for real estate professionals.',
      url: 'https://example.com/content-strategy'
    },
    {
      title: 'Writing Tips for Real Estate',
      content: 'Expert advice on crafting compelling real estate descriptions and content.',
      url: 'https://example.com/real-estate-writing'
    }
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(0);
  const [conversationStage, setConversationStage] = useState<number>(0);
  const [generatedContent, setGeneratedContent] = useState<ContentOutput | null>(null);
  const [showContentOutput, setShowContentOutput] = useState<boolean>(false);

  // Conversational interview stages
  const conversationalStages = [
    {
      question: "What was the most significant transaction or deal you closed in the past month? Please share the specific property type, location, and what made this deal unique.",
      responseHandler: (userResponse: string) => {
        // Store initial property details
        return "Thank you for sharing those details. What challenges did you face during this transaction, and how did you overcome them?";
      }
    },
    {
      question: "Thank you for sharing those details. What challenges did you face during this transaction, and how did you overcome them?",
      responseHandler: (userResponse: string) => {
        // Store challenges and solutions
        return "That's interesting to hear about those challenges. What made this particular client unique, and how did you adapt your approach to meet their specific needs?";
      }
    },
    {
      question: "That's interesting to hear about those challenges. What made this particular client unique, and how did you adapt your approach to meet their specific needs?",
      responseHandler: (userResponse: string) => {
        // Store client information
        return "What was the most rewarding aspect of closing this deal, and what did you learn that you'll apply to future transactions?";
      }
    },
    {
      question: "What was the most rewarding aspect of closing this deal, and what did you learn that you'll apply to future transactions?",
      responseHandler: (userResponse: string) => {
        // Generate content based on all responses
        return "Thank you for sharing your experience! I've created content based on our conversation that you can use across multiple platforms. Would you like to see the generated content?";
      }
    }
  ];

  // Initialize messages with a welcome message
  useEffect(() => {
    // Check if this is a conversational interview
    const isConversationalInterview = topic === "Conversational Interview";
    
    // If it's a conversational interview, don't show suggestions by default
    if (isConversationalInterview) {
      setShowSuggestions(false);
    }
    
    if (messages.length === 0) {
      // Default welcome message
      let welcomeMessage = `Welcome to the ${topic} content creation! What kind of content would you like to create today?`;
      
      // Custom welcome message for Conversational Interview - more specific and direct
      if (isConversationalInterview) {
        welcomeMessage = conversationalStages[0].question;
      }
      
      setMessages([
        {
          sender: 'ai',
          content: welcomeMessage,
          timestamp: new Date(),
          sources: [
            {
              title: 'Content Best Practices',
              content: 'This resource provides guidance on creating engaging and effective content for various platforms.',
              url: 'https://example.com/content-best-practices'
            },
            {
              title: 'Platform-Specific Guidelines',
              content: 'Learn about character limits, image sizes, and other technical requirements for different platforms.',
              url: 'https://example.com/platform-guidelines'
            }
          ]
        }
      ]);
    }
  }, [topic, messages.length]);

  const toggleSourcesPanel = () => {
    setIsSourcesPanelOpen(!isSourcesPanelOpen);
    if (!isSourcesPanelOpen) {
      setActiveSourceIndex(0);
    }
  };

  const generateContentFromConversation = (messages: Message[]): ContentOutput => {
    // Filter out just the user responses
    const userResponses = messages
      .filter(msg => msg.sender === 'user')
      .map(msg => msg.content);
    
    // Generate content based on conversation
    return {
      facebook: `🏠 SUCCESS STORY: Just closed an amazing deal on a unique property! ${userResponses[0]?.substring(0, 100)}... 

The journey wasn't without challenges: ${userResponses[1]?.substring(0, 100)}...

What made this special was adapting to my client's needs: ${userResponses[2]?.substring(0, 100)}...

#RealEstateSuccess #ClosedDeal #RealEstateTips`,
      
      instagram: `✨ DEAL CLOSED! ✨

One of my most significant transactions this month! 

${userResponses[0]?.substring(0, 150)}...

Swipe to see the property! 📱➡️

#RealEstate #DealClosed #PropertySales #RealEstateAgent`,
      
      linkedin: `I'm excited to share a recent success story from my real estate practice.

${userResponses[0]}

This transaction wasn't without its challenges. ${userResponses[1]}

What I learned: ${userResponses[3]}

I'm grateful for clients who trust me with their real estate journeys and looking forward to helping more people achieve their property goals.

#RealEstate #ProfessionalDevelopment #ClientSuccess`,
      
      email: `Subject: How We Overcame Challenges to Close on a Unique Property

Hi [Client Name],

I wanted to share a recent success story that reminds me of some of the challenges we've discussed in your own real estate journey.

Recently, I helped a client with a property that was ${userResponses[0]?.substring(0, 100)}...

We faced several obstacles along the way:
- ${userResponses[1]?.substring(0, 100)}...

What made this transaction special was our ability to adapt to the client's unique situation: ${userResponses[2]?.substring(0, 100)}...

The most rewarding part was ${userResponses[3]?.substring(0, 100)}...

I'd be happy to apply these successful strategies to your real estate goals as well. Are you available for a quick call next week to discuss?

Best regards,
[Your Name]`
    };
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      sender: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    
    // Handle Conversational Interview flow
    const isConversationalInterview = topic === "Conversational Interview";
    
    setTimeout(() => {
      let responseContent = `Here's some guidance for creating your ${topic}. This is a simulated response that would typically include tailored content advice, formatting tips, and platform-specific recommendations.`;
      
      if (isConversationalInterview) {
        // Progress through conversation stages for Conversational Interview
        if (conversationStage < conversationalStages.length - 1) {
          responseContent = conversationalStages[conversationStage + 1].question;
          setConversationStage(prev => prev + 1);
        } else if (conversationStage === conversationalStages.length - 1) {
          // Final stage - generate content
          const content = generateContentFromConversation([...messages, userMessage]);
          setGeneratedContent(content);
          responseContent = "Thank you for sharing your experience! I've created content based on our conversation that you can use across multiple platforms. Would you like to see the generated content?";
          setConversationStage(prev => prev + 1);
        } else {
          // After content generation
          responseContent = "You can edit and customize this content as needed. Would you like to start a new conversation or discuss another topic?";
        }
      }
      
      const aiResponse: Message = {
        sender: 'ai',
        content: responseContent,
        timestamp: new Date(),
        sources: mockSources
      };
      
      // Add content generation message if at appropriate stage
      if (isConversationalInterview && conversationStage === conversationalStages.length) {
        setShowContentOutput(true);
      }
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  // Set initial AI message for conversational prompts
  const setInitialAiMessage = useCallback((content: string) => {
    setMessages([
      {
        sender: 'ai',
        content: content,
        timestamp: new Date(),
        sources: mockSources.slice(0, 2)
      }
    ]);
  }, []);

  const allSources = messages
    .filter(msg => msg.sender === 'ai' && msg.sources && msg.sources.length > 0)
    .flatMap(msg => msg.sources || []);

  // Reset the conversation to start fresh
  const resetConversation = () => {
    setMessages([]);
    setConversationStage(0);
    setGeneratedContent(null);
    setShowContentOutput(false);
    
    // Initialize with the first message
    const isConversationalInterview = topic === "Conversational Interview";
    const welcomeMessage = isConversationalInterview 
      ? conversationalStages[0].question
      : `Welcome to the ${topic} content creation! What kind of content would you like to create today?`;
    
    setMessages([
      {
        sender: 'ai',
        content: welcomeMessage,
        timestamp: new Date(),
        sources: mockSources.slice(0, 2)
      }
    ]);
    
    // Hide suggestions for conversational interview
    if (isConversationalInterview) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  return {
    messages,
    suggestedQuestions,
    showSuggestions,
    isSourcesPanelOpen,
    activeSourceIndex,
    allSources,
    generatedContent,
    showContentOutput,
    setActiveSourceIndex,
    toggleSourcesPanel,
    handleSendMessage,
    handleSuggestedQuestion,
    setInitialAiMessage,
    setShowSuggestions,
    resetConversation,
    setShowContentOutput
  };
};
