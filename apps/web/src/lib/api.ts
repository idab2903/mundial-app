const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Función genérica para hacer peticiones a la API
export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    // next.js: revalida los datos cada 60 segundos (para no sobrecargar la API)
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

// ---- TIPOS ----
// Definen la forma de los datos que devuelve la API

export interface Team {
  id: string;
  name: string;
  shortName: string;
  flagUrl: string | null;
  fifaRanking: number | null;
  confederation: string;
}

export interface GroupTeam {
  id: string;
  name: string;
  shortName: string;
  flagUrl: string | null;
  fifaRanking: number | null;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Group {
  id: string;
  name: string;
  teams: GroupTeam[];
}

export interface Match {
  id: string;
  matchday: number | null;
  matchDate: string;
  status: string;
  homeScore: number | null;
  awayScore: number | null;
  venue: string | null;
  homeTeam: Team | null;
  awayTeam: Team | null;
  stage: { id: string; name: string } | null;
}