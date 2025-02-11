import Image from 'next/image';

const SUPABASE_ASSET_PATH = '/storage/v1/object/public/league-assets';

export function ChampionIcon({ championName, size = 32 }) {
  if (!championName) 
    return null;
  
  // Convert champion names like "Kai'Sa" to "KaiSa" for the image URL
  const formattedName = championName.replace(/[^a-zA-Z]/g, '');
  
  return (
    <Image
      src={`https://${process.env.NEXT_PUBLIC_SUPABASE_ASSET_HOST}${SUPABASE_ASSET_PATH}/icons/champion/${formattedName}.png`}
      alt={championName}
      className="rounded"
      width={size}
      height={size}
      unoptimized
    />
  );
} 