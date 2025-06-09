import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import Link from "next/link";
import { ItemIcon } from "./item-icon";
import { RoleIcon } from "./role-icon";

const roleCheck = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

export function TeamDisplay({ color, participants, gameDuration, regionId }) {
  // const teamColor = color === "blue" ? "blue" : "red";
  const teamId = color === "blue" ? 100 : 200;
return (
  <div className="space-y-2">
    <h4 className={`mb-2 font-semibold`}>{color === "blue" ? "Blue" : "Red"} Team</h4>
    {participants
      .filter((p) => p.teamId === teamId)
      .map((participant) => (
        <div key={participant.puuid} className={`flex items-center justify-center rounded ${
          participant.teamId === 100
              ? "bg-bteam-foreground"
              : "bg-rteam-foreground"
        }`}>
          <div className="flex items-center gap-2">
            <Link prefetch href={`/summoner/${regionId}/${participant.riotIdGameName}-${participant.riotIdTagline}`}>
              <ProfileIcon profileIconId={participant.profileIcon} className="size-10" />
            </Link>
            {roleCheck.includes(participant.individualPosition) ? (
              <div className="flex size-10 items-center justify-center">
                <RoleIcon role={participant.individualPosition} className="size-6" />
              </div>
            ) : null}
            <div className="size-14">
              <ChampionIcon championName={participant.championName} className="size-12" />
            </div>
          </div>
          <div className="ml-2 ">
            <div className="flex items-center">
              <p className="font-medium">{participant.riotIdGameName}</p>
              <p className="ml-1 text-sm text-muted">#{participant.riotIdTagline}</p>
            </div>
            <div className="text-sm">
              <span className="font-medium">
                {participant.kills}/{participant.deaths}/{participant.assists}
              </span>
              <span className="ml-2 text-muted">
                CS: {participant.totalMinionsKilled}(
                {((participant.totalMinionsKilled * 60) / gameDuration).toFixed(1)}/min)
              </span>
            </div>
            <div className="mt-1 flex gap-1">
              <ItemIcon itemId={participant.item0} className="size-6" />
              <ItemIcon itemId={participant.item1} className="size-6" />
              <ItemIcon itemId={participant.item2} className="size-6" />
              <ItemIcon itemId={participant.item3} className="size-6" />
              <ItemIcon itemId={participant.item4} className="size-6" />
              <ItemIcon itemId={participant.item5} className="size-6" />
              <ItemIcon itemId={participant.item6} className="size-6" />
            </div>
          </div>
        </div>
      ))}
  </div>
)  
}
