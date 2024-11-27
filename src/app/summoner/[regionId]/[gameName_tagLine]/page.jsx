import { REGION_IDS } from "@/lib/constants";
import { Riot } from "@/lib/server/riot";

export default async function Page({ params }) {
  const { regionId, gameName_tagLine } = await params;
  if (!Object.values(REGION_IDS).includes(regionId)) {
    throw new Error(`Invalid region: ${regionId}`);
  }
  const [gameName, tagLine] = gameName_tagLine.split("-");
  console.log("region", regionId);

  const riotAccount = await Riot.getRiotAccount(gameName, tagLine, regionId);
  const summonerAccount = await Riot.getSummonerAccount(riotAccount.puuid, regionId);
  const leagueEntries = await Riot.getLeagueEntries(summonerAccount.id, regionId);
  const matches = await Riot.getSummonerMatches(riotAccount.puuid, regionId);
  const matchHistory = await Promise.all(matches.map(async (match) => await Riot.getMatch(match, regionId)));
  return (
    <div>
      <div>
        <h1>Summoner Info</h1>
        <pre>{JSON.stringify(summonerAccount, null, 2)}</pre>
      </div>
      <div>
        <h1>League Entries</h1>
        <pre>{JSON.stringify(leagueEntries, null, 2)}</pre>
      </div>
      <div>
        <h1>Match History</h1>
        <pre>{JSON.stringify(matchHistory, null, 2)}</pre>
      </div>
    </div>
  );
}
