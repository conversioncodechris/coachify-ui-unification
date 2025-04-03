
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
import Settings from "./pages/Settings";
import CustomizeAIRE from "./pages/CustomizeAIRE";
import AppHeader from "./components/AppHeader";
import LandingPage from "./pages/LandingPage";

// Create a client with default options to prevent excessive re-fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      retry: 1,         // Only retry once
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  },
});

// User avatar URL
const userAvatarUrl = "/lovable-uploads/4cee2dca-3183-4356-a206-c5d44201ce91.png";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Use either Toaster or Sonner, not both */}
      <Toaster />
      {/* <Sonner /> */}
      <BrowserRouter>
        <AppHeader userAvatar={userAvatarUrl} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/compliance/*" element={<ComplianceAI />} />
          <Route path="/content/*" element={<ContentAI />} />
          <Route path="/coach/*" element={<CoachAI />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/customize-aire" element={<CustomizeAIRE />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
