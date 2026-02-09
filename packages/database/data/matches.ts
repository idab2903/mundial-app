// ============================================================
// PARTIDOS DE LA FASE DE GRUPOS - MUNDIAL 2026
// ============================================================
// Datos basados en el calendario oficial de FIFA
// Cada partido tiene: equipos (shortName), fecha, estadio y jornada
//
// NOTA sobre los TBD: Como hay 6 plazas por definir (playoffs),
// los equipos TBD comparten shortName. En el seed se manejan
// buscando por grupo para asignar el equipo correcto.

export const groupMatches = [
  // ===================== GRUPO A =====================
  // Jornada 1 - 11 de junio
  { home: "MEX", away: "RSA", date: "2026-06-11T19:00:00Z", venue: "Estadio Azteca, Mexico City", matchday: 1, group: "Group A" },
  { home: "KOR", away: "TBD", date: "2026-06-12T02:00:00Z", venue: "Estadio Akron, Guadalajara", matchday: 1, group: "Group A" },
  // Jornada 2 - 16 de junio
  { home: "MEX", away: "KOR", date: "2026-06-16T19:00:00Z", venue: "Estadio Azteca, Mexico City", matchday: 2, group: "Group A" },
  { home: "RSA", away: "TBD", date: "2026-06-16T22:00:00Z", venue: "Estadio BBVA, Monterrey", matchday: 2, group: "Group A" },
  // Jornada 3 - 21 de junio
  { home: "KOR", away: "MEX", date: "2026-06-21T22:00:00Z", venue: "Estadio Akron, Guadalajara", matchday: 3, group: "Group A" },
  { home: "TBD", away: "RSA", date: "2026-06-21T22:00:00Z", venue: "Estadio BBVA, Monterrey", matchday: 3, group: "Group A" },

  // ===================== GRUPO B =====================
  // Jornada 1 - 12 de junio
  { home: "CAN", away: "TBD", date: "2026-06-12T19:00:00Z", venue: "BMO Field, Toronto", matchday: 1, group: "Group B" },
  { home: "QAT", away: "SUI", date: "2026-06-13T19:00:00Z", venue: "Levi's Stadium, San Francisco", matchday: 1, group: "Group B" },
  // Jornada 2 - 17 de junio
  { home: "SUI", away: "CAN", date: "2026-06-17T19:00:00Z", venue: "BMO Field, Toronto", matchday: 2, group: "Group B" },
  { home: "TBD", away: "QAT", date: "2026-06-17T22:00:00Z", venue: "BC Place, Vancouver", matchday: 2, group: "Group B" },
  // Jornada 3 - 22 de junio
  { home: "SUI", away: "TBD", date: "2026-06-22T22:00:00Z", venue: "BMO Field, Toronto", matchday: 3, group: "Group B" },
  { home: "QAT", away: "CAN", date: "2026-06-22T22:00:00Z", venue: "BC Place, Vancouver", matchday: 3, group: "Group B" },

  // ===================== GRUPO C =====================
  // Jornada 1 - 13 de junio
  { home: "BRA", away: "MAR", date: "2026-06-13T22:00:00Z", venue: "MetLife Stadium, New York", matchday: 1, group: "Group C" },
  { home: "HAI", away: "SCO", date: "2026-06-14T01:00:00Z", venue: "Gillette Stadium, Boston", matchday: 1, group: "Group C" },
  // Jornada 2 - 18 de junio
  { home: "BRA", away: "HAI", date: "2026-06-18T22:00:00Z", venue: "MetLife Stadium, New York", matchday: 2, group: "Group C" },
  { home: "MAR", away: "SCO", date: "2026-06-18T19:00:00Z", venue: "Gillette Stadium, Boston", matchday: 2, group: "Group C" },
  // Jornada 3 - 23 de junio
  { home: "SCO", away: "BRA", date: "2026-06-23T22:00:00Z", venue: "MetLife Stadium, New York", matchday: 3, group: "Group C" },
  { home: "MAR", away: "HAI", date: "2026-06-23T22:00:00Z", venue: "Gillette Stadium, Boston", matchday: 3, group: "Group C" },

  // ===================== GRUPO D =====================
  // Jornada 1 - 12 de junio
  { home: "USA", away: "PAR", date: "2026-06-13T01:00:00Z", venue: "SoFi Stadium, Los Angeles", matchday: 1, group: "Group D" },
  { home: "AUS", away: "TBD", date: "2026-06-14T04:00:00Z", venue: "BC Place, Vancouver", matchday: 1, group: "Group D" },
  // Jornada 2 - 18 de junio
  { home: "USA", away: "AUS", date: "2026-06-19T01:00:00Z", venue: "SoFi Stadium, Los Angeles", matchday: 2, group: "Group D" },
  { home: "PAR", away: "TBD", date: "2026-06-18T22:00:00Z", venue: "Lumen Field, Seattle", matchday: 2, group: "Group D" },
  // Jornada 3 - 23 de junio
  { home: "PAR", away: "USA", date: "2026-06-24T02:00:00Z", venue: "SoFi Stadium, Los Angeles", matchday: 3, group: "Group D" },
  { home: "TBD", away: "AUS", date: "2026-06-24T02:00:00Z", venue: "Lumen Field, Seattle", matchday: 3, group: "Group D" },

  // ===================== GRUPO E =====================
  { home: "GER", away: "CIV", date: "2026-06-14T19:00:00Z", venue: "Mercedes-Benz Stadium, Atlanta", matchday: 1, group: "Group E" },
  { home: "ECU", away: "CUW", date: "2026-06-14T22:00:00Z", venue: "Hard Rock Stadium, Miami", matchday: 1, group: "Group E" },
  { home: "GER", away: "ECU", date: "2026-06-19T19:00:00Z", venue: "Mercedes-Benz Stadium, Atlanta", matchday: 2, group: "Group E" },
  { home: "CIV", away: "CUW", date: "2026-06-19T22:00:00Z", venue: "Hard Rock Stadium, Miami", matchday: 2, group: "Group E" },
  { home: "CUW", away: "GER", date: "2026-06-24T22:00:00Z", venue: "Mercedes-Benz Stadium, Atlanta", matchday: 3, group: "Group E" },
  { home: "CIV", away: "ECU", date: "2026-06-24T22:00:00Z", venue: "Hard Rock Stadium, Miami", matchday: 3, group: "Group E" },

  // ===================== GRUPO F =====================
  { home: "NED", away: "TUN", date: "2026-06-15T19:00:00Z", venue: "Lincoln Financial Field, Philadelphia", matchday: 1, group: "Group F" },
  { home: "JPN", away: "TBD", date: "2026-06-15T22:00:00Z", venue: "Arrowhead Stadium, Kansas City", matchday: 1, group: "Group F" },
  { home: "NED", away: "JPN", date: "2026-06-20T19:00:00Z", venue: "Lincoln Financial Field, Philadelphia", matchday: 2, group: "Group F" },
  { home: "TUN", away: "TBD", date: "2026-06-20T22:00:00Z", venue: "Arrowhead Stadium, Kansas City", matchday: 2, group: "Group F" },
  { home: "TBD", away: "NED", date: "2026-06-25T22:00:00Z", venue: "Lincoln Financial Field, Philadelphia", matchday: 3, group: "Group F" },
  { home: "TUN", away: "JPN", date: "2026-06-25T22:00:00Z", venue: "Arrowhead Stadium, Kansas City", matchday: 3, group: "Group F" },

  // ===================== GRUPO G =====================
  { home: "BEL", away: "EGY", date: "2026-06-15T01:00:00Z", venue: "NRG Stadium, Houston", matchday: 1, group: "Group G" },
  { home: "IRN", away: "NZL", date: "2026-06-15T04:00:00Z", venue: "AT&T Stadium, Dallas", matchday: 1, group: "Group G" },
  { home: "BEL", away: "IRN", date: "2026-06-20T01:00:00Z", venue: "NRG Stadium, Houston", matchday: 2, group: "Group G" },
  { home: "EGY", away: "NZL", date: "2026-06-20T04:00:00Z", venue: "AT&T Stadium, Dallas", matchday: 2, group: "Group G" },
  { home: "NZL", away: "BEL", date: "2026-06-25T01:00:00Z", venue: "NRG Stadium, Houston", matchday: 3, group: "Group G" },
  { home: "EGY", away: "IRN", date: "2026-06-25T01:00:00Z", venue: "AT&T Stadium, Dallas", matchday: 3, group: "Group G" },

  // ===================== GRUPO H =====================
  { home: "ESP", away: "KSA", date: "2026-06-16T01:00:00Z", venue: "Hard Rock Stadium, Miami", matchday: 1, group: "Group H" },
  { home: "URU", away: "CPV", date: "2026-06-16T04:00:00Z", venue: "Mercedes-Benz Stadium, Atlanta", matchday: 1, group: "Group H" },
  { home: "ESP", away: "URU", date: "2026-06-21T01:00:00Z", venue: "Hard Rock Stadium, Miami", matchday: 2, group: "Group H" },
  { home: "KSA", away: "CPV", date: "2026-06-21T04:00:00Z", venue: "Mercedes-Benz Stadium, Atlanta", matchday: 2, group: "Group H" },
  { home: "CPV", away: "ESP", date: "2026-06-26T01:00:00Z", venue: "Hard Rock Stadium, Miami", matchday: 3, group: "Group H" },
  { home: "KSA", away: "URU", date: "2026-06-26T01:00:00Z", venue: "Mercedes-Benz Stadium, Atlanta", matchday: 3, group: "Group H" },

  // ===================== GRUPO I =====================
  { home: "FRA", away: "NOR", date: "2026-06-16T19:00:00Z", venue: "MetLife Stadium, New York", matchday: 1, group: "Group I" },
  { home: "SEN", away: "TBD", date: "2026-06-16T22:00:00Z", venue: "Gillette Stadium, Boston", matchday: 1, group: "Group I" },
  { home: "FRA", away: "SEN", date: "2026-06-21T19:00:00Z", venue: "MetLife Stadium, New York", matchday: 2, group: "Group I" },
  { home: "NOR", away: "TBD", date: "2026-06-21T22:00:00Z", venue: "Gillette Stadium, Boston", matchday: 2, group: "Group I" },
  { home: "TBD", away: "FRA", date: "2026-06-26T22:00:00Z", venue: "MetLife Stadium, New York", matchday: 3, group: "Group I" },
  { home: "NOR", away: "SEN", date: "2026-06-26T22:00:00Z", venue: "Gillette Stadium, Boston", matchday: 3, group: "Group I" },

  // ===================== GRUPO J =====================
  { home: "ARG", away: "ALG", date: "2026-06-17T01:00:00Z", venue: "SoFi Stadium, Los Angeles", matchday: 1, group: "Group J" },
  { home: "AUT", away: "JOR", date: "2026-06-17T04:00:00Z", venue: "Lumen Field, Seattle", matchday: 1, group: "Group J" },
  { home: "ARG", away: "AUT", date: "2026-06-22T01:00:00Z", venue: "SoFi Stadium, Los Angeles", matchday: 2, group: "Group J" },
  { name: "ALG", home: "ALG", away: "JOR", date: "2026-06-22T04:00:00Z", venue: "Lumen Field, Seattle", matchday: 2, group: "Group J" },
  { home: "JOR", away: "ARG", date: "2026-06-27T01:00:00Z", venue: "SoFi Stadium, Los Angeles", matchday: 3, group: "Group J" },
  { home: "ALG", away: "AUT", date: "2026-06-27T01:00:00Z", venue: "Lumen Field, Seattle", matchday: 3, group: "Group J" },

  // ===================== GRUPO K =====================
  { home: "POR", away: "UZB", date: "2026-06-17T19:00:00Z", venue: "Lincoln Financial Field, Philadelphia", matchday: 1, group: "Group K" },
  { home: "COL", away: "TBD", date: "2026-06-17T22:00:00Z", venue: "NRG Stadium, Houston", matchday: 1, group: "Group K" },
  { home: "POR", away: "COL", date: "2026-06-22T19:00:00Z", venue: "Lincoln Financial Field, Philadelphia", matchday: 2, group: "Group K" },
  { home: "UZB", away: "TBD", date: "2026-06-22T22:00:00Z", venue: "NRG Stadium, Houston", matchday: 2, group: "Group K" },
  { home: "TBD", away: "POR", date: "2026-06-27T22:00:00Z", venue: "Lincoln Financial Field, Philadelphia", matchday: 3, group: "Group K" },
  { home: "UZB", away: "COL", date: "2026-06-27T22:00:00Z", venue: "NRG Stadium, Houston", matchday: 3, group: "Group K" },

  // ===================== GRUPO L =====================
  { home: "ENG", away: "GHA", date: "2026-06-14T01:00:00Z", venue: "AT&T Stadium, Dallas", matchday: 1, group: "Group L" },
  { home: "CRO", away: "PAN", date: "2026-06-14T04:00:00Z", venue: "Arrowhead Stadium, Kansas City", matchday: 1, group: "Group L" },
  { home: "ENG", away: "CRO", date: "2026-06-19T01:00:00Z", venue: "AT&T Stadium, Dallas", matchday: 2, group: "Group L" },
  { home: "GHA", away: "PAN", date: "2026-06-19T04:00:00Z", venue: "Arrowhead Stadium, Kansas City", matchday: 2, group: "Group L" },
  { home: "PAN", away: "ENG", date: "2026-06-25T04:00:00Z", venue: "AT&T Stadium, Dallas", matchday: 3, group: "Group L" },
  { home: "GHA", away: "CRO", date: "2026-06-25T04:00:00Z", venue: "Arrowhead Stadium, Kansas City", matchday: 3, group: "Group L" },
];