import { RoleIcon } from "./role-icon";
import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import { ItemIcon } from "./item-icon";
import { PlayerMatchStats } from "@/lib/match/stats";
import { INDIVIDUAL_POSITION } from "@/constants/individual-position";
import { SplashArt } from "./splash-art";
import { ComparisonChart } from "./comparison-chart";

const statsToRender = [
  {
    label: "KDA",
    key: "kda",
  },
  {
    label: "CS",
    key: "cs",
  },
  {
    label: "Vision Score",
    key: "visionScore",
  },
  {
    label: "Physical Damage To Champions",
    key: "physicalDamageDealt",
  },
  {
    label: "Magic Damage To Champions",
    key: "magicDamageDealt",
  },
  {
    label: "Total Damage To Champions",
    key: "damageToChampions",
  },
  {
    label: "Gold Earned",
    key: "goldEarned",
  },
  {
    label: "Gold/Min",
    key: "goldPerMinute",
  },
  {
    label: "Solo Kills",
    key: "soloKills",
  },
  {
    label: "Turret Kills",
    key: "turretKills",
  },
  {
    label: "Dragon Kills",
    key: "dragonKills",
  },
  {
    label: "Baron Kills",
    key: "baronKills",
  },
  {
    label: "Wards Killed",
    key: "wardsKilled",
  },
  {
    label: "Control Wards Bought",
    key: "visionWardsBought",
  },
];

export function Matchup({ leftPlayer, rightPlayer, matchInfo }) {
  const leftPlayerStats = new PlayerMatchStats(leftPlayer, matchInfo);
  const rightPlayerStats = new PlayerMatchStats(rightPlayer, matchInfo);

  const leftPlayerStatsAll = leftPlayerStats.getAllStats();
  const rightPlayerStatsAll = rightPlayerStats.getAllStats();

  const getWinnerClass = (currentPlayerValue, opponentValue) => {
    if (currentPlayerValue > opponentValue) return "font-bold text-accent";
    if (currentPlayerValue < opponentValue) return "text-muted";
    return "text-foreground";
  };

  return (
    <div className="aspect-video bg-[url('/assets/background/matchupBG.png')] bg-cover bg-center">
      <div className="flex h-[100px] w-full items-center justify-center">
        <div className="flex h-[100px] w-[500px] items-center justify-center rounded-2xl border-4 border-popover bg-[url('/assets/background/taleBanner.png')] bg-cover bg-center">
          <h3 className="font-foreground text-4xl font-semibold">Tale of the Tape</h3>
        </div>
      </div>
      <div className="flex justify-between">
        {/* Current Summoner*/}
        <div className="flex w-1/3 flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <div>
              <ProfileIcon profileIconId={leftPlayer.profileIcon} className="size-12" />
              <h3 className="text-lg font-bold">{leftPlayer.riotIdGameName}</h3>
            </div>
            <div>
              <ChampionIcon championName={leftPlayer.championName} className="size-8" />
            </div>
            <div>
              {Object.values(INDIVIDUAL_POSITION).includes(leftPlayer.individualPosition) ? (
                <div className="flex size-10 items-center justify-center">
                  <RoleIcon role={leftPlayer.individualPosition} className="size-6" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <ItemIcon itemId={leftPlayer.item0} className="size-6" />
            <ItemIcon itemId={leftPlayer.item1} className="size-6" />
            <ItemIcon itemId={leftPlayer.item2} className="size-6" />
            <ItemIcon itemId={leftPlayer.item3} className="size-6" />
            <ItemIcon itemId={leftPlayer.item4} className="size-6" />
            <ItemIcon itemId={leftPlayer.item5} className="size-6" />
            <ItemIcon itemId={leftPlayer.item6} className="size-6" />
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[281px] w-[500px]">
              <SplashArt championName={leftPlayer.championName} className="object-contain" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex w-1/3 flex-col gap-2">
          <div className="border-2 border-background bg-card p-4 ">
            <h4 className="mb-4 text-center text-xl font-bold text-foreground">Match Statistics</h4>
            {statsToRender.map((stat) => {
              const leftStats = leftPlayerStatsAll[stat.key];
              const rightStats = rightPlayerStatsAll[stat.key];

              let leftClass;
              let rightClass;
              if (stat.key === "kda") {
                leftClass = getWinnerClass(leftPlayerStats.getKDARatio(), rightPlayerStats.getKDARatio());
                rightClass = getWinnerClass(rightPlayerStats.getKDARatio(), leftPlayerStats.getKDARatio());
              } else {
                leftClass = getWinnerClass(leftStats, rightStats);
                rightClass = getWinnerClass(rightStats, leftStats);
              }

              return (
                <ComparisonChart
                  key={stat.key}
                  leftValue={stat.key === "kda" ? leftPlayerStats.getKDARatio() : leftStats}
                  rightValue={stat.key === "kda" ? rightPlayerStats.getKDARatio() : rightStats}
                  leftPlayerName={leftPlayer.riotIdGameName}
                  rightPlayerName={rightPlayer.riotIdGameName}
                  statLabel={stat.label}
                >
                  <div className="hover:bg-accent/50 flex cursor-pointer items-center justify-between border-b py-2 transition-colors">
                    {/* Left Player */}
                    <div className={`${leftClass} w-2/5 pr-3 text-right text-sm`}>{leftStats}</div>
                    <div className="w-1/5 text-center">
                      <div className="rounded bg-gray-700/50 px-2 py-1 text-xs font-semibold text-foreground">
                        {stat.label}
                      </div>
                    </div>
                    {/* Right Player */}
                    <div className={`${rightClass} w-2/5 pl-3 text-left text-sm`}>{rightStats}</div>
                  </div>
                </ComparisonChart>
              );
            })}
          </div>
        </div>

        {/* Opponent*/}
        <div className="flex w-1/3 flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <div>
              <ProfileIcon profileIconId={rightPlayer.profileIcon} className="size-12" />
              <h3 className="text-lg font-bold">{rightPlayer.riotIdGameName}</h3>
            </div>
            <div>
              <ChampionIcon championName={rightPlayer.championName} className="size-8" />
            </div>
            <div>
              {Object.values(INDIVIDUAL_POSITION).includes(rightPlayer.individualPosition) ? (
                <div className="flex size-10 items-center justify-center">
                  <RoleIcon role={rightPlayer.individualPosition} className="size-6" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <ItemIcon itemId={rightPlayer.item0} className="size-6" />
            <ItemIcon itemId={rightPlayer.item1} className="size-6" />
            <ItemIcon itemId={rightPlayer.item2} className="size-6" />
            <ItemIcon itemId={rightPlayer.item3} className="size-6" />
            <ItemIcon itemId={rightPlayer.item4} className="size-6" />
            <ItemIcon itemId={rightPlayer.item5} className="size-6" />
            <ItemIcon itemId={rightPlayer.item6} className="size-6" />
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[281px] w-[500px]">
              <SplashArt championName={rightPlayer.championName} className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
