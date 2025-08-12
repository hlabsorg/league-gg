"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import { ItemIcon } from "./item-icon";
import { TeamDisplay } from "./team-display";
import { Matchup } from "./matchup";
import { Button } from "./ui/button";
import { useState } from "react";
import { POSITION_LABELS } from "@/constants/individual-position";
import { RoleIcon } from "./role-icon";
// import { PlayerMatchStats } from "@/lib/match/stats"

// const selectedPlayerStats = new PlayerMatchStats(selectedPlayer, matchInfo)

export function MatchHistory({ matches, regionId, summonerName, championNames }) {
  const [drawerDisplay, setDrawerDisplay] = useState("matchDetails");
  const [selectedMatchup, setSelectedMatchup] = useState();

  if (!matches || !Array.isArray(matches)) {
    return <div>No matches found</div>;
  }

  return (
    <div className="space-y-4">
      {matches.map((match, index) => {
        // Find the current summoner's data in the match
        const currentPlayer = match.info.participants.find(
          (p) =>
            p.riotIdGameName?.toLowerCase() === summonerName.toLowerCase() ||
            p.summonerName?.toLowerCase() === summonerName.toLowerCase(),
        );

        if (!currentPlayer) {
          console.warn(`Could not find ${summonerName} in match:`, match.info.gameId);
          return null; // Skip this match if player not found
        }

        return (
          <Drawer
            key={match.info.gameId}
            value={`match-${index}`}
            onOpenChange={() => setDrawerDisplay("matchDetails")}
            className="rounded-lg border"
          >
            {/* Match History Preview */}
            <DrawerTrigger
              className={`w-full rounded-md px-4 py-2 hover:no-underline ${currentPlayer.win ? "bg-victory" : "bg-defeat"}`}
            >
              <div className="flex w-full items-center justify-between">
                {/* Left side - Game info */}
                <div className="w-24 shrink-0">
                  <p className="font-medium">{match.info.gameMode}</p>
                  <p className={`font-bold ${currentPlayer.win ? "text-accent" : "text-destructive"}`}>
                    {currentPlayer.win ? "Victory" : "Defeat"}
                  </p>
                  <p className="text-sm text-muted">{Math.floor(match.info.gameDuration / 60)}m</p>
                </div>

                {/* Champion and Summoner Info in preview */}

                <div className="flex items-center gap-2">
                  <ProfileIcon profileIconId={currentPlayer.profileIcon} className="size-12 lg:size-14" />
                  <div className="flex items-center gap-2">
                    <ChampionIcon
                      championName={championNames[currentPlayer.championId]}
                      className="size-8 lg:size-10"
                    />
                    <div className="flex flex-col">
                      <p className="text-md font-bold">
                        {currentPlayer.kills}/{currentPlayer.deaths}/{currentPlayer.assists}
                      </p>
                      <p className="text-sm text-muted">
                        {((currentPlayer.kills + currentPlayer.assists) / Math.max(1, currentPlayer.deaths)).toFixed(2)}{" "}
                        KDA
                      </p>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Stats and Items */}
                <div className="mx-8 flex grow items-center justify-evenly">
                  {/* Stats */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="text-sm font-medium">
                      CS: {currentPlayer.totalMinionsKilled} (
                      {((currentPlayer.totalMinionsKilled * 60) / match.info.gameDuration).toFixed(1)}/min)
                    </div>
                    <div className="text-sm font-medium">
                      DMG: {currentPlayer.totalDamageDealtToChampions.toLocaleString()}
                    </div>
                    <div className="text-sm font-medium">
                      Gold: {currentPlayer.goldEarned.toLocaleString()} (
                      {Math.floor(currentPlayer.challenges.goldPerMinute)}/min)
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <ItemIcon itemId={currentPlayer.item0} className="size-6" />
                      <ItemIcon itemId={currentPlayer.item1} className="size-6" />
                      <ItemIcon itemId={currentPlayer.item2} className="size-6" />
                    </div>
                    <div className="flex gap-1">
                      <ItemIcon itemId={currentPlayer.item3} className="size-6" />
                      <ItemIcon itemId={currentPlayer.item4} className="size-6" />
                      <ItemIcon itemId={currentPlayer.item5} className="size-6" />
                      <ItemIcon itemId={currentPlayer.item6} className="size-6" />
                    </div>
                  </div>
                </div>

                {/* Right Section - Team Champions and Date */}
                <div className="flex items-center gap-8">
                  {/* Team Champions */}
                  <div className="flex flex-col gap-2">
                    {/* Blue Team */}
                    <div className="flex items-center gap-2">
                      <div className="text-md w-8 font-bold text-bteam">Blue</div>
                      <div className="flex gap-1">
                        {match.info.participants
                          .filter((p) => p.teamId === 100)
                          .map((player, index) => (
                            <ChampionIcon
                              key={`blue-${index}`}
                              championName={championNames[player.championId]}
                              className="size-6"
                            />
                          ))}
                      </div>
                    </div>
                    {/* Red Team */}
                    <div className="flex items-center gap-2">
                      <div className="text-md w-8 font-bold text-rteam">Red</div>
                      <div className="flex gap-1">
                        {match.info.participants
                          .filter((p) => p.teamId === 200)
                          .map((player, index) => (
                            <ChampionIcon
                              key={`red-${index}`}
                              championName={championNames[player.championId]}
                              className="size-6"
                            />
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Game Time */}
                  <div className="shrink-0 text-right text-sm text-muted">
                    {new Date(match.info.gameCreation).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh] px-4 py-2">
              <div className="mb-4 flex justify-center gap-4 ">
                {drawerDisplay !== "matchDetails" && (
                  <Button
                    className="w-auto text-base"
                    variant="outline"
                    onClick={() => setDrawerDisplay("matchDetails")}
                  >
                    Back To Match Details
                  </Button>
                )}
              </div>

              {drawerDisplay === "matchDetails" ? (
                <div>
                  <DrawerHeader className="flex justify-center">
                    <DrawerTitle className="text-4xl font-bold">Match Details</DrawerTitle>
                  </DrawerHeader>

                  <div className="mb-4 flex justify-center gap-4">
                    <div className="rounded-lg border-2 border-border bg-card px-4 py-2">
                      Game Mode: <br />
                      {match.info.gameMode}
                    </div>
                    <div className="rounded-lg border-2 border-border bg-card px-4 py-2">
                      Game Duration: <br />
                      {Math.floor(match.info.gameDuration / 60)}m {Math.floor(match.info.gameDuration % 60)}s
                    </div>
                    <div className="rounded-lg border-2 border-border bg-card px-4 py-2">
                      Match Winner: <br />
                      <span
                        className={`font-bold ${
                          currentPlayer.teamId === 100
                            ? currentPlayer.win
                              ? "text-bteam"
                              : "text-rteam"
                            : currentPlayer.win
                              ? "text-rteam"
                              : "text-bteam"
                        }`}
                      >
                        {currentPlayer.teamId === 100
                          ? currentPlayer.win
                            ? "Blue Side Victory"
                            : "Red Side Victory"
                          : currentPlayer.win
                            ? "Red Side Victory"
                            : "Blue Side Victory"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex w-2/5 flex-col">
                      <TeamDisplay
                        color="blue"
                        participants={match.info.participants}
                        gameDuration={match.info.gameDuration}
                        regionId={regionId}
                        currentPlayer={currentPlayer}
                      />
                    </div>
                    <div className="flex w-1/5 flex-col">
                      <div className="rounded-xl border bg-card p-4 shadow">
                        <div className="mb-4 text-center">
                          <div className="rounded-lg border-2 border-primary px-4 py-2">
                            <h3 className="font-bold text-foreground">Tale of the Tape</h3>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {Object.entries(POSITION_LABELS).map(([position, label]) => {
                            const leftPlayer = match.info.participants.find(
                              (player) => player.teamId === 100 && player.individualPosition === position,
                            );
                            const rightPlayer = match.info.participants.find(
                              (player) => player.teamId === 200 && player.individualPosition === position,
                            );

                            if (!leftPlayer || !rightPlayer) return null;

                            return (
                              <Button
                                key={position}
                                variant="outline"
                                className="border-primary/30 bg-card/50 flex min-h-[80px] w-full flex-1 items-center justify-center rounded-lg border-2 text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-accent"
                                onClick={() => {
                                  setDrawerDisplay("matchup");
                                  setSelectedMatchup({ label, leftPlayer, rightPlayer });
                                }}
                              >
                                <div className="flex flex-col items-center">
                                  <RoleIcon role={position} className="mb-1 size-6" />
                                  <span className="text-xs">{label} Matchup</span>
                                </div>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-2/5 flex-col">
                      <TeamDisplay
                        color="red"
                        participants={match.info.participants}
                        gameDuration={match.info.gameDuration}
                        regionId={regionId}
                        currentPlayer={currentPlayer}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <DrawerHeader className="flex justify-center">
                    <DrawerTitle className="text-4xl font-bold">
                      {selectedMatchup ? `${selectedMatchup.label} Matchup` : "Tale of the Tape"}
                    </DrawerTitle>
                  </DrawerHeader>
                  <Matchup
                    leftPlayer={selectedMatchup.leftPlayer}
                    rightPlayer={selectedMatchup.rightPlayer}
                    matchInfo={match.info}
                    regionId={regionId}
                  />
                </div>
              )}
            </DrawerContent>
          </Drawer>
        );
      })}
    </div>
  );
}
