import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, RefreshCw, FileText, Share2, Shield, Calendar, Users, TrendingUp, DollarSign, Clock } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-36 pb-28 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="inline-block whitespace-nowrap">The AI <span className="text-black">Operating System</span> for Real Estate</span>{' '}
            <span className="inline-block whitespace-nowrap">Agents and Loan Officers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AIRE provides real estate professionals with instant, expert coaching at a fraction of the cost of traditional coaching. Get personalized guidance whenever you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/content">
              <Button size="lg" className="bg-black hover:bg-black/90 text-white">
                Try Free for 7 Days
              </Button>
            </Link>
            <Link to="/coach">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100">
                Explore Coach AI
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required</p>
        </div>
      </section>

      {/* AI Features Section - Above the fold */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Complete AI Suite for Real Estate Professionals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="feature-icon-container">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">Coach AI</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Get 24/7 expert guidance on listing presentations, negotiations, buyer consultations, and lead generation—whenever you need it.
                </p>
                <div className="rounded-lg overflow-hidden mb-4 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Coach AI Screenshot" 
                    className="w-full h-auto"
                  />
                </div>
                <Link to="/coach" className="block">
                  <Button variant="default" className="w-full bg-black hover:bg-black/90 text-white border border-transparent hover:border-black">
                    Explore Coach AI
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="feature-icon-container">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">Content AI</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Transform conversations into ready-to-use marketing content for social media, email newsletters, and more through natural dialogue.
                </p>
                <div className="rounded-lg overflow-hidden mb-4 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                    alt="Content AI Screenshot" 
                    className="w-full h-auto"
                  />
                </div>
                <Link to="/content" className="block">
                  <Button variant="default" className="w-full bg-black hover:bg-black/90 text-white border border-transparent hover:border-black">
                    Explore Content AI
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="feature-icon-container">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">Compliance AI</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Ensure your marketing materials and communications comply with real estate regulations and industry best practices.
                </p>
                <div className="rounded-lg overflow-hidden mb-4 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" 
                    alt="Compliance AI Screenshot" 
                    className="w-full h-auto"
                  />
                </div>
                <Link to="/compliance" className="block">
                  <Button variant="default" className="w-full bg-black hover:bg-black/90 text-white border border-transparent hover:border-black">
                    Explore Compliance AI
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose AIRE? Section - MOVED UP */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AIRE?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5 bg-black w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cost-Effective</h3>
                <p className="text-gray-600">
                  Just $99/month compared to $1,200-$1,500/month for traditional coaching. Add team members for only $49/month each.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5 bg-black w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
                <p className="text-gray-600">
                  Get expert guidance whenever you need it, not just during scheduled weekly calls. Voice and mobile app access coming soon.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5 bg-black w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Always Improving</h3>
                <p className="text-gray-600">
                  Knowledge base updated bi-weekly with industry trends and based on real agent requests and scenarios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customization Section - NEW */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Customizable to Your Needs</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Powerful Admin Tools</h3>
              <p className="text-lg text-gray-600 mb-6">
                AIRE provides comprehensive customization options so you can tailor the platform to your specific business needs:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Upload your own training materials and documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Create custom AI prompts for your specific needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Manage team access and permissions</span>
                </li>
              </ul>
              <Link to="/settings">
                <Button className="bg-black hover:bg-black/90 text-white border border-transparent hover:border-black">
                  Explore Admin Features
                </Button>
              </Link>
            </div>
            <div className="rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1498936178812-4b2e558d2937" 
                alt="AIRE Admin Dashboard" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section - MOVED DOWN */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Who Uses AIRE?</h2>
              <p className="text-lg text-gray-600 mb-4">
                Our platform is perfect for all types of real estate professionals who need expert coaching and guidance:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Compass agents looking for AI-powered support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <span>New agents seeking affordable, on-demand guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Team members with specific coaching questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Experienced agents looking for a second opinion</span>
                </li>
              </ul>
              <Link to="/coach">
                <Button className="bg-black hover:bg-black/90 text-white border border-transparent hover:border-black">
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 border border-border rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                alt="Conversational Interview Interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Can AIRE Help You With?</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Listing Presentations</h3>
                <p className="text-gray-600">
                  Perfect your pitch with expert guidance on listing presentations.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Negotiation Skills</h3>
                <p className="text-gray-600">
                  Learn effective negotiation tactics for any real estate scenario.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Buyer Consultations</h3>
                <p className="text-gray-600">
                  Improve buyer consultation processes and conversion rates.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Marketing Strategies</h3>
                <p className="text-gray-600">
                  Develop effective marketing campaigns for your listings.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Lead Generation</h3>
                <p className="text-gray-600">
                  Discover proven techniques to generate quality leads.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Social Media</h3>
                <p className="text-gray-600">
                  Create engaging social content that attracts clients.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Lead Conversion</h3>
                <p className="text-gray-600">
                  Turn more leads into clients with proven methods.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Buyer & Seller Systems</h3>
                <p className="text-gray-600">
                  Implement effective systems for both buyers and sellers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Showcase Section - NEW */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">See AIRE in Action</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
                  alt="Coach AI Conversation" 
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">Coach AI Conversations</h3>
              <p className="text-center text-gray-600">Get real-time coaching advice for specific scenarios and challenges.</p>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                  alt="Content AI Generation" 
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">Content Generation</h3>
              <p className="text-center text-gray-600">Quickly create marketing materials and social posts from conversations.</p>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1487252665478-49b61b47f302" 
                  alt="AIRE Customization" 
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">Powerful Customization</h3>
              <p className="text-center text-gray-600">Upload your own assets and create custom prompts tailored to your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Expert Coaching at a Fraction of the Cost?</h2>
          <p className="text-xl mb-8">
            Try our platform free for 7 days with no credit card required. Join thousands of real estate professionals already using our AI coaching to grow your business.
          </p>
          <Link to="/content">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 border border-transparent hover:border-black">
              Start Your Free Trial
            </Button>
          </Link>
          <p className="mt-4 text-white/80">Just $99/month after your trial ends - cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">AIRE</h2>
              <p className="mt-2 text-gray-700">AI-powered coaching for real estate professionals</p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><Link to="/coach" className="text-gray-700 hover:text-black">Coach AI</Link></li>
                  <li><Link to="/content" className="text-gray-700 hover:text-black">Content AI</Link></li>
                  <li><Link to="/compliance" className="text-gray-700 hover:text-black">Compliance AI</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-700 hover:text-black">About Us</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-black">Contact</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-black">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-700">
            <p>© {new Date().getFullYear()} AIRE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
