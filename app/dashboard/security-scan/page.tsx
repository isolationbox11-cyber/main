"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { AlertTriangle, Eye, Shield } from "lucide-react"

// Custom Security Eye icon
const SecurityEyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6C16.4183 6 20.1664 8.89543 21.3205 12.8944C20.1664 16.8934 16.4183 20 12 20C7.58172 20 3.83357 16.8934 2.67949 12.8944C3.83357 8.89543 7.58172 6 12 6Z" fill="currentColor" />
    <circle cx="12" cy="13" r="3" fill="white" />
    <circle cx="12" cy="13" r="1.5" fill="currentColor" />
    <path d="M12 3L12 1M12 25L12 23M21 12L23 12M1 12L3 12M19.07 5.93L20.49 4.51M3.51 19.49L4.93 18.07M19.07 19.07L20.49 20.49M3.51 4.51L4.93 5.93" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

export default function SecurityScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [foundThreats, setFoundThreats] = useState<string[]>([])
  
  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanComplete(false)
    setFoundThreats([])
    
    const securityThreats = [
      "Dormant Backdoor Process",
      "Persistent Malware",
      "Shadow Registry Entry",
      "Unauthorized Service",
      "Suspicious Network Connection",
      "Elevated Privilege Process",
      "Hidden Configuration File",
      "Rogue Authentication Token",
      "Compromised System Library"
    ]
    
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 10;
        
        // Add a security threat at certain progress points
        if (newProgress === 30 || newProgress === 60 || newProgress === 90) {
          const randomThreat = securityThreats[Math.floor(Math.random() * securityThreats.length)]
          setFoundThreats(prev => [...prev, randomThreat])
        }
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setScanComplete(true)
          return 100
        }
        return newProgress
      })
    }, 600)
  }
  
  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">👁️ Security Scan</h1>
      </div>
      
      <Card className="border-blue-500/30 bg-gradient-to-r from-black to-blue-950">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <div className="animate-pulse text-2xl">👁️</div> Advanced Threat Scanner
          </CardTitle>
          <CardDescription className="text-blue-300/70">
            Detect hidden threats, vulnerabilities, and suspicious entities in your security perimeter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/70">
            Our advanced security scanner employs behavioral analysis and deep system inspection
            to identify potential security threats that traditional scanners might miss.
            Continuous surveillance ensures comprehensive protection against evolving threats.
          </p>
          
          <div className="flex items-center gap-4 mt-4">
            <Button 
              onClick={startScan} 
              disabled={isScanning} 
              className="bg-blue-600 hover:bg-blue-700 animate-glow"
            >
              {isScanning ? "👁️ Deep scanning..." : "👁️ Start Security Scan"}
            </Button>
            {isScanning && (
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-blue-300">Scanning for security threats...</span>
                  <span className="text-sm text-blue-300">{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="h-2" 
                  style={{
                    background: "rgba(37, 99, 235, 0.2)",
                    "--tw-progress-bar-color": "rgba(37, 99, 235, 0.8)"
                  } as React.CSSProperties} />
              </div>
            )}
          </div>
          
          {foundThreats.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium text-blue-300">👁️ Security Threats Detected</h3>
              <div className="space-y-2">
                {foundThreats.map((threat, index) => (
                  <div key={index} className="p-3 bg-black/50 rounded-lg border border-blue-900 flex items-start gap-3 animate-pulse">
                    <div className="text-xl">
                      {index % 3 === 0 ? "⚠️" : index % 3 === 1 ? "🔒" : "👁️"}
                    </div>
                    <div>
                      <div className="font-medium text-blue-300">{threat}</div>
                      <div className="text-xs text-blue-300/70">Detected {Math.floor(Math.random() * 30) + 1} minutes ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {scanComplete && (
            <div className="mt-6 p-4 bg-black/50 rounded-lg border border-blue-900">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium text-blue-300">Scan Complete - Security Analysis</h3>
              </div>
              <p className="text-blue-300/70 mb-4">
                Security scan has identified {foundThreats.length} potential threats requiring attention. 
                These findings indicate security vulnerabilities that could be exploited by malicious actors 
                if left unaddressed.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Initiate Threat Remediation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" /> Hidden Processes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Concealed processes and services running in the background that may indicate 
              unauthorized access or malware presence requiring immediate investigation.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" /> Privilege Escalation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Unauthorized elevation of system privileges that could allow attackers to gain 
              administrative access and compromise critical system components.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="text-blue-500 text-xl">🔍</div> Surveillance Bypass
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sophisticated techniques used to evade detection systems and monitoring tools, 
              allowing malicious activities to proceed undetected within the network.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}