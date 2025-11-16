import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./styles/global";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import ForecastList from "./components/ForecastList";
import UnitToggle from "./components/UnitToggle";
import RecentSearches from "./components/RecentSearches";
import useWeather from "./hooks/useWeather";
import TemperatureGraph from "./components/TemperatureGraph";
import TemperatureMap from "./components/TemperatureMap";   
import GraphMapCarousel from "./components/GraphMapCarousel";
import GraphMapPanel from "./components/GraphMapPanel";

/* --------- layout --------- */

const Panel = styled.div`
  position: relative;
  background: var(--panel, #0f172a);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
`;

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    "header  header   header"
    "sidebar main     forecast"
    "sidebar graph    graph";
  grid-template-columns: 220px 1fr 320px;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;

  @media (max-width: 1100px) {
    grid-template-areas:
      "header  header"
      "sidebar main"
      "forecast forecast"
      "graph   graph";
    grid-template-columns: 200px 1fr;
  }

  @media (max-width: 800px) {
    grid-template-areas:
      "header"
      "sidebar"
      "main"
      "graph"
      "forecast";
    grid-template-columns: 1fr;
  }
`;

const GraphPanel = styled(Panel)`
  grid-area: graph;
`;
const Header = styled(Panel)`
  grid-area: header;
  overflow: visible;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  .grow {
    flex: 1 1 480px;
    min-width: 260px;
  }
`;
const Sidebar = styled(Panel)`
  grid-area: sidebar;
`;
const Main = styled.div`
  grid-area: main;
  display: grid;
  gap: 1rem;
`;
const ForecastPanel = styled(Panel)`
  grid-area: forecast;
`;

/* --------- visuals --------- */

const SectionTitle = styled.h3`
  margin-bottom: 12px;
  color: var(--muted, #94a3b8);
  font-weight: 600;
`;

const Highlights = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled.div`
  background: #182133;
  border-radius: 16px;
  padding: 16px;
`;

const HLabel = styled.div`
  color: #94a3b8;
  font-size: 12px;
  letter-spacing: 0.4px;
`;
const HValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-top: 6px;
`;

/* --------- component --------- */

export default function App() {
  const {
    units,
    setUnits,
    loading,
    error,
    current,
    daily,
    fetchByCity,
    recent,
  } = useWeather();

  const symbol = units === "metric" ? "C" : "F";

  // agora aqui dentro:
  const lat = current?.coord?.lat;
  const lon = current?.coord?.lon;
  const owmKey = process.env.REACT_APP_WEATHER_API_KEY as string; // usa o nome do teu .env

  const windMs = current?.wind?.speed ?? 0;
  const windDisplay =
    units === "metric"
      ? `${Math.round(windMs * 3.6)} km/h`
      : `${Math.round(windMs)} mph`;

  const clearRecents = () => {
    localStorage.removeItem("recent_cities_v1");
    window.location.reload();
  };

  return (
    <>
      <GlobalStyle />
      <Grid>
        {/* HEADER */}
        <Header>
          <h1 style={{ margin: 0 }}>Weather</h1>
          <div style={{ flex: "0 0 auto" }}>
            <UnitToggle units={units} onChange={setUnits} />
          </div>
          <div className="grow">
            <SearchBar onSearch={fetchByCity} />
          </div>
          {error && <ErrorMessage message={error} />}
        </Header>

        {/* SIDEBAR */}
        <Sidebar>
          <SectionTitle>Pesquisas recentes</SectionTitle>
          <RecentSearches
            items={recent}
            onPick={(city) => fetchByCity(city)}
            onClear={clearRecents}
          />
        </Sidebar>

        {/* MAIN */}
        <Main>
          <Panel>
            {loading && <div>A carregar…</div>}
            {current && (
              <WeatherCard data={current} units={units} cityName={undefined} />
            )}

            {current && (
              <>
                <SectionTitle>Today's highlights</SectionTitle>
                <Highlights>
                  <HighlightCard>
                    <HLabel>Sensação térmica</HLabel>
                    <HValue>
                      {Math.round(current?.main?.feels_like ?? 0)}° {symbol}
                    </HValue>
                  </HighlightCard>
                  <HighlightCard>
                    <HLabel>Humidade</HLabel>
                    <HValue>{current?.main?.humidity ?? 0}%</HValue>
                  </HighlightCard>
                  <HighlightCard>
                    <HLabel>Vento</HLabel>
                    <HValue>{windDisplay}</HValue>
                  </HighlightCard>
                  <HighlightCard>
                    <HLabel>Pressão</HLabel>
                    <HValue>{current?.main?.pressure ?? 0} mb</HValue>
                  </HighlightCard>
                </Highlights>
              </>
            )}
          </Panel>
        </Main>

        {daily.length > 0 && (
          <GraphPanel>
            <GraphMapPanel
              days={daily}
              unitSymbol={symbol}
              lat={lat}
              lon={lon}
              city={current?.name}
              owmKey={owmKey}
            />
          </GraphPanel>
        )}

        {/* FORECAST */}
        <ForecastPanel>
          <SectionTitle>5-day forecast</SectionTitle>
          {daily.length > 0 ? (
            <ForecastList days={daily} unitSymbol={symbol} />
          ) : (
            <div style={{ color: "#94a3b8" }}>
              Sem dados. Procura uma cidade.
            </div>
          )}
        </ForecastPanel>
      </Grid>
    </>
  );
}
