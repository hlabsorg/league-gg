import "server-only";
import { REGION_MAP } from "../constants";

export const requestRiot = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      Origin: "https://developer.riotgames.com",
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });

export const getRiotAccount = async (gameName, tagLine, regionId) => {
  const prefix = REGION_MAP[regionId];
  const url = `https://${prefix}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  const res = await requestRiot(url);
  if (!res.ok) {
    const error = new Error(`Error fetching riot account: ${res.statusText}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const getSummonerAccount = async (puuid, regionId) => {
  const url = `https://${regionId}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
  const res = await requestRiot(url);
  if (!res.ok) {
    const error = new Error(`Error fetching summoner account: ${res.statusText}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
};
