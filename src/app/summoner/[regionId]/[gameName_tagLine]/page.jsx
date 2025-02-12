import { REGION_IDS } from "@/constants/regions";
import Link from "next/link";
import { getSummonerProfile, getSummonerEntries, getSummonerMatchHistory } from "@/lib/server/actions/summoner-page";
import { ProfileIcon } from "@/components/profile-icon"; // Import your ProfileIcon component
import { ChampionIcon } from "@/components/champion-icon";
import { ItemIcon } from "@/components/item-icon";

export default async function Page({ params }) {
  const { regionId, gameName_tagLine } = await params;
  if (!Object.values(REGION_IDS).includes(regionId)) {
    return <div>Invalid region: {regionId}</div>;
  }
  const [gameName, tagLine] = gameName_tagLine.split("-");

  // const riotAccount = await Riot.getRiotAccount(gameName, tagLine, regionId);
  // const summonerAccount = await Riot.getSummonerAccount(riotAccount.puuid, regionId);
  const [summonerProfile, profileError] = await getSummonerProfile(gameName, tagLine, regionId);
  if (profileError) {
    return <div>{profileError.message}</div>;
  }

  const [entries, entriesError] = await getSummonerEntries(summonerProfile.id, regionId);
  if (entriesError) {
    return <div>{entriesError.message}</div>;
  }

  const [matchHistory, matchHistoryError] = await getSummonerMatchHistory(summonerProfile.puuid, regionId);

  if (matchHistoryError) {
    return <div>{matchHistoryError.message}</div>;
  }

  return (
    <div className="bg-gray-100 p-6">
      <div className="mb-6 flex items-center">
        <ProfileIcon profileIconId={summonerProfile.profileIconId} />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">
            {summonerProfile.gameName}#{summonerProfile.tagLine}
          </h1>
          <p className="text-gray-600">Level: {summonerProfile.summonerLevel}</p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">League Entries</h2>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.queueType} className="mb-2 rounded border bg-white p-4 shadow">
              <p className="font-bold">
                {entry.tier} {entry.rank} - LP: {entry.leaguePoints}
              </p>
              <p className="text-gray-500">{entry.queueType}</p>
            </div>
          ))
        ) : (
          <p>No league entries found.</p>
        )}
      </div>
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Match History</h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-medium">{matchHistory.info.gameMode}</h3>
              <p className="text-gray-600">{new Date(matchHistory.info.gameCreation).toLocaleDateString()}</p>
              <p className={`font-bold ${matchHistory.info.teams[0].win ? "text-blue-600" : "text-red-600"}`}>
                {matchHistory.info.teams[0].win ? "Victory" : "Defeat"}
              </p>
              <p className="text-sm text-gray-500">
                Duration: {Math.floor(matchHistory.info.gameDuration / 60)}m {matchHistory.info.gameDuration % 60}s
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Blue Team */}
              <div className="space-y-2">
                <h4 className="mb-2 font-semibold text-blue-600">Blue Team</h4>
                {matchHistory.info.participants
                  .filter((p) => p.teamId === 100)
                  .map((participant) => (
                    <div key={participant.puuid} className="flex items-center rounded bg-blue-50 p-2">
                      <div className="flex items-center gap-2">
                        <ChampionIcon championName={participant.championName} size={40} />
                        <Link
                          prefetch
                          href={`/summoner/${regionId}/${participant.riotIdGameName}-${participant.riotIdTagline}`}
                          className="w-full"
                        >
                          <ProfileIcon profileIconId={participant.profileIcon} size={32} />
                        </Link>
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
                            {((participant.totalMinionsKilled * 60) / matchHistory.info.gameDuration).toFixed(1)}/min)
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="size-6">
                              <ItemIcon itemId={participant.item0} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item1} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item2} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item3} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item4} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item5} />
                            </div>
                          </div>
                          <div className="ml-1 size-6">
                            <ItemIcon itemId={participant.item6} /> {/* Trinket */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Red Team */}
              <div className="space-y-2">
                <h4 className="mb-2 font-semibold text-red-600">Red Team</h4>
                {matchHistory.info.participants
                  .filter((p) => p.teamId === 200)
                  .map((participant) => (
                    <div key={participant.puuid} className="flex items-center rounded bg-red-50 p-2">
                      <div className="flex items-center gap-2">
                        <ChampionIcon championName={participant.championName} size={40} />
                        <Link
                          prefetch
                          href={`/summoner/${regionId}/${participant.riotIdGameName}-${participant.riotIdTagline}`}
                          className="w-full"
                        >
                          <ProfileIcon profileIconId={participant.profileIcon} size={32} />
                        </Link>
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
                            {((participant.totalMinionsKilled * 60) / matchHistory.info.gameDuration).toFixed(1)}/min)
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="size-6">
                              <ItemIcon itemId={participant.item0} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item1} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item2} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item3} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item4} />
                            </div>
                            <div className="size-6">
                              <ItemIcon itemId={participant.item5} />
                            </div>
                          </div>
                          <div className="ml-1 size-6">
                            <ItemIcon itemId={participant.item6} /> {/* Trinket */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1>Match History</h1>
        <pre>{JSON.stringify(matchHistory, null, 2)}</pre>
      </div>
    </div>
  );
}

{
  /* </div>
    <div>
      <div>
        <h1>
          <ProfileIcon profileIconId={summonerProfile.profileIconId} />
          Summoner Info</h1>
        <pre>{JSON.stringify(summonerProfile, null, 2)}</pre>
      </div>
      <div>
        <h1>League Entries</h1>
        <pre>{JSON.stringify(entries, null, 2)}</pre>
      </div>
      <div>
        <h1>Match History</h1>
        <pre>{JSON.stringify(matchHistory, null, 2)}</pre>
      </div>
      <div>
        <h1>ParticipantOne </h1>
        <pre>{JSON.stringify(participantOne, null, 2)}</pre>
      </div>
    </div>
  );
} */
}
