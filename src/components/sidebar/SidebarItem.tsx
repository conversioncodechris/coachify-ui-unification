
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick?: (e: React.MouseEvent) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  path, 
  onClick 
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = currentPath === path;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn("insta-sidebar-item w-full text-left", isActive && "active")}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <a
      href={path}
      className={cn("insta-sidebar-item", isActive && "active")}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

export default SidebarItem;
