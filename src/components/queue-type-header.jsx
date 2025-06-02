import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { QUEUE_TYPES } from "@/constants/queue-types";

export function QueueTypeHeader({ regionId, gameName_tagLine, activeQueue }) {
  return (
    <Tabs value={activeQueue} className="w-full flex justify-center my-4">
      <TabsList className="bg-card rounded-lg shadow-md p-1 w-full">
        <TabsTrigger value={QUEUE_TYPES.ALL} asChild className="flex-1">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.ALL}`}>All</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.NORMAL} asChild className="flex-1">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.NORMAL}`}>Normal</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.SOLO} asChild className="flex-1">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.SOLO}`}>Solo</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.FLEX} asChild className="flex-1">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.FLEX}`}>Flex</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.ARAM} asChild className="flex-1">
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.ARAM}`}>Aram</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

