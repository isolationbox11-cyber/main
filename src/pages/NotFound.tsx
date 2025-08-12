"use client"; // This component needs to be a Client Component for usePathname

import { usePathname } from "next/navigation"; // Changed from useLocation
import { useEffect } from "react";
import Link from "next/link"; // Added Link for navigation

const NotFound = () => {
  const pathname = usePathname(); // Changed from useLocation().pathname

  useEffect(() => {
    console.warn(`404: Page not found at ${pathname}`);
  }, [pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <p className="text-muted-foreground mt-2 text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;