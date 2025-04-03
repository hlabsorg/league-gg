import { DATA_DRAGON_ASSETS_PATH } from "@/constants/data-dragon";
import { setCache, checkCache } from "@/db/redis/cache";

const getLatestChampionDDragon = async (language = "en_US") => {
  const url = `${DATA_DRAGON_ASSETS_PATH}/data/${language}/champion.json`;
  const cached = await checkCache(url);
  if (cached) {
    return cached;
  }
  const res = await fetch(url);
  const response = await res.json();
  if (!res.ok) {
    const error = new Error("Error fetching champions from data dragon");
    error.status = res.status;
    throw Error;
  }
  await setCache(url, response);
  return response;
};

const getChampionIdToNameMapping = async (language = "en_US") => {
  const json = await getLatestChampionDDragon(language);
  return Object.fromEntries(
    Object.values(json.data).map((champ) => [champ.key, champ.id]), // Takes the json data and turns it into an array with the key(number) and id(champion name).
    // The map gives us the an array of arrays that contains the champion id number and the champion name.
    // object.fromentries turns it into an object with the key being the champion id number and the value being the champion name.
  );
};

const getChampionByKey = async (key, language = "en_US") => {
  const getChampionName = await getChampionIdToNameMapping(language);
  const championName = getChampionName[key];
  return championName;
};

export const DataDragon = {
  getLatestChampionDDragon,
  getChampionIdToNameMapping,
  getChampionByKey,
};
