import { RoleIcon } from "./role-icon";
import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import { ItemIcon } from "./item-icon";
import { MatchStats, PlayerMatchStats } from "@/helpers/stats";
import { INDIVIDUAL_POSITION } from "@/constants/individual-position";
import { SplashArt } from "./splash-art";

// Set default state to current player, find player opponent and pass each participant to matchup

export function Matchup({ currentPlayer, opponent }) {
  const getOpponent = (currentPlayer, matchInfo) => {
    return matchInfo.participants.find(
      (player) =>
        player.teamId !== currentPlayer.teamId && player.individualPosition === currentPlayer.individualPosition,
    );
  };

  const opponent = getOpponent(currentPlayer, matchInfo);

  const currentPlayerStats = new PlayerMatchStats(currentPlayer);
  const opponentStats = new PlayerMatchStats(opponent);

  const getKDAWinner = (current, opponent) => {
    const currentKDA = matchupStats.getKDARatio(current);
    const opponentKDA = matchupStats.getKDARatio(opponent);
    if (currentKDA > opponentKDA) return "current";
    if (opponentKDA > currentKDA) return "opponent";
    return null;
  };

  const getWinner = (current, opponent) => {
    if (current > opponent) return "current";
    if (opponent > current) return "opponent";
    if (opponent === current) return null;
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
              <ProfileIcon profileIconId={currentPlayer.profileIcon} className="size-12" />
              <h3 className="text-lg font-bold">{currentPlayer.riotIdGameName}</h3>
            </div>
            <div>
              <ChampionIcon championName={currentPlayer.championName} className="size-8" />
            </div>
            <div>
              {Object.values(INDIVIDUAL_POSITION).includes(currentPlayer.individualPosition) ? (
                <div className="flex size-10 items-center justify-center">
                  <RoleIcon role={currentPlayer.individualPosition} className="size-6" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <ItemIcon itemId={currentPlayer.item0} className="size-6" />
            <ItemIcon itemId={currentPlayer.item1} className="size-6" />
            <ItemIcon itemId={currentPlayer.item2} className="size-6" />
            <ItemIcon itemId={currentPlayer.item3} className="size-6" />
            <ItemIcon itemId={currentPlayer.item4} className="size-6" />
            <ItemIcon itemId={currentPlayer.item5} className="size-6" />
            <ItemIcon itemId={currentPlayer.item6} className="size-6" />
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[281px] w-[500px]">
              <SplashArt championName={currentPlayer.championName} className="object-contain" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex w-1/3 flex-col gap-2">
          <div className="border-2 border-background bg-card p-4 ">
            <h4 className="mb-4 text-center text-xl font-bold text-foreground">Match Statistics</h4>
            {Object.entries(stats).map(([key, stat]) => {
              const currentValue = stat.getValue(currentPlayer);
              const opponentValue = stat.getValue(opponent);

              return (
                <div key={key} className="flex items-center justify-between border-b py-2">
                  <div
                    className={`${
                      (key === "kda"
                        ? getKDAWinner(currentPlayer, opponent(currentPlayer, matchInfo))
                        : getWinner(currentValue, opponentValue)) === "current"
                        ? "font-bold text-accent"
                        : (key === "kda"
                              ? getKDAWinner(currentPlayer, opponent(currentPlayer, matchInfo))
                              : getWinner(currentValue, opponentValue)) === "opponent"
                          ? "text-muted"
                          : "text-foreground"
                    } w-2/5 pr-3 text-right text-sm`}
                  >
                    {currentValue}
                  </div>
                  <div className="w-1/5 text-center">
                    <div className="rounded bg-gray-700/50 px-2 py-1 text-xs font-semibold text-foreground">
                      {stat.label}
                    </div>
                  </div>
                  <div
                    className={`${
                      (key === "kda"
                        ? getKDAWinner(currentPlayer, opponent(currentPlayer, matchInfo))
                        : getWinner(currentValue, opponentValue)) === "opponent"
                        ? "font-bold text-accent"
                        : (key === "kda"
                              ? getKDAWinner(currentPlayer, opponent(currentPlayer, matchInfo))
                              : getWinner(currentValue, opponentValue)) === "current"
                          ? "text-muted"
                          : "text-foreground"
                    } w-2/5 pl-3 text-left text-sm`}
                  >
                    {opponentValue}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Opponent*/}
        <div className="flex w-1/3 flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <div>
              <ProfileIcon profileIconId={opponent(currentPlayer, matchInfo).profileIcon} className="size-12" />
              <h3 className="text-lg font-bold">{opponent(currentPlayer, matchInfo).riotIdGameName}</h3>
            </div>
            <div>
              <ChampionIcon championName={opponent(currentPlayer, matchInfo).championName} className="size-8" />
            </div>
            <div>
              {Object.values(INDIVIDUAL_POSITION).includes(currentPlayer.individualPosition) ? (
                <div className="flex size-10 items-center justify-center">
                  <RoleIcon role={opponent(currentPlayer, matchInfo).individualPosition} className="size-6" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item0} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item1} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item2} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item3} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item4} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item5} className="size-6" />
            <ItemIcon itemId={opponent(currentPlayer, matchInfo).item6} className="size-6" />
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[281px] w-[500px]">
              <SplashArt championName={opponent(currentPlayer, matchInfo).championName} className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
