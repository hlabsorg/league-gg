import React from "react";
import Image from "next/image";

export function HomepageContent() {
  return (
    <section className="w-screen">
      <div className="flex w-full items-center justify-center">
        <Image src="/assets/a427d100-c437-43e0-bd63-2bf27b6a2919.png" alt="App preview" width={2400} height={1600} />
      </div>
    </section>
  );
}
