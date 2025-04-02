export async function getLatestChampionDDragon(language = "en_US") {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_DATA_DRAGON_VERSION}/data/${language}/champion.json`
  );
  return await response.json();
}

export async function getChampionIdToNameMapping(language = "en_US") {
  const json = await getLatestChampionDDragon(language);
  return Object.fromEntries( 
    Object.values(json.data).map(champ => [champ.key, champ.id])// Takes the json data and turns it into an array with the key(number) and id(champion name). 
    // The map gives us the an array of arrays that contains the champion id number and the champion name. 
    // object.fromentries turns it into an object with the key being the champion id number and the value being the champion name.
  );
}

export async function getChampionByKey(key, language = "en_US") {
  const getChampionName = await getChampionIdToNameMapping(language);
  const championName = getChampionName[key];
  return championName ? json.data[championName] : null;
} 