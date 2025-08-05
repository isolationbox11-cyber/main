/**
 * Checks phone number reputation, validity, and risk using IPQualityScore.
 * @param phone - Phone number in international format (e.g., "+14155552671")
 * @param country - Optional, 2-letter country code (e.g., "US")
 */
export async function checkPhoneNumber(phone: string, country?: string) {
  const key = "C7RAUiNrPhWqamFTCjTVqFVVNMc"; // your real API key
  let url = `https://ipqualityscore.com/api/json/phone/${key}/${encodeURIComponent(phone)}`;
  if (country) url += `?country=${country}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "isolationbox11-cyber" }
  });
  if (!res.ok) throw new Error("IPQualityScore phone lookup failed");
  return await res.json();
}