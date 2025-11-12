// src/components/WeatherCard.tsx
import React from "react";
import styled from "styled-components";
import { IconType } from "react-icons";
import {
  WiCloud,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";
import { Units } from "../hooks/useWeather";

const Shell = styled.div`
  background: #111827;
  color: #e5e7eb;
  border-radius: 20px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Big = styled.div`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
`;

const Sub = styled.div`
  opacity: 0.8;
`;

type WeatherData = {
  name?: string; // não confiar para título (pode vir diferente); usa cityName prop
  weather?: { main?: string; description?: string }[];
  main?: { temp?: number; humidity?: number };
  wind?: { speed?: number }; // m/s em metric, mph em imperial
};

const iconMap: Record<string, IconType> = {
  Clear: WiDaySunny,
  Clouds: WiCloud,
  Rain: WiRain,
  Snow: WiSnow,
  Thunderstorm: WiThunderstorm,
  Mist: WiFog,
  Fog: WiFog,
};

export default function WeatherCard({
  data,
  units,
  cityName,
}: {
  data: WeatherData;
  units: Units;
  cityName?: string;
}) {
  const main = data.weather?.[0]?.main ?? "Clear";
  const Icon = (iconMap[main] ?? WiDaySunny) as React.ComponentType<{
    size: number;
  }>;
  const desc = data.weather?.[0]?.description ?? "";

  // vento: m/s -> km/h em metric; mph em imperial
  const windRaw = data.wind?.speed ?? 0;
  const windText =
    units === "metric"
      ? `${Math.round(windRaw * 3.6)} km/h`
      : `${Math.round(windRaw)} mph`;

  return (
    <Shell>
      <Left>
        <Icon size={64} />
        <div>
          <Big>{Math.round(data.main?.temp ?? 0)}°</Big>
          <Sub style={{ textTransform: "capitalize" }}>{desc}</Sub>
        </div>
      </Left>

      <div style={{ textAlign: "right" }}>
        <div style={{ fontWeight: 600, fontSize: 20 }}>
          {cityName ?? data.name ?? ""}
        </div>
        <div>Humidade: {data.main?.humidity ?? 0}%</div>
        <div>Vento: {windText}</div>
      </div>
    </Shell>
  );
}
