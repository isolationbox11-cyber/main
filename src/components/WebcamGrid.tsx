import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFlagEmoji } from "@/lib/utils";
import { ImageOff } from "lucide-react"; // Import a placeholder icon

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {matches.map((match) => (
        <Card key={match.ip_str + match.port} className="bg-card/50 backdrop-blur-sm overflow-hidden group">
          <div className="relative w-full h-48 overflow-hidden bg-muted flex items-center justify-center text-muted-foreground">
            {match.opts?.screenshot?.data ? (
              <>
                <img
                  src={`data:image/png;base64,${match.opts.screenshot.data}`}
                  alt={`Screenshot of ${match.ip_str}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onSelectIp(match.ip_str)}
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <ImageOff className="h-12 w-12 mb-2" />
                <span className="text-sm">No Screenshot Available</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onSelectIp(match.ip_str)}
                  className="w-full mt-3"
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => window.open(`https://www.shodan.io/host/${match.ip_str}`, '_blank', 'noopener noreferrer')}
                >
                  View on Shodan
                </Button>
              </div>
            )}
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
            {match.opts?.screenshot?.data && ( // Only show this button if a screenshot is present, as the other button is in the no-screenshot block
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => window.open(`https://www.shodan.io/host/${match.ip_str}`, '_blank', 'noopener noreferrer')}
              >
                View on Shodan
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}