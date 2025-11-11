import React from "react";
import { GlobalStyle } from "./styles/global";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import TemperatureGraph from "./components/TemperatureGraph";
import useWeather from "./hooks/useWeather";

function App() {
  const { weather, error, fetchWeather } = useWeather();

  return (
    <>
      <GlobalStyle />
      <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
        <h1>Weather Forecast</h1>
        <SearchBar onSearch={fetchWeather} />
        {error && <ErrorMessage message={error} />}
        {weather && (
          <>
            <WeatherCard data={weather} />
            <TemperatureGraph forecast={weather} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
