import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  lat: number;
  lon: number;
  city?: string;
  unitSymbol: "C" | "F";
  owmKey: string;
  interactive?: boolean; // novo
};

export default function TemperatureMap({
  lat,
  lon,
  city,
  unitSymbol,
  owmKey,
  interactive = true,
}: Props) {
  if (!lat || !lon) return null;

  const tempTiles = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${owmKey}`;

  // Cast react-leaflet components to any to avoid typing mismatches between installed
  // leaflet/react-leaflet versions and their TypeScript definitions in this project.
  const Map = MapContainer as unknown as React.ComponentType<any>;
  const Tile = TileLayer as unknown as React.ComponentType<any>;
  const Circle = CircleMarker as unknown as React.ComponentType<any>;
  const Tip = Tooltip as unknown as React.ComponentType<any>;

  return (
    <div style={{ width: "100%", height: 360, borderRadius: 16, overflow: "hidden" }}>
      <Map
        center={[lat, lon]}
        zoom={9}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        boxZoom={interactive}
        keyboard={interactive}
      >
        <Tile
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Tile url={tempTiles} attribution="&copy; OpenWeatherMap" opacity={0.55} />
        <Circle center={[lat, lon]} radius={8} pathOptions={{ color: "#60a5fa", weight: 2, fillOpacity: 0.9 }}>
          <Tip direction="top" offset={[0, -8]} opacity={1} permanent>
            <div style={{ fontWeight: 700 }}>{city ?? "Local"}</div>
            <div style={{ opacity: 0.85 }}>Mapa de temperatura (°{unitSymbol})</div>
          </Tip>
        </Circle>
      </Map>
    </div>
  );
}
