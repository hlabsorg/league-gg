"use server";

import { getServerClient } from "@/lib/supabase/server";

export const upsertSummonerProfile = async (summonerProfile) => {
  const supabase = await getServerClient();
  const { error } = await supabase.from("summoner_profiles").upsert(summonerProfile);
  if (error) {
    console.error("SUPABASE UPSERT ERROR: ", error);
  } else {
    console.log("SUPABASE UPSERT SUCCESS: ", summonerProfile.gameName);
  }
};
