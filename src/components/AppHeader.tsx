
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AppHeaderProps {
  userAvatar?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ userAvatar }) => {
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
      
      <div className="flex items-center">
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
