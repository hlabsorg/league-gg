import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { REGION_IDS } from "@/lib/constants";

export function Hero({ onSearch }) {
  const [region, setRegion] = useState("na1");
  const [summonerName, setSummonerName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (summonerName.trim() && tagLine.trim()) {
      console.log("Summoner Name:", summonerName);
      console.log("Tagline:", tagLine);
      onSearch(tagLine.trim(), summonerName.trim(), region);
    } else {
      console.error("Both summoner name and tagline must be provided.");
    }
  };

  return (
    <section className="relative h-[500px] w-full bg-background">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-white">League GG</h1>
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="flex gap-2">
            <Select defaultValue={region} onValueChange={(value) => setRegion(value)}>
              <SelectTrigger className="h-12 w-[100px] bg-white/95">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(REGION_IDS).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="h-12 bg-white/95"
              placeholder="Summoner Name"
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
            />
            <Input
              className="h-12 bg-white/95"
              placeholder="Tagline"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
            />
            <Button type="submit" className="h-12 px-6" variant="default">
              <Search className="size-5" />
            </Button>
          </div>
          <p className="mt-2 text-center text-sm text-white/80">
            Enter your League of Legends summoner name and tagline to look up stats
          </p>
        </form>
      </div>
    </section>
  );
}
