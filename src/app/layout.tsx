import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import FloatingEyes from "@/components/FloatingEyes";
import { Sidebar } from "@/components/Sidebar";
import { MadeWithDyad } from "@/components/made-with-dyad";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salem Cyber Vault",
  description: "Your all-in-one platform for security intelligence.",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="relative min-h-screen w-full flex">
              <FloatingEyes />
              <Sidebar />
              <div className="flex flex-1 flex-col relative z-10">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
                <MadeWithDyad />
              </div>
            </div>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}