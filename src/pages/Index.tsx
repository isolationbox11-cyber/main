import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { RecentActivity } from "@/components/RecentActivity";
import { AlertTriangle, ShieldCheck, Bug, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/toast";

interface ShodanData {
  total: number;
  matches: {
    ip_str: string;
    org: string;
    port: number;
    timestamp: string;
  }[];
  facets: {
    country: Record<string, number>;
    org: Record<string, number>;
  };
}

const fetchShodanData = async (): Promise<ShodanData> => {
  const { data, error } = await supabase.functions.invoke('shodan-api', {
    body: { query: 'product:nginx' },
  });

  if (error) {
    showError(`Error fetching data: ${error.message}`);
    throw new Error(error.message);
  }
  
  if (data.error) {
    showError(`API Error: ${data.error}`);
    throw new Error(data.error);
  }

  return data;
};

const DashboardPage = () => {
  const { data, isLoading, isError } = useQuery<ShodanData>({
    queryKey: ['shodanData'],
    queryFn: fetchShodanData,
    retry: false,
  });

  const recentActivities = data?.matches.map(match => ({
    name: match.ip_str,
    email: match.org,
    action: `Port ${match.port}`,
    time: new Date(match.timestamp).toLocaleTimeString(),
  })).slice(0, 5);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Results"
              icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
              isLoading={isLoading}
              value={data?.total.toLocaleString()}
              change="Based on 'product:nginx' query"
            />
            <StatCard
              title="Affected Organizations"
              icon={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
              isLoading={isLoading}
              value={data?.facets?.org ? Object.keys(data.facets.org).length.toString() : undefined}
              change="Unique organizations found"
            />
            <StatCard
              title="Affected Countries"
              icon={<Globe className="h-4 w-4 text-muted-foreground" />}
              isLoading={isLoading}
              value={data?.facets?.country ? Object.keys(data.facets.country).length.toString() : undefined}
              change="Unique countries found"
            />
            <StatCard
              title="Avg. Vulns per Org"
              icon={<Bug className="h-4 w-4 text-muted-foreground" />}
              isLoading={isLoading}
              value={data && data.facets?.org ? (data.total / Object.keys(data.facets.org).length).toFixed(2) : undefined}
              change="Average hosts per organization"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <RecentActivity isLoading={isLoading} activities={recentActivities} />
            </div>
            <div className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                        <CardDescription>API Connection Status</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {isLoading && (
                            <div className="flex items-center justify-between font-medium">
                                <span>Shodan API</span>
                                <span className="text-yellow-500">Connecting...</span>
                            </div>
                        )}
                        {isError && (
                             <div className="flex items-center justify-between font-medium">
                                <span>Shodan API</span>
                                <span className="text-red-500">Connection Failed</span>
                            </div>
                        )}
                        {data && !isError && (
                             <div className="flex items-center justify-between font-medium">
                                <span>Shodan API</span>
                                <span className="text-green-500">Connected</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;