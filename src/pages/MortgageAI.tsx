
import React from 'react';
import AppHeader from '../components/AppHeader';
import Sidebar from '../components/Sidebar';
import WelcomeMessage from '../components/WelcomeMessage';
import { MessageSquare, User, SendIcon } from 'lucide-react';

const MortgageAI = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar type="mortgage" />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex p-4 bg-white border-b border-border items-center space-x-4">
            <div className="bg-insta-gray p-2 rounded-md">
              <MessageSquare size={20} className="text-insta-blue" />
            </div>
            <h2 className="text-lg font-medium">New Chat</h2>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-border p-6">
              <WelcomeMessage type="mortgage" />
              
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Topics You Can Discuss:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🏠</span>
                      <div>
                        <div className="font-medium">General</div>
                        <div className="text-sm text-insta-lightText">Home buying, Industry updates, Loan Limits</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">💼</span>
                      <div>
                        <div className="font-medium">Company</div>
                        <div className="text-sm text-insta-lightText">News, Policies, Benefits</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">✨</span>
                      <div>
                        <div className="font-medium">Content AI</div>
                        <div className="text-sm text-insta-lightText">Generate Blogs, Emails, Video Scripts, and Social Media Posts</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🏢</span>
                      <div>
                        <div className="font-medium">Freddie Mac</div>
                        <div className="text-sm text-insta-lightText">Mortgage Guidelines</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🏛️</span>
                      <div>
                        <div className="font-medium">FHA</div>
                        <div className="text-sm text-insta-lightText">Mortgage Guidelines, MIP</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🏦</span>
                      <div>
                        <div className="font-medium">Fannie Mae</div>
                        <div className="text-sm text-insta-lightText">Mortgage Guidelines</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-white">
            <div className="max-w-3xl mx-auto relative">
              <input 
                type="text" 
                placeholder="Type something..." 
                className="insta-input pr-12"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-insta-blue">
                <SendIcon size={20} />
              </button>
            </div>
            <div className="max-w-3xl mx-auto mt-2 text-center text-xs text-insta-lightText">
              Sources used by our AI will display here after each response. Start chatting to see references.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageAI;
