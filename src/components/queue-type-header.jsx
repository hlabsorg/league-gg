import Link from "next/link";
import { QUEUE_TYPES } from "@/constants/queue-types";

export function QueueTypeHeader({ regionId, gameName_tagLine }) {
  return (
    <div>
      <Link prefetch scroll={false} href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.ALL}`}>
    {" "}
    All
  </Link>
  <Link prefetch scroll={false} href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.NORMAL}`}>
    {" "}
    Normal
  </Link>
  <Link prefetch scroll={false} href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.SOLO}`}>
    {" "}
    Solo
  </Link>
  <Link prefetch scroll={false} href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.FLEX}`}>
    {" "}
    Flex
  </Link>
  <Link prefetch scroll={false} href={`/summoner/${regionId}/${gameName_tagLine}?queue=${QUEUE_TYPES.ARAM}`}>
    {" "}
    Aram
  </Link>
</div>
)}

