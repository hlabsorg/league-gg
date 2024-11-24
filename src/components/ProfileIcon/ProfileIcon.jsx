import Image from "next/image";

const ProfileIcon = ({ profileIconId }) => {
  const src = `https://${process.env.NEXT_PUBLIC_R2_HOST}/profileicons/${profileIconId}.png`;
  return <Image priority src={src} alt={profileIconId} width={200} height={200} />;
};

export default ProfileIcon;
