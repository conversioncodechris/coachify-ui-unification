
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to Coach AI as the default experience
  return <Navigate to="/coach" replace />;
};

export default Index;
