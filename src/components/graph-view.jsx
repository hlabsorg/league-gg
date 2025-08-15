import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function GraphView({
  statsToRender,
  leftPlayerStatsAll,
  rightPlayerStatsAll,
  leftPlayerStats,
  rightPlayerStats,
}) {
  return (
    <TooltipProvider>
      <div className="space-y-3">
        {statsToRender.map((stat) => {
          const leftStats = leftPlayerStatsAll[stat.key];
          const rightStats = rightPlayerStatsAll[stat.key];

          const leftValue = stat.key === "kda" ? leftPlayerStats.getKDARatio() : leftStats;
          const rightValue = stat.key === "kda" ? rightPlayerStats.getKDARatio() : rightStats;

          // Calculate total and individual percentages for scale
          const totalValue = leftValue + rightValue;
          const leftPercentage = totalValue > 0 ? (leftValue / totalValue) * 100 : 40;
          const rightPercentage = totalValue > 0 ? (rightValue / totalValue) * 100 : 40;
          const leftIsWinner = leftValue > rightValue;
          const rightIsWinner = rightValue > leftValue;

          return (
            <div key={stat.key} className="relative flex items-center">
              {/* Left Bar */}
              <div className="flex flex-1 justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="relative flex h-8 cursor-pointer items-center justify-start rounded-l-md bg-bteam"
                      style={{ width: `${leftPercentage}%` }}
                    >
                      {!leftIsWinner && leftValue !== rightValue && (
                        <div className="absolute inset-0 rounded-l-md bg-black/30"></div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="border-border bg-card text-card-foreground shadow-lg">
                    <div className="font-semibold text-foreground">
                      {stat.label}: {leftStats}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Center Label Column */}
              <div className="flex w-1/6 justify-center">
                <span className="flex rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground">
                  {stat.label}
                </span>
              </div>

              {/* Right Bar */}
              <div className="flex flex-1 justify-start">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="relative flex h-8 cursor-pointer items-center justify-end rounded-r-md bg-rteam"
                      style={{ width: `${rightPercentage}%` }}
                    >
                      {!rightIsWinner && leftValue !== rightValue && (
                        <div className="absolute inset-0 rounded-r-md bg-black/30"></div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="border-border bg-card text-card-foreground shadow-lg">
                    <div className="font-semibold text-foreground">
                      {stat.label}: {rightStats}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
