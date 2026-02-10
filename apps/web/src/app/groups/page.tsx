import { fetchAPI, type Group } from "@/lib/api";
import { Flag } from "@/components/flags";

export default async function GroupsPage() {
  const res = await fetchAPI<{ count: number; data: Group[] }>("/api/groups");

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Fase de Grupos</h1>

      {/* INFO DE CLASIFICACIÓN - UNA SOLA VEZ ARRIBA */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
        <p className="font-semibold text-white mb-2">📋 Sistema de clasificación</p>
        <ul className="space-y-1">
          <li>🟢 Los <span className="text-emerald-400 font-bold">2 primeros</span> de cada grupo clasifican a dieciseisavos de final </li>
          <li>🟡 Los <span className="text-yellow-400 font-bold">8 mejores terceros</span> también clasifican a dieciseisavos</li>
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {res.data.map((group) => (
          <div
            key={group.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <h2 className="text-lg font-bold mb-3 text-emerald-400">
              {group.name}
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-left">
                  <th className="pb-2">Equipo</th>
                  <th className="pb-2 text-center">PJ</th>
                  <th className="pb-2 text-center">G</th>
                  <th className="pb-2 text-center">E</th>
                  <th className="pb-2 text-center">P</th>
                  <th className="pb-2 text-center">GF</th>
                  <th className="pb-2 text-center">GC</th>
                  <th className="pb-2 text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                {group.teams.map((team, i) => (
                  <tr
                    key={team.id}
                    className={`border-t border-zinc-800 ${
                      i < 2
                        ? "bg-emerald-950/20"
                        : i === 2
                        ? "bg-yellow-950/20"
                        : ""
                    }`}
                  >
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-600 w-3">{i + 1}</span>
                        <Flag url={team.flagUrl || null} name={team.name} size={24} />
                        <span>{team.name}</span>
                      </div>
                    </td>
                    <td className="text-center">{team.played}</td>
                    <td className="text-center">{team.won}</td>
                    <td className="text-center">{team.drawn}</td>
                    <td className="text-center">{team.lost}</td>
                    <td className="text-center">{team.goalsFor}</td>
                    <td className="text-center">{team.goalsAgainst}</td>
                    <td className="text-center font-bold">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}