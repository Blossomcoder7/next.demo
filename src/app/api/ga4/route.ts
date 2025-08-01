// pages/api/ga-stats.js
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const propertyId = "499270613"; // just the number string, e.g. "123456789"

const client = new BetaAnalyticsDataClient({
  credentials: JSON.parse(process.env.GA_SERVICE_ACCOUNT_KEY_JSON!),
});

async function fetchAnalytics() {
  const [realtime] = await client.runRealtimeReport({
    property: `properties/${propertyId}`,
    metrics: [{ name: "activeUsers" }],
  });

  const [last24] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "1daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });

  const [total] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });

  return {
    totalVisitors: total?.rows?.[0]?.metricValues?.[0]?.value || "0",
    visitorsLast24Hrs: last24?.rows?.[0]?.metricValues?.[0]?.value || "0",
    visitorsLast30Min: realtime?.rows?.[0]?.metricValues?.[0]?.value || "0",
  };
}

export async function GET() {
  try {
    const stats = await fetchAnalytics();

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'success',
        stats,
      }),
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch analytics data',
      }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

// Handle OPTIONS preflight request
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}