import { POSITION_LABELS, INDIVIDUAL_POSITION } from "@/constants/individual-position";

export function RecentGames({ matches, summonerName }) {
  if (!matches || matches.length === 0) {
    return <div>No match data available</div>;
  }

  //Aggregate stat tracker
  const recentStats = {
    games: 0,
    wins: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    totalCS: 0,
    totalGold: 0,
    totalDamage: 0,
    totalKillParticipation: 0,
    totalGameDuration: 0,
    roleFrequency: {},
  };

  //Find the selected summoner in each of the matches
  matches.forEach((match) => {
    const currentPlayer = match.info.participants.find(
      (p) =>
        p.riotIdGameName?.toLowerCase() === summonerName.toLowerCase() ||
        p.summonerName?.toLowerCase() === summonerName.toLowerCase(),
    );

    if (!currentPlayer) return;

    //For preferred role and calculating the stats/min
    const role = currentPlayer.individualPosition;
    const gameDuration = match.info.gameDuration;

    //Only process if its a valid role
    if (!Object.values(INDIVIDUAL_POSITION).includes(role)) return;

    //Stats tracker
    recentStats.games += 1;
    if (currentPlayer.win) recentStats.wins += 1;
    recentStats.kills += currentPlayer.kills;
    recentStats.deaths += currentPlayer.deaths;
    recentStats.assists += currentPlayer.assists;
    recentStats.totalCS += currentPlayer.totalMinionsKilled;
    recentStats.totalGameDuration += gameDuration;
    recentStats.totalGold += currentPlayer.goldEarned;
    recentStats.totalDamage += currentPlayer.totalDamageDealtToChampions;

    //Kill Participation
    const teammates = match.info.participants.filter((p) => p.teamId === currentPlayer.teamId);
    let totalKills = 0;
    for (let i = 0; i < teammates.length; i++) {
      totalKills += teammates[i].kills;
    }
    if (totalKills > 0) {
      const killParticipation = ((currentPlayer.kills + currentPlayer.assists) / totalKills) * 100;
      recentStats.totalKillParticipation += killParticipation;
    }

    // Preferred role
    if (!recentStats.roleFrequency[role]) {
      recentStats.roleFrequency[role] = 0;
    }
    recentStats.roleFrequency[role] += 1;
  });

  const aggregatedStats = {
    games: recentStats.games,
    wins: recentStats.wins,
    losses: recentStats.games - recentStats.wins,
    winRate: ((recentStats.wins / recentStats.games) * 100).toFixed(1),
    avgKDA: ((recentStats.kills + recentStats.assists) / recentStats.deaths).toFixed(2),
    avgCSPerMin: (recentStats.totalCS / (recentStats.totalGameDuration / 60)).toFixed(1),
    avgGoldPerMin: (recentStats.totalGold / (recentStats.totalGameDuration / 60)).toFixed(1),
    avgDamagePerMatch: (recentStats.totalDamage / recentStats.games).toFixed(1),
    avgKillParticipation: (recentStats.totalKillParticipation / recentStats.games).toFixed(1),
    preferredRole: Object.entries(recentStats.roleFrequency).sort(([, a], [, b]) => b - a)[0][0],
    preferredRoleLabel: POSITION_LABELS[Object.entries(recentStats.roleFrequency).sort(([, a], [, b]) => b - a)],
  };

  return (
    <div className="w-auto mb-6 border-2 rounded-md bg-card p-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground border-b-4 border-solid mb-4 p-4">Recent Games Summary</h2>
        <p className="mb-4 border-b-2 text-lg font-bold">Stats based on the last {aggregatedStats.games} games</p>
      </div>
      <div className="flex flex-row min-w-full gap-8 justify-evenly">
        <div className="flex flex-col border-solid border-r-4 p-4 pr-8 items-center justify-center">
          <p className="text-md text-muted">Win Rate</p>
          <p className="text-2xl font-bold text-foreground justify-center">{aggregatedStats.winRate}%</p>
          <p className="text-xs text-muted">
            {aggregatedStats.wins}W // {aggregatedStats.losses}L
          </p>
        </div>
        <div className="flex flex-col border-solid border-r-4 p-4 pr-8 items-center justify-center">
          <p className="text-md text-muted">AVG KDA</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgKDA}</p>
        </div>
        <div className="flex flex-col border-solid border-r-4 p-4 pr-8 items-center justify-center">
          <p className="text-md text-muted">AVG Kill Participation</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgKillParticipation}%</p>
        </div>
        <div className="flex flex-col border-solid border-r-4 p-4 pr-8 items-center justify-center">
          <p className="text-md text-muted">Preferred Role</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.preferredRole}</p>
        </div>
        <div className="flex flex-col border-solid border-r-4 p-4 pr-8 items-center justify-center">
          <p className="text-md text-muted">CS/min</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgCSPerMin}</p>
        </div>
        <div className="flex flex-col border-solid border-r-4 p-4 pr-8 items-center justify-center">
          <p className="text-md text-muted">Gold/min</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgGoldPerMin}</p>
        </div>
        <div className="flex flex-col border-solid border-r-4 p-4 pr-8 items-center justify-center">
          <p className="text-md text-muted">Avg Damage</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgDamagePerMatch}</p>
        </div>
      </div>
    </div>
  );
}
