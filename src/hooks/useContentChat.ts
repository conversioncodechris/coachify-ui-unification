
import { useEffect, useCallback } from 'react';
import { Message } from '../components/content/ContentTypes';
import { useContentMessages } from './content/useContentMessages';
import { useContentSuggestions } from './content/useContentSuggestions';
import { useSourcesPanel } from './content/useSourcesPanel';
import { useContentOutput } from './content/useContentOutput';
import { useConversationalInterview } from './content/useConversationalInterview';

export const useContentChat = (topic: string) => {
  const {
    messages,
    handleSendMessage: sendMessageBase,
    handleSuggestedQuestion,
    setInitialAiMessage,
    addAiMessage,
    resetMessages,
    allSources,
    mockSources
  } = useContentMessages(topic);

  const {
    suggestedQuestions,
    showSuggestions,
    setShowSuggestions
  } = useContentSuggestions(topic);

  const {
    isSourcesPanelOpen,
    activeSourceIndex,
    setActiveSourceIndex,
    toggleSourcesPanel
  } = useSourcesPanel();

  const {
    generatedContent,
    setGeneratedContent,
    showContentOutput,
    setShowContentOutput,
    generateContentFromConversation
  } = useContentOutput();

  const {
    conversationStage,
    setConversationStage,
    alternativeQuestions,
    currentQuestionIndices,
    conversationalStages,
    changeCurrentQuestion
  } = useConversationalInterview();

  // Check if this is a conversational interview
  const isConversationalInterview = topic === "Conversational Interview → Multi-Platform Output";

  useEffect(() => {
    const isConversationalInterview = topic === "Conversational Interview → Multi-Platform Output";
    
    if (isConversationalInterview) {
      setShowSuggestions(false);
    }
    
    if (messages.length === 0) {
      let welcomeMessage = `Welcome to the ${topic} content creation! What kind of content would you like to create today?`;
      
      if (isConversationalInterview) {
        welcomeMessage = alternativeQuestions[0][currentQuestionIndices[0]];
      }
      
      setInitialAiMessage(welcomeMessage);
    }
  }, [topic, messages.length, currentQuestionIndices, alternativeQuestions, setInitialAiMessage, setShowSuggestions]);

  const handleSendMessage = (message: string) => {
    const userMessage = sendMessageBase(message);
    if (!userMessage) return;
    
    setShowSuggestions(false);
    
    const isConversationalInterview = topic === "Conversational Interview → Multi-Platform Output";
    
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
      
      addAiMessage(responseContent, mockSources);
      
      if (isConversationalInterview && conversationStage === conversationalStages.length) {
        setShowContentOutput(true);
      }
    }, 1000);
  };

  const resetConversation = () => {
    resetMessages();
    setConversationStage(0);
    setGeneratedContent(null);
    setShowContentOutput(false);
    
    const isConversationalInterview = topic === "Conversational Interview → Multi-Platform Output";
    const welcomeMessage = isConversationalInterview 
      ? alternativeQuestions[0][currentQuestionIndices[0]]
      : `Welcome to the ${topic} content creation! What kind of content would you like to create today?`;
    
    setInitialAiMessage(welcomeMessage);
    
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
