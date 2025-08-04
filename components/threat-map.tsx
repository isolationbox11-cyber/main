import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ThreatMap() {
  const localThreats = [
    { 
      location: "Salem, MA", 
      type: "Phishing Campaign", 
      severity: "high", 
      time: "2 min ago",
      description: "Halloween-themed email phishing targeting local businesses",
      emoji: "🎃"
    },
    { 
      location: "Boston, MA", 
      type: "Malware Detection", 
      severity: "medium", 
      time: "15 min ago",
      description: "Suspicious file attachments in corporate email",
      emoji: "🦠"
    },
    { 
      location: "Cambridge, MA", 
      type: "Port Scanning", 
      severity: "low", 
      time: "1 hour ago",
      description: "Automated scanning of university networks",
      emoji: "🔍"
    },
    { 
      location: "Worcester, MA", 
      type: "DDoS Attempt", 
      severity: "medium", 
      time: "2 hours ago",
      description: "Small-scale distributed denial of service attack",
      emoji: "⚡"
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-600"
      case "medium": return "bg-yellow-600"
      case "low": return "bg-green-600"
      default: return "bg-gray-600"
    }
  }

  return (
    <Card className="border-orange-800/30 bg-black/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-300">
          <span className="text-2xl">📍</span>
          Local Threat Intelligence
        </CardTitle>
        <CardDescription className="text-orange-200/70">
          Cyber threats detected in the Massachusetts region
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-950/30 to-black p-4 rounded-lg border border-orange-800/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎃</span>
              <h4 className="font-medium text-orange-300">Halloween Threat Alert</h4>
            </div>
            <p className="text-sm text-orange-100/70">
              Increased phishing activity using Halloween themes detected in the Salem area. 
              Stay vigilant for suspicious emails with pumpkin or ghost imagery.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-orange-300">Recent Local Incidents</h4>
            {localThreats.map((threat, index) => (
              <div key={index} className="p-3 bg-orange-950/30 rounded-lg border border-orange-800/20">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{threat.emoji}</span>
                    <div>
                      <h5 className="text-sm font-medium text-orange-300">{threat.type}</h5>
                      <p className="text-xs text-orange-200/60">{threat.location} • {threat.time}</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(threat.severity)}>
                    {threat.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-orange-100/70">{threat.description}</p>
              </div>
            ))}
          </div>

          <Button className="w-full bg-orange-600 hover:bg-orange-700">
            View Detailed Threat Map
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
