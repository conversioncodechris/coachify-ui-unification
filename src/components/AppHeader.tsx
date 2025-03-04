
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AppHeaderProps {
  userAvatar?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ userAvatar = '/lovable-uploads/066ef2a3-5787-48f2-9af2-f9f7fe3754c9.png' }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b border-border bg-white">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-8">
          <h1 className="text-xl font-bold flex items-center">
            <span>INSTA</span>
            <span className="text-insta-blue">AI</span>
          </h1>
        </Link>
        
        <nav className="flex">
          <Link 
            to="/mortgage" 
            className={`insta-nav-tab ${currentPath.includes('/mortgage') ? 'active' : ''}`}
          >
            Mortgage AI
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
      
      <div className="flex items-center">
        <Link to="/profile">
          <img 
            src={userAvatar} 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full cursor-pointer" 
          />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
