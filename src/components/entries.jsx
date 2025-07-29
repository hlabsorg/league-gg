import { RankIcon } from "@/components/rank-icon";

export function RankEntries({ entries }) {
  return (
    <div className="font-bold text-white">
      {entries.length > 0 ? (
        <div className="flex items-center gap-4">
          <div>
            <RankIcon entries={entries} className="size-16" />
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-bold">
              {entries[0].tier} {entries[0].rank}
            </div>
            <div className="text-sm text-muted">{entries[0].leaguePoints} LP</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-muted">
              {entries[0].wins}W {entries[0].losses}L
            </div>
            <div className="text-sm text-muted">
              Win rate {Math.floor((entries[0].wins / (entries[0].wins + entries[0].losses)) * 100)}%
            </div>
          </div>
        </div>
      ) : (
        "No League Entries Found"
      )}
    </div>
  );
}
