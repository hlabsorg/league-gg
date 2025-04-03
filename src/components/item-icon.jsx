import Image from "next/image";
import { DATA_DRAGON_ASSETS_PATH } from "@/constants/data-dragon";

// const SUPABASE_ASSET_PATH = '/storage/v1/object/public/league-assets';

export function ItemIcon({ itemId, size = 24, className }) {
  if (!itemId || itemId === 0) return <div style={{ width: size, height: size }} className="rounded bg-gray-200" />;
  return (
    <Image
      className={`rounded ${className}`}
      src={`${DATA_DRAGON_ASSETS_PATH}/img/item/${itemId}.png`}
      alt={`Item ${itemId}`}
      width={size}
      height={size}
    />
  );
}
