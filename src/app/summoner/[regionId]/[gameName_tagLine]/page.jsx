import { REGION_IDS } from "@/lib/constants";
import { getRiotAccount, getSummonerAccount } from "@/lib/server/riot";

export default async function Page({ params }) {
  const { regionId, gameName_tagLine } = await params;
  if (!Object.values(REGION_IDS).includes(regionId)) {
    throw new Error(`Invalid region: ${regionId}`);
  }
  const [gameName, tagLine] = gameName_tagLine.split("-");
  console.log("region", regionId);

  const riotAccount = await getRiotAccount(gameName, tagLine, regionId);
  const summonerAccount = await getSummonerAccount(riotAccount.puuid, regionId);
  return <code>{JSON.stringify(summonerAccount)}</code>;
}
