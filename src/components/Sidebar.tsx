"use client";

import Link from "next/link"; // Changed from react-router-dom
import { usePathname } from "next/navigation"; // Changed from useLocation
import { Package2, Home, Search, ShieldAlert, Bot, Code, Settings, BarChart, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const navItems = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Intelligence Scanner", href: "/search", icon: Search },
  { name: "Threat Intel Search", href: "/threat-intel-search", icon: Globe },
  { name: "Vulnerability Analysis", href: "/vulnerabilities", icon: Shield },
  { name: "Threat Monitoring", href: "/threats", icon: ShieldAlert },
  { name: "Botnets", href: "/botnets", icon: Bot },
  { name: "Dorks", href: "/dorks", icon: Code },
  { name: "Advanced", href: "/advanced", icon: BarChart },
  { name: "Results", href: "/results", icon: Globe },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const isMobile = useIsMobile();
  const pathname = usePathname(); // Changed from useLocation().pathname
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href; // Using pathname
        return (
          <Link
            key={item.name}
            href={item.href} // Changed to href for Next.js Link
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
              href="/" // Changed to href
              className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary"
              onClick={() => setIsOpen(false)}
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Salem Cyber Vault</span>
              Salem Cyber
            </Link>
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Salem Cyber</span>
          </Link>
        </div>
        <div className="flex-1">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}