"use client";
import getIP from "@/_utils/getIp";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useAnalytics() {
  const [ip, setIp] = useState<string | null>(null);
  const retryCount = useRef<number>(0);
  useEffect(() => {
    const fn = async () => {
      const ip = await getIP();
      setIp(ip);
    };
    fn();
  }, []);

  const connect = useCallback(async () => {
    try {
      const ip = await getIP();
      setIp(ip);
      const attempt = async () => {
        retryCount.current++;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_STATS_URL!}/api/connect`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ ip, sig: localStorage.getItem("sig") }),
          }
        );
        const res = await response.json();
        console.log("Connected:", res);
        if (res?.retry === true) {
          if (res?.sig) {
            console.log({ sig: res.sig });
            localStorage.setItem("sig", res.sig);
          }
          console.warn(
            "Server asking to retry with the request , Reconnecting..."
          );
          await new Promise((resolve) => setTimeout(resolve, 100));
          if (retryCount.current < 7) {
            return await attempt();
          } else {
            console.warn("Maximum retry reached please refresh browser");
          }
        }
        return res;
      };
      await attempt();
    } catch (err) {
      console.error("Connect failed:", err);
    }
  }, []);

  const disconnect = useCallback(() => {
    try {
      const disconnectUrl = `${process.env
        .NEXT_PUBLIC_API_STATS_URL!}/api/disconnect`;
      const data = JSON.stringify({ ip });
      const ok = navigator.sendBeacon(disconnectUrl, data);
      console.log("Sent beacon?", ok);
    } catch (err) {
      console.error("Beacon failed:", err);
    }
  }, [ip]);

  useEffect(() => {
    connect();
    window.addEventListener("pagehide", disconnect);
    return () => {
      window.removeEventListener("pagehide", disconnect);
    };
  }, [connect, disconnect]);
}
