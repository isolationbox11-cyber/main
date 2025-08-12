import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFlagEmoji } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

interface WebcamGridProps {
  matches: ShodanMatch[];
  onSelectIp: (ip: string) => void;
}

export function WebcamGrid({ matches, onSelectIp }: WebcamGridProps) {
  // Filter out matches that do not have a screenshot for the webcam grid
  const matchesWithScreenshots = matches.filter(match => match.opts?.screenshot?.data);

  if (matchesWithScreenshots.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No webcams with screenshots found for this query.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {matchesWithScreenshots.map((match) => (
        <Card key={match.ip_str + match.port} className="bg-card/50 backdrop-blur-sm overflow-hidden group">
          <div className="relative w-full h-48 overflow-hidden bg-muted flex items-center justify-center text-muted-foreground">
            <img
              src={`data:image/png;base64,${match.opts!.screenshot!.data}`} // Asserting existence due to filter
              alt={`Screenshot of ${match.ip_str}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardContent className="p-3 text-sm">
            <div className="font-semibold text-primary">{match.ip_str}</div>
            {match.hostnames.length > 0 && (
              <div className="text-xs text-muted-foreground truncate">{match.hostnames[0]}</div>
            )}
            <div className="text-xs text-muted-foreground mt-1">
              <span className="mr-1">{getFlagEmoji(match.location.country_code)}</span>
              {match.location.country_name}{match.location.city ? `, ${match.location.city}` : ''}
            </div>
            <div className="text-xs text-muted-foreground">{match.org}</div>

            <div className="mt-3 space-y-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSelectIp(match.ip_str)}
                className="w-full"
              >
                View Details
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => window.open(`https://www.shodan.io/host/${match.ip_str}`, '_blank', 'noopener noreferrer')}
                    >
                        View on Shodan <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p><span className="font-bold">Shodan</span> is a search engine for internet-connected devices. Click to view detailed information about this device.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}