import { Search, Globe, Shield, AlertTriangle } from "lucide-react";
import Link from "next/link"; // Changed from react-router-dom
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Intelligence Scanner</CardTitle>
          <Search className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Scan for Threats</div>
          <p className="text-xs text-muted-foreground">
            Analyze URLs, IPs, and files for potential threats.
          </p>
          <Link href="/search"> {/* Changed to href for Next.js Link */}
            <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">Go to Scanner</Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Threat Intel Search</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Explore Global Threats</div>
          <p className="text-xs text-muted-foreground">
            Search for threat intelligence on various indicators.
          </p>
          <Link href="/threat-intel-search"> {/* Changed to href for Next.js Link */}
            <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">Search Intel</Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Vulnerability Analysis</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Analyze CVEs</div>
          <p className="text-xs text-muted-foreground">
            Search for Common Vulnerabilities and Exposures (CVEs).
          </p>
          <Link href="/vulnerabilities"> {/* Changed to href for Next.js Link */}
            <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">Analyze Vulnerabilities</Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">Threat Monitoring</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Monitor Emerging Threats</div>
          <p className="text-xs text-muted-foreground">
            Keep track of the latest threats and security advisories.
          </p>
          <Link href="/threats"> {/* Changed to href for Next.js Link */}
            <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">View Threats</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;