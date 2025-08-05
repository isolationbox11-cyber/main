// AbuseIPDB - IP reputation check
export async function fetchAbuseIPDB({ ip, apiKey }: { ip: string; apiKey: string }) {
  const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}`;
  const headers: Record<string, string> = {
    "Key": apiKey,
    "Accept": "application/json"
  };
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("AbuseIPDB API error: " + res.statusText);
  return await res.json();
}