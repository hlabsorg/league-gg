import { RoleIcon } from "./role-icon";
import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import { ItemIcon } from "./item-icon";
import { MatchStats } from "@/helpers/stats";
import { INDIVIDUAL_POSITION } from "@/constants/individual-position";
import { SplashArt } from "./splash-art"

export function Matchup({ currentPlayer, matchInfo }) {
  const opponent = (currentPlayer, matchInfo) => {
    return matchInfo.participants.find(
      (player) =>
        player.teamId !== currentPlayer.teamId && player.individualPosition === currentPlayer.individualPosition,
    );
  };

  const matchupStats = new MatchStats(matchInfo);
  const stats = matchupStats.getAllStats();

  const getKDAWinner = (current, opponent) => {
    const currentKDA = matchupStats.getKDARatio(current);
    const opponentKDA = matchupStats.getKDARatio(opponent);
    if (currentKDA > opponentKDA) return 'current'
    if (opponentKDA > currentKDA) return 'opponent'
    return null;
  };

  const getWinner = (current, opponent) => {
    if (current > opponent) return 'current';
    if (opponent > current) return 'opponent';
    if (opponent === current) return null;
  };

  return (
    <div   className="bg-[url('/assets/background/matchupBG.png')] aspect-video bg-cover bg-center">
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
              <ProfileIcon profileIconId={currentPlayer.profileIcon} className="size-12" />
              <h3 className="text-lg font-bold">{currentPlayer.summonerName}</h3>
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
          <div className="flex gap-2 justify-center">
            <ItemIcon itemId={currentPlayer.item0} className="size-6" />
            <ItemIcon itemId={currentPlayer.item1} className="size-6" />
            <ItemIcon itemId={currentPlayer.item2} className="size-6" />
            <ItemIcon itemId={currentPlayer.item3} className="size-6" />
            <ItemIcon itemId={currentPlayer.item4} className="size-6" />
            <ItemIcon itemId={currentPlayer.item5} className="size-6" />
            <ItemIcon itemId={currentPlayer.item6} className="size-6" />
          </div>
          <div className="flex justify-center items-center">
          <div className="relative w-[500px] h-[281px]">
            <SplashArt championName= {currentPlayer.championName} className="object-contain"/>
          </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col gap-2 w-1/3">
          <div className="bg-card p-4 border-2 border-background ">
            <h4 className="text-xl font-bold text-foreground text-center mb-4">Match Statistics</h4>
            {Object.entries(stats).map(([key, stat]) => {
              const currentValue = stat.getValue(currentPlayer);
              const opponentValue = stat.getValue(opponent(currentPlayer, matchInfo));
              
              return (
                <div key={key} className="flex items-center justify-between py-2 border-b">
                  <div className={`${
                    (key === 'kda' ? getKDAWinner(currentPlayer, opponent(currentPlayer, matchInfo)) : getWinner(currentValue, opponentValue)) === 'current' ? 'text-accent font-bold' : 
                    (key === 'kda' ? getKDAWinner(currentPlayer, opponent(currentPlayer, matchInfo)) : getWinner(currentValue, opponentValue)) === 'opponent' ? 'text-muted' : 'text-foreground'
                  } w-2/5 text-right pr-3 text-sm`}>
                    {currentValue}
                  </div>
                  <div className="w-1/5 text-center">
                    <div className="text-xs font-semibold text-foreground bg-gray-700/50 px-2 py-1 rounded">
                      {stat.label}
                    </div>
                  </div>
                  <div className={`${
                    (key === 'kda' ? getKDAWinner(currentPlayer, opponent(currentPlayer, matchInfo)) : getWinner(currentValue, opponentValue)) === 'opponent' ? 'text-accent font-bold' : 
                    (key === 'kda' ? getKDAWinner(currentPlayer, opponent(currentPlayer, matchInfo)) : getWinner(currentValue, opponentValue)) === 'current' ? 'text-muted' : 'text-foreground'
                  } w-2/5 text-left pl-3 text-sm`}>
                    {opponentValue}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Opponent*/}
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex gap-2 justify-center items-center">
            <div>
              <ProfileIcon profileIconId={opponent(currentPlayer, matchInfo).profileIcon} className="size-12" />
              <h3 className="text-lg font-bold">{opponent(currentPlayer, matchInfo).summonerName}</h3>
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
          <div className="flex justify-center items-center">
          <div className="relative w-[500px] h-[281px]">
            <SplashArt championName= {opponent(currentPlayer, matchInfo).championName} className="object-contain"/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
