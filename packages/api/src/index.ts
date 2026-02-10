import "dotenv/config";
import { serve } from "@hono/node-server";
import app from "./app";

const port = Number(process.env.PORT) || 3001;

console.log(`\nMundial 2026 API`);
console.log(`Server running on http://localhost:${port}`);
console.log(`Health check: http://localhost:${port}/`);
console.log(`Teams: http://localhost:${port}/api/teams`);
console.log(`Groups: http://localhost:${port}/api/groups`);
console.log(`Matches: http://localhost:${port}/api/matches\n`);

serve({
  fetch: app.fetch,
  port,
});