import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export function ComparisonChart({ leftValue, rightValue, leftPlayerName, rightPlayerName, statLabel, children }) {
  const extractNumber = (value) => {
    return parseInt(value) || 0;
  };

  const leftNum = extractNumber(leftValue);
  const rightNum = extractNumber(rightValue);

  const data = [
    {
      label: statLabel,
      [leftPlayerName]: leftNum,
      [rightPlayerName]: rightNum,
    },
  ];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="rounded-lg border bg-card p-4">
          <div className="mb-2 text-center font-semibold">{`${leftPlayerName} VS ${rightPlayerName}`}</div>

          <div className="flex h-60 items-center justify-between">
            <BarChart data={data} width={280} height={220} barGap={20}>
              <XAxis type="category" dataKey="label" tick={{ fill: "var(--foreground)" }} />
              <YAxis type="number" tick={{ fill: "var(--foreground)" }} />
              <Bar dataKey={leftPlayerName} fill="var(--bteam)" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey={rightPlayerName} fill="var(--rteam)" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
