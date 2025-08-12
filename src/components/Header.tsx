import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar"; // Import Sidebar to use its SheetTrigger

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Sidebar /> {/* This will render the SheetTrigger for mobile */}
      <h1 className="text-xl font-semibold hidden md:block">Salem Cyber Vault</h1>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" size="sm" className="hidden sm:flex">
          Live Data
        </Button>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          Enhanced APIs
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <Button variant="secondary" size="icon" className="rounded-full h-8 w-8">
          <User className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
}