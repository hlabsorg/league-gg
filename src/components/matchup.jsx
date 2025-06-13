import { RoleIcon } from "./role-icon";
import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import { ItemIcon } from "./item-icon";
import { MatchStats } from "@/helpers/stats";

export function Matchup({ currentPlayer, matchInfo }) {
  const opponent = (currentPlayer, matchInfo) => {
    return matchInfo.participants.find(
      (player) =>
        player.teamId !== currentPlayer.teamId && player.individualPosition === currentPlayer.individualPosition,
    );
  };

  const matchupStats = new MatchStats(matchInfo);
  const stats = matchupStats.getAllStats();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Tale of the Tape</h1>
      <div className="flex justify-between">
        {/* Current Summoner*/}
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex gap-2 items-center">
            <div>
              <ProfileIcon profileIconId={currentPlayer.profileIcon} className="size-12" />
              <h3 className="text-lg font-bold">{currentPlayer.summonerName}</h3>
            </div>
            <div>
              <ChampionIcon championName={currentPlayer.championName} className="size-8" />
            </div>
            <div>
              <RoleIcon role={currentPlayer.individualPosition} className="size-8" />
            </div>
          </div>
          <div className="flex gap-2">
            <ItemIcon itemId={currentPlayer.item0} className="size-6" />
            <ItemIcon itemId={currentPlayer.item1} className="size-6" />
            <ItemIcon itemId={currentPlayer.item2} className="size-6" />
            <ItemIcon itemId={currentPlayer.item3} className="size-6" />
            <ItemIcon itemId={currentPlayer.item4} className="size-6" />
            <ItemIcon itemId={currentPlayer.item5} className="size-6" />
            <ItemIcon itemId={currentPlayer.item6} className="size-6" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col gap-2 w-1/3">
          {Object.entries(stats).map(([key, stat]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="w-1/3 text-right pr-4">{stat.getValue(currentPlayer)}</div>
              <div className="w-1/3 text-center font-semibold">{stat.label}</div>
              <div className="w-1/3 text-left pl-4">{stat.getValue(opponent(currentPlayer, matchInfo))}</div>
            </div>
          ))}
        </div>

        {/* Opponent*/}
        <div className="flex flex-col gap-2 w-1/3 items-end">
          <div className="flex gap-2 items-center">
            <div>
              <ProfileIcon profileIconId={opponent(currentPlayer, matchInfo).profileIcon} className="size-12" />
              <h3 className="text-lg font-bold">{opponent(currentPlayer, matchInfo).summonerName}</h3>
            </div>
            <div>
              <ChampionIcon championName={opponent(currentPlayer, matchInfo).championName} className="size-8" />
            </div>
            <div>
              <RoleIcon role={opponent(currentPlayer, matchInfo).individualPosition} className="size-8" />
            </div>
          </div>
          <div className="flex gap-2">
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item0} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item1} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item2} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item3} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item4} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item5} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item6} className="size-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
