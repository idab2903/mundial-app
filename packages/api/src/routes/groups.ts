import { Hono } from "hono";
import { prisma } from "../lib/prisma";

export const groupRoutes = new Hono();

// GET /api/groups → Todos los grupos con sus equipos
groupRoutes.get("/", async (c) => {
  const groups = await prisma.group.findMany({
    include: {
      teams: {
        include: {
          team: true, // Incluye los datos del equipo
        },
      },
    },
    orderBy: { name: "asc" },
  });

  // Formatea la respuesta para que sea más limpia
  const formatted = groups.map((group) => ({
    id: group.id,
    name: group.name,
    teams: group.teams.map((gt) => ({
      id: gt.team.id,
      name: gt.team.name,
      shortName: gt.team.shortName,
      flagUrl: gt.team.flagUrl,
      fifaRanking: gt.team.fifaRanking,
      // Tabla de posiciones (por ahora en 0, se actualiza con resultados)
      played: gt.played,
      won: gt.won,
      drawn: gt.drawn,
      lost: gt.lost,
      goalsFor: gt.goalsFor,
      goalsAgainst: gt.goalsAgainst,
      points: gt.points,
    })),
  }));

  return c.json({
    count: formatted.length,
    data: formatted,
  });
});

// GET /api/groups/:id → Detalle de un grupo con partidos
groupRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");

  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      teams: {
        include: { team: true },
      },
      competition: true,
    },
  });

  if (!group) {
    return c.json({ error: "Group not found" }, 404);
  }

  return c.json({ data: group });
});