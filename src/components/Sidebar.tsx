"use client";

import { Link, useLocation } from "react-router-dom";
import { Package2, Home, Search, ShieldAlert, Bot, Code, Settings, BarChart, Globe, Shield } from "lucide-react"; // Added Shield icon
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const navItems = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Intelligence Scanner", href: "/search", icon: Search }, // Renamed from 'Search'
  { name: "Threat Intel Search", href: "/threat-intel-search", icon: Globe }, // Added Threat Intel Search
  { name: "Vulnerability Analysis", href: "/vulnerabilities", icon: Shield }, // New item
  { name: "Threat Monitoring", href: "/threats", icon: ShieldAlert }, // Renamed from 'Threats'
  { name: "Botnets", href: "/botnets", icon: Bot },
  { name: "Dorks", href: "/dorks", icon: Code },
  { name: "Advanced", href: "/advanced", icon: BarChart },
  { name: "Results", href: "/results", icon: Globe },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-muted text-primary",
            )}
            onClick={() => setIsOpen(false)} // Close sheet on navigation
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Package2 className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-sidebar text-sidebar-foreground">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary"
              onClick={() => setIsOpen(false)}
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Salem Cyber Vault</span>
              Salem Cyber Vault
            </Link>
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden border-r bg-sidebar text-sidebar-foreground lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold text-sidebar-primary">
            <Package2 className="h-6 w-6" />
            <span>Salem Cyber Vault</span>
          </Link>
        </div>
        <div className="flex-1">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}