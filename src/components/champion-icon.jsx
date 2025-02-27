import Image from "next/image";
import { DATA_DRAGON_ASSETS_PATH } from "@/constants/data_dragon";

// const SUPABASE_ASSET_PATH = '/storage/v1/object/public/league-assets';

export function ChampionIcon({ championName, size = 32 }) {
  if (!championName) return null;

  return (
    <Image
      src={`${DATA_DRAGON_ASSETS_PATH}/img/champion/${championName}.png`}
      alt={championName}
      className="rounded"
      width={size}
      height={size}
      unoptimized
    />
  );
}
