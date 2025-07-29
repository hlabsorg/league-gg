import Image from "next/image";
import { RANK_TIER_IMAGES } from "@/constants/rank-tiers";

export function RankIcon({ entries, className }) {
  const tier = entries?.[0].tier;

  return <Image src={RANK_TIER_IMAGES[tier]} alt={tier} className={className} width={64} height={64} />;
}
