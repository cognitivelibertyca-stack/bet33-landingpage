const fetch = require('node-fetch');

exports.handler = async function(event, context) {xt) {
  // 1. CORS Headers for your single-file frontendtend
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',ype',
    'Content-Type': 'application/json'
  };

  // 2. Check for API Key (Set this in Netlify Dashboard) Dashboard)
  const MANUS_API_KEY = process.env.MANUS_API_KEY;KEY;
  if (!MANUS_API_KEY) {
    // Fallback for development/demo mode if key is missingey is missing
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        winRate: "74%",
        unitsYTD: "+52.5u",
        subscribers: "5,230" // Static fallbackk
      })
    };
  }

  try {
    // 3. Fetch "Completed" tasks from Manus to simulate "AI Activity"o simulate "AI Activity"
    // Referencing 'Get Tasks' endpoint from manus-api.txtanus-api.txt
    const response = await fetch('https://api.manus.ai/v1/tasks?status=completed&limit=100', {manus.ai/v1/tasks?status=completed&limit=100', {
      method: 'GET',
      headers: {
        'API_KEY': MANUS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Manus API Error: ${response.statusText}`);onse.statusText}`);
    }

    const data = await response.json();
    
    // 4. Calculate Dynamic Stats
    // Example: Count completed tasks as "AI Models Run"odels Run"
    const tasksRun = data.data ? data.data.length : 0;gth : 0;
    
    // In a real app, you might parse task results for "WIN" vs "LOSS" textults for "WIN" vs "LOSS" text
    // For now, we mix real activity counts with hardcoded business metricsth hardcoded business metrics
    const stats = {
      winRate: "72%", // Hardcoded until DB is connected connected
      unitsYTD: "+48.5u", // Hardcoded
      subscribers: "5,230",
      activeModels: tasksRun > 0 ? tasksRun : "24/7" // Real data from Manus"24/7" // Real data from Manus
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(stats)
    };

  } catch (error) {
    console.error("Stats Fetch Error:", error);;
    // Graceful degradation - show default stats if API failsts if API fails
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        winRate: "72%",
        unitsYTD: "+48.5u",
        subscribers: "Loading..."
      })
    };
  }
};