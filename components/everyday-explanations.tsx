import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function EverydayExplanations() {
  const explanations = [
    {
      title: "Firewall",
      description: "Like a magical barrier around Salem that decides who can enter and who must stay out",
      emoji: "🔥",
      analogy: "Town Guard",
      details: "Just as Salem had guards at the gates checking who could enter, a firewall monitors and controls incoming and outgoing network traffic."
    },
    {
      title: "Antivirus",
      description: "A protection spell that recognizes evil spirits (malware) and banishes them",
      emoji: "🛡️",
      analogy: "Protection Charm",
      details: "Like a protective charm that recognizes dark magic, antivirus software identifies and removes malicious software from your device."
    },
    {
      title: "Phishing",
      description: "Like a witch disguised as a friendly neighbor, trying to trick you into revealing secrets",
      emoji: "🎣",
      analogy: "False Identity",
      details: "Just as townspeople might be deceived by someone in disguise, phishing attempts trick you into revealing personal information through fake communications."
    },
    {
      title: "Encryption",
      description: "A secret code that only trusted allies can understand, like ancient runes",
      emoji: "🔐",
      analogy: "Secret Runes",
      details: "Like the mysterious symbols witches used to protect their spells, encryption converts your data into coded format that only authorized parties can read."
    },
    {
      title: "Two-Factor Authentication",
      description: "Like requiring both a password AND a special amulet to enter the inner sanctum",
      emoji: "🗝️",
      analogy: "Double Protection",
      details: "Just as Salem's most protected areas required multiple forms of identification, 2FA requires two different authentication methods."
    },
    {
      title: "VPN",
      description: "A secret tunnel that hides your path from prying eyes, like moving through hidden passages",
      emoji: "🌐",
      analogy: "Hidden Passage",
      details: "Like secret tunnels that concealed movement through Salem, a VPN creates an encrypted connection that hides your internet activity."
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-orange-400">🏠 Everyday Security Explained</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {explanations.map((item, index) => (
          <Card key={index} className="border-orange-800/30 bg-black/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-300">
                <span className="text-2xl">{item.emoji}</span>
                {item.title}
              </CardTitle>
              <CardDescription className="text-orange-200/70">
                <Badge variant="outline" className="border-orange-600 text-orange-300 mb-2">
                  {item.analogy}
                </Badge>
                <br />
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-orange-100/60">
                {item.details}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
