import { useEffect, useMemo, useRef, useState } from "react";
import { getAllByCity } from "../api/weather"; // se tiveres getAllByCoords, importa também

const STORAGE_KEY = "recent_cities_v1";
export type Units = "metric" | "imperial";

function loadRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveRecent(list: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 8)));
}

export default function useWeather() {
  const [units, setUnits] = useState<Units>("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [city, setCity] = useState<{ name: string; country: string } | null>(null);
  const [recent, setRecent] = useState<string[]>(loadRecent());
  const [lastCity, setLastCity] = useState<string | null>(null);

  // para abortar pedidos antigos
  const abortRef = useRef<AbortController | null>(null);
  const startRequest = () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    return ac.signal;
  };

  /** Pesquisa por nome. saveToRecent controla se registas no histórico. */
  const fetchByCity = async (name: string, opts?: { saveToRecent?: boolean }) => {
    const save = opts?.saveToRecent ?? true;
    try {
      setLoading(true);
      setError("");
      const signal = startRequest();
      // getAllByCity deve aceitar { signal } no axios/fetch se implementares
      const { current, forecast, city } = await getAllByCity(name, units /*, { signal }*/);
      setCurrent(current);
      setForecast(forecast);
      setCity(city);
      setLastCity(city.name);

      if (save) {
        const normalized = `${city.name}, ${city.country}`;
        setRecent(prev => {
          const next = [normalized, ...prev.filter(x => x.toLowerCase() !== normalized.toLowerCase())];
          saveRecent(next);
          return next;
        });
      }
    } catch (e: any) {
      if (e?.name === "CanceledError" || e?.name === "AbortError") return;
      setError(e?.message || "Falha ao obter dados meteorológicos.");
      setCurrent(null); setForecast(null);
    } finally { setLoading(false); }
  };

  /** Pesquisa direta por coordenadas (útil no autocomplete). */
  const fetchByCoords = async (lat: number, lon: number, label?: string) => {
    try {
      setLoading(true);
      setError("");
      const signal = startRequest();
      // Se tiveres getAllByCoords, usa aqui. Caso contrário, mantém getAllByCity.
      // const { current, forecast, city } = await getAllByCoords(lat, lon, units, { signal });
      const { current, forecast, city } = await getAllByCity(label || "", units /*, { signal }*/);
      setCurrent(current);
      setForecast(forecast);
      setCity(city);
      setLastCity(city.name);

      const normalized = `${city.name}, ${city.country}`;
      setRecent(prev => {
        const next = [normalized, ...prev.filter(x => x.toLowerCase() !== normalized.toLowerCase())];
        saveRecent(next);
        return next;
      });
    } catch (e: any) {
      if (e?.name === "CanceledError" || e?.name === "AbortError") return;
      setError(e?.message || "Falha ao obter dados meteorológicos.");
      setCurrent(null); setForecast(null);
    } finally { setLoading(false); }
  };

  /** Mudar unidades -> refetch da última cidade, sem gravar nos recentes. */
  useEffect(() => {
    if (lastCity) fetchByCity(lastCity, { saveToRecent: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  /** Limpar histórico */
  const clearRecents = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecent([]);
  };

  // Agrega lista 3h -> 5 dias com min/max e ícone do meio-dia
  const daily = useMemo(() => {
    if (!forecast?.list) return [];
    const map: Record<string, any[]> = {};
    forecast.list.forEach((x: any) => {
      const d = new Date(x.dt * 1000);
      const key = d.toISOString().slice(0, 10);
      (map[key] ||= []).push(x);
    });

    return Object.keys(map).slice(0, 5).map((key) => {
      const items = map[key];
      const temps = items.map((i) => i.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);
      const iconSlot = items.reduce((a, b) =>
        Math.abs(new Date(a.dt * 1000).getHours() - 12) <
        Math.abs(new Date(b.dt * 1000).getHours() - 12) ? a : b
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
  }, [forecast]);

  return {
    units, setUnits,
    loading, error,
    city, current, daily,
    fetchByCity, fetchByCoords,
    recent, clearRecents,
  };
}
