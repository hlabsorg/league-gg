"use server";

import { Riot } from "@/lib/server/riot";

export const getSummonerProfile = async (gameName, tagLine, regionId) => {
  try {
    const riotAccount = await Riot.getRiotAccount(gameName, tagLine, regionId);
    const summonerAccount = await Riot.getSummonerAccount(riotAccount.puuid, regionId);
    const summonerProfile = {
      ...riotAccount,
      ...summonerAccount,
    };
    return [summonerProfile, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const getSummonerProfileByPUUID = async (puuid, regionId) => {
  try {
    const summonerAccount = await Riot.getSummonerAccount(puuid, regionId);
    const summonerProfile = {
      ...summonerAccount,
    };
    return [summonerProfile, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const getSummonerEntries = async (summonerId, regionId) => {
  try {
    const entries = await Riot.getLeagueEntries(summonerId, regionId);
    return [entries, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const getSummonerMatchHistory = async (puuid, regionId) => {
  try {
    const matches = await Riot.getSummonerMatches(puuid, regionId);
    const matchHistory = await Riot.getMatch(matches[0], regionId);
    return [matchHistory, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};
