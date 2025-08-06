"use client";

import useAnalytics from "@/_hooks/useAnalytics";
import useCustomStats from "@/_hooks/useCustomStats";

const CustomStats = () => {
  const { loading, stats } = useCustomStats();
  useAnalytics();
  return (
    <>
      {loading ? (
        "Loading Custom stats..."
      ) : (
        <div className="flex flex-col gap-1 bg-white p-2  rounded-[13px] text-left h-fit w-fit ">
          <span className="text-black font-bold uppercase">
            Custom Analytics
          </span>
          <span className="text-black">
            Total Visits: {stats?.stats?.totalVisitorsCount}
          </span>
          <span className="text-black">
            Visits in Last 24h: {stats?.stats?.todaysVisitorsCount}
          </span>
          <span className="text-black">
            Active Now: {stats?.stats?.activeUsers}
          </span>
          {stats?.stats?.usersTodaysVisitIndex ? (
            <span className="text-black">
              My {"Today's"} Index: {stats?.stats?.usersTodaysVisitIndex}
            </span>
          ) : null}
          {stats?.stats?.userLifeTimeVisitIndex ? (
            <span className="text-black">
              My {"All time's"} Index: {stats?.stats?.userLifeTimeVisitIndex}
            </span>
          ) : null}
        </div>
      )}
    </>
  );
};

export default CustomStats;
