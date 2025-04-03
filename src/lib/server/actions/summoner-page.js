"use server";

import { Riot } from "@/lib/server/riot";
import { getChampionIdToNameMapping } from "@/lib/server/champions";

export const getSummonerProfile = async (gameName, tagLine, regionId) => {
  try {
    const riotAccount = await Riot.getRiotAccountByName(gameName, tagLine, regionId);
    const summonerAccount = await Riot.getSummonerAccountByPUUID(riotAccount.puuid, regionId);
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
    const summonerAccount = await Riot.getSummonerAccountByPUUID(puuid, regionId);
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

export const getSummonerMatchHistory = async (puuid, regionId, queueId) => {
  try {
    const matchIds = await Riot.getSummonerMatches(puuid, regionId, queueId );
    // Fetch first 3 matches
    const matchPromises = matchIds.slice(0, 3).map(matchId => 
      Riot.getMatch(matchId, regionId)
    );
    const matches = await Promise.all(matchPromises);
    return [matches, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const getSummonerChampionMasteries = async (puuid, regionId) => {
  try {
    const masteries = await Riot.getChampionMasteries(puuid, regionId);
    return [masteries, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const getMappedChampionNames = async () => {
  try {
    const championNames = await getChampionIdToNameMapping();
    return [championNames, null]
  } catch (error){
    console.error(error);
    return [null, error];
  }
}