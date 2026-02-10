import { fetchAPI, type Match } from "@/lib/api";
import { Flag } from "@/components/flags";

export default async function MatchesPage() {
  const res = await fetchAPI<{ count: number; data: Match[] }>("/api/matches");

  // Agrupa los partidos por jornada
  const byMatchday = res.data.reduce<Record<number, Match[]>>((acc, match) => {
    const day = match.matchday || 0;
    if (!acc[day]) acc[day] = [];
    acc[day].push(match);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Calendario de Partidos</h1>
      <p className="text-zinc-400">{res.count} partidos en fase de grupos</p>

      {Object.entries(byMatchday).map(([matchday, matches]) => (
        <section key={matchday}>
          <h2 className="text-xl font-bold mb-4 text-emerald-400">
            Jornada {matchday}
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600"
              >
                <div className="text-xs text-zinc-500 mb-3 flex justify-between">
                  <span>{match.stage?.name}</span>
                  <span>{match.venue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag url={match.homeTeam?.flagUrl || null} name={match.homeTeam?.name || "TBD"} />
                    <span className="font-semibold text-sm">
                      {match.homeTeam?.shortName || "TBD"}
                    </span>
                  </div>
                  <div className="text-center px-3">
                    {match.status === "FINISHED" ? (
                      <span className="text-lg font-bold">
                        {match.homeScore} - {match.awayScore}
                      </span>
                    ) : match.status === "LIVE" ? (
                      <span className="text-lg font-bold text-red-500 animate-pulse">
                        EN VIVO
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-500">
                        {new Date(match.matchDate).toLocaleDateString("es", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      {match.awayTeam?.shortName || "TBD"}
                    </span>
                    <Flag url={match.awayTeam?.flagUrl || null} name={match.awayTeam?.name || "TBD"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}