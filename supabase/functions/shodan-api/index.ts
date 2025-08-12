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
    const { query } = await req.json();
    const apiKey = Deno.env.get("SHODAN_API_KEY");

    if (!apiKey) {
      throw new Error("Shodan API key not found in environment variables.");
    }
    
    if (!query) {
        return new Response(JSON.stringify({ error: "Search query is required." }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }

    const shodanUrl = `https://api.shodan.io/shodan/host/search?key=${apiKey}&query=${encodeURIComponent(query)}&facets=country,org`;
    const shodanRes = await fetch(shodanUrl);

    if (!shodanRes.ok) {
      const errorText = await shodanRes.text();
      console.error("Shodan API error:", errorText);
      throw new Error(`Shodan API request failed with status: ${shodanRes.status}`);
    }

    const data = await shodanRes.json();

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