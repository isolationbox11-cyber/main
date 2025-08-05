export async function fetchMITRECVE(params: { cveId?: string; keyword?: string; }) {
  // MITRE CVE API supports search by CVE ID only (for now)
  if (params.cveId) {
    const url = `https://cveawg.mitre.org/api/cve/${encodeURIComponent(params.cveId)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("MITRE API error");
    return [await res.json()];
  }
  // MITRE's API does not support keyword search in public endpoints yet
  return [];
}