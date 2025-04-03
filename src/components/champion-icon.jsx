import Image from "next/image";
import { DATA_DRAGON_ASSETS_PATH } from "@/constants/data-dragon";

// const SUPABASE_ASSET_PATH = '/storage/v1/object/public/league-assets';

export function ChampionIcon({ championName, size = 32 }) {
  return (
    <Image
      src={`${DATA_DRAGON_ASSETS_PATH}/img/champion/${championName}.png`}
      alt={championName}
      className="size-full object-cover"
      width={size}
      height={size}
      unoptimized
    />
  );
}
