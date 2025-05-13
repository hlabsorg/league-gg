import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { QUEUE_TYPES } from "@/constants/queue-types";

export function QueueTypeHeader({ regionId, gameName_tagLine, activeQueue }) {
  return (
    <Tabs value={activeQueue} className="w-full flex justify-center my-4">
      <TabsList className="bg-zinc-900 rounded-full shadow-md p-1">
        <TabsTrigger value={QUEUE_TYPES.ALL} asChild>
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.ALL}`}>All</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.NORMAL} asChild>
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.NORMAL}`}>Normal</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.SOLO} asChild>
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.SOLO}`}>Solo</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.FLEX} asChild>
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.FLEX}`}>Flex</Link>
        </TabsTrigger>
        <TabsTrigger value={QUEUE_TYPES.ARAM} asChild>
          <Link href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.ARAM}`}>Aram</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

