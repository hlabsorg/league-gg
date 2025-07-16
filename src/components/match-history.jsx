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
          <Drawer key={match.info.gameId} value={`match-${index}`} className="rounded-lg border">
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
            <DrawerContent className="h-[80vh] px-4 py-2 overflow-y-scroll">
              <div className="flex justify-center gap-4 mb-4">
                <Button
                  className="w-[100px]"
                  variant={drawerDisplay === "matchDetails" ? "default" : "outline"}
                  onClick={() => setDrawerDisplay("matchDetails")}
                >
                  Match Details
                </Button>
                <Button
                  className="w-[200px]"
                  variant={drawerDisplay === "matchup" ? "default" : "outline"}
                  onClick={() => setDrawerDisplay("matchup")}
                >
                  Tale of the Tape
                </Button>
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
                    <div className="flex flex-col w-2/5">
                      <TeamDisplay
                        color="blue"
                        participants={match.info.participants}
                        gameDuration={match.info.gameDuration}
                        regionId={regionId}
                      />
                    </div>
                    <div className="flex flex-col w-1/5 items-center">
                      <h3 className="font-semibold mb-4">Tale of the Tape</h3>
                      <div className="flex flex-col justify-around h-full gap-2">
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
                              className="text-lg w-full"
                              onClick={() => {
                                setDrawerDisplay("matchup");
                                setSelectedMatchup({ label, leftPlayer, rightPlayer });
                              }}
                            >
                              <RoleIcon role={position} className="size-6 mr-2" />
                              {label} Matchup
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col w-2/5">
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
