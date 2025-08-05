export async function fetchCIRCLCVE(params: { cveId?: string; keyword?: string; }) {
  // CIRCL API only supports search by CVE or by keyword (via fulltext), not by CPE
  let url = "";
  if (params.cveId) {
    url = `https://cve.circl.lu/api/cve/${encodeURIComponent(params.cveId)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("CIRCL API error");
    return [await res.json()];
  }
  if (params.keyword) {
    url = `https://cve.circl.lu/api/search/${encodeURIComponent(params.keyword)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("CIRCL API error");
    return res.json();
  }
  return [];
}