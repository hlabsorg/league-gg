import Image from "next/image";
import { SUPABASE_ASSET_PATH } from "@/lib/constants";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Icons } from "./icons";

const ProfileIcon = ({ profileIconId }) => {
  const src = `https://${process.env.NEXT_PUBLIC_SUPABASE_ASSET_HOST}${SUPABASE_ASSET_PATH}/icons/profile/${profileIconId}.png`;
  return (
    <Avatar>
      <AvatarImage src={src} asChild alt={profileIconId}>
        <Image priority src={src} alt={profileIconId} height={56} width={56} />
      </AvatarImage>
      <AvatarFallback>
        <Icons.user />
      </AvatarFallback>
    </Avatar>
  );
};

export { ProfileIcon };
