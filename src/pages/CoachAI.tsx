import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CoachSidebar from '../components/sidebar/CoachSidebar';
import CoachChatInterface from '../components/CoachChatInterface';
import ChatSessionManager from '../components/coach/ChatSessionManager';
import { useCoachChatSessions } from '../hooks/useCoachChatSessions';
import { DEFAULT_COACH_TOPICS, DEFAULT_EMOJI_OPTIONS } from '../data/defaultCoachTopics';
import CoachTopicsManager from '../components/coach/CoachTopicsManager';
import { CoachTopic } from '../components/coach/CoachTypes';

const CoachAI = () => {
  const [topics, setTopics] = useState<CoachTopic[]>(DEFAULT_COACH_TOPICS);
  const [hasVisitedCoach, setHasVisitedCoach] = useState(false);
  const [showAssessments, setShowAssessments] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const chatMatch = location.pathname.match(/\/coach\/chat\/(\d+)/);
  const chatId = chatMatch ? chatMatch[1] : null;
  
  const { currentTopic, createNewChatSession } = useCoachChatSessions(
    null,
    chatId
  );

  useEffect(() => {
    // Check if user has visited coach page before
    const hasVisited = localStorage.getItem('hasVisitedCoach');
    if (!hasVisited) {
      setShowAssessments(true);
      localStorage.setItem('hasVisitedCoach', 'true');
    } else {
      setHasVisitedCoach(true);
    }
  }, []);

  const handleTopicClick = (topic: string) => {
    createNewChatSession(topic);
  };

  const handleBackToTopics = () => {
    navigate('/coach', { replace: true });
  };

  const handleCloseAssessments = () => {
    setShowAssessments(false);
    setHasVisitedCoach(true);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <CoachSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatSessionManager topic={currentTopic} chatId={chatId} />
          
          {currentTopic && chatId ? (
            <CoachChatInterface 
              topic={currentTopic} 
              onBackToTopics={handleBackToTopics} 
            />
          ) : (
            <CoachTopicsManager
              topics={topics}
              setTopics={setTopics}
              onTopicClick={handleTopicClick}
              emojiOptions={DEFAULT_EMOJI_OPTIONS}
            />
          )}
        </div>
      </div>

      {/* Assessment overlay that appears on first visit */}
      {showAssessments && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Welcome to Coach AI!</h2>
            <p className="mb-4">Before you get started, we'd like to understand your coaching needs better.</p>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">What are your primary goals with coaching?</h3>
                {/* Example assessment content - replace with actual assessment UI */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Improve sales techniques</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Build better client relationships</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Develop leadership skills</span>
                  </label>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">How experienced are you?</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="experience" />
                    <span>New to the industry (0-2 years)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="experience" />
                    <span>Intermediate (3-5 years)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="experience" />
                    <span>Experienced (5+ years)</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                className="px-4 py-2 text-sm bg-gray-200 rounded-md"
                onClick={handleCloseAssessments}
              >
                Skip for now
              </button>
              <button 
                className="px-4 py-2 text-sm bg-insta-blue text-white rounded-md"
                onClick={handleCloseAssessments}
              >
                Start Coaching
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachAI;
