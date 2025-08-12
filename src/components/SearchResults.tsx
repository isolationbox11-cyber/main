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
}

interface SearchResultsProps {
  results: {
    matches: ShodanMatch[];
    total: number;
  };
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
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
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Found {results.total.toLocaleString()} results</CardTitle>
          <CardDescription>Showing the first {results.matches.length} devices for "{query}"</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
              <Table>
              <TableHeader>
                  <TableRow>
                  <TableHead>Host / IP</TableHead>
                  <TableHead className="hidden md:table-cell">ISP / Organization</TableHead>
                  <TableHead className="hidden lg:table-cell">Location</TableHead>
                  <TableHead>Open Ports</TableHead>
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
                  </TableRow>
                  ))}
              </TableBody>
              </Table>
          </div>
        </CardContent>
      </Card>
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