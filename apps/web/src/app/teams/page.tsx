import { fetchAPI, type Team } from "@/lib/api";
import { Flag } from "@/components/flags";

export default async function TeamsPage() {
  const res = await fetchAPI<{ count: number; data: Team[] }>("/api/teams");

  // Agrupa por confederación
  const byConf = res.data.reduce<Record<string, Team[]>>((acc, team) => {
    const conf = team.confederation || "Otro";
    if (!acc[conf]) acc[conf] = [];
    acc[conf].push(team);
    return acc;
  }, {});

  const confNames: Record<string, string> = {
    UEFA: "🇪🇺 Europa (UEFA)",
    CONMEBOL: "🌎 Sudamérica (CONMEBOL)",
    CONCACAF: "🌎 Norte/Centroamérica (CONCACAF)",
    CAF: "🌍 África (CAF)",
    AFC: "🌏 Asia (AFC)",
    OFC: "🌏 Oceanía (OFC)",
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Equipos</h1>
      <p className="text-zinc-400">{res.count} selecciones clasificadas</p>

      {Object.entries(byConf).map(([conf, teams]) => (
        <section key={conf}>
          <h2 className="text-xl font-bold mb-4 text-emerald-400">
            {confNames[conf] || conf}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600"
              >
                <Flag url={team.flagUrl} name={team.name} size={40} />
                <div>
                  <p className="font-semibold">{team.name}</p>
                  <p className="text-xs text-zinc-500">
                    {team.shortName} · Ranking FIFA: #{team.fifaRanking || "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}