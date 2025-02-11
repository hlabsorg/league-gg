import { REGION_IDS } from "@/constants/regions";
import {
  getSummonerProfile,
  getSummonerEntries,
  getSummonerMatchHistory,
  getSummonerProfileByPUUID,
} from "@/lib/server/actions/summoner-page";
import { ProfileIcon } from "@/components/profile-icon"; // Import your ProfileIcon component
import { ChampionIcon } from "@/components/champion-icon";

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
  const [participantOne, participantOneError] = await getSummonerProfileByPUUID(
    matchHistory.metadata.participants[0],
    regionId,
  );

  if (participantOneError) {
    return <div>{participantOneError.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex items-center mb-6">
        <ProfileIcon profileIconId={summonerProfile.profileIconId} />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{summonerProfile.gameName}#{summonerProfile.tagLine}</h1>
          <p className="text-gray-600">Level: {summonerProfile.summonerLevel}</p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">League Entries</h2>
        {entries.length > 0 ? (
          entries.map(entry => (
            <div key={entry.queueType} className="border p-4 mb-2 rounded bg-white shadow">
              <p className="font-bold">{entry.tier} {entry.rank} - LP: {entry.leaguePoints}</p>
              <p className="text-gray-500">{entry.queueType}</p>
            </div>
          ))
        ) : (
          <p>No league entries found.</p>
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Match History</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-medium">{matchHistory.info.gameMode}</h3>
              <p className="text-gray-600">{new Date(matchHistory.info.gameCreation).toLocaleDateString()}</p>
              <p className={`font-bold ${matchHistory.info.teams[0].win ? 'text-blue-600' : 'text-red-600'}`}>
                {matchHistory.info.teams[0].win ? 'Victory' : 'Defeat'}
              </p>
              <p className="text-sm text-gray-500">
                Duration: {Math.floor(matchHistory.info.gameDuration / 60)}m {matchHistory.info.gameDuration % 60}s
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Blue Team */}
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600 mb-2">Blue Team</h4>
                {matchHistory.info.participants
                  .filter(p => p.teamId === 100)
                  .map((participant) => (
                    <div key={participant.puuid} className="flex items-center p-2 bg-blue-50 rounded">
                      <div className="flex items-center gap-2">
                        <ChampionIcon championName={participant.championName} size={40} />
                        <ProfileIcon profileIconId={participant.profileIcon} size={32} />
                      </div>
                      <div className="ml-2 flex-grow">
                        <div className="flex items-center">
                          <p className="font-medium">{participant.riotIdGameName}</p>
                          <p className="text-sm text-gray-600 ml-1">#{participant.riotIdTagline}</p>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{participant.kills}/{participant.deaths}/{participant.assists}</span>
                          <span className="ml-2 text-gray-500">
                            CS: {participant.totalMinionsKilled}
                            {/* toFixed rounds the CS/min to one decimal place */}
                            {/* CS is displayed in seconds so convert it to min and then use the games duration */}
                            ({((participant.totalMinionsKilled * 60) / matchHistory.info.gameDuration).toFixed(1)}/min) 
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Red Team */}
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 mb-2">Red Team</h4>
                {matchHistory.info.participants
                  .filter(p => p.teamId === 200)
                  .map((participant) => (
                    <div key={participant.puuid} className="flex items-center p-2 bg-red-50 rounded">
                      <div className="flex items-center gap-2">
                        <ChampionIcon championName={participant.championName} size={40} />
                        <ProfileIcon profileIconId={participant.profileIcon} size={32} />
                      </div>
                      <div className="ml-2 flex-grow">
                        <div className="flex items-center">
                          <p className="font-medium">{participant.riotIdGameName}</p>
                          <p className="text-sm text-gray-600 ml-1">#{participant.riotIdTagline}</p>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{participant.kills}/{participant.deaths}/{participant.assists}</span>
                          <span className="ml-2 text-gray-500">
                            CS: {participant.totalMinionsKilled}
                            ({((participant.totalMinionsKilled * 60) / matchHistory.info.gameDuration).toFixed(1)}/min)
                          </span>
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

    {/* </div>
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
} */}
