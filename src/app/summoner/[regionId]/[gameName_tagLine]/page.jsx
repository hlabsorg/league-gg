import { REGION_IDS } from "@/constants/regions";
import Link from "next/link";
import { getSummonerProfile, getSummonerEntries, getSummonerMatchHistory } from "@/lib/server/actions/summoner-page";
import { ProfileIcon } from "@/components/profile-icon"; // Import your ProfileIcon component
import { ChampionIcon } from "@/components/champion-icon";
import { ItemIcon } from "@/components/item-icon";
import { MatchHistory } from "@/components/match-history";

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
    return <div>Error loading match history</div>;
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
        <MatchHistory matches={matchHistory} regionId={regionId} summonerName={summonerProfile.gameName} />
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
