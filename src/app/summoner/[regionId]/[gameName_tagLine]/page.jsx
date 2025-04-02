import { REGION_IDS } from "@/constants/regions";
import { getSummonerProfile, getSummonerEntries, getSummonerMatchHistory, getSummonerChampionMasteries } from "@/lib/server/actions/summoner-page";
import { ProfileIcon } from "@/components/profile-icon"; // Import your ProfileIcon component
import { MatchHistory } from "@/components/match-history";
import { QUEUE_IDS, QUEUE_TYPES } from "@/constants/queueTypes";
import Link from "next/link";
import { ChampionMasteries } from "@/components/champion-masteries";


export default async function Page({ params, searchParams }) {
  const queryParams = await searchParams;
  const queueType = queryParams.hasOwnProperty("queue") ? queryParams.queue : "all";
  const queueId = QUEUE_IDS[queueType] || null;
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

  const [masteries, masteriesError] = await getSummonerChampionMasteries(summonerProfile.puuid, regionId);
  if (masteriesError) {
    return <div>Error loading champion masteries</div>;
  }

  const [masteries, masteriesError] = await getSummonerChampionMasteries(summonerProfile.puuid, regionId);
  if (masteriesError) {
    return <div>Error loading champion masteries</div>;
  }

  const [matchHistory, matchHistoryError] = await getSummonerMatchHistory(summonerProfile.puuid, regionId, queueId);

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
        <h2 className="mb-4 text-2xl font-semibold">Champion Masteries</h2>
        <ChampionMasteries masteries={masteries} />
      </div>
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Match History</h2>
        <div>
        <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.SOLO}`}> solo
        </Link>
        <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.FLEX}`}> flex
        </Link>
        
        </div>
          <MatchHistory matches={matchHistory} regionId={regionId} summonerName={summonerProfile.gameName} queueId={queueId}/>
        
      </div>

      {process.env.NEXT_PUBLIC_DEBUG_MODE == "true" && (
        <div>
          <h1>Debug Information</h1>
          <h2>Match History</h2>
          <pre>{JSON.stringify(matchHistory, null, 2)}</pre>
          <h2>Champion Masteries</h2>
          <pre>{JSON.stringify(masteries, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
