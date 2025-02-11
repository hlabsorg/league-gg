import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Icons } from "./icons";

const ProfileIcon = ({ profileIconId }) => {
  const src = `https://${process.env.NEXT_PUBLIC_DATA_DRAGON_ASSET_HOST}/cdn/${process.env.NEXT_PUBLIC_DATA_DRAGON_VERSION}/img/profileicon/${profileIconId}.png`;
  return (
    <Avatar>
      <AvatarImage src={src} alt={profileIconId} />
      <AvatarFallback>
        <Icons.user />
      </AvatarFallback>
    </Avatar>
  );
};

export { ProfileIcon };
