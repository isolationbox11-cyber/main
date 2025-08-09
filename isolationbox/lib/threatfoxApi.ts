// ThreatFox - IOC query
export async function fetchThreatFoxIOC({ ioc }: { ioc: string }) {
  const url = `https://threatfox-api.abuse.ch/api/v1/`;
  const body = JSON.stringify({ query: "search_ioc", search_term: ioc });
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });
  if (!res.ok) throw new Error("ThreatFox API error: " + res.statusText);
  return await res.json();
}