import { DATA_DRAGON_ASSETS_PATH } from "@/constants/data-dragon";

export async function getLatestChampionDDragon(language = "en_US") {
  const response = await fetch(`${DATA_DRAGON_ASSETS_PATH}/data/${language}/champion.json`);
  return await response.json();
}

export async function getChampionIdToNameMapping(language = "en_US") {
  const json = await getLatestChampionDDragon(language);
  return Object.fromEntries(
    Object.values(json.data).map((champ) => [champ.key, champ.id]), // Takes the json data and turns it into an array with the key(number) and id(champion name).
    // The map gives us the an array of arrays that contains the champion id number and the champion name.
    // object.fromentries turns it into an object with the key being the champion id number and the value being the champion name.
  );
}

export async function getChampionByKey(key, language = "en_US") {
  const getChampionName = await getChampionIdToNameMapping(language);
  const championName = getChampionName[key];
  return championName;
}
