import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { QUEUE_TYPES } from "@/constants/queue-types";

export function QueueTypeHeader({ regionId, gameName_tagLine, activeQueue }) {
  return (
    <Tabs value={activeQueue} className="my-4 flex w-full justify-center">
      <TabsList className="w-full rounded-lg bg-accent-foreground p-1 shadow-md">
        <TabsTrigger value={QUEUE_TYPES.ALL} asChild className="flex-1 data-[state=active]:bg-primary">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.ALL}`}>All</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.NORMAL} asChild className="flex-1 data-[state=active]:bg-primary">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.NORMAL}`}>Normal</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.SOLO} asChild className="flex-1 data-[state=active]:bg-primary">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.SOLO}`}>Solo</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.FLEX} asChild className="flex-1 data-[state=active]:bg-primary">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.FLEX}`}>Flex</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.ARAM} asChild className="flex-1 data-[state=active]:bg-primary">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.ARAM}`}>Aram</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
