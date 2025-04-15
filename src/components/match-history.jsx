import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import { ItemIcon } from "./item-icon";
import { TeamDisplay } from "./team-display";

export function MatchHistory({ matches, regionId, summonerName, championNames }) {
  if (!matches || !Array.isArray(matches)) {
    return <div>No matches found</div>;
  }

  return (
    <Accordion type="single" collapsible className="space-y-4">
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
          <AccordionItem key={match.info.gameId} value={`match-${index}`} className="rounded-lg border">
            <AccordionTrigger className="w-full px-4 py-2 hover:no-underline">
              <div className="flex w-full items-center gap-4">
                {/* Left side - Game info */}
                <div className="w-24 shrink-0">
                  <p className="font-medium">{match.info.gameMode}</p>
                  <p className={`font-bold ${currentPlayer.win ? "text-blue-600" : "text-red-600"}`}>
                    {currentPlayer.win ? "Victory" : "Defeat"}
                  </p>
                  <p className="text-sm text-gray-500">{Math.floor(match.info.gameDuration / 60)}m</p>
                </div>

                {/* Champion and Summoner Info in preview */}
                <div className="flex items-center gap-2">
                  <ProfileIcon profileIconId={currentPlayer.profileIcon} className="size-12 lg:size-14" />
                  <div className="overflow-hidden">
                    <ChampionIcon championName={championNames[currentPlayer.championId]} className="size-6 lg:size-7" />
                  </div>
                </div>

                {/* KDA and CS */}
                <div className="grow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {currentPlayer.kills}/{currentPlayer.deaths}/{currentPlayer.assists}
                    </span>
                    <span className="text-gray-600">
                      {((currentPlayer.kills + currentPlayer.assists) / Math.max(1, currentPlayer.deaths)).toFixed(2)}{" "}
                      KDA
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
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
                <div className="shrink-0 text-right text-sm text-gray-500">
                  {new Date(match.info.gameCreation).toLocaleDateString()}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <TeamDisplay 
                color="blue"
                participants={match.info.participants}
                gameDuration={match.info.gameDuration}
                regionId={regionId}
                />
                <TeamDisplay 
                color="red"
                participants={match.info.participants}
                gameDuration={match.info.gameDuration}
                regionId={regionId}
                />



              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
