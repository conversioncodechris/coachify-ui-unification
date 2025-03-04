
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ComplianceAI from "./pages/ComplianceAI";
import ContentAI from "./pages/ContentAI";
import CoachAI from "./pages/CoachAI";
import AppHeader from "./components/AppHeader";

const queryClient = new QueryClient();

// User avatar URL
const userAvatarUrl = "/lovable-uploads/0dd3499c-aaf2-4314-9ed1-2dfd0277918e.png";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppHeader userAvatar={userAvatarUrl} />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/compliance/*" element={<ComplianceAI />} />
          <Route path="/content/*" element={<ContentAI />} />
          <Route path="/coach/*" element={<CoachAI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
