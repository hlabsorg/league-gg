import { ChampionIcon } from "./champion-icon";

function MasteryLevel({ level }) {
  return (
    <div className="relative">
      <div className="flex size-auto items-center justify-center text-sm font-semibold">{level}</div>
    </div>
  );
}

export async function ChampionMasteries({ masteries, championNames }) {
  if (!masteries || !Array.isArray(masteries)) {
    return <div>No champion masteries found.</div>;
  }

  // Sort masteries by mastery points and take top 5
  const topMasteries = [...masteries].sort((a, b) => b.championPoints - a.championPoints).slice(0, 5);

  return (
    <div className="flex flex-col items-left p-4">
      {topMasteries.map((mastery) => (
        <div key={mastery.championId} className="mb-4 flex  items-center gap-4 border-b-2 border-double p-2">
          <div className="size-12">
            <ChampionIcon championName={championNames[mastery.championId]} className="size-12" />
          </div>
          <div className="min-w-[100px]">
            <div className="font-medium text-foreground">{championNames[mastery.championId] || "Loading..."}</div>
          </div>
          <div className="min-w-[100px]">
            <div className="font-semibold text-foreground">Level {mastery.championLevel}</div>
            <div className="text-sm text-muted">{mastery.championPoints.toLocaleString()} pts</div>
          </div>
        </div>
      ))}
    </div>
  );
}
