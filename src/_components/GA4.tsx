import React, { useEffect, useState } from "react";

const GA4 = () => {
  const [stats, setStats] = useState({
    totalUsersSince2020: "--",
    usersLast24Hours: "--",
    usersLast5Minutes: "--",
    activeUsersCurrently: "--",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/ga4");
        if (!res.ok) throw new Error("Failed to fetch GA4 data");

        const data = await res.json();
        console.log({ data });

        setStats({
          totalUsersSince2020: data?.stats?.totalUsersSince2020,
          usersLast24Hours: data?.stats?.usersLast24Hours,
          usersLast5Minutes: data?.stats?.usersLast5Minutes,
          activeUsersCurrently: data?.stats?.activeUsersCurrently,
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
          <span className="text-black">Total: {stats.totalUsersSince2020}</span>
          <span className="text-black">24h: {stats.usersLast24Hours}</span>
          <span className="text-black">5M: {stats.usersLast5Minutes}</span>
          <span className="text-black">Active Now: {stats.activeUsersCurrently}</span>
        </>
      )}
    </div>
  );
};

export default GA4;
