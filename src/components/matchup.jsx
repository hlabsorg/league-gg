import { RoleIcon } from "./role-icon";
import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import { ItemIcon } from "./item-icon";
import { PlayerMatchStats } from "@/lib/match/stats";
import { INDIVIDUAL_POSITION } from "@/constants/individual-position";
import { SplashArt } from "./splash-art";

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
    <div className="bg-[url('/assets/background/matchupBG.png')] aspect-video bg-cover bg-center">
      <div className="flex justify-center items-center w-full h-[100px]">
        <div className="bg-[url('/assets/background/taleBanner.png')] h-[100px] w-[500px] bg-cover bg-center flex justify-center items-center rounded-2xl border-4 border-popover">
          <h3 className="text-4xl font-semibold font-foreground">Tale of the Tape</h3>
        </div>
      </div>
      <div className="flex justify-between">
        {/* Current Summoner*/}
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex gap-2 justify-center items-center">
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
          <div className="flex gap-2 justify-center">
            <ItemIcon itemId={leftPlayer.item0} className="size-6" />
            <ItemIcon itemId={leftPlayer.item1} className="size-6" />
            <ItemIcon itemId={leftPlayer.item2} className="size-6" />
            <ItemIcon itemId={leftPlayer.item3} className="size-6" />
            <ItemIcon itemId={leftPlayer.item4} className="size-6" />
            <ItemIcon itemId={leftPlayer.item5} className="size-6" />
            <ItemIcon itemId={leftPlayer.item6} className="size-6" />
          </div>
          <div className="flex justify-center items-center">
            <div className="relative w-[500px] h-[281px]">
              <SplashArt championName={leftPlayer.championName} className="object-contain" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col gap-2 w-1/3">
          <div className="bg-card p-4 border-2 border-background ">
            <h4 className="text-xl font-bold text-foreground text-center mb-4">Match Statistics</h4>
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
                <div key={stat.key} className="flex items-center justify-between py-2 border-b">
                  {/* Left Player */}
                  <div className={`${leftClass} w-2/5 text-right pr-3 text-sm`}>{leftStats}</div>
                  <div className="w-1/5 text-center">
                    <div className="text-xs font-semibold text-foreground bg-gray-700/50 px-2 py-1 rounded">
                      {stat.label}
                    </div>
                  </div>
                  {/* Right Player */}
                  <div className={`${rightClass} w-2/5 text-left pl-3 text-sm`}>{rightStats}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Opponent*/}
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex gap-2 justify-center items-center">
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
          <div className="flex justify-center items-center">
            <div className="relative w-[500px] h-[281px]">
              <SplashArt championName={rightPlayer.championName} className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
