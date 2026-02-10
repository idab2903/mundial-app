interface FlagProps {
  url: string | null;  // La URL que viene de la DB (flagUrl)
  name: string;        // Nombre del equipo (para el alt)
  size?: number;
}

export function Flag({ url, name, size = 32 }: FlagProps) {
  if (!url) {
    return <span className="text-xl">🏳️</span>;
  }

  return (
    <img
      src={url}
      alt={name}
      width={size}
      height={size * 0.75}
      className="inline-block rounded-sm"
    />
  );
}