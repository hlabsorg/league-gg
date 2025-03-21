"use client";

import Image from "next/image";
import { DATA_DRAGON_ASSETS_PATH } from "@/constants/data_dragon";
import { useEffect, useState } from "react";
import { getChampionIdToNameMapping } from "@/lib/server/champions";

// const SUPABASE_ASSET_PATH = '/storage/v1/object/public/league-assets';

export function ChampionIcon({ championId, championName, size = 32 }) {
  const [name, setName] = useState(championName);

  useEffect(() => {
    if (!championName && championId) {
      getChampionIdToNameMapping().then(mapping => {
        setName(mapping[championId]);
      });
    }
  }, [championId, championName]);

  // If championName is provided or we've loaded it from the ID
  if (name) {
    return (
      <Image
        src={`${DATA_DRAGON_ASSETS_PATH}/img/champion/${name}.png`}
        alt={name}
        className="h-full w-full object-cover"
        width={size}
        height={size}
        unoptimized
      />
    );
  }

  // Show loading state while fetching name or if no data provided
  return <div className={`h-${size} w-${size} bg-gray-200 animate-pulse rounded-lg`} />;
}
