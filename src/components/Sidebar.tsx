import { Shield, Home, Settings, BarChart, LifeBuoy } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/vulnerabilities", icon: Shield, label: "Vulnerabilities" },
  { href: "/reports", icon: BarChart, label: "Reports" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-background md:flex md:flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span>Security Inc</span>
        </NavLink>
      </div>
      <nav className="flex-1 p-2 text-sm font-medium">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 mt-auto border-t">
         <Button className="w-full">
            <LifeBuoy className="mr-2 h-4 w-4" /> Help & Support
         </Button>
      </div>
    </aside>
  );
}