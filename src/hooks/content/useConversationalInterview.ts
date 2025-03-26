
import { useState } from 'react';

export const useConversationalInterview = () => {
  const [conversationStage, setConversationStage] = useState<number>(0);
  
  // Questions for each interview stage
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

  const changeCurrentQuestion = () => {
    if (conversationStage > 0) {
      return;
    }
    
    const currentIndex = currentQuestionIndices[0];
    let newIndex = Math.floor(Math.random() * alternativeQuestions[0].length);
    
    if (alternativeQuestions[0].length > 1) {
      while (newIndex === currentIndex) {
        newIndex = Math.floor(Math.random() * alternativeQuestions[0].length);
      }
    }
    
    const newIndices = [...currentQuestionIndices];
    newIndices[0] = newIndex;
    setCurrentQuestionIndices(newIndices);
    
    return alternativeQuestions[0][newIndex];
  };

  return {
    conversationStage,
    setConversationStage,
    alternativeQuestions,
    currentQuestionIndices,
    setCurrentQuestionIndices,
    conversationalStages,
    changeCurrentQuestion
  };
};
