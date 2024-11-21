import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { query, regionId } = await req.json();
};
