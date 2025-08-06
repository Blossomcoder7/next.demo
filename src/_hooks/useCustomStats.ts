"use client";

import getIP from "@/_utils/getIp";
import { useEffect, useState, useRef, useCallback } from "react";

interface CUSTOM_STATS {
  fullStats: {
    todaysCountDoc: {
      day: string;
      dated: string;
      count: string;
      createdAt: string;
      updatedAt: string;
    };
    lifetimeCountDoc: {
      _id: string;
      count: string;
      createdAt: string;
      updatedAt: string;
    };
    dailyInfo: {
      firstVisit: string;
      isActive: string;
      sig: string;
      lastPing: string;
      visitingIndex: string;
      createdAt: string;
      updatedAt: string;
    };
    lifetimeInfo: {
      firstVisit: string;
      sig: string;
      lifeTimeVisitingIndex: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  stats: {
    todaysVisitorsCount: string;
    totalVisitorsCount: string;
    usersTodaysVisitIndex: string;
    userLifeTimeVisitIndex: string;
    activeUsers: string;
  };
}

const useCustomStats = (): {
  loading: boolean;
  stats: CUSTOM_STATS | null;
} => {
  const [stats, setStats] = useState<CUSTOM_STATS | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const ip = await getIP();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_STATS_URL!}/api/custom-stats`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "x-stats-access-key": process.env.NEXT_PUBLIC_STATS_API_KEY!,
          },
          body: JSON.stringify({ ip }),
        }
      );
      console.log({ res });
      if (!res.ok) throw new Error("Failed to fetch GA4 data");
      const { data } = await res.json();
      console.log({ data });
      setStats(data);
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

export default useCustomStats;
