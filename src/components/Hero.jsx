import { useState } from "react";
import { useSummoners } from "@/hooks/swr/summoners";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileIcon } from "./profile-icon";
import { Icons } from "./icons";
import { REGION_IDS } from "@/lib/constants";

export function Hero() {
  const [regionId, setRegionId] = useState("na1");
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [formError, setFormError] = useState(null);

  const { data, error, isLoading } = useSummoners(gameName, tagLine, regionId);

  const handleSubmit = (e) => {
    setFormError(null);
    e.preventDefault();
    const gameName = e.target.gameName.value;
    const tagLine = e.target.tagLine.value;
    const regionId = e.target.regionId.value;
    if (gameName.trim() && tagLine.trim() && regionId.trim()) {
      setGameName(gameName);
      setTagLine(tagLine);
      setRegionId(regionId);
    } else {
      setFormError("Both summoner name, tagline, and region must be provided.");
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
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="flex gap-2">
            <Select defaultValue={regionId} name="regionId">
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
              name="gameName"
              type="text"
              defaultValue={gameName}
            />
            <Input
              className="h-12 bg-white/95"
              placeholder="Tagline"
              name="tagLine"
              type="text"
              defaultValue={tagLine}
            />
            <Button type="submit" className="h-12 px-6" variant="default">
              <Icons.search className="size-5" />
            </Button>
          </div>
          <div className="mt-4 flex h-20 items-center justify-center">
            {isLoading ? (
              <Icons.spinner className="animate-spin text-white" />
            ) : formError ? (
              <Alert variant="destructive">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>{error.info.error}</AlertDescription>
              </Alert>
            ) : formError ? (
              <Alert variant="destructive">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            ) : data ? (
              <div className="relative flex size-full flex-row gap-4 rounded-lg border bg-background p-4 text-foreground">
                <div>
                  <ProfileIcon profileIconId={data.profileIconId} />
                </div>
                <div className="flex w-full flex-col justify-center">
                  <div className="flex flex-row gap-2">
                    <h4 className="font-bold">{data.gameName}</h4>
                    <h4 className="text-slate-500">#{data.tagLine}</h4>
                  </div>
                  <p className="text-sm text-slate-500">Level {data.summonerLevel}</p>
                </div>
                <Icons.chevronRight className="self-center justify-self-end" />
              </div>
            ) : (
              <p className="mt-2 text-center text-sm text-white/80">
                Enter your League of Legends summoner name and tagline to look up stats
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
