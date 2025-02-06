import { REGION_IDS } from "@/constants/regions";
import {
  getSummonerProfile,
  getSummonerEntries,
  getSummonerMatchHistory,
  getSummonerProfileByPUUID,
} from "@/lib/server/actions/summoner-page";

export default async function Page({ params }) {
  const { regionId, gameName_tagLine } = await params;
  if (!Object.values(REGION_IDS).includes(regionId)) {
    return <div>Invalid region: {regionId}</div>;
  }
  const [gameName, tagLine] = gameName_tagLine.split("-");

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
    <div>
      <div>
        <h1>Summoner Info</h1>
        <pre>{JSON.stringify(summonerProfile, null, 2)}</pre>
      </div>
      <div>
        <h1>League Entries</h1>
        <pre>{JSON.stringify(entries, null, 2)}</pre>
      </div>
      {/* <div>
        <h1>Match History</h1>
        <pre>{JSON.stringify(matchHistory, null, 2)}</pre>
      </div> */}
      <div>
        <h1>ParticipantOne </h1>
        <pre>{JSON.stringify(participantOne, null, 2)}</pre>
      </div>
    </div>
  );
}
