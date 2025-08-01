import React, { useEffect, useState } from "react";

const GA4 = () => {
  const [stats, setStats] = useState({
    totalVisitors: "--",
    visitorsLast24Hrs: "--",
    visitorsLast30Min: "--",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/ga4");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        console.log({ data });
        setStats({
          totalVisitors: data?.stats?.totalVisitors,
          visitorsLast24Hrs: data?.stats?.visitorsLast24Hrs,
          visitorsLast30Min: data?.stats?.visitorsLast30Min,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching GA4 stats:", err);
        setLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center bg-white rounded-[33px] h-10 w-1/2 fixed top-2 left-2 space-x-4 px-4 text-black font-semibold text-sm">
      {loading ? (
        "Loading GA4 stats..."
      ) : (
        <>
          <span className="text-black">Total: {stats.totalVisitors}</span>
          <span className="text-black">24h: {stats.visitorsLast24Hrs}</span>
          <span className="text-black">30m: {stats.visitorsLast30Min}</span>
        </>
      )}
    </div>
  );
};

export default GA4;
