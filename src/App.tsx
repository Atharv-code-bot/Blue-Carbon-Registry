import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Submit from "./pages/Submit";
import Contributions from "./pages/Contributions";
import Analytics from "./pages/Analytics";
import Achievements from "./pages/Achievements";
import Notifications from "./pages/Notifications";
import Submissions from "./pages/Submissions";
import Monitoring from "./pages/Monitoring";
import Validation from "./pages/Validation";
import Communities from "./pages/Communities";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/contributions" element={<Contributions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/reports" element={<Reports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
