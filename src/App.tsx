
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Index from './pages/Index';
import ComplianceAI from './pages/ComplianceAI';
import ContentAI from './pages/ContentAI';
import CoachAI from './pages/CoachAI';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './components/ThemeProvider';
import './App.css';
import './index.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Router>
        <div className="flex flex-col min-h-screen bg-background">
          <AppHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/compliance/*" element={<ComplianceAI />} />
              <Route path="/content/*" element={<ContentAI />} />
              <Route path="/coach/*" element={<CoachAI />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
