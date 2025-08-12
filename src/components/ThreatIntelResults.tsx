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
        {results.items.map((item, index) => {
            const thumbnailUrl = item.pagemap?.cse_thumbnail?.[0]?.src;
            return (
                <Card key={index} className="bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors overflow-hidden">
                    <div className="flex items-start">
                        <div className="flex-grow">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {item.title}
                                    </a>
                                </CardTitle>
                                <CardDescription className="text-green-500 text-xs pt-1 break-all">{item.link}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{item.snippet}</p>
                            </CardContent>
                        </div>
                        {thumbnailUrl && (
                            <div className="p-4 flex-shrink-0">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        src={thumbnailUrl} 
                                        alt={`Thumbnail for ${item.title}`}
                                        className="w-28 h-28 object-cover rounded-md border"
                                    />
                                </a>
                            </div>
                        )}
                    </div>
                </Card>
            )
        })}
    </div>
  );
}