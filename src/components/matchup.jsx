import { RoleIcon } from "./role-icon";
import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import { ItemIcon } from "./item-icon";
import { PlayerMatchStats } from "@/lib/match/stats";
import { INDIVIDUAL_POSITION } from "@/constants/individual-position";
import { SplashArt } from "./splash-art";
import { ComparisonChart } from "./comparison-chart";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import GraphView from "./graph-view";

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
    label: "Physical Damage",
    key: "physicalDamageDealt",
  },
  {
    label: "Magic Damage",
    key: "magicDamageDealt",
  },
  {
    label: "Total Damage",
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

export function Matchup({ leftPlayer, rightPlayer, matchInfo, regionId }) {
  const [viewMode, setViewMode] = useState("table"); // "table" or "graph"

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
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div className="rounded-lg px-6 py-2">
          <h3 className="text-2xl font-bold text-foreground">Tale of the Tape</h3>
        </div>
      </div>
      <div className="flex items-start gap-6">
        {/* Current Summoner*/}
        <div className="flex w-1/3 flex-col">
          <div className="rounded-lg border bg-card p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-center gap-2">
              <div className="text-center">
                <Link prefetch href={`/summoner/${regionId}/${leftPlayer.riotIdGameName}-${leftPlayer.riotIdTagline}`}>
                  <ProfileIcon profileIconId={leftPlayer.profileIcon} className="size-16" />
                </Link>
                <h3 className="mt-1 text-sm font-bold text-foreground">{leftPlayer.riotIdGameName}</h3>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ChampionIcon championName={leftPlayer.championName} className="size-12" />
                {Object.values(INDIVIDUAL_POSITION).includes(leftPlayer.individualPosition) ? (
                  <div className="bg-primary/20 flex size-6 items-center justify-center rounded-full">
                    <RoleIcon role={leftPlayer.individualPosition} className="size-4" />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mb-4 flex justify-center gap-1">
              <ItemIcon itemId={leftPlayer.item0} className="size-8" />
              <ItemIcon itemId={leftPlayer.item1} className="size-8" />
              <ItemIcon itemId={leftPlayer.item2} className="size-8" />
              <ItemIcon itemId={leftPlayer.item3} className="size-8" />
              <ItemIcon itemId={leftPlayer.item4} className="size-8" />
              <ItemIcon itemId={leftPlayer.item5} className="size-8" />
              <ItemIcon itemId={leftPlayer.item6} className="size-8" />
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <SplashArt championName={leftPlayer.championName} className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex w-1/3 flex-col">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="relative mb-4 flex items-center justify-center">
              <h4 className="text-lg font-bold text-foreground">Match Statistics</h4>
              <div className="absolute right-0 flex gap-2">
                <Button
                  variant={viewMode === "graph" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("graph")}
                  className="text-xs"
                >
                  Graph
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="text-xs"
                >
                  Table
                </Button>
              </div>
            </div>
            {viewMode === "table" ? (
              statsToRender.map((stat) => {
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
                    <div className="flex cursor-pointer items-center justify-between border-b border-border py-1.5 transition-colors hover:bg-popover">
                      {/* Left Player */}
                      <div className={`${leftClass} w-2/5 pr-2 text-right text-sm font-medium`}>{leftStats}</div>
                      <div className="w-1/5 text-center">
                        <div className="rounded px-2 py-0.5 text-xs font-semibold text-foreground">{stat.label}</div>
                      </div>
                      {/* Right Player */}
                      <div className={`${rightClass} w-2/5 pl-2 text-left text-sm font-medium`}>{rightStats}</div>
                    </div>
                  </ComparisonChart>
                );
              })
            ) : (
              <GraphView
                statsToRender={statsToRender}
                leftPlayerStatsAll={leftPlayerStatsAll}
                rightPlayerStatsAll={rightPlayerStatsAll}
                leftPlayerStats={leftPlayerStats}
                rightPlayerStats={rightPlayerStats}
              />
            )}
          </div>
        </div>

        {/* Opponent*/}
        <div className="flex w-1/3 flex-col">
          <div className="rounded-lg border bg-card p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-center gap-2">
              <div className="text-center">
                <Link
                  prefetch
                  href={`/summoner/${regionId}/${rightPlayer.riotIdGameName}-${rightPlayer.riotIdTagline}`}
                >
                  <ProfileIcon profileIconId={rightPlayer.profileIcon} className="size-16" />
                </Link>
                <h3 className="mt-1 text-sm font-bold text-foreground">{rightPlayer.riotIdGameName}</h3>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ChampionIcon championName={rightPlayer.championName} className="size-12" />
                {Object.values(INDIVIDUAL_POSITION).includes(rightPlayer.individualPosition) ? (
                  <div className="flex size-6 items-center justify-center rounded-full">
                    <RoleIcon role={rightPlayer.individualPosition} className="size-4" />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mb-4 flex justify-center gap-1">
              <ItemIcon itemId={rightPlayer.item0} className="size-8" />
              <ItemIcon itemId={rightPlayer.item1} className="size-8" />
              <ItemIcon itemId={rightPlayer.item2} className="size-8" />
              <ItemIcon itemId={rightPlayer.item3} className="size-8" />
              <ItemIcon itemId={rightPlayer.item4} className="size-8" />
              <ItemIcon itemId={rightPlayer.item5} className="size-8" />
              <ItemIcon itemId={rightPlayer.item6} className="size-8" />
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <SplashArt championName={rightPlayer.championName} className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
