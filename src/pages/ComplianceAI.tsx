
import React from 'react';
import AppHeader from '../components/AppHeader';
import Sidebar from '../components/Sidebar';
import { MessageSquare, User, SendIcon } from 'lucide-react';

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
              <h2 className="text-2xl font-semibold text-insta-text mb-6">Compliance Topics</h2>
              
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Popular Compliance Topics:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">📋</span>
                      <div>
                        <div className="font-medium">Regulation Z</div>
                        <div className="text-sm text-insta-lightText">Truth in Lending Act requirements</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🏛️</span>
                      <div>
                        <div className="font-medium">RESPA</div>
                        <div className="text-sm text-insta-lightText">Real Estate Settlement Procedures</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🔒</span>
                      <div>
                        <div className="font-medium">TRID</div>
                        <div className="text-sm text-insta-lightText">TILA-RESPA Integrated Disclosure</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">👥</span>
                      <div>
                        <div className="font-medium">Fair Lending</div>
                        <div className="text-sm text-insta-lightText">ECOA and Fair Housing Act</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🏠</span>
                      <div>
                        <div className="font-medium">Mortgage Servicing</div>
                        <div className="text-sm text-insta-lightText">Servicing rules and requirements</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">📱</span>
                      <div>
                        <div className="font-medium">Digital Compliance</div>
                        <div className="text-sm text-insta-lightText">E-Sign Act and digital disclosures</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">📊</span>
                      <div>
                        <div className="font-medium">HMDA</div>
                        <div className="text-sm text-insta-lightText">Home Mortgage Disclosure Act</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insta-card">
                    <div className="flex items-start">
                      <span className="text-xl mr-2">🛡️</span>
                      <div>
                        <div className="font-medium">AML/BSA</div>
                        <div className="text-sm text-insta-lightText">Anti-Money Laundering requirements</div>
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
                placeholder="Ask about compliance topics..." 
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
