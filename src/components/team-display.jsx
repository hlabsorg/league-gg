import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import Link from "next/link";
import { ItemIcon } from "./item-icon";
import { RoleIcon } from "./role-icon";
import { INDIVIDUAL_POSITION } from "@/constants/individual-position";

export function TeamDisplay({ color, participants, gameDuration, regionId, currentPlayer }) {
  // const teamColor = color === "blue" ? "blue" : "red";
  const teamId = color === "blue" ? 100 : 200;
  return (
    <div className="rounded-xl border bg-card p-4 shadow">
      <h4 className={`mb-4 text-center text-lg font-bold ${color === "blue" ? "text-bteam" : "text-rteam"}`}>
        {color === "blue" ? "Blue" : "Red"} Team
      </h4>
      <div className="space-y-3">
        {participants
          .filter((p) => p.teamId === teamId)
          .map((participant) => {
            const isCurrentPlayer = participant.riotIdGameName === currentPlayer.riotIdGameName;

            return (
              <div
                key={participant.puuid}
                className={`flex items-center justify-between rounded-lg border p-3 ${
                  isCurrentPlayer ? "border-2 border-accent" : ""
                  // Using bg-accent/(opacity value) does not work
                }`}
              >
                {/* Left side - Profile, Champion, Role, Name */}
                <div className="flex items-center gap-2">
                  <Link
                    prefetch
                    href={`/summoner/${regionId}/${participant.riotIdGameName}-${participant.riotIdTagline}`}
                  >
                    <ProfileIcon profileIconId={participant.profileIcon} className="size-12" />
                  </Link>
                  {Object.values(INDIVIDUAL_POSITION).includes(participant.individualPosition) ? (
                    <div className="flex size-10 items-center justify-center">
                      <RoleIcon role={participant.individualPosition} className="size-6" />
                    </div>
                  ) : null}
                  <ChampionIcon championName={participant.championName} className="size-8" />
                  <div className="ml-2">
                    <p className={`font-medium text-foreground ${isCurrentPlayer ? "font-bold text-accent" : ""}`}>
                      {participant.riotIdGameName}
                    </p>
                    <p className="text-xs text-muted">#{participant.riotIdTagline}</p>
                  </div>
                </div>

                {/* Middle - KDA and Stats */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-sm font-bold text-foreground">
                    {participant.kills}/{participant.deaths}/{participant.assists}
                  </p>
                  <p className="text-xs text-muted">
                    {((participant.kills + participant.assists) / Math.max(1, participant.deaths)).toFixed(2)} KDA
                  </p>
                  <div className="mt-1 text-sm font-medium">
                    CS: {participant.totalMinionsKilled} (
                    {((participant.totalMinionsKilled * 60) / gameDuration).toFixed(1)}/min)
                  </div>
                </div>

                {/* Right side - Items */}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <ItemIcon itemId={participant.item0} className="size-6" />
                    <ItemIcon itemId={participant.item1} className="size-6" />
                    <ItemIcon itemId={participant.item2} className="size-6" />
                  </div>
                  <div className="flex gap-1">
                    <ItemIcon itemId={participant.item3} className="size-6" />
                    <ItemIcon itemId={participant.item4} className="size-6" />
                    <ItemIcon itemId={participant.item5} className="size-6" />
                    <ItemIcon itemId={participant.item6} className="size-6" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
