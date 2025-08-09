import { NextRequest, NextResponse } from 'next/server'

// API Keys configuration
const API_KEYS = {
  SHODAN: process.env.NEXT_PUBLIC_SHODAN_API_KEY || "C23OXE0bVMnV6K1qzGRjZzcUoNzNtUaD",
  VIRUSTOTAL: process.env.NEXT_PUBLIC_VIRUSTOTAL_API_KEY || "64b7960464b7960464b7960464b7960464b7960464b7960464b7960464b79604",
  ABUSEIPDB: process.env.NEXT_PUBLIC_ABUSEIPDB_API_KEY || "d132c5b6c4c5b6c4c5b6c4c5b6c4c5b6c4c5b6c4c5b6c4c5b6c4c5b6c4c5b6c4",
  GREYNOISE: process.env.NEXT_PUBLIC_GREYNOISE_API_KEY || "greynoise_api_key_here",
  GOOGLE: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "AIzaSyBVVJi2VVJi2VVJi2VVJi2VVJi2VVJi2VV",
  GOOGLE_CSE: process.env.NEXT_PUBLIC_GOOGLE_CSE_ID || "017576662512468239146:omuauf_lfve",
}

// Individual API health check functions
async function checkShodanHealth(): Promise<boolean> {
  try {
    const response = await fetch(`https://api.shodan.io/api-info?key=${API_KEYS.SHODAN}`, {
      method: 'GET',
      headers: { 'User-Agent': 'CyberWatchVault/1.0' },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })
    return response.ok
  } catch (error) {
    console.warn('Shodan health check failed:', error)
    return false
  }
}

async function checkVirusTotalHealth(): Promise<boolean> {
  try {
    // Use a lightweight endpoint to check if the API key is valid
    const response = await fetch('https://www.virustotal.com/api/v3/users/current', {
      method: 'GET',
      headers: {
        'x-apikey': API_KEYS.VIRUSTOTAL,
        'User-Agent': 'CyberWatchVault/1.0',
      },
      signal: AbortSignal.timeout(10000),
    })
    return response.ok || response.status === 403 // 403 might mean valid key but wrong permissions
  } catch (error) {
    console.warn('VirusTotal health check failed:', error)
    return false
  }
}

async function checkAbuseIPDBHealth(): Promise<boolean> {
  try {
    // Use the check endpoint with a known IP to validate the API key
    const response = await fetch('https://api.abuseipdb.com/api/v2/check?ipAddress=8.8.8.8&maxAgeInDays=90', {
      method: 'GET',
      headers: {
        'Key': API_KEYS.ABUSEIPDB,
        'Accept': 'application/json',
        'User-Agent': 'CyberWatchVault/1.0',
      },
      signal: AbortSignal.timeout(10000),
    })
    return response.ok
  } catch (error) {
    console.warn('AbuseIPDB health check failed:', error)
    return false
  }
}

async function checkGreyNoiseHealth(): Promise<boolean> {
  try {
    // Use a known clean IP to test the API
    const response = await fetch('https://api.greynoise.io/v3/community/8.8.8.8', {
      method: 'GET',
      headers: {
        'key': API_KEYS.GREYNOISE,
        'Accept': 'application/json',
        'User-Agent': 'CyberWatchVault/1.0',
      },
      signal: AbortSignal.timeout(10000),
    })
    return response.ok || response.status === 404 // 404 is normal for IPs not in their database
  } catch (error) {
    console.warn('GreyNoise health check failed:', error)
    return false
  }
}

async function checkGoogleHealth(): Promise<boolean> {
  try {
    // Test a simple search to validate both API key and CSE ID
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEYS.GOOGLE}&cx=${API_KEYS.GOOGLE_CSE}&q=test&num=1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CyberWatchVault/1.0',
      },
      signal: AbortSignal.timeout(10000),
    })
    return response.ok
  } catch (error) {
    console.warn('Google CSE health check failed:', error)
    return false
  }
}

// Map API names to their health check functions
const API_HEALTH_CHECKERS: Record<string, () => Promise<boolean>> = {
  shodan: checkShodanHealth,
  virustotal: checkVirusTotalHealth,
  abuseipdb: checkAbuseIPDBHealth,
  greynoise: checkGreyNoiseHealth,
  google: checkGoogleHealth,
}

// Check all APIs health
async function checkAllAPIsHealth(): Promise<Record<string, boolean>> {
  const checks = {
    shodan: false,
    virustotal: false,
    abuseipdb: false,
    greynoise: false,
    google: false,
  }

  // Run all checks in parallel with individual error handling
  const results = await Promise.allSettled([
    checkShodanHealth(),
    checkVirusTotalHealth(),
    checkAbuseIPDBHealth(),
    checkGreyNoiseHealth(),
    checkGoogleHealth(),
  ])

  const apiNames = Object.keys(checks)
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      checks[apiNames[index] as keyof typeof checks] = result.value
    }
  })

  return checks
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specificAPI = searchParams.get('api')?.toLowerCase()

    // Check if requesting a specific API
    if (specificAPI) {
      if (!API_HEALTH_CHECKERS[specificAPI]) {
        return NextResponse.json(
          { 
            error: 'Invalid API name', 
            validAPIs: Object.keys(API_HEALTH_CHECKERS),
            requested: specificAPI 
          },
          { status: 400 }
        )
      }

      // Check specific API health
      const isHealthy = await API_HEALTH_CHECKERS[specificAPI]()
      
      return NextResponse.json({
        api: specificAPI,
        status: isHealthy,
        timestamp: new Date().toISOString(),
      })
    }

    // Check all APIs if no specific API requested
    const healthStatus = await checkAllAPIsHealth()
    
    return NextResponse.json({
      apis: healthStatus,
      timestamp: new Date().toISOString(),
      summary: {
        total: Object.keys(healthStatus).length,
        online: Object.values(healthStatus).filter(Boolean).length,
        offline: Object.values(healthStatus).filter(status => !status).length,
      }
    })

  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        error: 'Health check failed', 
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}