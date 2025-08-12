import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Server, Webcam, Database, Router, Shield, AlertTriangle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { supabase, supabaseError } from "@/lib/supabase";
import { showError } from "@/utils/toast";
import { SearchResults } from "@/components/SearchResults";
import { SearchResultsSkeleton } from "@/components/SearchResultsSkeleton";
import { ShodanLearningGuide } from "@/components/ShodanLearningGuide";

const quickSearches = [
    { label: "Webcams", query: "webcam has_screenshot:true", icon: <Webcam className="mr-2 h-4 w-4" />, displayMode: "grid" as const },
    { label: "SSH Servers", query: "port:22", icon: <Server className="mr-2 h-4 w-4" />, displayMode: "table" as const },
    { label: "Databases", query: "product:mongodb", icon: <Database className="mr-2 h-4 w-4" />, displayMode: "table" as const },
    { label: "Routers", query: "device:router", icon: <Router className="mr-2 h-4 w-4" />, displayMode: "table" as const },
    { label: "Vulnerable", query: "vuln:cve-2024", icon: <Shield className="mr-2 h-4 w-4" />, displayMode: "table" as const },
];

const IntelligenceScanner = () => {
    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [apiError, setApiError] = useState<string | null>(null);
    const [currentDisplayMode, setCurrentDisplayMode] = useState<"table" | "grid">("table");

    const { mutate: search, data: searchResults, isPending: isLoading } = useMutation({
        mutationFn: async (searchQuery: string) => {
            setApiError(null);
            if (!supabase) throw new Error("Supabase client not initialized.");
            
            const { data, error } = await supabase.functions.invoke("shodan-api", {
                body: { query: searchQuery },
            });

            if (error) throw new Error(error.message);
            if (data.error) throw new Error(data.error);

            return data;
        },
        onError: (error) => {
            const errorMessage = (error as Error).message;
            showError(`Search failed: ${errorMessage}`);
            if (errorMessage.toLowerCase().includes("api key")) {
                setApiError(errorMessage);
            }
        },
    });

    const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;
        setSubmittedQuery(query);
        setCurrentDisplayMode("table"); // Default to table for manual searches
        search(query);
    };

    const handleQuickSearch = (item: typeof quickSearches[0]) => {
        setQuery(item.query);
        setSubmittedQuery(item.query);
        setCurrentDisplayMode(item.displayMode);
        search(item.query);
    };

    const handleFacetClick = (facetType: string, value: string) => {
        const newQuery = `${submittedQuery} ${facetType}:${value}`;
        setQuery(newQuery);
        setSubmittedQuery(newQuery);
        setCurrentDisplayMode("table"); // Reset to table when applying facets
        search(newQuery);
    };

    return (
        <div className="space-y-6">
            <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Intelligence Scanner</CardTitle>
                    <CardDescription>Discover devices and services across the digital landscape.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Enter search query (e.g., apache, nginx, port:80, country:US)..."
                                className="pl-10 bg-background/50"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                            {isLoading ? "Searching..." : "Search"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Quick Searches</CardTitle>
                    <CardDescription>Use these presets to start exploring common queries.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {quickSearches.map(item => (
                        <Button key={item.label} variant="secondary" onClick={() => handleQuickSearch(item)} disabled={isLoading}>
                            {item.icon}
                            {item.label}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            <ShodanLearningGuide />

            {apiError && (
                <Card className="border-destructive/50 bg-destructive/10">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                        <div>
                            <CardTitle className="text-destructive">API Key Error</CardTitle>
                            <CardDescription className="text-destructive/80">
                                Your search failed because a server-side API key is missing.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            The server reported: <code className="bg-muted px-1 py-0.5 rounded-sm text-destructive/80">{apiError}</code>
                        </p>
                        <p className="mt-4 text-sm text-muted-foreground">
                            To fix this, you need to add the required API key as a secret in your Supabase project. The scanner uses multiple services (Shodan, VirusTotal, etc.), each requiring its own key.
                        </p>
                        <Button 
                            variant="destructive" 
                            className="mt-4"
                            onClick={() => window.open('https://supabase.com/dashboard/project/vkzpryeptgasbhbuortc/settings/functions', '_blank')}
                        >
                            Add API Keys in Supabase
                        </Button>
                    </CardContent>
                </Card>
            )}

            {isLoading && <SearchResultsSkeleton />}
            {searchResults && !isLoading && !apiError && (
                <SearchResults 
                    results={searchResults} 
                    query={submittedQuery} 
                    displayMode={currentDisplayMode}
                    onFacetClick={handleFacetClick}
                />
            )}
        </div>
    );
};

const IntelligenceScannerPage = () => {
    if (supabaseError) {
        return (
            <Card className="border-destructive/50 bg-destructive/10">
                <CardHeader className="flex flex-row items-center gap-4">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <div>
                        <CardTitle className="text-destructive">Configuration Error</CardTitle>
                        <CardDescription className="text-destructive/80">
                            {supabaseError}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Please create a <code className="bg-muted p-1 rounded-sm">.env.local</code> file in your project's root directory and add your Supabase keys:
                    </p>
                    <pre className="mt-2 p-4 bg-background/50 rounded-md text-sm overflow-x-auto">
                        <code>
                            VITE_SUPABASE_URL=https://your-project-id.supabase.co
                            <br />
                            VITE_SUPABASE_ANON_KEY=your-anon-key
                        </code>
                    </pre>
                    <p className="mt-4 text-sm text-muted-foreground">
                        After adding the keys, please click the <span className="font-bold">Rebuild</span> button above the chat window.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return <IntelligenceScanner />;
}

export default IntelligenceScannerPage;