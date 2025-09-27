import { NextResponse } from "next/server";
import { Riot } from "@/lib/riot/riot";
import { getServerClient } from "@/lib/supabase/server";

export const GET = async (req) => {
  const { searchParams } = req.nextUrl;
  const gameName = searchParams.get("gameName");
  const tagLine = searchParams.get("tagLine");
  const regionId = searchParams.get("regionId");
  if (!gameName || !tagLine || !regionId) {
    return NextResponse.json({ error: "Missing required parameter" }, { status: 400 });
  }
  try {
    const riotAccount = await Riot.getRiotAccountByName(gameName, tagLine, regionId);
    const summonerAccount = await Riot.getSummonerAccountByPUUID(riotAccount.puuid, regionId);
    const summonerProfile = {
      regionId,
      gameName: riotAccount.gameName,
      tagLine: riotAccount.tagLine,
      profileIconId: summonerAccount.profileIconId,
      revisionDate: summonerAccount.revisionDate,
      summonerLevel: summonerAccount.summonerLevel,
    };
    const supabase = await getServerClient();
    const { error } = await supabase.from("summoner_profiles").upsert(summonerProfile);
    if (error) console.error("SUPABASE INSERT ERROR: ", error);
    return NextResponse.json(summonerProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
};
