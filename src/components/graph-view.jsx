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
                className="relative flex items-center justify-start bg-bteam pl-2"
                style={{ width: `${leftPercentage}%` }}
              >
                {!leftIsWinner && leftValue !== rightValue && <div className="absolute inset-0 bg-black/30 "></div>}
                <span className="relative z-10 text-xs font-bold text-foreground">{leftStats}</span>
              </div>
              {/* Right Player Bar */}
              <div
                className="relative flex items-center justify-end bg-rteam pr-2"
                style={{ width: `${rightPercentage}%` }}
              >
                {!rightIsWinner && leftValue !== rightValue && <div className="absolute inset-0 bg-black/30 "></div>}
                <span className="relative z-10 text-xs font-bold text-foreground">{rightStats}</span>
              </div>
            </div>
            {/* Centered Stat Label */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="rounded bg-black/30 px-2 py-1 text-xs font-bold text-foreground">{stat.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
