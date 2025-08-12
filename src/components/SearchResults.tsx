import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPDetailsSheet } from "./IPDetailsSheet";
import { getFlagEmoji } from "@/lib/utils";
import { WebcamGrid } from "./WebcamGrid"; // Import the new WebcamGrid component

interface ShodanMatch {
  ip_str: string;
  org: string;
  port: number;
  hostnames: string[];
  location: {
    country_name: string;
    country_code: string;
    city: string | null;
  };
  data: string;
  opts?: {
    screenshot?: {
      data: string; // Base64 encoded image data
    };
  };
}

interface ShodanFacet {
  value: string;
  count: number;
}

interface SearchResultsProps {
  results: {
    matches: ShodanMatch[];
    total: number;
    facets?: {
      country?: ShodanFacet[];
      org?: ShodanFacet[];
    };
  };
  query: string;
  displayMode: "table" | "grid";
  onFacetClick: (facetType: string, value: string) => void;
}

export function SearchResults({ results, query, displayMode, onFacetClick }: SearchResultsProps) {
  const [selectedIp, setSelectedIp] = useState<string | null>(null);

  if (!results || !results.matches || results.matches.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No results found for "{query}". Try a different search.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
            {results.total.toLocaleString()} results found for "{query}".
            {results.matches.length < results.total && ` Showing the first ${results.matches.length} devices.`}
        </div>

        {results.facets && (results.facets.country || results.facets.org) && (
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Filter by Category</CardTitle>
                    <CardDescription>Click on a category to refine your search.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {results.facets.country && results.facets.country.map(facet => (
                        <Button 
                            key={`country-${facet.value}`} 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onFacetClick("country", facet.value)}
                            className="flex items-center gap-1"
                        >
                            <span className="text-lg">{getFlagEmoji(facet.value)}</span> {facet.value} ({facet.count})
                        </Button>
                    ))}
                    {results.facets.org && results.facets.org.map(facet => (
                        <Button 
                            key={`org-${facet.value}`} 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onFacetClick("org", facet.value)}
                        >
                            {facet.value} ({facet.count})
                        </Button>
                    ))}
                </CardContent>
            </Card>
        )}

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>Explore the discovered devices.</CardDescription>
          </CardHeader>
          <CardContent>
            {displayMode === "table" ? (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Host / IP</TableHead>
                      <TableHead className="hidden md:table-cell">ISP / Organization</TableHead>
                      <TableHead className="hidden lg:table-cell">Location</TableHead>
                      <TableHead>Open Ports</TableHead>
                      <TableHead>Screenshot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.matches.map((match) => (
                      <TableRow key={match.ip_str + match.port}>
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto font-medium" onClick={() => setSelectedIp(match.ip_str)}>
                              {match.ip_str}
                          </Button>
                          {match.hostnames.length > 0 && (
                              <div className="text-xs text-muted-foreground">{match.hostnames.join(", ")}</div>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{match.org}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="mr-2">{getFlagEmoji(match.location.country_code)}</span>
                          {match.location.country_name}{match.location.city ? `, ${match.location.city}` : ''}
                        </TableCell>
                        <TableCell>
                        <Badge variant="outline">{match.port}</Badge>
                        </TableCell>
                        <TableCell>
                          {match.opts?.screenshot?.data && (
                              <img
                                  src={`data:image/png;base64,${match.opts.screenshot.data}`}
                                  alt={`Screenshot of ${match.ip_str}`}
                                  className="w-24 h-auto rounded-md border object-cover"
                              />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <WebcamGrid matches={results.matches} onSelectIp={setSelectedIp} />
            )}
          </CardContent>
        </Card>
      </div>
      <IPDetailsSheet 
        ip={selectedIp} 
        isOpen={!!selectedIp} 
        onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedIp(null);
        }} 
      />
    </>
  );
}