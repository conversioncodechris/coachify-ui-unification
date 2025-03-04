
import React from 'react';
import Sidebar from '../components/Sidebar';
import WelcomeMessage from '../components/WelcomeMessage';
import PersonaCard from '../components/PersonaCard';
import { Eye, Users, SendIcon } from 'lucide-react';

const CoachAI = () => {
  // Persona images
  const personaImages = {
    john: '/lovable-uploads/8bb13521-5e69-4e85-b087-8fa7084d0be5.png',
    michael: '/lovable-uploads/6406de39-8044-454f-8121-03b12b3d47a9.png',
    sophia: '/lovable-uploads/066ef2a3-5787-48f2-9af2-f9f7fe3754c9.png',
    david: '/lovable-uploads/8bb13521-5e69-4e85-b087-8fa7084d0be5.png',
    kevin: '/lovable-uploads/6406de39-8044-454f-8121-03b12b3d47a9.png',
    linda: '/lovable-uploads/066ef2a3-5787-48f2-9af2-f9f7fe3754c9.png',
    sarah: '/lovable-uploads/8bb13521-5e69-4e85-b087-8fa7084d0be5.png',
    johnVeteran: '/lovable-uploads/6406de39-8044-454f-8121-03b12b3d47a9.png',
    quiana: '/lovable-uploads/066ef2a3-5787-48f2-9af2-f9f7fe3754c9.png',
    emily: '/lovable-uploads/8bb13521-5e69-4e85-b087-8fa7084d0be5.png',
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar type="coach" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <WelcomeMessage name="Chris" type="coach" />
            
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-6">Continue chatting</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <PersonaCard 
                  image={personaImages.john}
                  name="John and Sarah, the Expectant Couple"
                  description="John and Sarah are a married couple with a newborn, planning to move to a suburb for more space."
                  tag="🏠"
                />
                
                <PersonaCard 
                  image={personaImages.michael}
                  name="Michael, Balanced Commercial Specialist"
                  description="A balanced and moderately tech-adaptive realtor who excels in commercial properties and investing."
                  tag="🏢"
                />
                
                <PersonaCard 
                  image={personaImages.sophia}
                  name="Sophia, Conservative Commercial Pro"
                  description="An experienced and conservative realtor specializing in commercial properties with traditional approaches."
                  tag="🏢"
                />
                
                <PersonaCard 
                  image={personaImages.david}
                  name="David and Emma, the Busy Parents"
                  description="David and Emma are busy parents with two kids. They are looking for a family-friendly neighborhood."
                  tag="🏠"
                />
                
                <PersonaCard 
                  image={personaImages.kevin}
                  name="Kevin, Innovative Luxury Specialist"
                  description="A tech-oriented realtor specializing in luxury rentals with a knack for innovative marketing."
                  tag="🏠"
                />
              </div>
            </div>
            
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">New Chat</h3>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 text-sm bg-white border border-border rounded-md px-3 py-1">
                    <Eye size={16} />
                    <span>Visibility:</span>
                    <span className="font-medium">All</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-white border border-border rounded-md px-3 py-1">
                    <Users size={16} />
                    <span>Persona Type:</span>
                    <span className="font-medium">All</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <div className="insta-persona-card flex items-center justify-center animate-scale-in bg-insta-lightBlue/50 border-dashed">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-white/80 rounded-full mx-auto flex items-center justify-center mb-2">
                      <Users size={24} className="text-insta-blue" />
                    </div>
                    <div className="text-sm text-insta-blue font-medium">Create a new persona</div>
                    <div className="text-xs text-insta-lightText mt-1">Not vibing with any characters?</div>
                  </div>
                </div>
                
                <PersonaCard 
                  image={personaImages.linda}
                  name="Linda, International Luxury Agent"
                  description="A conservative veteran realtor who deals with international clients seeking luxury properties."
                  tag="🏠"
                />
                
                <PersonaCard 
                  image={personaImages.sarah}
                  name="Sarah, Tech-Savvy Luxury Agent"
                  description="An innovative and tech-savvy realtor who specializes in luxury properties using the latest tools."
                  tag="🏠"
                />
                
                <PersonaCard 
                  image={personaImages.johnVeteran}
                  name="John, Veteran Commercial Agent"
                  description="A veteran commercial realtor known for his aggressive sales approach and deep market knowledge."
                  tag="🏢"
                />
                
                <PersonaCard 
                  image={personaImages.quiana}
                  name="Quiana, Energetic Residential Pro"
                  description="A high-energy, extroverted realtor focusing on residential properties with exceptional customer service."
                  tag="🏠"
                />
                
                <PersonaCard 
                  image={personaImages.emily}
                  name="Emily, Tech-Savvy Novice"
                  description="A novice realtor focusing on the residential market, keen on learning and leveraging technology."
                  tag="🏠"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachAI;
