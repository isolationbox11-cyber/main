import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Globe, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    title: "Intelligence Scanner",
    description: "Discover internet-connected devices and services using Shodan.",
    icon: <Search className="h-8 w-8 text-primary" />,
    href: "/search",
  },
  {
    title: "Threat Intel Search",
    description: "Use advanced Google searches to find vulnerabilities and exposed assets.",
    icon: <Globe className="h-8 w-8 text-primary" />,
    href: "/threat-intel-search",
  },
  {
    title: "Vulnerability Analysis",
    description: "Track and analyze known vulnerabilities (CVEs).",
    icon: <Shield className="h-8 w-8 text-primary" />,
    href: "/vulnerabilities",
  },
    {
    title: "Threat Monitoring",
    description: "Monitor ongoing cyber threats and attack campaigns. (Coming Soon)",
    icon: <AlertTriangle className="h-8 w-8 text-muted-foreground" />,
    href: "/threats",
  },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome to Salem Cyber Vault</h1>
            <p className="text-muted-foreground">Your all-in-one platform for security intelligence. Select a tool to begin.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {tools.map((tool) => (
                <Link to={tool.href} key={tool.title} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
                    <Card className="h-full hover:border-primary/80 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center gap-4">
                            {tool.icon}
                            <div>
                                <CardTitle>{tool.title}</CardTitle>
                                <CardDescription className="mt-1">{tool.description}</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
  );
};

export default DashboardPage;