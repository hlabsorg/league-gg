import { RoleIcon } from "./role-icon";
import { INDIVIDUAL_POSITION, POSITION_LABELS } from "@/constants/individual-position";

export function TopRoles({ matches, summonerName }) {
  if (!matches || matches.length === 0) {
    return <div>No match data available</div>;
  }

  // Role stats counter
  const roleStats = {};

  // Structure the role stats object
  const createRoleStats = (role) => ({
    role: role,
    name: POSITION_LABELS[role],
    games: 0,
    wins: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
  });

  // Find the selected summoner in each of the matches we get back
  matches.forEach((match) => {
    const currentPlayer = match.info.participants.find(
      (p) =>
        p.riotIdGameName?.toLowerCase() === summonerName.toLowerCase() ||
        p.summonerName?.toLowerCase() === summonerName.toLowerCase(),
    );

    if (!currentPlayer) return;

    // Get the player's role/position
    const role = currentPlayer.individualPosition;

    // Only process if it's a valid role
    if (!Object.values(INDIVIDUAL_POSITION).includes(role)) return;

    // Create the role object if it doesn't exist
    if (!roleStats[role]) {
      roleStats[role] = createRoleStats(role);
    }

    // Stat tracker
    roleStats[role].games += 1;
    if (currentPlayer.win) roleStats[role].wins += 1;
    roleStats[role].kills += currentPlayer.kills;
    roleStats[role].deaths += currentPlayer.deaths;
    roleStats[role].assists += currentPlayer.assists;
  });

  // Sort roles by games played and calculate the computed stats
  const topRolesSorted = Object.values(roleStats)
    .map((role) => ({
      ...role,
      winRate: ((role.wins / role.games) * 100).toFixed(1),
      winRatePercentage: (role.wins / role.games) * 100,
      losses: role.games - role.wins,
      avgKDA: ((role.kills + role.assists) / Math.max(1, role.deaths)).toFixed(2),
    }))
    .sort((a, b) => b.games - a.games) // Sort by most played
    .slice(0, 3); // Get top 3

  return (
    <div className="rounded-md border-2 border-border bg-card">
      <div className="flex items-center justify-between border-b-4 border-solid p-4">
        <h2 className="text-xl font-semibold text-foreground">TOP ROLES</h2>
      </div>

      <div className="space-y-3 p-4">
        {topRolesSorted.map((role) => (
          <div key={role.role} className="flex items-center gap-4 p-2">
            <div className="size-12 flex items-center justify-center rounded-full bg-primary/20">
              <RoleIcon role={role.role} className="size-8" />
            </div>
            <div className="min-w-[100px]">
              <div className="font-medium text-foreground">{role.name}</div>
              <div className="text-sm text-muted">{role.games} games played</div>
            </div>
            <div className="min-w-[100px]">
              <div className="font-semibold text-foreground">WR {role.winRate}%</div>
              <div className="text-sm text-muted">
                {role.wins}W // {role.losses}L
              </div>
            </div>
            <div className="min-w-[100px]">
              <div className="font-semibold text-foreground">KDA {role.avgKDA}</div>
              <div className="text-sm text-muted">
                {(role.kills / role.games).toFixed(1)} / {(role.deaths / role.games).toFixed(1)} /{" "}
                {(role.assists / role.games).toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
