// GreyNoise - IP reputation check
export async function fetchGreyNoiseIP({ ip, apiKey }: { ip: string; apiKey: string }) {
  const url = `https://api.greynoise.io/v3/community/${encodeURIComponent(ip)}`;
  const headers: Record<string, string> = {
    "key": apiKey
  };
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("GreyNoise API error: " + res.statusText);
  return await res.json();
}