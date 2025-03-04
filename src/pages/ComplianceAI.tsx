
import React from 'react';
import AppHeader from '../components/AppHeader';
import Sidebar from '../components/Sidebar';
import { MessageSquare, SendIcon } from 'lucide-react';

const ComplianceAI = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar type="compliance" />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex p-4 bg-white border-b border-border items-center space-x-4">
            <div className="bg-insta-gray p-2 rounded-md">
              <MessageSquare size={20} className="text-insta-blue" />
            </div>
            <h2 className="text-lg font-medium">New Chat</h2>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-2xl font-semibold text-insta-text mb-6">Real Estate Compliance Topics</h2>
              
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Popular Real Estate Compliance Topics:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🏠</span>
                      <div>
                        <div className="font-medium">Fair Housing Laws</div>
                        <div className="text-sm text-insta-lightText">Anti-discrimination requirements</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">📝</span>
                      <div>
                        <div className="font-medium">Disclosure Requirements</div>
                        <div className="text-sm text-insta-lightText">Property condition and material facts</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">⚖️</span>
                      <div>
                        <div className="font-medium">License Law</div>
                        <div className="text-sm text-insta-lightText">State licensing requirements</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🤝</span>
                      <div>
                        <div className="font-medium">Agency Relationships</div>
                        <div className="text-sm text-insta-lightText">Fiduciary duties and client representation</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">💰</span>
                      <div>
                        <div className="font-medium">Commissions & Compensation</div>
                        <div className="text-sm text-insta-lightText">Regulatory guidelines on fees</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">📱</span>
                      <div>
                        <div className="font-medium">Digital Marketing Compliance</div>
                        <div className="text-sm text-insta-lightText">Online advertising rules</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🔒</span>
                      <div>
                        <div className="font-medium">Data Privacy</div>
                        <div className="text-sm text-insta-lightText">Client information protection</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🌎</span>
                      <div>
                        <div className="font-medium">Environmental Regulations</div>
                        <div className="text-sm text-insta-lightText">Hazards and property conditions</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">📊</span>
                      <div>
                        <div className="font-medium">Antitrust Compliance</div>
                        <div className="text-sm text-insta-lightText">Competition and price-fixing issues</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">📋</span>
                      <div>
                        <div className="font-medium">Contracts & Forms</div>
                        <div className="text-sm text-insta-lightText">Legal document requirements</div>
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
                placeholder="Ask about real estate compliance topics..." 
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

export default ComplianceAI;
