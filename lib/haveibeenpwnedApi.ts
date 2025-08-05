// HaveIBeenPwned - breached account check
export async function fetchHIBPBreaches({ email, apiKey }: { email: string; apiKey?: string }) {
  const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`;
  const headers: Record<string, string> = {
    "hibp-api-key": apiKey || "",
    "user-agent": "isolationbox"
  };
  const res = await fetch(url, { headers });
  if (res.status === 404) return []; // Not found
  if (!res.ok) throw new Error("HIBP API error: " + res.statusText);
  return await res.json();
}