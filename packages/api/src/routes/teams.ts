import { Hono } from "hono";
import { prisma } from "../lib/prisma";

export const teamRoutes = new Hono();

// GET /api/teams → Lista todos los equipos
teamRoutes.get("/", async (c) => {
  const teams = await prisma.team.findMany({
    orderBy: { name: "asc" },
  });

  return c.json({
    count: teams.length,
    data: teams,
  });
});

// GET /api/teams/:id → Detalle de un equipo con sus partidos
teamRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");

  const team = await prisma.team.findUnique({
    where: { id },
    include: {
      // Incluye los partidos donde es local
      homeMatches: {
        include: {
          awayTeam: true,
          stage: true,
        },
        orderBy: { matchDate: "asc" },
      },
      // Incluye los partidos donde es visitante
      awayMatches: {
        include: {
          homeTeam: true,
          stage: true,
        },
        orderBy: { matchDate: "asc" },
      },
      // Incluye los grupos donde participa
      groups: {
        include: {
          group: true,
        },
      },
    },
  });

  if (!team) {
    return c.json({ error: "Team not found" }, 404);
  }

  return c.json({ data: team });
});