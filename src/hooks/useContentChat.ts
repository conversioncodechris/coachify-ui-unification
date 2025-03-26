
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

  // Alternative questions for each conversational stage
  const alternativeQuestions = [
    [
      "What was the most significant transaction or deal you closed in the past month? Please share the specific property type, location, and what made this deal unique.",
      "Can you tell me about a recent property you sold that presented unique challenges or opportunities?",
      "What was your most memorable real estate transaction recently, and what made it stand out?",
      "Describe a recent listing you worked with that had special features or required a creative approach."
    ],
    [
      "Thank you for sharing those details. What challenges did you face during this transaction, and how did you overcome them?",
      "What obstacles did you encounter with this property, and what strategies did you use to address them?",
      "Tell me about any difficulties that came up during this transaction and how you resolved them.",
      "Were there any unexpected issues that arose during this deal, and how did you handle them?"
    ],
    [
      "That's interesting to hear about those challenges. What made this particular client unique, and how did you adapt your approach to meet their specific needs?",
      "How would you describe the client's personality and expectations, and how did you tailor your services to them?",
      "What was special about working with this client, and how did you customize your approach for them?",
      "Tell me about the relationship you built with this client and how you addressed their specific concerns."
    ],
    [
      "What was the most rewarding aspect of closing this deal, and what did you learn that you'll apply to future transactions?",
      "What gave you the most satisfaction about completing this transaction, and what lessons will you carry forward?",
      "Looking back on this deal, what was the highlight for you, and what new insights did you gain?",
      "What made this transaction particularly fulfilling, and how will it influence your approach going forward?"
    ]
  ];

  const [currentQuestionIndices, setCurrentQuestionIndices] = useState<number[]>([0, 0, 0, 0]);

  const conversationalStages = [
    {
      question: alternativeQuestions[0][currentQuestionIndices[0]],
      responseHandler: (userResponse: string) => {
        return alternativeQuestions[1][currentQuestionIndices[1]];
      }
    },
    {
      question: alternativeQuestions[1][currentQuestionIndices[1]],
      responseHandler: (userResponse: string) => {
        return alternativeQuestions[2][currentQuestionIndices[2]];
      }
    },
    {
      question: alternativeQuestions[2][currentQuestionIndices[2]],
      responseHandler: (userResponse: string) => {
        return alternativeQuestions[3][currentQuestionIndices[3]];
      }
    },
    {
      question: alternativeQuestions[3][currentQuestionIndices[3]],
      responseHandler: (userResponse: string) => {
        return "Thank you for sharing your experience! I've created content based on our conversation that you can use across multiple platforms. Would you like to see the generated content?";
      }
    }
  ];

  useEffect(() => {
    const isConversationalInterview = topic === "Conversational Interview → Multi-Platform Output";
    
    if (isConversationalInterview) {
      setShowSuggestions(false);
    }
    
    if (messages.length === 0) {
      let welcomeMessage = `Welcome to the ${topic} content creation! What kind of content would you like to create today?`;
      
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

  // Function to change the current question
  const changeCurrentQuestion = () => {
    if (topic !== "Conversational Interview → Multi-Platform Output" || messages.length === 0) {
      return;
    }
    
    // Only allow changing the first question (stage 0)
    if (conversationStage > 0) {
      return;
    }
    
    // Select a new question index that's different from the current one
    const currentIndex = currentQuestionIndices[0];
    let newIndex = Math.floor(Math.random() * alternativeQuestions[0].length);
    
    // Make sure we get a different question (if there are multiple options)
    if (alternativeQuestions[0].length > 1) {
      while (newIndex === currentIndex) {
        newIndex = Math.floor(Math.random() * alternativeQuestions[0].length);
      }
    }
    
    // Update the question index
    const newIndices = [...currentQuestionIndices];
    newIndices[0] = newIndex;
    setCurrentQuestionIndices(newIndices);
    
    // Update the first message with the new question
    const newQuestion = alternativeQuestions[0][newIndex];
    
    if (messages.length > 0) {
      const updatedMessages = [...messages];
      updatedMessages[0] = {
        ...updatedMessages[0],
        content: newQuestion
      };
      setMessages(updatedMessages);
    }
  };

  const generateContentFromConversation = (messages: Message[]): ContentOutput => {
    const userResponses = messages
      .filter(msg => msg.sender === 'user')
      .map(msg => msg.content);
    
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
      
      twitter: `Just closed on an amazing property! 🏠 ${userResponses[0]?.substring(0, 80)}...

The best part? ${userResponses[3]?.substring(0, 80)}...

#RealEstate #Success #ClosedDeal`,
      
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
[Your Name]`,

      videoScript: `[INTRO]
Hi everyone! Today I want to share an exciting success story from my recent real estate work.

[MAIN CONTENT]
I recently closed a deal on ${userResponses[0]?.substring(0, 100)}...

The journey had its challenges. ${userResponses[1]?.substring(0, 100)}...

What made this transaction special was ${userResponses[2]?.substring(0, 100)}...

The most rewarding aspect was ${userResponses[3]?.substring(0, 100)}...

[CALL TO ACTION]
If you're looking to buy or sell property, I'd love to help you navigate the process with the same care and attention. Reach out using the contact information in the description below!

[OUTRO]
Thanks for watching, and I'll see you in the next video!`,

      smsMessage: `Hi [Name], just wanted to share that I closed on a great property deal similar to what we discussed! The key to success was ${userResponses[3]?.substring(0, 60)}... Would love to chat about how this applies to your situation. Available next week?`,

      pressRelease: `FOR IMMEDIATE RELEASE
[YOUR COMPANY NAME] SUCCESSFULLY CLOSES CHALLENGING REAL ESTATE TRANSACTION

[CITY, STATE] - [DATE] - [Your Name], a real estate professional with [Your Company], recently closed a significant transaction involving ${userResponses[0]?.substring(0, 100)}...

The transaction presented several challenges, including ${userResponses[1]?.substring(0, 150)}...

"What made this deal special was our ability to adapt to the client's unique situation," said [Your Name]. "${userResponses[2]?.substring(0, 100)}..."

[Your Name] credits the successful outcome to ${userResponses[3]?.substring(0, 100)}...

For more information about [Your Company Name] and its real estate services, please visit [your website] or contact [phone/email].

###

Contact:
[Your Name]
[Your Title]
[Your Company]
[Phone]
[Email]`,

      blogPost: `# How I Navigated a Challenging Real Estate Transaction to Success

In the world of real estate, each transaction tells a unique story. Today, I'd like to share a recent success story that showcases the importance of perseverance, adaptability, and client-focused service.

## The Property

${userResponses[0]}

## The Challenges

No worthwhile achievement comes without obstacles. This transaction was no exception:

${userResponses[1]}

## Understanding the Client's Unique Situation

${userResponses[2]}

## The Rewarding Outcome

${userResponses[3]}

## Lessons Learned

Through this experience, I've refined my approach to handling complex real estate transactions. Every challenge presents an opportunity to grow professionally and provide better service to future clients.

If you're facing similar challenges in your real estate journey, I'd love to share how these strategies might help you too. Reach out today for a consultation!`
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
    
    const isConversationalInterview = topic === "Conversational Interview";
    
    setTimeout(() => {
      let responseContent = `Here's some guidance for creating your ${topic}. This is a simulated response that would typically include tailored content advice, formatting tips, and platform-specific recommendations.`;
      
      if (isConversationalInterview) {
        if (conversationStage < conversationalStages.length - 1) {
          responseContent = conversationalStages[conversationStage + 1].question;
          setConversationStage(prev => prev + 1);
        } else if (conversationStage === conversationalStages.length - 1) {
          const content = generateContentFromConversation([...messages, userMessage]);
          setGeneratedContent(content);
          responseContent = "Thank you for sharing your experience! I've created content based on our conversation that you can use across multiple platforms. Would you like to see the generated content?";
          setConversationStage(prev => prev + 1);
        } else {
          responseContent = "You can edit and customize this content as needed. Would you like to start a new conversation or discuss another topic?";
        }
      }
      
      const aiResponse: Message = {
        sender: 'ai',
        content: responseContent,
        timestamp: new Date(),
        sources: mockSources
      };
      
      if (isConversationalInterview && conversationStage === conversationalStages.length) {
        setShowContentOutput(true);
      }
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

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

  const resetConversation = () => {
    setMessages([]);
    setConversationStage(0);
    setGeneratedContent(null);
    setShowContentOutput(false);
    
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
    setShowContentOutput,
    changeCurrentQuestion
  };
};
