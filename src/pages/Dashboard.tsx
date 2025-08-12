import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Welcome to Salem Cyber Vault</CardTitle>
                <CardDescription>This is your main dashboard. More widgets and analytics will be added here soon.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Navigate using the sidebar to explore different security intelligence tools.</p>
            </CardContent>
        </Card>
    </div>
  );
};

export default DashboardPage;