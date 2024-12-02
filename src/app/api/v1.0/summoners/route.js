import { NextResponse } from "next/server";
import { Riot } from "@/lib/server/riot";
import { createServerClient } from "@/lib/supabase/clients";

export const GET = async (req) => {
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
      summonerId: summonerAccount.id,
      id: undefined,
    };
    const supabase = await createServerClient();
    const { error } = await supabase.from("summoner_profiles").upsert(summonerProfile);
    if (error) console.error("SUPABASE INSERT ERROR: ", error);
    return NextResponse.json(summonerProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
};
