import React, { useState } from "react";

// Directly use the real API key for demonstration.
// In production, store secrets securely and call the lookup through your backend.
const IPQS_KEY = "C7RAUiNrPhWqamFTCjTVqFVVNMc";

async function checkPhoneNumber(phone: string, country?: string) {
  let url = `https://ipqualityscore.com/api/json/phone/${IPQS_KEY}/${encodeURIComponent(phone)}`;
  if (country) url += `?country=${country}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "isolationbox11-cyber" }
  });
  if (!res.ok) throw new Error("IPQualityScore phone lookup failed");
  return await res.json();
}

export default function PhoneLookup() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await checkPhoneNumber(phone, country || undefined);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Lookup failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Phone Lookup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone (+14155552671)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country (US, optional)"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Lookup"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 20 }}>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}