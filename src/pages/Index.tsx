import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { RecentActivity } from "@/components/RecentActivity";
import { AlertTriangle, ShieldCheck, Bug, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = () => {
  // We'll set isLoading to true to show the skeletons.
  // Later, this will be controlled by the state of our API calls.
  const isLoading = true;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Open Alerts"
              icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
              isLoading={isLoading}
              value="12"
              change="+2 from last hour"
            />
            <StatCard
              title="Resolved"
              icon={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
              isLoading={isLoading}
              value="345"
              change="+10 since yesterday"
            />
            <StatCard
              title="New Vulnerabilities"
              icon={<Bug className="h-4 w-4 text-muted-foreground" />}
              isLoading={isLoading}
              value="3"
              change="High severity"
            />
            <StatCard
              title="Avg. Time to Resolve"
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
              isLoading={isLoading}
              value="2.5 hours"
              change="-0.5h from last week"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <RecentActivity isLoading={isLoading} />
            </div>
            <div className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                        <CardDescription>Real-time service health.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                            ))
                        ) : (
                            <>
                                {/* This part will be populated by API data later */}
                            </>
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