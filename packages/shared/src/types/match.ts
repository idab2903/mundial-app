export interface Team {
  id: string;
  name: string;
  shortName: string;
  flagUrl?: string;
  fifaRanking?: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  venue?: string;
  matchDate: Date;
}

export type MatchStatus =
  | "SCHEDULED"
  | "LIVE"
  | "HALF_TIME"
  | "FINISHED"
  | "POSTPONED"
  | "CANCELLED";