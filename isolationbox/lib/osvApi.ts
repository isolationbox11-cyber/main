export async function fetchOSVCVE(params: { cveId?: string; keyword?: string; }) {
  // OSV API supports search by CVE ID, or by keyword (via ecosystem, package, etc.)
  if (params.cveId) {
    const url = `https://api.osv.dev/v1/vulns/${encodeURIComponent(params.cveId)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("OSV API error");
    return [await res.json()];
  }
  if (params.keyword) {
    const url = `https://api.osv.dev/v1/query`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: params.keyword }),
    });
    if (!res.ok) throw new Error("OSV API error");
    const data = await res.json();
    return data.vulns || [];
  }
  return [];
}