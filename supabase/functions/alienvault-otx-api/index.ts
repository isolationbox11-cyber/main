import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { ip } = await req.json();
    const apiKey = Deno.env.get("ALIENVAULT_OTX_API_KEY");

    if (!apiKey) throw new Error("AlienVault OTX API key not found.");
    if (!ip) throw new Error("IP address is required.");

    const apiUrl = `https://otx.alienvault.com/api/v1/indicators/IPv4/${ip}/general`;
    const apiRes = await fetch(apiUrl, {
      headers: { "X-OTX-API-KEY": apiKey },
    });

    if (!apiRes.ok) {
      throw new Error(`AlienVault OTX API request failed: ${apiRes.status}`);
    }

    const data = await apiRes.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});