import { fetchAPI, type Group, type Match } from "@/lib/api";
import { Flag } from "@/components/flags";

export default async function Home() {
  const [groupsRes, matchesRes] = await Promise.all([
    fetchAPI<{ count: number; data: Group[] }>("/api/groups"),
    fetchAPI<{ count: number; data: Match[] }>("/api/matches?matchday=1"),
  ]);

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Mundial 2026</h1>
        <p className="text-xl text-zinc-400">USA 🇺🇸 México 🇲🇽 Canadá 🇨🇦</p>
        <p className="text-zinc-500 mt-2">
          {groupsRes.data.length} grupos · {matchesRes.count} partidos jornada 1
        </p>
      </section>

      {/* PRÓXIMOS PARTIDOS */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Próximos Partidos</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matchesRes.data.slice(0, 6).map((match) => (
            <div
              key={match.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600"
            >
              <div className="text-xs text-zinc-500 mb-3">
                {match.stage?.name} · {match.venue}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flag url={match.homeTeam?.flagUrl || null} name={match.homeTeam?.name || "TBD"} />
                  <span className="font-semibold">{match.homeTeam?.shortName || "TBD"}</span>
                </div>
                <div className="text-center px-4">
                  {match.status === "FINISHED" ? (
                    <span className="text-xl font-bold">
                      {match.homeScore} - {match.awayScore}
                    </span>
                  ) : (
                    <span className="text-sm text-zinc-500">
                      {new Date(match.matchDate).toLocaleDateString("es", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{match.awayTeam?.shortName || "TBD"}</span>
                  <Flag url={match.awayTeam?.flagUrl || null} name={match.awayTeam?.name || "TBD"} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GRUPOS */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Grupos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groupsRes.data.map((group) => (
            <div
              key={group.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <h3 className="text-lg font-bold mb-3 text-emerald-400">
                {group.name}
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-500 text-left">
                    <th className="pb-2">Equipo</th>
                    <th className="pb-2 text-center">PJ</th>
                    <th className="pb-2 text-center">G</th>
                    <th className="pb-2 text-center">E</th>
                    <th className="pb-2 text-center">P</th>
                    <th className="pb-2 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {group.teams.map((team) => (
                    <tr key={team.id} className="border-t border-zinc-800">
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <Flag url={team.flagUrl || null} name={team.name} size={24} />
                          <span>{team.shortName}</span>
                        </div>
                      </td>
                      <td className="text-center">{team.played}</td>
                      <td className="text-center">{team.won}</td>
                      <td className="text-center">{team.drawn}</td>
                      <td className="text-center">{team.lost}</td>
                      <td className="text-center font-bold">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}