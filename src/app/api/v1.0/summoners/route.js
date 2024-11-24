import { NextResponse } from "next/server";
import { getRiotAccount, getSummonerAccount } from "@/lib/server/riot";

export const GET = async (req) => {
  const { searchParams } = req.nextUrl;
  const gameName = searchParams.get("gameName");
  const tagLine = searchParams.get("tagLine");
  const regionId = searchParams.get("regionId");
  if (!gameName || !tagLine || !regionId) {
    return NextResponse.json({ error: "Missing required parameter" }, { status: 400 });
  }
  try {
    const riotAccount = await getRiotAccount(gameName, tagLine, regionId);
    const summonerAccount = await getSummonerAccount(riotAccount.puuid, regionId);
    const summonerProfile = {
      gameName: riotAccount.gameName,
      tagLine: riotAccount.tagLine,
      profileIconId: summonerAccount.profileIconId,
      summonerLevel: summonerAccount.summonerLevel,
    };
    return NextResponse.json(summonerProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
};

export const runtime = "edge";
