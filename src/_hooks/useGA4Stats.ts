"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface GA4_STATS {
  totalVisitsTillDate: string;
  visitsLast24Hours: string;
  visitsLast5Mins: string;
  activeSessions: string;
  lastFetched: string;
  createdAt: string;
  updatedAt: string;
}

const useGA4Stats = (): {
  loading: boolean;
  stats: GA4_STATS | null;
} => {
  const [stats, setStats] = useState<GA4_STATS | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_STATS_URL!}/api/ga4-stats`,
        {
          credentials: "include",
          headers: {
            "x-stats-access-key": process.env.NEXT_PUBLIC_STATS_API_KEY!,
          },
        }
      );
      console.log({ res });
      if (!res.ok) throw new Error("Failed to fetch GA4 data");
      const { stats } = await res.json();
      console.log({ stats });
      setStats(stats);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching GA4 stats:", err);
      setLoading(false);
    }
  }, []);

  const startInterval = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchStats, 30000);
    }
  }, [fetchStats, intervalRef]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [intervalRef]);

  useEffect(() => {
    fetchStats();
    startInterval();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopInterval();
      } else {
        fetchStats();
        startInterval();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      stopInterval();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startInterval, fetchStats, stopInterval]);

  return { stats, loading };
};

export default useGA4Stats;
