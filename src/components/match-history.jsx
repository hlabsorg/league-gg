import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ProfileIcon } from "./profile-icon";
import { ChampionIcon } from "./champion-icon";
import Link from "next/link";
import { ItemIcon } from "./item-icon";

export function MatchHistory({ matches, regionId, summonerName }) {
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
                  <ProfileIcon profileIconId={currentPlayer.profileIcon} size={32} />
                  <div className="size-7 overflow-hidden">
                    <ChampionIcon championName={currentPlayer.championName} size={28} />
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
                  <ItemIcon itemId={currentPlayer.item0} size={24} />
                  <ItemIcon itemId={currentPlayer.item1} size={24} />
                  <ItemIcon itemId={currentPlayer.item2} size={24} />
                  <ItemIcon itemId={currentPlayer.item3} size={24} />
                  <ItemIcon itemId={currentPlayer.item4} size={24} />
                  <ItemIcon itemId={currentPlayer.item5} size={24} />
                  <ItemIcon itemId={currentPlayer.item6} size={24} />
                </div>

                {/* Game Time */}
                <div className="shrink-0 text-right text-sm text-gray-500">
                  {new Date(match.info.gameCreation).toLocaleDateString()}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                {/* Blue Team */}
                <div className="space-y-2">
                  <h4 className="mb-2 font-semibold text-blue-600">Blue Team</h4>
                  {match.info.participants
                    .filter((p) => p.teamId === 100)
                    .map((participant) => (
                      <div key={participant.puuid} className="flex items-center rounded bg-blue-50 p-2">
                        <div className="flex items-center gap-2">
                          <Link
                            prefetch
                            href={`/summoner/${regionId}/${participant.riotIdGameName}-${participant.riotIdTagline}`}
                          >
                            <ProfileIcon profileIconId={participant.profileIcon} size={32} />
                          </Link>
                          <div className="size-6">
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
                              {((participant.totalMinionsKilled * 60) / match.info.gameDuration).toFixed(1)}/min)
                            </span>
                          </div>
                          <div className="mt-1 flex gap-1">
                            <ItemIcon itemId={participant.item0} size={24} />
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

                {/* Red Team */}
                <div className="space-y-2">
                  <h4 className="mb-2 font-semibold text-red-600">Red Team</h4>
                  {match.info.participants
                    .filter((p) => p.teamId === 200)
                    .map((participant) => (
                      <div key={participant.puuid} className="flex items-center rounded bg-red-50 p-2">
                        <div className="flex items-center gap-2">
                          <Link
                            prefetch
                            href={`/summoner/${regionId}/${participant.riotIdGameName}-${participant.riotIdTagline}`}
                          >
                            <ProfileIcon profileIconId={participant.profileIcon} size={32} />
                          </Link>
                          <div className="size-6">
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
                              {((participant.totalMinionsKilled * 60) / match.info.gameDuration).toFixed(1)}/min)
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
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
