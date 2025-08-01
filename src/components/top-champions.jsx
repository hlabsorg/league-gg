import { ChampionIcon } from "./champion-icon";

export function TopChampions({ matches, summonerName, championNames }) {
  if (!matches || matches.length === 0) {
    return <div>No match data available</div>;
  }
  // Champion stats counter
  const championStats = {};

  // Structure the champion stats object
  const createChampionStats = (championName) => ({
    name: championName,
    games: 0,
    wins: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
  });

  //Finds the selected summoner in each of the matches we get back
  matches.forEach((match) => {
    const currentPlayer = match.info.participants.find(
      (p) =>
        p.riotIdGameName?.toLowerCase() === summonerName.toLowerCase() ||
        p.summonerName?.toLowerCase() === summonerName.toLowerCase(),
    );

    if (!currentPlayer) return null;

    //Gives us back the champion ID number
    const championId = currentPlayer.championId;
    // Gives us back the champion name value associated with the champion ID key
    const championName = championNames[championId];

    if (!championName) return;

    // Creates the champion object in order to track
    if (!championStats[championName]) {
      championStats[championName] = createChampionStats(championName);
    }

    // Stat tracker
    championStats[championName].games += 1;
    if (currentPlayer.win) championStats[championName].wins += 1;
    championStats[championName].kills += currentPlayer.kills;
    championStats[championName].deaths += currentPlayer.deaths;
    championStats[championName].assists += currentPlayer.assists;
  });

  // Sort champions by win rate and calculate the computed stats
  const topChampionsSorted = Object.values(championStats)
    .map((champion) => ({
      ...champion,
      winRate: ((champion.wins / champion.games) * 100).toFixed(1),
      winRatePercentage: (champion.wins / champion.games) * 100,
      losses: champion.games - champion.wins,
      avgKDA: ((champion.kills + champion.assists) / Math.max(1, champion.deaths)).toFixed(2),
    }))
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 3);

  return (
    <div className="rounded-md border-2 border-border bg-card">
      <div className="flex items-center justify-between border-b-4 border-solid p-4">
        <h2 className="text-xl font-semibold text-foreground">TOP CHAMPIONS</h2>
      </div>

      <div className="space-y-3 p-4">
        {topChampionsSorted.map((champion) => (
          <div key={champion.name} className="flex items-center gap-4 p-2">
            <div className="relative">
              <ChampionIcon championName={champion.name} className="size-12" />
            </div>
            <div className="min-w-[100px]">
              <div className="font-medium text-foreground">{champion.name}</div>
            </div>
            <div className="min-w-[100px]">
              <div className="font-semibold text-foreground">WR {champion.winRate}%</div>
              <div className="text-sm text-muted">
                {champion.wins}W // {champion.losses}L
              </div>
            </div>
            <div className="min-w-[100px]">
              <div className="font-semibold text-foreground">KDA {champion.avgKDA}</div>
              <div className="text-sm text-muted">
                {(champion.kills / champion.games).toFixed(1)} / {(champion.deaths / champion.games).toFixed(1)} /{" "}
                {(champion.assists / champion.games).toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
