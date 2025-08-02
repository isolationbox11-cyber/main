import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function IoTScanner() {
  const devices = [
    { name: "Smart Thermostat", status: "secure", lastScan: "2h ago", vulnerabilities: 0, emoji: "🌡️" },
    { name: "Security Camera", status: "warning", lastScan: "1h ago", vulnerabilities: 1, emoji: "📹" },
    { name: "Smart Doorbell", status: "secure", lastScan: "30m ago", vulnerabilities: 0, emoji: "🔔" },
    { name: "WiFi Router", status: "critical", lastScan: "45m ago", vulnerabilities: 3, emoji: "📡" },
    { name: "Smart Light Bulbs", status: "secure", lastScan: "15m ago", vulnerabilities: 0, emoji: "💡" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "secure": return "bg-green-600"
      case "warning": return "bg-yellow-600"
      case "critical": return "bg-red-600"
      default: return "bg-gray-600"
    }
  }

  return (
    <Card className="border-orange-800/30 bg-black/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-300">
          <span className="text-2xl">🏠</span>
          IoT Device Scanner
        </CardTitle>
        <CardDescription className="text-orange-200/70">
          Security status of connected devices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          {devices.map((device, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-orange-950/20">
              <div className="flex items-center gap-3">
                <span className="text-lg">{device.emoji}</span>
                <div>
                  <h4 className="text-sm font-medium text-orange-300">{device.name}</h4>
                  <p className="text-xs text-orange-200/60">
                    Last scan: {device.lastScan} | {device.vulnerabilities} vulnerabilities
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(device.status)}>
                {device.status.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
        <Button className="w-full bg-orange-600 hover:bg-orange-700">
          Scan All Devices
        </Button>
      </CardContent>
    </Card>
  )
}