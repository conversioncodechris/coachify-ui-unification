
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FileText, Search, Sparkles, User } from 'lucide-react';

const ContentAI = () => {
  const [contentType, setContentType] = useState('blog');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [audience, setAudience] = useState('');
  const [idea, setIdea] = useState('');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('More than');
  const [paragraphs, setParagraphs] = useState('3');
  
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar type="content" />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Content Brief Section */}
          <div className="w-1/2 border-r border-border overflow-y-auto p-6">
            <div className="mb-6">
              <h2 className="text-xl font-medium text-insta-text">Content Brief</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-insta-lightText mb-1">
                  <Search size={16} className="mr-2" /> Topic:
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. When should I refinance my mortgage?" 
                  className="insta-input"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-insta-lightText mb-1">
                  <Search size={16} className="mr-2" /> Keywords:
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. debt-to-income ratio, credit score" 
                  className="insta-input"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-insta-lightText mb-1">
                  <User size={16} className="mr-2" /> Target audience:
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. first-time home buyers" 
                  className="insta-input"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-insta-lightText mb-1">
                  <Sparkles size={16} className="mr-2" /> Rough idea:
                </label>
                <textarea 
                  placeholder="Describe a rough idea..." 
                  className="insta-input min-h-[100px]"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-insta-lightText mb-1">
                    Tone:
                  </label>
                  <select 
                    className="insta-input"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Friendly</option>
                    <option>Formal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-insta-lightText mb-1">
                    Length:
                  </label>
                  <select 
                    className="insta-input"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  >
                    <option>Less than</option>
                    <option>More than</option>
                    <option>About</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-insta-lightText mb-1">
                    Paragraphs:
                  </label>
                  <select 
                    className="insta-input"
                    value={paragraphs}
                    onChange={(e) => setParagraphs(e.target.value)}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="insta-button-secondary flex items-center">
                  <Sparkles size={16} className="mr-2" /> Suggest
                </button>
                <button className="insta-button-primary flex items-center">
                  <FileText size={16} className="mr-2" /> Generate
                </button>
              </div>
            </div>
          </div>
          
          {/* Generated Content Section */}
          <div className="w-1/2 overflow-y-auto p-6">
            <div className="mb-6 flex justify-between">
              <h2 className="text-xl font-medium text-insta-text">Generated Content</h2>
              <div className="flex gap-2">
                <button className="insta-button-secondary text-sm">
                  Copy
                </button>
                <button className="insta-button-secondary text-sm">
                  Edit
                </button>
              </div>
            </div>
            
            <div className="animate-fade-in insta-card">
              <h3 className="text-lg font-medium mb-4">Welcome to Content AI!</h3>
              
              <p className="mb-4">
                To start crafting your content:
              </p>
              
              <ol className="list-decimal pl-5 mb-4 space-y-2">
                <li>Enter your details such as topic, keywords, and target audience.</li>
                <li>Hit 'Suggest' to get some creative input or 'Generate' when you're ready.</li>
              </ol>
              
              <p className="mb-4">
                Your personalized content will appear here, ready for review and refinement. Whether you're looking to engage, inform, or convert - your tailored masterpiece awaits your final touch.
              </p>
              
              <p className="text-insta-lightText mt-6">
                Not sure where to begin? Try the 'Suggest' feature for some inspiration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentAI;
