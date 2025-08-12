import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Activity } from "lucide-react";

const GlobalThreatIntelMap = () => (
    <Card className="bg-card/50 backdrop-blur-sm h-96 flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground pt-6">
            <Globe className="h-16 w-16 mx-auto mb-4 text-primary/50" />
            <p className="text-lg font-semibold">Global Threat Intelligence Map</p>
            <p>Interactive map showing real-time cyber attack origins and targets. (Coming Soon)</p>
        </CardContent>
    </Card>
);

const LiveThreatIntelligence = () => (
    <Card className="bg-card/50 backdrop-blur-sm h-96 flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground pt-6">
            <Activity className="h-16 w-16 mx-auto mb-4 text-primary/50" />
            <p className="text-lg font-semibold">Live Threat Intelligence Feed</p>
            <p>Real-time updates on emerging threats, vulnerabilities, and campaigns. (Coming Soon)</p>
        </CardContent>
    </Card>
);

const OverviewPage = () => {
  return (
    <div className="space-y-6">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome to Salem Cyber Vault</h1>
            <p className="text-muted-foreground">Your all-in-one platform for security intelligence.</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 space-y-6">
                <GlobalThreatIntelMap />
                <LiveThreatIntelligence />
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
                <Card className="bg-card/50 backdrop-blur-sm h-64 flex items-center justify-center">
                    <CardContent className="text-center text-muted-foreground pt-6">
                        <p className="text-lg font-semibold">Recent Activity Log</p>
                        <p>Your recent searches and actions will appear here. (Coming Soon)</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
};

export default OverviewPage;