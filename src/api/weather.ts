import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


export type CitySuggestion = {
  name: string; country: string; state?: string; lat: number; lon: number;
};

export async function getCitySuggestions(q: string, limit = 5): Promise<CitySuggestion[]> {
  if (q.trim().length < 3) return [];
  const { data } = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
    params: { q, limit, appid: API_KEY },
  });
  return (data || []).map((x: any) => ({
    name: x.name, country: x.country, state: x.state, lat: x.lat, lon: x.lon,
  }));
}

// 1) cidade -> coordenadas
async function getCoords(city: string) {
  const { data } = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
    params: { q: city, limit: 1, appid: API_KEY },
  });
  if (!data?.length) throw new Error("Cidade não encontrada");
  const { lat, lon, name, country } = data[0];
  return { lat, lon, name, country };
}

// 2) tempo atual por coords
async function getCurrent(lat: number, lon: number, units: "metric" | "imperial") {
  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { lat, lon, units, appid: API_KEY, lang: "pt" },
  });
  return data;
}

// 3) previsão 5 dias por coords (3 em 3h)
async function getForecast(lat: number, lon: number, units: "metric" | "imperial") {
  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
    params: { lat, lon, units, appid: API_KEY, lang: "pt" },
  });
  return data;
}

// Facade
export async function getAllByCity(city: string, units: "metric" | "imperial") {
  const { lat, lon, name, country } = await getCoords(city);
  const [current, forecast] = await Promise.all([
    getCurrent(lat, lon, units),
    getForecast(lat, lon, units),
  ]);
  return { city: { name, country, lat, lon }, current, forecast };
}
