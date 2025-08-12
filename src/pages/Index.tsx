import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Server, Webcam, Database, Router, Shield } from "lucide-react";

const quickSearches = [
    { label: "Webcams", query: "webcam", icon: <Webcam className="mr-2 h-4 w-4" /> },
    { label: "SSH Servers", query: "port:22", icon: <Server className="mr-2 h-4 w-4" /> },
    { label: "Databases", query: "product:mongodb", icon: <Database className="mr-2 h-4 w-4" /> },
    { label: "Routers", query: "device:router", icon: <Router className="mr-2 h-4 w-4" /> },
    { label: "Vulnerable", query: "vuln:cve-2024", icon: <Shield className="mr-2 h-4 w-4" /> },
]

const IntelligenceScannerPage = () => {
  return (
    <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Intelligence Scanner</CardTitle>
                <CardDescription>Discover devices and services across the digital landscape.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="search" 
                            placeholder="Enter search query (e.g., apache, nginx, port:80, country:US)..." 
                            className="pl-10"
                        />
                    </div>
                    <Button type="submit">Search</Button>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Quick Searches</CardTitle>
                <CardDescription>Use these presets to start exploring common queries.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {quickSearches.map(item => (
                    <Button key={item.label} variant="secondary">
                        {item.icon}
                        {item.label}
                    </Button>
                ))}
            </CardContent>
        </Card>
    </div>
  );
};

export default IntelligenceScannerPage;