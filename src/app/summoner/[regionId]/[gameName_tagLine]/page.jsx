import { REGION_IDS } from "@/constants/regions";
import {
  getSummonerProfile,
  getSummonerEntries,
  getSummonerMatchHistory,
  getSummonerChampionMasteries,
  getMappedChampionNames,
} from "@/lib/server/actions/summoner-page";
import { ProfileIcon } from "@/components/profile-icon"; // Import your ProfileIcon component
import { MatchHistory } from "@/components/match-history";
import { QUEUE_IDS } from "@/constants/queue-types";
import { ChampionMasteries } from "@/components/champion-masteries";
import { QueueTypeHeader } from "@/components/queue-type-header";
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

  const [entries, entriesError] = await getSummonerEntries(summonerProfile.puuid, regionId);
  if (entriesError) {
    return <div>{entriesError.message}</div>;
  }

  const [masteries, masteriesError] = await getSummonerChampionMasteries(summonerProfile.puuid, regionId);
  if (masteriesError) {
    return <div>Error loading champion masteries</div>;
  }

  const [matchHistory, matchHistoryError] = await getSummonerMatchHistory(summonerProfile.puuid, regionId, queueId);

  if (matchHistoryError) {
    return <div>Error loading match history</div>;
  }

  const [championNames, championNamesError] = await getMappedChampionNames();
  if (championNamesError) {
    return <div>Error loading champion names</div>;
  }

  return (
    <div className="bg-background p-6">
      <div className="mb-6 flex items-center">
        <ProfileIcon profileIconId={summonerProfile.profileIconId} className="size-16 md:size-24 lg:size-32" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">
            {summonerProfile.gameName}#{summonerProfile.tagLine}
          </h1>
          <p className="text-muted">Level: {summonerProfile.summonerLevel}</p>
          <div className="font-bold text-white">
            {entries.length > 0 ? (
              <>
                <div>
                  {entries[0].tier} {entries[0].rank}
                </div>
                <div>LP: {entries[0].leaguePoints}</div>
                <div>
                  Wins: {entries[0].wins} Losses: {entries[0].losses}
                </div>
              </>
            ) : (
              "No League Entries Found"
            )}
          </div>
        </div>
      </div>
      <QueueTypeHeader regionId={regionId} gameName_tagLine={gameName_tagLine} activeQueue={queueType} />
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Champion Masteries</h2>
        <ChampionMasteries masteries={masteries} championNames={championNames} />
      </div>
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Match History</h2>
        <div className="text-lg font-bold">Last {matchHistory.length} matches</div>
        <MatchHistory
          matches={matchHistory}
          regionId={regionId}
          summonerName={summonerProfile.gameName}
          championNames={championNames}
        />
      </div>

      {process.env.NEXT_PUBLIC_DEBUG_MODE == "true" && (
        <div>
          <h1>Debug Information</h1>
          {/* <h2>Match History</h2>
        <pre>{JSON.stringify(matchHistory, null, 2)}</pre>
        <h2>Champion Masteries</h2>
        <pre>{JSON.stringify(masteries, null, 2)}</pre> */}
          <h2>Entries / Ranks</h2>
          <pre>{JSON.stringify(entries, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
