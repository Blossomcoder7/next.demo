import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const propertyId = process.env.GA_PROPERTY_ID!;

const client = new BetaAnalyticsDataClient({
  credentials: JSON.parse(process.env.GA_SERVICE_ACCOUNT_KEY_JSON!),
});

async function fetchAnalytics() {
  // Active users currently (real-time)
  const [realtimeReport] = await client.runRealtimeReport({
    property: `properties/${propertyId}`,
    dimensions: [{ name: "country" }, { name: "deviceCategory" }],
    metrics: [{ name: "activeUsers" }],
  });

  const activeUsersCurrently =
    realtimeReport?.rows?.[0]?.metricValues?.[0]?.value || "0";

  // Active users in last 5 minutes (from realtime report)
  const [last5MinutesReport] = await client.runRealtimeReport({
    property: `properties/${propertyId}`,
    dimensions: [{ name: "minutesAgo" }],
    metrics: [{ name: "activeUsers" }],
  });

  const usersLast5Minutes =
    last5MinutesReport.rows?.[0]?.metricValues?.[0]?.value || "0";

  // Active users in the last 24 hours (GA standard report)
  const [last24HoursReport] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "1daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });

  const usersLast24Hours =
    last24HoursReport?.rows?.[0]?.metricValues?.[0]?.value || "0";

  // Total active users since start date (2020-01-01)
  const [totalUsersReport] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });

  const totalUsersSince2020 =
    totalUsersReport?.rows?.[0]?.metricValues?.[0]?.value || "0";

  console.log({
    realtimeReport: JSON.stringify(realtimeReport),
    last5MinutesReport: JSON.stringify(last5MinutesReport),
    last24HoursReport: JSON.stringify(last24HoursReport),
    totalUsersReport: JSON.stringify(totalUsersReport),
  });

  return {
    totalUsersSince2020,
    usersLast24Hours,
    activeUsersCurrently,
    usersLast5Minutes: usersLast5Minutes.toString(),
  };
}

export async function GET() {
  try {
    const stats = await fetchAnalytics();

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "success",
        stats,
      }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Failed to fetch analytics data",
      }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
