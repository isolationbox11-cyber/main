import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileText, Bug, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/toast";
import { ThreatIntelResults } from "@/components/ThreatIntelResults";
import { ThreatIntelResultsSkeleton } from "@/components/ThreatIntelResultsSkeleton";

const quickSearches = [
    { label: "Exposed Panels", query: 'intitle:"login" inurl:"/admin"', icon: <Lock className="mr-2 h-4 w-4" /> },
    { label: "Config Files", query: 'filetype:env "DB_PASSWORD"', icon: <FileText className="mr-2 h-4 w-4" /> },
    { label: "WordPress Vulnerabilities", query: 'site:wpvulndb.com "wordpress plugin"', icon: <Bug className="mr-2 h-4 w-4" /> },
];

const ThreatIntelSearchPage = () => {
    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");

    const { mutate: search, data: searchResults, isPending: isLoading } = useMutation({
        mutationFn: async (searchQuery: string) => {
            if (!supabase) throw new Error("Supabase client not initialized.");
            
            const { data, error } = await supabase.functions.invoke("google-search-api", {
                body: { query: searchQuery },
            });

            if (error) throw new Error(error.message);
            if (data.error) throw new Error(data.error);

            return data;
        },
        onError: (error) => {
            showError(`Search failed: ${(error as Error).message}`);
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
            <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Threat Intelligence Search</CardTitle>
                    <CardDescription>Use Google-fu to find vulnerabilities, exposed assets, and more.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Enter a Google dork or search query..."
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
                    <CardDescription>Use these presets to start exploring common dorks.</CardDescription>
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

            {isLoading && <ThreatIntelResultsSkeleton />}
            {searchResults && !isLoading && <ThreatIntelResults results={searchResults} query={submittedQuery} />}
        </div>
    );
};

export default ThreatIntelSearchPage;