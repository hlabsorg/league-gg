import "server-only";

import { REGION_MAP } from "@/constants/regions";
import { setCache, checkCache } from "@/db/redis/cache";

const requestRiot = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      Origin: "https://developer.riotgames.com",
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });

const getRiotAccountByName = async (gameName, tagLine, regionId) => {
  const prefix = REGION_MAP[regionId];
  const url = `https://${prefix}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  const res = await requestRiot(url);
  const response = await res.json();
  if (!res.ok) {
    const error = new Error(response.status.message);
    error.status = res.status;
    throw error;
  }
  return response;
};

const getSummonerAccountByPUUID = async (puuid, regionId) => {
  const url = `https://${regionId}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
  const cached = await checkCache(url);
  if (cached) {
    return cached;
  }
  const res = await requestRiot(url);
  const response = await res.json();
  if (!res.ok) {
    const error = new Error(response.status.message);
    error.status = res.status;
    throw error;
  }
  await setCache(url, response);
  return response;
};

const getLeagueEntries = async (summonerId, regionId) => {
  const url = `https://${regionId}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
  const cached = await checkCache(url);
  if (cached) {
    return cached;
  }
  const res = await requestRiot(url);
  const response = await res.json();
  if (!res.ok) {
    const error = new Error(response.status.message);
    error.status = res.status;
    throw error;
  }
  await setCache(url, response);
  return response;
};

const getSummonerMatches = async (puuid, regionId, queueId) => {
  const prefix = REGION_MAP[regionId];
  const queue = queueId ? queueId : "";
  const url = `https://${prefix}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${queue}`;
  const cached = await checkCache(url);
  if (cached) {
    return cached;
  }
  const res = await requestRiot(url);
  const response = await res.json();
  if (!res.ok) {
    const error = new Error(response.status.message);
    error.status = res.status;
    throw error;
  }
  await setCache(url, response, {
    ex: 28800,
  });
  return response;
};

const getMatch = async (matchId, regionId) => {
  const prefix = REGION_MAP[regionId];
  const url = `https://${prefix}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
  const cached = await checkCache(url);
  if (cached) {
    return cached;
  }
  const res = await requestRiot(url);
  const response = await res.json();
  if (!res.ok) {
    const error = new Error(response.status.message);
    error.status = res.status;
    throw error;
  }
  await setCache(url, response, {
    ex: 604800,
  });
  return response;
};

const getChampionMasteries = async (puuid, regionId) => {
  const url = `https://${regionId}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`;
  const cached = await checkCache(url);
  if (cached) {
    return cached;
  }
  const res = await requestRiot(url);
  const response = await res.json();
  if (!res.ok) {
    const error = new Error(response.status.message);
    error.status = res.status;
    throw error;
  }
  await setCache(url, response);
  return response;
};

export const Riot = {
  getRiotAccountByName,
  getSummonerAccountByPUUID,
  getLeagueEntries,
  getSummonerMatches,
  getMatch,
  getChampionMasteries,
};
