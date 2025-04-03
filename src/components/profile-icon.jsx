import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Icons } from "./icons";
import { DATA_DRAGON_ASSETS_PATH } from "@/constants/data-dragon";

const ProfileIcon = ({ profileIconId }) => {
  const src = `${DATA_DRAGON_ASSETS_PATH}/img/profileicon/${profileIconId}.png`;
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
