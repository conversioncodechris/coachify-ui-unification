
import React from 'react';

interface PersonaCardProps {
  image: string;
  name: string;
  description: string;
  tag?: string;
  onClick?: () => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ 
  image, 
  name, 
  description, 
  tag, 
  onClick 
}) => {
  return (
    <div 
      className="insta-persona-card animate-scale-in" 
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        {tag && (
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
            {tag}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        <div className="text-xs text-muted-foreground mt-2">@InstaAI</div>
      </div>
    </div>
  );
};

export default PersonaCard;
