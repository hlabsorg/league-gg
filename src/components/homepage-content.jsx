import React from "react";
import Image from "next/image";

export function HomepageContent() {
  return (
    <section className="py-12 px-4 bg-white text-center">
      <Image
        src="/assets/a427d100-c437-43e0-bd63-2bf27b6a2919.png"
        alt="App preview"
        width={800}
        height={534}
        className="mx-auto my-8 rounded-2xl shadow-lg w-full h-full max-w-4xl"
      />
    </section>
  );
}
