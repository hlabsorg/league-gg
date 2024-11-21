import { NextResponse } from "next/server";
import { getRiotAccount } from "@/lib/server/riot";

export const GET = async (req) => {
  const { gameName, tagLine, regionId } = await req.query;
  try {
    const riotAccount = await getRiotAccount(gameName, tagLine, regionId);
    return NextResponse.json(riotAccount);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.code, statusText: error.message });
  }
};
