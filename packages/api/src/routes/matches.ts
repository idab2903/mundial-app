import { Hono } from "hono";
import { prisma } from "../lib/prisma";

export const matchRoutes = new Hono();

// GET /api/matches → Lista de partidos con filtros opcionales
// Filtros por query params:
matchRoutes.get("/", async (c) => {
  const status = c.req.query("status");
  const matchday = c.req.query("matchday");
  const team = c.req.query("team");

  // Construye el filtro dinámicamente según los query params
  const where: any = {};

  if (status) {
    where.status = status.toUpperCase();
  }

  if (matchday) {
    where.matchday = Number(matchday);
  }

  if (team) {
    // Busca partidos donde el equipo sea local O visitante
    where.OR = [
      { homeTeam: { shortName: team.toUpperCase() } },
      { awayTeam: { shortName: team.toUpperCase() } },
    ];
  }

  const matches = await prisma.match.findMany({
    where,
    include: {
      homeTeam: true,
      awayTeam: true,
      stage: true,
    },
    orderBy: { matchDate: "asc" },
  });

  return c.json({
    count: matches.length,
    data: matches,
  });
});

// GET /api/matches/live → Partidos en vivo
matchRoutes.get("/live", async (c) => {
  const matches = await prisma.match.findMany({
    where: { status: "LIVE" },
    include: {
      homeTeam: true,
      awayTeam: true,
      stage: true,
    },
    orderBy: { matchDate: "asc" },
  });

  return c.json({
    count: matches.length,
    data: matches,
  });
});

// GET /api/matches/:id → Detalle de un partido
matchRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");

  const match = await prisma.match.findUnique({
    where: { id },
    include: {
      homeTeam: true,
      awayTeam: true,
      stage: true,
      competition: true,
      odds: true,
    },
  });

  if (!match) {
    return c.json({ error: "Match not found" }, 404);
  }

  return c.json({ data: match });
});