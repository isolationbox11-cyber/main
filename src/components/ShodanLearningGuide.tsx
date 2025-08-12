import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, Filter, Combine, Code } from "lucide-react";

export function ShodanLearningGuide() {
  return (
    <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2">
          <Lightbulb className="h-6 w-6" /> Shodan Search Guide for Beginners
        </CardTitle>
        <CardDescription>
          Learn how to use Shodan's powerful search filters to find exactly what you're looking for.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" /> Basic Filters
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-muted-foreground">
              <p>Shodan allows you to filter your searches using specific keywords. Here are some common ones:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">port:</code> - Search for devices with a specific open port.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">port:80</code> (find devices with HTTP port open)</p>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">country:</code> - Filter results by country code (e.g., US, DE, GB).
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">country:US</code> (find devices in the United States)</p>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">org:</code> - Search for devices belonging to a specific organization or ISP.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">org:"Amazon.com"</code></p>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">product:</code> - Find devices running a specific software product.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">product:nginx</code></p>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">os:</code> - Search for devices running a particular operating system.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">os:linux</code></p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold flex items-center gap-2">
              <Combine className="h-5 w-5 text-muted-foreground" /> Combining Filters (Boolean Operators)
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-muted-foreground">
              <p>You can combine filters using logical operators to create more precise queries:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">AND</code> (default) - Both conditions must be true.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">apache country:DE</code> (Apache servers in Germany)</p>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">OR</code> - Either condition can be true.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">port:22 OR port:23</code> (devices with SSH or Telnet open)</p>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">NOT</code> - Exclude results that match a condition.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">nginx NOT country:CN</code> (Nginx servers not in China)</p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold flex items-center gap-2">
              <Code className="h-5 w-5 text-muted-foreground" /> Advanced Dorks & Examples
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-muted-foreground">
              <p>Here are some more advanced filters and practical examples:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">has_screenshot:true</code> - Find devices with a screenshot available.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">webcam has_screenshot:true</code></p>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">vuln:</code> - Search for devices affected by a specific vulnerability (CVE ID).
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">vuln:CVE-2021-44228</code> (Log4Shell vulnerability)</p>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">http.title:</code> - Search for specific text in the HTML title tag.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">http.title:"Dashboard Login"</code></p>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">http.html:</code> - Search for specific text in the HTML body.
                  <p className="text-xs italic">Example: <code className="bg-muted px-1 py-0.5 rounded-sm text-foreground">http.html:"Powered by WordPress"</code></p>
                </li>
              </ul>
              <p className="font-semibold mt-4">Pro Tip:</p>
              <p className="text-xs italic">Always start broad and then narrow down your search using more filters. Experiment and combine different dorks to get precise results!</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}