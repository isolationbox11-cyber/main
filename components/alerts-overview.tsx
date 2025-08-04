import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AlertsOverview() {
  const alerts = [
    {
      title: "High Priority Alerts",
      count: 3,
      color: "bg-red-600",
      items: ["Suspicious login detected", "Malware signature found", "Unauthorized access attempt"]
    },
    {
      title: "Medium Priority",
      count: 7,
      color: "bg-yellow-600", 
      items: ["Outdated software detected", "Weak password policy", "Missing security patches"]
    },
    {
      title: "Low Priority",
      count: 12,
      color: "bg-blue-600",
      items: ["System maintenance required", "Performance optimization", "Regular updates available"]
    }
  ]

  return (
    <Card className="border-orange-800/30 bg-black/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-300">
          <span className="text-2xl">🚨</span>
          Security Alerts
        </CardTitle>
        <CardDescription className="text-orange-200/70">
          Current system alerts by priority
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="p-3 bg-orange-950/30 rounded-lg border border-orange-800/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-orange-300">{alert.title}</h4>
                <Badge className={alert.color}>
                  {alert.count}
                </Badge>
              </div>
              <div className="space-y-1">
                {alert.items.slice(0, 2).map((item, i) => (
                  <p key={i} className="text-sm text-orange-100/70">• {item}</p>
                ))}
                {alert.count > 2 && (
                  <p className="text-xs text-orange-200/60">+ {alert.count - 2} more...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
