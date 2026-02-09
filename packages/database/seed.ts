// ============================================================
// SCRIPT DE SEED - MUNDIAL 2026
// ============================================================
// Este script llena la base de datos con los datos iniciales:
// 1. Crea el deporte (Fútbol)
// 2. Crea la competición (Mundial 2026)
// 3. Crea los 48 equipos
// 4. Crea los 12 grupos y asigna equipos
// 5. Crea las fases del torneo
// 6. Crea los 72 partidos de la fase de grupos
//
// Se puede correr con: pnpm db:seed (desde packages/database)

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { teams } from "./data/teams";
import { groups } from "./data/groups";
import { stages } from "./data/stages";
import { groupMatches } from "./data/matches";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...\n");

  // ---- PASO 1: Limpiar datos anteriores ----
  // deleteMany borra TODOS los registros de cada tabla
  // El orden importa: primero borras los que tienen relaciones (hijos)
  // y al final los que no dependen de nadie (padres)
  console.log("🧹 Cleaning existing data...");
  await prisma.odd.deleteMany();
  await prisma.match.deleteMany();
  await prisma.groupTeam.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.group.deleteMany();
  await prisma.team.deleteMany();
  await prisma.news.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.sport.deleteMany();

  // ---- PASO 2: Crear deporte ----
  console.log("⚽ Creating sport...");
  const football = await prisma.sport.create({
    data: {
      name: "football",
      displayName: "Fútbol",
    },
  });

  // ---- PASO 3: Crear competición ----
  console.log("🏆 Creating competition...");
  const worldCup = await prisma.competition.create({
    data: {
      name: "FIFA World Cup 2026",
      slug: "world-cup-2026",
      sportId: football.id,
      season: "2026",
      startDate: new Date("2026-06-11"),
      endDate: new Date("2026-07-19"),
      isActive: true,
    },
  });

  // ---- PASO 4: Crear equipos ----
  // createMany inserta muchos registros de una vez (más eficiente)
  console.log("🇦🇷 Creating 48 teams...");
  await prisma.team.createMany({
    data: teams,
  });

  // Traemos todos los equipos para tener sus IDs
  // Los guardamos en un Map para buscar rápido por shortName
  const allTeams = await prisma.team.findMany();
  const teamMap = new Map(allTeams.map((t) => [t.shortName, t]));

  // ---- PASO 5: Crear fases del torneo ----
  console.log("📋 Creating tournament stages...");
  for (const stage of stages) {
    await prisma.stage.create({
      data: {
        name: stage.name,
        order: stage.order,
        competitionId: worldCup.id,
      },
    });
  }
  const groupStage = await prisma.stage.findFirst({
    where: { name: "Group Stage", competitionId: worldCup.id },
  });

  if (!groupStage) {
    throw new Error("Group Stage not found after creation");
  }

  // ---- PASO 6: Crear grupos y asignar equipos ----
  console.log("📊 Creating groups and assigning teams...");

  // Mapa para guardar qué equipo TBD pertenece a qué grupo
  // Problema: hay 6 equipos con shortName "TBD"
  // Solución: buscamos los TBD por su nombre completo que incluye el grupo
  const tbdTeams = allTeams.filter((t) => t.shortName === "TBD");
  let tbdIndex = 0;

  for (const groupData of groups) {
    const group = await prisma.group.create({
      data: {
        name: groupData.name,
        competitionId: worldCup.id,
      },
    });

    for (const shortName of groupData.teamShortNames) {
      let team;
      if (shortName === "TBD") {
        // Asigna el siguiente equipo TBD disponible
        team = tbdTeams[tbdIndex];
        tbdIndex++;
      } else {
        team = teamMap.get(shortName);
      }

      if (team) {
        await prisma.groupTeam.create({
          data: {
            groupId: group.id,
            teamId: team.id,
          },
        });
      }
    }
  }

  // ---- PASO 7: Crear partidos de fase de grupos ----
  console.log("⚽ Creating group stage matches...");

  // Traemos los grupos con sus equipos para resolver TBDs
  const allGroups = await prisma.group.findMany({
    include: {
      teams: {
        include: { team: true },
      },
    },
  });
  const groupMap = new Map(allGroups.map((g) => [g.name, g]));

  for (const matchData of groupMatches) {
    // Buscar equipos: si es TBD, buscar el TBD de ESE grupo
    let homeTeam;
    let awayTeam;

    if (matchData.home === "TBD") {
      const group = groupMap.get(matchData.group);
      homeTeam = group?.teams.find((gt) => gt.team.shortName === "TBD")?.team;
    } else {
      homeTeam = teamMap.get(matchData.home);
    }

    if (matchData.away === "TBD") {
      const group = groupMap.get(matchData.group);
      awayTeam = group?.teams.find((gt) => gt.team.shortName === "TBD")?.team;
    } else {
      awayTeam = teamMap.get(matchData.away);
    }

    if (homeTeam && awayTeam) {
      await prisma.match.create({
        data: {
          competitionId: worldCup.id,
          stageId: groupStage.id,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          matchDate: new Date(matchData.date),
          venue: matchData.venue,
          matchday: matchData.matchday,
          status: "SCHEDULED",
        },
      });
    }
  }

  // ---- RESUMEN ----
  const teamCount = await prisma.team.count();
  const groupCount = await prisma.group.count();
  const matchCount = await prisma.match.count();
  const stageCount = await prisma.stage.count();

  console.log("\n✅ Seed completed!");
  console.log(`   ⚽ ${teamCount} teams`);
  console.log(`   📊 ${groupCount} groups`);
  console.log(`   🏟️  ${matchCount} matches`);
  console.log(`   📋 ${stageCount} stages`);
}

// Ejecuta el seed y maneja errores
main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    // SIEMPRE desconecta Prisma al terminar
    await prisma.$disconnect();
  });