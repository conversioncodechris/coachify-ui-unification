
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AppHeaderProps {
  userAvatar?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ userAvatar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 border-b border-border bg-background">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-8">
          <img 
            src="/lovable-uploads/4f2f6671-26a1-4ac4-9350-e6b774f20421.png" 
            alt="GAIRE Logo" 
            className="h-[3.12rem]" 
          />
        </Link>
        
        <nav className="flex font-urbanist">
          <Link 
            to="/compliance" 
            className={`insta-nav-tab ${currentPath.includes('/compliance') ? 'active' : ''}`}
          >
            Compliance AI
          </Link>
          <Link 
            to="/content" 
            className={`insta-nav-tab ${currentPath.includes('/content') ? 'active' : ''}`}
          >
            Content AI
          </Link>
          <Link 
            to="/coach" 
            className={`insta-nav-tab ${currentPath.includes('/coach') ? 'active' : ''}`}
          >
            Coach AI
          </Link>
        </nav>
      </div>
      
      <div className="flex items-center gap-3">
        <Link to="/profile">
          <img 
            src={userAvatar || '/lovable-uploads/0dd3499c-aaf2-4314-9ed1-2dfd0277918e.png'} 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full cursor-pointer" 
          />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
