const getIP = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    console.log({ data });
    if (data?.ip) return data.ip;
  } catch (error) {
    console.warn("Failed to get public IP from api.ipify.org:", error);
  }
  try {
    const fallbackInfo = {
      hostname: window.location.hostname,
      userAgent: window.navigator.userAgent,
      connectionType:
        (navigator as any)?.connection?.effectiveType || "unknown",
    };
    return `fallback-${JSON.stringify(fallbackInfo)}`;
  } catch (fallbackError) {
    console.error("Fallback IP retrieval failed:", fallbackError);
    return "unknown-ip";
  }
};

export default getIP;
