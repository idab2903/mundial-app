import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { teamRoutes } from "./routes/teams";
import { groupRoutes } from "./routes/groups";
import { matchRoutes } from "./routes/matches";

const app = new Hono();

// ---- MIDDLEWARES ----
// cors: permite que el frontend (localhost:3000) hable con la API (localhost:3001)
app.use("*", cors());

app.use("*", logger());

//RUTAS
app.route("/api/teams", teamRoutes);
app.route("/api/groups", groupRoutes);
app.route("/api/matches", matchRoutes);

//RUTA DE SALUD
// Para verificar que la API está funcionando
app.get("/", (c) => {
  return c.json({
    status: "ok",
    message: "Mundial 2026 API",
    version: "0.0.1",
  });
});

export default app;