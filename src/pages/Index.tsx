import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Server, Webcam, Database, Router, Shield } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/toast";
import { SearchResults } from "@/components/SearchResults";
import { SearchResultsSkeleton } from "@/components/SearchResultsSkeleton";

const quickSearches = [
    { label: "Webcams", query: "webcam", icon: <Webcam className="mr-2 h-4 w-4" /> },
    { label: "SSH Servers", query: "port:22", icon: <Server className="mr-2 h-4 w-4" /> },
    { label: "Databases", query: "product:mongodb", icon: <Database className="mr-2 h-4 w-4" /> },
    { label: "Routers", query: "device:router", icon: <Router className="mr-2 h-4 w-4" /> },
    { label: "Vulnerable", query: "vuln:cve-2024", icon: <Shield className="mr-2 h-4 w-4" /> },
];

const IntelligenceScannerPage = () => {
    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");

    const { mutate: search, data: searchResults, isPending: isLoading, isError } = useMutation({
        mutationFn: async (searchQuery: string) => {
            const { data, error } = await supabase.functions.invoke("shodan-api", {
                body: { query: searchQuery },
            });

            if (error) throw new Error(error.message);
            if (data.error) throw new Error(data.error);

            return data;
        },
        onError: (error) => {
            showError(`Search failed: ${error.message}`);
        },
    });

    const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;
        setSubmittedQuery(query);
        search(query);
    };

    const handleQuickSearch = (searchQuery: string) => {
        setQuery(searchQuery);
        setSubmittedQuery(searchQuery);
        search(searchQuery);
    };

    return (
        <div className="space-y-6">
            <Card className="border-primary/50 bg-transparent backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary drop-shadow-glow-primary">Intelligence Scanner</CardTitle>
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
                        <Button type="submit" disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90 drop-shadow-glow-primary">
                            {isLoading ? "Searching..." : "Search"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Card className="border-primary/50 bg-transparent backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-glow">Quick Searches</CardTitle>
                    <CardDescription>Use these presets to start exploring common queries.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {quickSearches.map(item => (
                        <Button key={item.label} variant="secondary" onClick={() => handleQuickSearch(item.query)} disabled={isLoading}>
                            {item.icon}
                            {item.label}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {isLoading && <SearchResultsSkeleton />}
            {searchResults && !isLoading && !isError && <SearchResults results={searchResults} query={submittedQuery} />}
        </div>
    );
};

export default IntelligenceScannerPage;