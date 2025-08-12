/// <reference types="https://deno.land/x/service_worker@0.1.0/lib.d.ts" />
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
    const apiKey = Deno.env.get("GOOGLE_API_KEY");
    const cseId = Deno.env.get("GOOGLE_CSE_ID");

    if (!apiKey || !cseId) {
      throw new Error("Google API Key or CSE ID not found in environment variables.");
    }
    
    if (!query) {
        return new Response(JSON.stringify({ error: "Search query is required." }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }

    const googleApiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=${encodeURIComponent(query)}`;
    const apiRes = await fetch(googleApiUrl);

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      console.error("Google Search API error:", errorText);
      throw new Error(`Google Search API request failed with status: ${apiRes.status}`);
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