import { useMemo, useState } from "react";
import { getAllByCity } from "../api/weather";

export type Units = "metric" | "imperial";

export default function useWeather() {
  const [units, setUnits] = useState<Units>("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [city, setCity] = useState<{ name: string; country: string } | null>(null);

  const fetchByCity = async (name: string) => {
    try {
      setLoading(true);
      setError("");
      const { current, forecast, city } = await getAllByCity(name, units);
      setCurrent(current);
      setForecast(forecast);
      setCity(city);
    } catch (e: any) {
      setError(e?.message || "Falha ao obter dados meteorológicos.");
      setCurrent(null);
      setForecast(null);
      setCity(null);
    } finally {
      setLoading(false);
    }
  };

  // Agrega lista 3h -> 5 dias com min/max e ícone do meio-dia
  const daily = useMemo(() => {
    if (!forecast?.list) return [];
    const map: Record<string, any[]> = {};
    forecast.list.forEach((x: any) => {
      const d = new Date(x.dt * 1000);
      const key = d.toISOString().slice(0, 10);
      map[key] = map[key] || [];
      map[key].push(x);
    });

    const days = Object.keys(map)
      .slice(0, 5)
      .map((key) => {
        const items = map[key];
        const temps = items.map((i) => i.main.temp);
        const min = Math.min(...temps);
        const max = Math.max(...temps);
        // escolhe o slot mais perto das 12:00
        const iconSlot = items.reduce((a, b) =>
          Math.abs(new Date(a.dt * 1000).getHours() - 12) <
          Math.abs(new Date(b.dt * 1000).getHours() - 12)
            ? a
            : b
        );
        return {
          date: key,
          min: Math.round(min),
          max: Math.round(max),
          icon: iconSlot.weather?.[0]?.icon,
          main: iconSlot.weather?.[0]?.main,
          desc: iconSlot.weather?.[0]?.description,
        };
      });

    return days;
  }, [forecast]);

  return { units, setUnits, loading, error, city, current, daily, fetchByCity };
}
