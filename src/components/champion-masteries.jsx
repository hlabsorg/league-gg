import { ChampionIcon } from "./champion-icon";

function MasteryLevel({ level }) {
  return (
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-blue-600 to-blue-700 text-sm font-bold text-white shadow-lg ring-2 ring-black/20">
        {level}
      </div>
    </div>
  );
}

export async function ChampionMasteries({ masteries, championNames }) {


  if (!masteries || !Array.isArray(masteries)) {
    return <div>No champion masteries found.</div>;
  }

  // Sort masteries by mastery points and take top 5
  const topMasteries = [...masteries]
    .sort((a, b) => b.championPoints - a.championPoints)
    .slice(0, 5);

  return (
    <div className="grid gap-4 md:grid-cols-5">
      {topMasteries.map((mastery) => (
        <div 
          key={mastery.championId} 
          className="relative flex items-center gap-4 rounded-lg border bg-gradient-to-b from-slate-50 to-slate-100 p-4 pb-8 shadow-md md:flex-col md:items-center"
        >
          <div className="relative">
            <div className="relative h-16 w-16 overflow-hidden rounded-lg ring-2 ring-black/10">
              <ChampionIcon 
                championName={championNames[mastery.championId]} 
                size={64} 
              />
            </div>
            <MasteryLevel level={mastery.championLevel} />
          </div>
          <div className="md:mt-2 md:text-center">
            <p className="font-bold text-slate-900">
              {championNames[mastery.championId] || "Loading..."}
            </p>
            <p className="text-sm font-medium text-slate-600">
              {mastery.championPoints.toLocaleString()} pts
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 