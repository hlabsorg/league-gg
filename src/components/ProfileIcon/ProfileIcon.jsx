import Image from "next/image";
import { SUPABASE_ASSET_PATH } from "@/lib/constants";

const ProfileIcon = ({ profileIconId }) => {
  const src = `https://${process.env.NEXT_PUBLIC_SUPABASE_ASSET_HOST}${SUPABASE_ASSET_PATH}/icons/profile/${profileIconId}.png`;
  return <Image priority src={src} alt={profileIconId} width={200} height={200} />;
};

export default ProfileIcon;
