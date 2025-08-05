"use client";

import useGA4Stats from "@/_hooks/useGA4Stats";
const GA4 = () => {
  const { loading, stats } = useGA4Stats();
  return (
    <>
      {loading ? (
        "Loading GA4 stats..."
      ) : (
        <div className="flex flex-col gap-1 bg-white p-2  rounded-[13px] text-left h-fit w-fit ">
          <span className="text-black font-bold uppercase">GA4 Analytics</span>
          <span className="text-black">
            Total Visits: {stats?.totalVisitsTillDate}
          </span>
          <span className="text-black">
            Visits in Last 24h: {stats?.visitsLast24Hours}
          </span>
          <span className="text-black">
            Active Now: {stats?.activeSessions}
          </span>
        </div>
      )}
    </>
  );
};

export default GA4;
