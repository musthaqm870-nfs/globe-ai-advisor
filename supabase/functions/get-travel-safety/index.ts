import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SafetyData {
  score: number;
  message: string;
  sources_active: number;
  updated: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { countryCode } = await req.json();
    
    if (!countryCode) {
      return new Response(
        JSON.stringify({ error: "Country code is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Fetching safety data for country: ${countryCode}`);

    // Fetch travel advisory data from Travel-Advisory.info API
    const response = await fetch(
      `https://www.travel-advisory.info/api?countrycode=${countryCode.toUpperCase()}`
    );

    if (!response.ok) {
      console.error(`API error: Status ${response.status}`);
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    
    // Check if we got valid data
    if (!data.data || Object.keys(data.data).length === 0) {
      return new Response(
        JSON.stringify({ 
          error: "Country not found",
          message: "Unable to fetch safety data for this destination"
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Extract country data
    const countryKey = Object.keys(data.data)[0];
    const countryData = data.data[countryKey];
    
    const safetyInfo = {
      name: countryData.name,
      score: countryData.advisory.score,
      message: countryData.advisory.message,
      sources_active: countryData.advisory.sources_active,
      updated: countryData.advisory.updated,
      riskLevel: getRiskLevel(countryData.advisory.score),
      color: getRiskColor(countryData.advisory.score),
    };

    console.log(`Successfully fetched safety data for ${countryData.name}`);

    return new Response(
      JSON.stringify(safetyInfo),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Get travel safety error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to fetch travel safety data"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function getRiskLevel(score: number): string {
  if (score <= 2) return "Very Safe";
  if (score <= 3) return "Safe";
  if (score <= 3.5) return "Moderate Risk";
  if (score <= 4) return "High Risk";
  return "Extreme Risk";
}

function getRiskColor(score: number): string {
  if (score <= 2) return "green";
  if (score <= 3) return "blue";
  if (score <= 3.5) return "yellow";
  if (score <= 4) return "orange";
  return "red";
}
