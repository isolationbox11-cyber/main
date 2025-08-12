import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useQueries } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface IPDetailsSheetProps {
  ip: string | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const fetchIpIntel = async (service: string, ip: string) => {
  if (!ip) return null;
  const { data, error } = await supabase!.functions.invoke(`${service}-api`, {
    body: { ip },
  });
  if (error) throw new Error(`${service}: ${error.message}`);
  if (data.error) throw new Error(`${service}: ${data.error}`);
  return data;
};

const intelServices = ["virustotal", "abuseipdb", "greynoise", "alienvault-otx"];

export function IPDetailsSheet({ ip, isOpen, onOpenChange }: IPDetailsSheetProps) {
  const results = useQueries({
    queries: intelServices.map((service) => ({
      queryKey: [service, ip],
      queryFn: () => fetchIpIntel(service, ip!),
      enabled: !!ip,
      staleTime: Infinity,
    })),
  });

  const [vtResult, abuseResult, greyNoiseResult, otxResult] = results;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>IP Intelligence Report: {ip}</SheetTitle>
          <SheetDescription>
            Aggregated data from multiple threat intelligence sources.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
            {/* VirusTotal */}
            <Card>
                <CardHeader><CardTitle>VirusTotal</CardTitle></CardHeader>
                <CardContent>
                    {vtResult.isLoading && <Skeleton className="h-20 w-full" />}
                    {vtResult.isError && <p className="text-destructive">Error: {vtResult.error.message}</p>}
                    {vtResult.data && (
                        <div>
                            <p>Reputation: <Badge>{vtResult.data.data.attributes.reputation}</Badge></p>
                            <p>Malicious: {vtResult.data.data.attributes.last_analysis_stats.malicious}</p>
                            <p>Suspicious: {vtResult.data.data.attributes.last_analysis_stats.suspicious}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            {/* AbuseIPDB */}
            <Card>
                <CardHeader><CardTitle>AbuseIPDB</CardTitle></CardHeader>
                <CardContent>
                    {abuseResult.isLoading && <Skeleton className="h-20 w-full" />}
                    {abuseResult.isError && <p className="text-destructive">Error: {abuseResult.error.message}</p>}
                    {abuseResult.data && (
                        <div>
                            <p>Abuse Score: <Badge variant={abuseResult.data.data.abuseConfidenceScore > 50 ? "destructive" : "secondary"}>{abuseResult.data.data.abuseConfidenceScore}%</Badge></p>
                            <p>Total Reports: {abuseResult.data.data.totalReports}</p>
                            <p>Country: {abuseResult.data.data.countryCode}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            {/* GreyNoise */}
            <Card>
                <CardHeader><CardTitle>GreyNoise</CardTitle></CardHeader>
                <CardContent>
                    {greyNoiseResult.isLoading && <Skeleton className="h-20 w-full" />}
                    {greyNoiseResult.isError && <p className="text-destructive">Error: {greyNoiseResult.error.message}</p>}
                    {greyNoiseResult.data && (
                        <div>
                            <p>Noise: <Badge variant={greyNoiseResult.data.noise ? "destructive" : "secondary"}>{greyNoiseResult.data.noise ? "Yes" : "No"}</Badge></p>
                            <p>Classification: {greyNoiseResult.data.classification}</p>
                            <p>Last Seen: {greyNoiseResult.data.last_seen}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            {/* AlienVault OTX */}
            <Card>
                <CardHeader><CardTitle>AlienVault OTX</CardTitle></CardHeader>
                <CardContent>
                    {otxResult.isLoading && <Skeleton className="h-20 w-full" />}
                    {otxResult.isError && <p className="text-destructive">Error: {otxResult.error.message}</p>}
                    {otxResult.data && (
                        <div>
                            <p>Pulse Count: <Badge>{otxResult.data.pulse_info.count}</Badge></p>
                            <p>Reputation: {otxResult.data.reputation?.reputation || "N/A"}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}