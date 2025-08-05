import { useCallback, useEffect } from "react";

export default function useAnalytics() {
  const connect = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_STATS_URL!}/api/connect`,

        {
          method: "POST",
          credentials: "include",
        }
      );
      const res = await response.json();
      console.log("Connected:", res);
    } catch (err) {
      console.error("Connect failed:", err);
    }
  }, []);

  const disconnect = useCallback(() => {
    try {
      const disconnectUrl = `${process.env
        .NEXT_PUBLIC_API_STATS_URL!}/api/disconnect`;
      const ok = navigator.sendBeacon(disconnectUrl);
      console.log("Sent beacon?", ok);
    } catch (err) {
      console.error("Beacon failed:", err);
    }
  }, []);

  useEffect(() => {
    connect();

    window.addEventListener("unload", disconnect);

    return () => {
      window.removeEventListener("unload", disconnect);
    };
  }, [connect, disconnect]);
}
