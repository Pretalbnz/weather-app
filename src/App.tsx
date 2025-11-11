import React from "react";
import { GlobalStyle } from "./styles/global";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import ForecastList from "./components/ForecastList";
import UnitToggle from "./components/UnitToggle";
import useWeather from "./hooks/useWeather";

export default function App() {
  const { units, setUnits, loading, error, city, current, daily, fetchByCity } = useWeather();
  const symbol = units === "metric" ? "C" : "F";

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
          <h1>Weather Forecast</h1>
          <UnitToggle units={units} onChange={setUnits} />
        </div>

        <div className="panel" style={{display:"grid", gap:16}}>
          <SearchBar onSearch={fetchByCity} />
          {error && <ErrorMessage message={error} />}
          {loading && <div>Carregando…</div>}
          {current && <WeatherCard data={current} />}
        </div>

        {daily.length > 0 && (
          <div className="panel">
            <h3 style={{marginBottom:12}}>Próximos 5 dias</h3>
            <ForecastList days={daily} unitSymbol={symbol} />
          </div>
        )}
      </div>
    </>
  );
}
