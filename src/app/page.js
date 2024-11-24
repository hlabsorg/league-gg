"use client";

import { useEffect, useState } from "react";
import { useSummoners } from "@/hooks/swr/summoners";
import { Hero } from "@/components/Hero";

export default function Page() {
  const [region, setRegion] = useState("na");
  const [summonerName, setSummonerName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const { data, error, isLoading } = useSummoners(summonerName, tagLine, region);

  const handleSearch = (tagLine, name, region) => {
    setTagLine(tagLine);
    setSummonerName(name);
    setRegion(region);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero onSearch={handleSearch} />
      {isLoading ? (
        <div>Getting profile...</div>
      ) : error ? (
        <div>Error loading data: {error.message}</div>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Welcome to League GG</h1>
        <p className="text-lg text-muted-foreground">
          Your one-stop destination for League of Legends statistics and analysis
        </p>
      </main>
    </div>
  );
}
