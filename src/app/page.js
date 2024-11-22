"use client";

import Image from "next/image";
import { useSummoners } from "@/hooks/swr/summoners";

export default function Home() {
  const { data, error, isLoading } = useSummoners("ssj4gogeta84", "8084", "na1");
  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? <div>getting profile...</div> : <code>{JSON.stringify(data)}</code>}
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Welcome to League GG</h1>
        <p className="text-lg text-muted-foreground">
          Your one-stop destination for League of Legends statistics and analysis
        </p>
      </main>
    </div>
  );
}
