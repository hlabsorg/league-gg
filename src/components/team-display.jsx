import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import Link from "next/link";
import { ItemIcon } from "./item-icon";

export function TeamDisplay({ color, participants, gameDuration, regionId }) {
  const teamColor = color === "blue" ? "blue" : "red";
  const teamId = color === "blue" ? 100 : 200;
return (
  <div className="space-y-2">
    <h4 className={`mb-2 font-semibold text-${teamColor}-600`}>{color === "blue" ? "Blue" : "Red"} Team</h4>
    {participants
      .filter((p) => p.teamId === teamId)
      .map((participant) => (
        <div key={participant.puuid} className="flex items-center rounded bg-blue-50 p-2">
          <div className="flex items-center gap-2">
            <Link prefetch href={`/summoner/${regionId}/${participant.riotIdGameName}-${participant.riotIdTagline}`}>
              <ProfileIcon profileIconId={participant.profileIcon} size={32} />
            </Link>
            <div className="h-6 w-6">
              <ChampionIcon championName={participant.championName} size={24} />
            </div>
          </div>
          <div className="ml-2 grow">
            <div className="flex items-center">
              <p className="font-medium">{participant.riotIdGameName}</p>
              <p className="ml-1 text-sm text-gray-600">#{participant.riotIdTagline}</p>
            </div>
            <div className="text-sm">
              <span className="font-medium">
                {participant.kills}/{participant.deaths}/{participant.assists}
              </span>
              <span className="ml-2 text-gray-500">
                CS: {participant.totalMinionsKilled}(
                {((participant.totalMinionsKilled * 60) / gameDuration).toFixed(1)}/min)
              </span>
            </div>
            <div className="mt-1 flex gap-1">
              <ItemIcon itemId={participant.item0} size={20} />
              <ItemIcon itemId={participant.item1} size={20} />
              <ItemIcon itemId={participant.item2} size={20} />
              <ItemIcon itemId={participant.item3} size={20} />
              <ItemIcon itemId={participant.item4} size={20} />
              <ItemIcon itemId={participant.item5} size={20} />
              <ItemIcon itemId={participant.item6} size={20} />
            </div>
          </div>
        </div>
      ))}
  </div>
)  
}
