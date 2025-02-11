import Image from 'next/image';

const SUPABASE_ASSET_PATH = '/storage/v1/object/public/league-assets';

export function ItemIcon({ itemId, size = 24 }) {
  if (!itemId || itemId === 0) 
    return <div style={{ width: size, height: size }} className="bg-gray-200 rounded" />;
  
  return (
    <Image
      src={`https://${process.env.NEXT_PUBLIC_SUPABASE_ASSET_HOST}${SUPABASE_ASSET_PATH}/icons/item/${itemId}.png`}
      alt={`Item ${itemId}`}
      className="rounded"
      width={size}
      height={size}
      unoptimized
    />
  );
} 