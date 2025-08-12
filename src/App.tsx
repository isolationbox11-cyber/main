import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import FloatingEyes from "./components/FloatingEyes";

const queryClient = new QueryClient();

const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="relative min-h-screen w-full">
      <FloatingEyes />
      <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr] relative z-10">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
          </main>
        </div>
      </div>
    </div>
);

const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="flex items-center justify-center h-full">
        <h1 className="text-3xl font-bold">{title} Page</h1>
        <p className="text-muted-foreground">This page is under construction.</p>
    </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout><Index /></MainLayout>} />
            <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
            <Route path="/vulnerabilities" element={<MainLayout><PlaceholderPage title="Vulnerabilities" /></MainLayout>} />
            <Route path="/threats" element={<MainLayout><PlaceholderPage title="Threats" /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><PlaceholderPage title="Settings" /></MainLayout>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;