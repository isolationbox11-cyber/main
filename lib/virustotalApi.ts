// VirusTotal - file or URL scan
export async function fetchVirusTotal({ resource, apiKey }: { resource: string; apiKey: string }) {
  const url = `https://www.virustotal.com/api/v3/files/${encodeURIComponent(resource)}`;
  const headers: Record<string, string> = {
    "x-apikey": apiKey
  };
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("VirusTotal API error: " + res.statusText);
  return await res.json();
}