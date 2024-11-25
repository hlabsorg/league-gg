import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return NextResponse.json(
      {
        message: "healthy",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: "Unable to connect to DB" });
  }
};

export const runtime = "edge";
