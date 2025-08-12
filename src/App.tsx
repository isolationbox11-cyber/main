import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntelligenceScannerPage from "./pages/IntelligenceScannerPage"; // Renamed from Index
import OverviewPage from "./pages/OverviewPage"; // New default page
import ThreatIntelSearchPage from "./pages/ThreatIntelSearch";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">This page is under construction.</p>
    </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout><OverviewPage /></MainLayout>} /> {/* New default route */}
            <Route path="/search" element={<MainLayout><IntelligenceScannerPage /></MainLayout>} /> {/* Renamed Index to Search */}
            <Route path="/threat-intel-search" element={<MainLayout><ThreatIntelSearchPage /></MainLayout>} />
            <Route path="/threats" element={<MainLayout><PlaceholderPage title="Threats" /></MainLayout>} />
            <Route path="/botnets" element={<MainLayout><PlaceholderPage title="Botnets" /></MainLayout>} />
            <Route path="/dorks" element={<MainLayout><PlaceholderPage title="Dorks" /></MainLayout>} />
            <Route path="/advanced" element={<MainLayout><PlaceholderPage title="Advanced" /></MainLayout>} />
            <Route path="/results" element={<MainLayout><PlaceholderPage title="Results" /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><PlaceholderPage title="Settings" /></MainLayout>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;