
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, RefreshCw, FileText, Share2, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Turn Conversations Into <span className="text-insta-blue">Multi-Platform Content</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AIRE helps real estate professionals transform simple conversations into ready-to-use content for all your social platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/content">
              <Button size="lg" className="bg-insta-blue hover:bg-insta-blue/90 text-white">
                Try Content AI
              </Button>
            </Link>
            <Link to="/coach">
              <Button size="lg" variant="outline" className="border-insta-blue text-insta-blue hover:bg-insta-lightBlue">
                Explore Coach AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5 bg-insta-lightBlue w-12 h-12 rounded-full flex items-center justify-center text-insta-blue">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Have a Conversation</h3>
                <p className="text-gray-600">
                  Simply answer a few questions about your recent transactions or real estate experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5 bg-insta-lightBlue w-12 h-12 rounded-full flex items-center justify-center text-insta-blue">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Generates Content</h3>
                <p className="text-gray-600">
                  Our AI automatically transforms your responses into polished content optimized for each platform.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5 bg-insta-lightBlue w-12 h-12 rounded-full flex items-center justify-center text-insta-blue">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Share Everywhere</h3>
                <p className="text-gray-600">
                  Get ready-to-post content for Facebook, Instagram, LinkedIn, Twitter, email and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Screenshot Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Conversational Interview</h2>
              <p className="text-lg text-gray-600 mb-4">
                Our innovative interview format makes content creation effortless. Just answer simple questions about your real estate experiences.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Personalized questions about your transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Refresh questions with a single click</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Multi-platform output from one conversation</span>
                </li>
              </ul>
              <Link to="/content">
                <Button className="bg-insta-blue hover:bg-insta-blue/90 text-white">
                  Try It Now
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 border border-border rounded-lg shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/4cee2dca-3183-4356-a206-c5d44201ce91.png" 
                alt="Conversational Interview Interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Complete AI Suite for Real Estate</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            AIRE provides multiple AI tools designed specifically for real estate professionals.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-insta-blue shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="text-insta-blue" />
                  Content AI
                </h3>
                <p className="text-gray-600 mb-4">
                  Create engaging social media posts, email newsletters, blog articles, and more through natural conversation.
                </p>
                <Link to="/content">
                  <Button variant="outline" className="w-full border-insta-blue text-insta-blue hover:bg-insta-lightBlue">
                    Explore Content AI
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="text-insta-blue" />
                  Compliance AI
                </h3>
                <p className="text-gray-600 mb-4">
                  Ensure all your marketing materials and communications comply with real estate regulations and best practices.
                </p>
                <Link to="/compliance">
                  <Button variant="outline" className="w-full">
                    Explore Compliance AI
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="text-insta-blue" />
                  Coach AI
                </h3>
                <p className="text-gray-600 mb-4">
                  Practice client interactions, objection handling, and improve your real estate communication skills.
                </p>
                <Link to="/coach">
                  <Button variant="outline" className="w-full">
                    Explore Coach AI
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-insta-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Real Estate Content?</h2>
          <p className="text-xl mb-8">
            Join thousands of real estate professionals who use AIRE to create engaging content and grow their business.
          </p>
          <Link to="/content">
            <Button size="lg" className="bg-white text-insta-blue hover:bg-gray-100">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/4f2f6671-26a1-4ac4-9350-e6b774f20421.png" 
                alt="AIRE Logo" 
                className="h-10" 
              />
              <p className="mt-2 text-gray-400">AI-powered tools for real estate professionals</p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><Link to="/content" className="text-gray-400 hover:text-white">Content AI</Link></li>
                  <li><Link to="/compliance" className="text-gray-400 hover:text-white">Compliance AI</Link></li>
                  <li><Link to="/coach" className="text-gray-400 hover:text-white">Coach AI</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} AIRE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
