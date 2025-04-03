import Image from "next/image";

export function MasteryIcon({ level, size = 24 }) {
  if (!level || level < 1 || level > 7) return null;

  // Map mastery level to op.gg mastery icon number
  const masteryIconMap = {
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    1: 1,
  };

  const iconNumber = masteryIconMap[level] || 1;

  return (
    <Image
      src={`https://s-lol-web.op.gg/app-router/assets/images/mastery/mastery-${iconNumber}.png?image=q_auto:good,f_webp,w_84&b=Yv2zAsUtapmUHpzZg_L4-`}
      alt={`Mastery Level ${level}`}
      className="absolute -bottom-2 -right-2 z-10"
      width={size}
      height={size}
    />
  );
}
