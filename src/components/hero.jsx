"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSummoners } from "@/hooks/swr/summoners";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileIcon } from "./profile-icon";
import { Icons } from "./icons";
import { REGION_IDS } from "@/constants/regions";
import { getBrowserClient } from "@/lib/supabase/browser";
import { debounce } from "@/utils/debounce";
import { Logo } from "./logo";

export function Hero() {
  const supabase = getBrowserClient();
  const [regionId, setRegionId] = useState("na1");
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [formError, setFormError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [dataError, setDataError] = useState(null);

  const { data, error, isLoading } = useSummoners(gameName, tagLine, regionId);

  useEffect(() => {
    setDataError(error);
  }, [error]);

  const handleSubmit = (e) => {
    setFormError(null);
    setDataError(null);
    e.preventDefault();
    const searchInput = e.target.searchInput.value;
    const regionId = e.target.regionId.value;

    if (searchInput.includes("#")) {
      const [name, tag] = searchInput.split("#");
      const gameName = name.trim();
      const tagLine = tag.trim();

      if (gameName && tagLine && regionId.trim()) {
        setGameName(gameName);
        setTagLine(tagLine);
        setRegionId(regionId);
      } else {
        setFormError("Both summoner name, tagline, and region must be provided.");
      }
    } else {
      setFormError("Please enter summoner name in format: GameName#tagLine");
    }
  };

  const handleSearch = async (value) => {
    if (!value) {
      return setSearchResults([]);
    }
    // Use the part before # for autocomplete, or full value if no #
    const searchName = value.includes("#") ? value.split("#")[0] : value;
    const { data } = await supabase.rpc("search_summoner_profiles_by_prefix", { prefix: searchName });
    setSearchResults(data || []);
  };

  return (
    <section className="relative h-screen w-screen bg-background">
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="absolute h-screen w-screen object-cover object-center">
          <source src="/assets/animated-freljord.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="mb-8">
          <Logo />
        </div>
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
          <div className="flex gap-2">
            <Select defaultValue={regionId} name="regionId">
              <SelectTrigger className="h-12 w-[100px] bg-background text-muted">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {Object.entries(REGION_IDS).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              className="h-12 flex-1 rounded-md border border-border bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter Riot ID, ie. player#NA1"
              name="searchInput"
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                // Clear errors when user starts typing
                if (formError) setFormError(null);
                if (dataError) setDataError(null);
                // Data is manual search vs search from the db
                debounce(handleSearch, 200)(e.target.value);
              }}
            />
            <Button type="submit" className="h-12 bg-background px-6" variant="default">
              <Icons.search className="size-5" />
            </Button>
          </div>
          <div className="absolute mt-4 w-full">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Icons.spinner className="animate-spin text-white" />
              </div>
            ) : formError ? (
              <div className="flex items-center justify-center">
                <Alert variant="destructive">
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              </div>
            ) : dataError ? (
              <div className="flex items-center justify-center">
                <Alert variant="destructive">
                  <AlertDescription>{dataError.info?.error}</AlertDescription>
                </Alert>
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              <div className="max-h-80 w-full space-y-2 overflow-y-auto rounded-lg border border-border bg-background p-2">
                {searchResults.map((summoner) => (
                  <Link
                    key={summoner.id}
                    prefetch
                    href={`/summoner/${summoner.regionId}/${summoner.gameName}-${summoner.tagLine}`}
                    className="block w-full"
                  >
                    <div className="relative flex size-full flex-row items-center gap-4 rounded-lg border bg-background p-4 text-foreground transition-all duration-200 hover:bg-muted">
                      <div>
                        <ProfileIcon profileIconId={summoner.profileIconId} />
                      </div>
                      <div className="flex w-full flex-col justify-center">
                        <div className="flex flex-row gap-2">
                          <h4 className="font-bold">{summoner.gameName}</h4>
                          <h4 className="text-slate-500">#{summoner.tagLine}</h4>
                        </div>
                        <p className="text-sm text-slate-500">Level {summoner.summonerLevel}</p>
                      </div>
                      <Icons.chevronRight className="self-center justify-self-end" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              data && (
                <div className="w-full rounded-lg border border-border bg-background p-2">
                  <Link
                    prefetch
                    href={`/summoner/${data.regionId}/${data.gameName}-${data.tagLine}`}
                    className="w-full"
                  >
                    <div className="relative flex size-full flex-row items-center gap-4 rounded-lg border bg-background p-4 text-foreground transition-all duration-200 hover:border-primary hover:bg-muted">
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
                  </Link>
                </div>
              )
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
