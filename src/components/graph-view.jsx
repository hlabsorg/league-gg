export default function GraphView({
  statsToRender,
  leftPlayerStatsAll,
  rightPlayerStatsAll,
  leftPlayerStats,
  rightPlayerStats,
}) {
  return (
    <div className="space-y-3">
      {statsToRender.map((stat) => {
        const leftStats = leftPlayerStatsAll[stat.key];
        const rightStats = rightPlayerStatsAll[stat.key];

        const leftValue = stat.key === "kda" ? leftPlayerStats.getKDARatio() : leftStats;
        const rightValue = stat.key === "kda" ? rightPlayerStats.getKDARatio() : rightStats;

        // Calculate total and percentages
        const totalValue = leftValue + rightValue;
        const leftPercentage = totalValue > 0 ? (leftValue / totalValue) * 100 : 50;
        const rightPercentage = totalValue > 0 ? (rightValue / totalValue) * 100 : 50;

        // Determine winner for this specific stat
        const leftIsWinner = leftValue > rightValue;
        const rightIsWinner = rightValue > leftValue;

        return (
          <div key={stat.key} className="relative">
            <div className="flex h-8 w-full overflow-hidden rounded-md">
              {/* Left Player Bar */}
              <div
                className="bg-bteam flex items-center justify-start pl-2 relative"
                style={{ width: `${leftPercentage}%` }}
              >
                {!leftIsWinner && leftValue !== rightValue && <div className="absolute inset-0 bg-black/30 "></div>}
                <span className="text-xs font-bold text-foreground relative z-10">{leftStats}</span>
              </div>
              {/* Right Player Bar */}
              <div
                className="bg-rteam flex items-center justify-end pr-2 relative"
                style={{ width: `${rightPercentage}%` }}
              >
                {!rightIsWinner && leftValue !== rightValue && <div className="absolute inset-0 bg-black/30 "></div>}
                <span className="text-xs font-bold text-foreground relative z-10">{rightStats}</span>
              </div>
            </div>
            {/* Centered Stat Label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-foreground bg-black/30 px-2 py-1 rounded">{stat.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
