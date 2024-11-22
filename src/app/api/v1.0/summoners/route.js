import { NextResponse } from "next/server";
import { getRiotAccount } from "@/lib/server/riot";

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
    return NextResponse.json(riotAccount);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
};
