import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface SearchItem {
  title: string;
  link: string;
  snippet: string;
  pagemap?: {
    cse_thumbnail?: { src: string }[];
  };
}

interface ThreatIntelResultsProps {
  results: {
    items?: SearchItem[];
    searchInformation?: {
      formattedTotalResults: string;
      formattedSearchTime: string;
    };
  };
  query: string;
}

export function ThreatIntelResults({ results, query }: ThreatIntelResultsProps) {
  if (!results || !results.items || results.items.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No results found for "{query}".</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
            {results.searchInformation && (
                `Found ${results.searchInformation.formattedTotalResults} results in ${results.searchInformation.formattedSearchTime} seconds.`
            )}
        </div>
        {results.items.map((item, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <CardHeader>
                    <CardTitle className="text-lg">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {item.title}
                        </a>
                    </CardTitle>
                    <CardDescription className="text-green-500 text-xs pt-1">{item.link}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{item.snippet}</p>
                </CardContent>
            </Card>
        ))}
    </div>
  );
}