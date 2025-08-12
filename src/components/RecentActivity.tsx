import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentActivityProps {
    isLoading: boolean;
    activities?: { name: string; email: string; action: string; time: string }[];
}

export function RecentActivity({ isLoading, activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>An overview of recent security events.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>
            ))
          ) : (
            activities?.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${activity.email}`} alt="Avatar" />
                  <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.email}</p>
                </div>
                <div className="ml-auto font-medium">{activity.action}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}