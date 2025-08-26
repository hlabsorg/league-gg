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
    winRate: recentStats.games > 0 ? ((recentStats.wins / recentStats.games) * 100).toFixed(1) : 0,
    avgKDA: recentStats.deaths > 0 ? ((recentStats.kills + recentStats.assists) / recentStats.deaths).toFixed(2) : 0,
    avgCSPerMin:
      recentStats.totalGameDuration > 0 ? (recentStats.totalCS / (recentStats.totalGameDuration / 60)).toFixed(1) : 0,
    avgGoldPerMin:
      recentStats.totalGameDuration > 0 ? (recentStats.totalGold / (recentStats.totalGameDuration / 60)).toFixed(1) : 0,
    avgDamagePerMatch: recentStats.games > 0 ? (recentStats.totalDamage / recentStats.games).toFixed(1) : 0,
    avgKillParticipation:
      recentStats.games > 0 ? (recentStats.totalKillParticipation / recentStats.games).toFixed(1) : 0,
    preferredRole: Object.entries(recentStats.roleFrequency).sort(([, a], [, b]) => b - a)[0]?.[0] || "None",
    preferredRoleLabel:
      POSITION_LABELS[Object.entries(recentStats.roleFrequency).sort(([, a], [, b]) => b - a)[0]?.[0]] || "None",
  };

  return (
    <div className="mb-6 w-auto rounded-md border-2 bg-card p-6">
      <div>
        <h2 className="mb-4 border-b-4 border-solid p-4 text-2xl font-bold text-foreground">Recent Games Summary</h2>
        <p className="mb-4 border-b-2 text-lg font-bold">Stats based on the last {aggregatedStats.games} games</p>
      </div>
      <div className="flex min-w-full flex-row justify-evenly gap-8">
        <div className="flex flex-col items-center justify-center border-r-4 border-solid p-4 pr-8">
          <p className="text-md text-muted">Win Rate</p>
          <p className="justify-center text-2xl font-bold text-foreground">{aggregatedStats.winRate}%</p>
          <p className="text-xs text-muted">
            {aggregatedStats.wins}W // {aggregatedStats.losses}L
          </p>
        </div>
        <div className="flex flex-col items-center justify-center border-r-4 border-solid p-4 pr-8">
          <p className="text-md text-muted">AVG KDA</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgKDA}</p>
        </div>
        <div className="flex flex-col items-center justify-center border-r-4 border-solid p-4 pr-8">
          <p className="text-md text-muted">AVG Kill Participation</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgKillParticipation}%</p>
        </div>
        <div className="flex flex-col items-center justify-center border-r-4 border-solid p-4 pr-8">
          <p className="text-md text-muted">Preferred Role</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.preferredRole}</p>
        </div>
        <div className="flex flex-col items-center justify-center border-r-4 border-solid p-4 pr-8">
          <p className="text-md text-muted">CS/min</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgCSPerMin}</p>
        </div>
        <div className="flex flex-col items-center justify-center border-r-4 border-solid p-4 pr-8">
          <p className="text-md text-muted">Gold/min</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgGoldPerMin}</p>
        </div>
        <div className="flex flex-col items-center justify-center border-r-4 border-solid p-4 pr-8">
          <p className="text-md text-muted">Avg Damage</p>
          <p className="text-2xl font-bold text-foreground">{aggregatedStats.avgDamagePerMatch}</p>
        </div>
      </div>
    </div>
  );
}
