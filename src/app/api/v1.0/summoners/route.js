import { NextResponse } from "next/server";
import { Riot } from "@/lib/server/riot";
import { setCache, checkCache } from "@/db/redis/cache";

export const GET = async (req) => {
  const cached = await checkCache(req.url);
  if (cached) {
    return NextResponse.json(cached);
  }
  const { searchParams } = req.nextUrl;
  const gameName = searchParams.get("gameName");
  const tagLine = searchParams.get("tagLine");
  const regionId = searchParams.get("regionId");
  if (!gameName || !tagLine || !regionId) {
    return NextResponse.json({ error: "Missing required parameter" }, { status: 400 });
  }
  try {
    const riotAccount = await Riot.getRiotAccount(gameName, tagLine, regionId);
    const summonerAccount = await Riot.getSummonerAccount(riotAccount.puuid, regionId);
    const summonerProfile = {
      regionId,
      ...riotAccount,
      ...summonerAccount,
    };
    // setting cache
    await setCache(req.url, summonerProfile);
    return NextResponse.json(summonerProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
};
