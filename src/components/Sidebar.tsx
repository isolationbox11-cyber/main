import { Eye, Home, Settings, Shield, Search, AlertTriangle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/", icon: Search, label: "Intelligence Scanner" },
  { href: "/vulnerabilities", icon: Shield, label: "Vulnerabilities" },
  { href: "/threats", icon: AlertTriangle, label: "Threats" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-primary/20 bg-background/80 backdrop-blur-sm md:flex md:flex-col">
      <div className="flex h-14 items-center border-b border-primary/20 px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold text-primary">
          <Eye className="h-6 w-6" />
          <span>Salem Cyber Vault</span>
        </NavLink>
      </div>
      <nav className="flex-1 p-2 text-sm font-medium">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-accent text-primary"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}