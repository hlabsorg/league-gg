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
    <div className="flex flex-col items-center">
      {topMasteries.map((mastery) => (
        <div
          key={mastery.championId}
          className="relative mb-4 flex items-center justify-evenly gap-4 border-b-2 border-double "
        >
          <div className="relative">
            <div className="relative ">
              <ChampionIcon championName={championNames[mastery.championId]} className="size-10" />
            </div>
            <MasteryLevel level={mastery.championLevel} />
          </div>
          <div className="md:mt-2 md:text-center">
            <p className="font-bold text-white">{championNames[mastery.championId] || "Loading..."}</p>
            <p className="text-sm text-muted">{mastery.championPoints.toLocaleString()} pts</p>
          </div>
        </div>
      ))}
    </div>
  );
}
