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
            <DrawerTrigger
              className={`w-full px-4 py-2 hover:no-underline ${currentPlayer.win ? "bg-victory" : "bg-defeat"}`}
            >
              <div className="flex w-full items-center gap-4">
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
                  <div className="overflow-hidden">
                    <ChampionIcon
                      championName={championNames[currentPlayer.championId]}
                      className="size-8 lg:size-10"
                    />
                  </div>
                </div>

                {/* KDA and CS */}
                <div className="grow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {currentPlayer.kills}/{currentPlayer.deaths}/{currentPlayer.assists}
                    </span>
                    <span className="text-muted">
                      {((currentPlayer.kills + currentPlayer.assists) / Math.max(1, currentPlayer.deaths)).toFixed(2)}{" "}
                      KDA
                    </span>
                  </div>
                  <div className="text-sm text-muted">
                    CS: {currentPlayer.totalMinionsKilled} (
                    {((currentPlayer.totalMinionsKilled * 60) / match.info.gameDuration).toFixed(1)}/min)
                  </div>
                </div>

                {/* Items */}
                <div className="flex gap-1">
                  <ItemIcon itemId={currentPlayer.item0} className="size-6" />
                  <ItemIcon itemId={currentPlayer.item1} className="size-6" />
                  <ItemIcon itemId={currentPlayer.item2} className="size-6" />
                  <ItemIcon itemId={currentPlayer.item3} className="size-6" />
                  <ItemIcon itemId={currentPlayer.item4} className="size-6" />
                  <ItemIcon itemId={currentPlayer.item5} className="size-6" />
                  <ItemIcon itemId={currentPlayer.item6} className="size-6" />
                </div>

                {/* Game Time */}
                <div className="shrink-0 text-right text-sm text-muted">
                  {new Date(match.info.gameCreation).toLocaleDateString()}
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh] overflow-y-scroll px-4 py-2">
              <div className="mb-4 flex justify-center gap-4">
                {drawerDisplay !== "matchDetails" && (
                  <Button className="w-auto text-md" variant="outline" onClick={() => setDrawerDisplay("matchDetails")}>
                    Back To Match Details
                  </Button>
                )}
              </div>

              {drawerDisplay === "matchDetails" ? (
                <div>
                  <DrawerHeader className="flex justify-center">
                    <DrawerTitle className="text-4xl font-bold">Match Details</DrawerTitle>
                  </DrawerHeader>

                  <div className="flex justify-center gap-4">
                    <div>
                      Game Mode: <br />
                      {match.info.gameMode}
                    </div>
                    <div>
                      Game Duration: <br />
                      {Math.floor(match.info.gameDuration / 60)}m {Math.floor(match.info.gameDuration % 60)}s
                    </div>
                    <div>
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
                      />
                    </div>
                    <div className="flex w-1/5 flex-col items-center">
                      <h3 className="mb-4 font-semibold">Tale of the Tape</h3>
                      <div className="flex h-full flex-col justify-around gap-2">
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
                              size="sm"
                              className="w-full text-lg"
                              onClick={() => {
                                setDrawerDisplay("matchup");
                                // set drawer state back to match details when clicking out
                                setSelectedMatchup({ label, leftPlayer, rightPlayer });
                              }}
                            >
                              <RoleIcon role={position} className="mr-2 size-6" />
                              {label} Matchup
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex w-2/5 flex-col">
                      <TeamDisplay
                        color="red"
                        participants={match.info.participants}
                        gameDuration={match.info.gameDuration}
                        regionId={regionId}
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
