import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useQueries } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, ShieldAlert, Bot, FileScan, ExternalLink, XCircle } from "lucide-react";

interface IPDetailsPanelProps {
  ip: string;
  onClose: () => void;
}

const fetchIpIntel = async (service: string, ip: string) => {
  if (!ip) return null;
  const { data, error } = await supabase!.functions.invoke(`${service}-api`, {
    body: { ip },
  });
  if (error) throw new Error(`${service}: ${error.message}`);
  if (data.error) throw new Error(`${service}: data.error`);
  return data;
};

const intelServices = ["virustotal", "abuseipdb", "greynoise", "alienvault-otx"];

const getScoreColor = (score: number) => {
    if (score > 75) return "bg-destructive";
    if (score > 25) return "bg-yellow-500";
    return "bg-green-500";
}

export function IPDetailsPanel({ ip, onClose }: IPDetailsPanelProps) {
  const results = useQueries({
    queries: intelServices.map((service) => ({
      queryKey: [service, ip],
      queryFn: () => fetchIpIntel(service, ip),
      enabled: !!ip,
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  });

  const [vtResult, abuseResult, greyNoiseResult, otxResult] = results;

  const renderCard = (title: string, icon: React.ReactNode, result: typeof vtResult, content: React.ReactNode, externalLink?: string) => (
    <Card className="bg-card/80">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            {result.isLoading && <Skeleton className="h-20 w-full" />}
            {result.isError && <p className="text-destructive text-sm">Error: {result.error.message}</p>}
            {result.isSuccess && result.data && content}
            {result.isSuccess && !result.data && <p className="text-muted-foreground text-sm">No data available.</p>}
            {externalLink && (
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                    onClick={() => window.open(externalLink, '_blank', 'noopener noreferrer')}
                >
                    View on {title} <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            )}
        </CardContent>
    </Card>
  );

  return (
    <Card className="bg-background/90 backdrop-blur-lg border-primary/50">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-2xl">IP Intelligence Report: {ip}</CardTitle>
                <CardDescription>
                    Aggregated data from multiple threat intelligence sources.
                </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
                <XCircle className="h-6 w-6" />
                <span className="sr-only">Close details</span>
            </Button>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
                This report compiles information from various leading threat intelligence APIs to provide a comprehensive view of the IP address's reputation and activity.
            </p>
            <div className="grid gap-4 py-4">
                {renderCard("VirusTotal", <ShieldCheck className="text-blue-500" />, vtResult,
                    vtResult.data && (
                        <div className="space-y-2 text-sm">
                            <p>Reputation: <Badge>{vtResult.data.data.attributes.reputation}</Badge></p>
                            <p>Detections: 
                                <span className="font-bold text-red-500 ml-1">{vtResult.data.data.attributes.last_analysis_stats.malicious} Malicious</span>, 
                                <span className="font-bold text-yellow-500 ml-1">{vtResult.data.data.attributes.last_analysis_stats.suspicious} Suspicious</span>
                            </p>
                            <p className="text-xs text-muted-foreground pt-1">Based on analysis from over 70 security vendors.</p>
                        </div>
                    ),
                    ip ? `https://www.virustotal.com/gui/ip-address/${ip}` : undefined
                )}
                
                {renderCard("AbuseIPDB", <ShieldAlert className="text-red-500" />, abuseResult,
                    abuseResult.data && (
                        <div className="space-y-2 text-sm">
                            <div className="font-medium">Abuse Confidence Score: {abuseResult.data.data.abuseConfidenceScore}%</div>
                            <Progress value={abuseResult.data.data.abuseConfidenceScore} indicatorClassName={getScoreColor(abuseResult.data.data.abuseConfidenceScore)} />
                            <p className="text-xs text-muted-foreground pt-1">Score indicates the confidence that this IP is malicious, based on {abuseResult.data.data.totalReports.toLocaleString()} reports.</p>
                            <p>Country: {abuseResult.data.data.countryCode}</p>
                        </div>
                    ),
                    ip ? `https://www.abuseipdb.com/check/${ip}` : undefined
                )}

                {renderCard("GreyNoise", <Bot className="text-gray-500" />, greyNoiseResult,
                    greyNoiseResult.data && (
                        <div className="space-y-2 text-sm">
                            <p>Internet Noise: <Badge variant={greyNoiseResult.data.noise ? "destructive" : "secondary"}>{greyNoiseResult.data.noise ? "Yes (Likely a scanner)" : "No"}</Badge></p>
                            <p>Classification: <Badge variant="outline">{greyNoiseResult.data.classification || "N/A"}</Badge></p>
                            <p>Last Seen: {greyNoiseResult.data.last_seen ? new Date(greyNoiseResult.data.last_seen).toLocaleDateString() : "N/A"}</p>
                            <p className="text-xs text-muted-foreground pt-1">Identifies IPs that are part of mass-scanning activities.</p>
                        </div>
                    ),
                    ip ? `https://viz.greynoise.io/ip/${ip}` : undefined
                )}

                {renderCard("AlienVault OTX", <FileScan className="text-green-500" />, otxResult,
                    otxResult.data && (
                        <div className="space-y-2 text-sm">
                            <p>Associated Pulses: <Badge>{otxResult.data.pulse_info.count}</Badge></p>
                            <p className="text-xs text-muted-foreground pt-1">"Pulses" are collections of threat indicators from the OTX community.</p>
                            <p>Reputation: {otxResult.data.reputation?.reputation || "N/A"}</p>
                        </div>
                    ),
                    ip ? `https://otx.alienvault.com/indicator/ip/${ip}` : undefined
                )}
            </div>
        </CardContent>
    </Card>
  );
}