import Image from "next/image";

export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/assets/elovate_logo.png" alt="Elovate Hero" width={300} height={300} />
      <h1 className="font-bold text-4xl">Elovate.GG</h1>
    </div>
  );
}
