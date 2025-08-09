"use client";

import React, { useState } from "react";
import { fetchCVE } from "@/lib/nvdApi";
import { fetchCIRCLCVE } from "@/lib/circlApi";
import { fetchMITRECVE } from "@/lib/mitreApi";
import { fetchOSVCVE } from "@/lib/osvApi";

const apiOptions = [
  { label: "NVD", value: "nvd" },
  { label: "CIRCL", value: "circl" },
  { label: "MITRE", value: "mitre" },
  { label: "OSV.dev", value: "osv" },
];

export default function CVEExplorer() {
  const [query, setQuery] = useState("");
  const [cpe, setCpe] = useState("");
  const [cveId, setCveId] = useState("");
  const [apiSource, setApiSource] = useState("nvd");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      let data = [];
      if (apiSource === "nvd") {
        const params: any = {};
        if (cveId) params.cveId = cveId;
        if (cpe) params.cpeName = cpe;
        if (query) params.keywordSearch = query;
        params.resultsPerPage = 10;
        const res = await fetchCVE(params);
        data = res.vulnerabilities || [];
      } else if (apiSource === "circl") {
        data = await fetchCIRCLCVE({ cveId, keyword: query });
      } else if (apiSource === "mitre") {
        data = await fetchMITRECVE({ cveId, keyword: query });
      } else if (apiSource === "osv") {
        data = await fetchOSVCVE({ cveId, keyword: query });
      }
      setResults(data);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  function renderItem(cve: any) {
    // Normalize display
    if (!cve) return null;
    // NVD
    if (cve.cve && cve.cve.id) {
      return (
        <li key={cve.cve.id} className="border rounded p-2">
          <div><strong>{cve.cve.id}</strong></div>
          <div>{cve.cve.descriptions?.[0]?.value}</div>
        </li>
      );
    }
    // CIRCL
    if (cve.id && cve.summary) {
      return (
        <li key={cve.id} className="border rounded p-2">
          <div><strong>{cve.id}</strong></div>
          <div>{cve.summary}</div>
        </li>
      );
    }
    // MITRE
    if (cve.cve_id && cve.containers) {
      return (
        <li key={cve.cve_id} className="border rounded p-2">
          <div><strong>{cve.cve_id}</strong></div>
          <div>{cve.containers?.cna?.description?.[0]?.value}</div>
        </li>
      );
    }
    // OSV
    if (cve.id && cve.summary) {
      return (
        <li key={cve.id} className="border rounded p-2">
          <div><strong>{cve.id}</strong></div>
          <div>{cve.summary}</div>
        </li>
      );
    }
    return null;
  }

  return (
    <div className="space-y-4 max-w-xl mx-auto mt-8">
      <div className="space-y-2">
        <select
          className="border rounded p-2 w-full"
          value={apiSource}
          onChange={e => setApiSource(e.target.value)}
        >
          {apiOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <input
          className="border rounded p-2 w-full"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Keyword search (e.g., Microsoft, Outlook)"
        />
        <input
          className="border rounded p-2 w-full"
          value={cpe}
          onChange={e => setCpe(e.target.value)}
          placeholder="CPE Name (only for NVD, e.g., cpe:2.3:o:microsoft:windows_10:1607)"
          disabled={apiSource !== "nvd"}
        />
        <input
          className="border rounded p-2 w-full"
          value={cveId}
          onChange={e => setCveId(e.target.value)}
          placeholder="CVE ID (e.g., CVE-2023-XXXXX)"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search CVE"}
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {results && results.length > 0 && (
        <ul className="space-y-2">
          {results.map(renderItem)}
        </ul>
      )}
      {results && results.length === 0 && !loading && <div>No CVEs found.</div>}
    </div>
  );
}