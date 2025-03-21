// Cache for champion data
let championJson = {};
let championByIdCache = {};

export async function getLatestChampionDDragon(language = "en_US") {
  if (championJson[language]) {
    return championJson[language];
  }

  let response;
  let versionIndex = 0;
  
  // Loop over versions because some versions might be broken
  do {
    const versionsRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    const versions = await versionsRes.json();
    const version = versions[versionIndex++];

    response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`
    );
  } while (!response.ok);

  championJson[language] = await response.json();
  return championJson[language];
}

export async function getChampionIdToNameMapping(language = "en_US") {
  // Setup cache
  if (!championByIdCache[language]) {
    const json = await getLatestChampionDDragon(language);
    
    championByIdCache[language] = {};
    for (const championName in json.data) {
      if (!json.data.hasOwnProperty(championName)) continue;
      
      const champInfo = json.data[championName];
      championByIdCache[language][champInfo.key] = champInfo.id;
    }
  }

  return championByIdCache[language];
}

export async function getChampionByKey(key, language = "en_US") {
  const json = await getLatestChampionDDragon(language);
  const mapping = await getChampionIdToNameMapping(language);
  const championName = mapping[key];
  
  return championName ? json.data[championName] : null;
} 