import Image from "next/image";

export function RoleIcon({ role, className }) {
  return (
    <Image 
      src={`/assets/lane-icons/${role.toLowerCase()}.png`} 
      alt={role} 
      className={className}
      width={24}
      height={24}
    />
  );  
}